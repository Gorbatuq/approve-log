package com.approval.controller;

import com.approval.dto.DocumentRequest;
import com.approval.dto.DocumentSummaryDto;
import com.approval.dto.DocumentDetailsDto;
import com.approval.dto.DocumentWithAuditDto;
import com.approval.model.User;
import com.approval.service.DocumentService;
import com.approval.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;
    private final UserService userService;

    // Create doc (USER або MANAGER)
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER')")
    public DocumentDetailsDto create(@Valid @RequestBody DocumentRequest request, Authentication authentication) {
        User user = userService.findByUsername(authentication.getName());
        return documentService.mapToDetailsDto(
                documentService.createDocument(request, user));
    }

    // list document (USER and MANAGER) — only summary
    @GetMapping
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER')")
    public List<DocumentSummaryDto> allDocuments() {
        return documentService.getAllDocuments().stream()
                .map(documentService::mapToSummaryDto)
                .toList();
    }

    // Document update (author, DRAFT)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER')")
    public DocumentDetailsDto update(@PathVariable Long id, @Valid @RequestBody DocumentRequest request,
            Authentication authentication) {
        User user = userService.findByUsername(authentication.getName());
        return documentService.mapToDetailsDto(
                documentService.updateDocument(id, request, user));
    }

    // Remove of the DRAFT document (author)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER')")
    public ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication) {
        User user = userService.findByUsername(authentication.getName());
        documentService.deleteDocument(id, user);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }

    // approve doc (MANAGER only)
    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('MANAGER')")
    public DocumentDetailsDto approve(@PathVariable Long id, Authentication authentication) {
        User manager = userService.findByUsername(authentication.getName());
        return documentService.mapToDetailsDto(
                documentService.approveDocument(id, manager));
    }

    // reject doc (MANAGER only)
    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('MANAGER')")
    public DocumentDetailsDto reject(@PathVariable Long id, Authentication authentication) {
        User manager = userService.findByUsername(authentication.getName());
        return documentService.mapToDetailsDto(
                documentService.rejectDocument(id, manager));
    }

    // Document audit (USER or MANAGER) - full DTO with logs
    @GetMapping("/{id}/audit")
    @PreAuthorize("hasRole('USER') or hasRole('MANAGER')")
    public DocumentWithAuditDto getAudit(@PathVariable Long id) {
        return documentService.findByIdWithAudit(id);
    }

    // Statistics (MANAGER only)
    @GetMapping("/stats")
    @PreAuthorize("hasRole('MANAGER')")
    public Map<String, Long> getStats() {
        return documentService.getStats();
    }
}
