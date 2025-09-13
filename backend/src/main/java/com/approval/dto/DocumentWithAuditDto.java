package com.approval.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class DocumentWithAuditDto {
    private DocumentDetailsDto document;
    private List<AuditLogDto> auditLogs;
}
