package com.approval.controller;

import com.approval.dto.AuthRequest;
import com.approval.dto.UserResponse;
import com.approval.exception.NotFoundException;
import com.approval.model.Role;
import com.approval.model.User;
import com.approval.repository.UserRepository;
import com.approval.security.JwtTokenProvider;
import com.approval.service.AuthLogService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final AuthLogService authLogService;
    private final HttpServletRequest request;

    // ------------------------- LOGIN ----------------------------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest requestBody) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    requestBody.getUsername(), requestBody.getPassword()));

            User user = userRepository.findByUsername(requestBody.getUsername())
                    .orElseThrow(() -> new NotFoundException("User not found"));

            String token = jwtTokenProvider.createToken(user.getUsername(), user.getRole());

            authLogService.log(user.getUsername(), true, request);

            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "user", new UserResponse(user.getUsername(), user.getRole())));
        } catch (Exception ex) {

            authLogService.log(requestBody.getUsername(), false, request);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException ignored) {
            }
            throw new RuntimeException("Invalid credentials");
        }
    }

    // ------------------------- REGISTER --------------------------------
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AuthRequest requestBody) {
        if (userRepository.existsByUsername(requestBody.getUsername())) {
            return ResponseEntity.badRequest().body("Username already taken");
        }

        User user = new User();
        user.setUsername(requestBody.getUsername());
        user.setPasswordHash(passwordEncoder.encode(requestBody.getPassword()));
        user.setRole(Role.USER);

        userRepository.save(user);
        return ResponseEntity.ok("User created");
    }
}
