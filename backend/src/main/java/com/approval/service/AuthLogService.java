package com.approval.service;

import com.approval.model.AuthLog;
import com.approval.repository.AuthLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthLogService {

    private final AuthLogRepository authLogRepository;

    public void log(String username, boolean success, HttpServletRequest request) {
        AuthLog log = new AuthLog();
        log.setUsername(username);
        log.setSuccess(success);
        log.setTimestamp(LocalDateTime.now());
        log.setIp(request.getRemoteAddr());
        authLogRepository.save(log);
    }
}
