package com.approval.controller;

import com.approval.dto.DocumentRequest;
import com.approval.model.AuditLog;
import com.approval.model.Document;
import com.approval.model.User;
import com.approval.service.AuditLogService;
import com.approval.service.DocumentService;
import com.approval.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
    public Document create(@RequestBody DocumentRequest request,
            @AuthenticationPrincipal org.springframework.security.core.userdetails.User springUser) {
        User user = userService.findByUsername(springUser.getUsername());
        return documentService.createDocument(request, user);
    }

    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER')")
    public List<Document> allDocuments() {
        return documentService.getAllDocuments();
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('MANAGER')")
    public Document approve(@PathVariable Long id,
            @AuthenticationPrincipal org.springframework.security.core.userdetails.User springUser) {
        User user = userService.findByUsername(springUser.getUsername());
        return documentService.approveDocument(id, user);
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('MANAGER')")
    public Document reject(@PathVariable Long id,
            @AuthenticationPrincipal org.springframework.security.core.userdetails.User springUser) {
        User user = userService.findByUsername(springUser.getUsername());
        return documentService.rejectDocument(id, user);
    }

    @GetMapping("/{id}/audit")
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER')")
    public List<AuditLog> getAudit(@PathVariable Long id) {
        return auditLogService.getAuditByDocumentId(id);
    }
}
