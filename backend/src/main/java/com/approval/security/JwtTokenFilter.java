package com.approval.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        // The filter is NOT limited to login and register
        return path.equals("/api/auth/login") || path.equals("/api/auth/register");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String token = resolveToken(request);

        if (token != null && jwtTokenProvider.validateToken(token)) {
            System.out.println("Valid token, setting authentication for user: "
                    + jwtTokenProvider.getUsername(token));

            SecurityContextHolder.getContext().setAuthentication(
                    jwtTokenProvider.getAuthentication(token));
        } else {
            System.out.println("Token invalid or missing for path: " + request.getRequestURI());
        }

        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        if (request.getCookies() != null) {
            System.out.println("Cookies: " + Arrays.toString(request.getCookies()));
            for (Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    System.out.println("Found token cookie: " + cookie.getValue());
                    return cookie.getValue();
                }
            }
        } else {
            System.out.println("No cookies in request");
        }
        return null;
    }
}
