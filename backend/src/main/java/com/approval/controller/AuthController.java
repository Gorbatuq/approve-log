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
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

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
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest requestBody, HttpServletResponse response) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    requestBody.getUsername(), requestBody.getPassword()));

            User user = userRepository.findByUsername(requestBody.getUsername())
                    .orElseThrow(() -> new NotFoundException("User not found"));

            String token = jwtTokenProvider.createToken(user.getUsername(), user.getRole());

            authLogService.log(user.getUsername(), true, request);

            // Створення cookie
            Cookie cookie = new Cookie("token", token);
            cookie.setHttpOnly(true);
            cookie.setSecure(true); // якщо HTTPS, інакше false
            cookie.setPath("/");
            cookie.setMaxAge((int) (jwtTokenProvider.getExpiration() / 1000));
            cookie.setAttribute("SameSite", "Strict");

            // Додати cookie у відповідь
            response.addCookie(cookie);

            // Повернути тільки юзера, токен не потрібен у JSON
            return ResponseEntity.ok(new UserResponse(user.getUsername(), user.getRole()));

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
        return ResponseEntity.ok(Map.of("message", "User created"));

    }

    // ------------------------- LOGOUT --------------------------------
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setAttribute("SameSite", "Strict");
        response.addCookie(cookie);

        return ResponseEntity.ok("Logged out");
    }

    // ------------------------- PROFILE --------------------------------
    @GetMapping("/profile")
    public ResponseEntity<?> profile(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return ResponseEntity.status(401).body("No cookies");
        }
        String token = null;
        for (Cookie cookie : cookies) {
            if ("token".equals(cookie.getName())) {
                token = cookie.getValue();
                break;
            }
        }
        if (token == null || !jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(401).body("Invalid or missing token");
        }
        String username = jwtTokenProvider.getUsername(token);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return ResponseEntity.ok(new UserResponse(user.getUsername(), user.getRole()));
    }

}
