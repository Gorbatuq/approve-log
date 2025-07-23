package com.approval.controller;

import com.approval.dto.DocumentRequest;
import com.approval.model.AuditLog;
import com.approval.model.Document;
import com.approval.model.User;
import com.approval.service.AuditLogService;
import com.approval.service.DocumentService;
import com.approval.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;
    private final UserService userService;
    private final AuditLogService auditLogService;

    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER')")
    public Document create(@Valid @RequestBody DocumentRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        return documentService.createDocument(request, user);
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER')")
    public List<Document> allDocuments() {
        return documentService.getAllDocuments();
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('MANAGER')")
    public Document approve(@Valid @PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        return documentService.approveDocument(id, user);
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('MANAGER')")
    public Document reject(@Valid @PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        return documentService.rejectDocument(id, user);
    }

    @GetMapping("/{id}/audit")
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER')")
    public List<AuditLog> getAudit(@PathVariable Long id) {
        return auditLogService.getAuditByDocumentId(id);
    }
}
