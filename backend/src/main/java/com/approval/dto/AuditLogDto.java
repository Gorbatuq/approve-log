package com.approval.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuditLogDto {
    private Long id;
    private String action;
    private String username;
    private LocalDateTime timestamp;
}
