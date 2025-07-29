package com.approval.service;

import com.approval.dto.DocumentRequest;
import com.approval.exception.NotFoundException;
import com.approval.model.AuditLog;
import com.approval.model.Document;
import com.approval.model.DocumentStatus;
import com.approval.model.User;
import com.approval.repository.AuditLogRepository;
import com.approval.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final AuditLogRepository auditLogRepository;

    public Document createDocument(DocumentRequest request, User creator) {
        Document doc = new Document();
        doc.setTitle(request.getTitle());
        doc.setContent(request.getContent());
        doc.setStatus(DocumentStatus.DRAFT);

        System.out.println("Creating document: " + request.getTitle());
        doc.setCreatedBy(creator);

        Document saved = documentRepository.save(doc);

        saveAuditLog(saved, "CREATED", creator);

        return saved;
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Document approveDocument(Long id, User manager) {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Document not found"));

        doc.setStatus(DocumentStatus.APPROVED);
        doc.setApprovedBy(manager);
        doc.setApprovedAt(LocalDateTime.now());

        // clear rejected
        doc.setRejectedBy(null);
        doc.setRejectedAt(null);

        Document saved = documentRepository.save(doc);
        saveAuditLog(saved, "APPROVED", manager);
        return saved;
    }

    public Document rejectDocument(Long id, User manager) {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Document not found"));

        doc.setStatus(DocumentStatus.REJECTED);
        doc.setRejectedBy(manager);
        doc.setRejectedAt(LocalDateTime.now());

        // Clear approved
        doc.setApprovedBy(null);
        doc.setApprovedAt(null);

        Document saved = documentRepository.save(doc);
        saveAuditLog(saved, "REJECTED", manager);
        return saved;
    }

    private void saveAuditLog(Document document, String action, User user) {
        AuditLog log = new AuditLog();
        log.setDocument(document);
        log.setAction(action);
        log.setUser(user);
        log.setTimestamp(LocalDateTime.now());
        auditLogRepository.save(log);
    }
}
