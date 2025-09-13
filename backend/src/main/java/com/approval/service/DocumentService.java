package com.approval.service;

import com.approval.dto.*;
import com.approval.exception.NotFoundException;
import com.approval.model.*;
import com.approval.repository.AuditLogRepository;
import com.approval.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

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
        doc.setCreatedBy(creator);
        Document saved = documentRepository.save(doc);
        saveAuditLog(saved, AuditAction.CREATED, creator);
        return saved;
    }

    public void deleteDocument(Long id, User user) {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Document not found"));

        if (!doc.getStatus().equals(DocumentStatus.DRAFT)) {
            throw new IllegalStateException("Only DRAFT documents can be deleted");
        }

        if (!doc.getCreatedBy().getId().equals(user.getId())) {
            throw new SecurityException("Only author can delete their document");
        }

        documentRepository.delete(doc);
        saveAuditLog(doc, AuditAction.DELETED, user);
    }

    public Document updateDocument(Long id, DocumentRequest request, User user) {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Document not found"));

        if (!doc.getStatus().equals(DocumentStatus.DRAFT)) {
            throw new IllegalStateException("Only DRAFT documents can be updated");
        }

        if (!doc.getCreatedBy().getId().equals(user.getId())) {
            throw new SecurityException("Only author can update their document");
        }

        doc.setTitle(request.getTitle());
        doc.setContent(request.getContent());

        Document updated = documentRepository.save(doc);
        saveAuditLog(updated, AuditAction.UPDATED, user);
        return updated;
    }

    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    public Map<String, Long> getStats() {
        long total = documentRepository.count();
        long approved = documentRepository.countByStatus(DocumentStatus.APPROVED);
        long draft = documentRepository.countByStatus(DocumentStatus.DRAFT);
        long rejected = documentRepository.countByStatus(DocumentStatus.REJECTED);

        Map<String, Long> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("approved", approved);
        stats.put("draft", draft);
        stats.put("rejected", rejected);
        return stats;
    }

    public Document approveDocument(Long id, User manager) {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Document not found"));

        doc.setStatus(DocumentStatus.APPROVED);
        doc.setApprovedBy(manager);
        doc.setApprovedAt(LocalDateTime.now());
        doc.setRejectedBy(null);
        doc.setRejectedAt(null);

        Document saved = documentRepository.save(doc);
        saveAuditLog(saved, AuditAction.APPROVED, manager);
        return saved;
    }

    public Document rejectDocument(Long id, User manager) {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Document not found"));

        doc.setStatus(DocumentStatus.REJECTED);
        doc.setRejectedBy(manager);
        doc.setRejectedAt(LocalDateTime.now());
        doc.setApprovedBy(null);
        doc.setApprovedAt(null);

        Document saved = documentRepository.save(doc);
        saveAuditLog(saved, AuditAction.REJECTED, manager);
        return saved;
    }

    private void saveAuditLog(Document document, AuditAction action, User user) {
        AuditLog log = new AuditLog();
        log.setDocument(document);
        log.setAction(action);
        log.setUser(user);
        log.setTimestamp(LocalDateTime.now());
        auditLogRepository.save(log);
    }

    // DTO conversion — the minimum option for a list
    public DocumentSummaryDto mapToSummaryDto(Document doc) {
        return new DocumentSummaryDto(
                doc.getId(),
                doc.getTitle(),
                doc.getStatus().name(),
                doc.getCreatedBy() != null ? doc.getCreatedBy().getUsername() : "Unknown");
    }

    // DTO conversion — complete without logs
    public DocumentDetailsDto mapToDetailsDto(Document doc) {
        return new DocumentDetailsDto(
                doc.getId(),
                doc.getTitle(),
                doc.getContent(),
                doc.getStatus().name(),
                doc.getCreatedBy().getUsername(),
                doc.getApprovedBy() != null ? doc.getApprovedBy().getUsername() : null,
                doc.getRejectedBy() != null ? doc.getRejectedBy().getUsername() : null,
                doc.getApprovedAt(),
                doc.getRejectedAt());
    }

    // DTO conversion — complete with logs
    public DocumentWithAuditDto mapToWithAuditDto(Document doc) {
        return new DocumentWithAuditDto(
                mapToDetailsDto(doc),
                doc.getAuditLogs().stream()
                        .map(log -> new AuditLogDto(
                                log.getId(),
                                log.getAction().name(),
                                log.getUser().getUsername(),
                                log.getTimestamp()))
                        .toList());
    }

    public DocumentWithAuditDto findByIdWithAudit(Long id) {
        Document doc = documentRepository.findByIdWithAuditLogs(id)
                .orElseThrow(() -> new NotFoundException("Document not found"));
        return mapToWithAuditDto(doc);
    }

}
