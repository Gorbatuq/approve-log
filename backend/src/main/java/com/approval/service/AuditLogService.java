package com.approval.service;

import com.approval.model.AuditLog;
import com.approval.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditLogService {
    private final AuditLogRepository auditLogRepository;

    public List<AuditLog> getAuditByDocumentId(Long docId) {
        return auditLogRepository.findByDocumentId(docId);
    }
}
