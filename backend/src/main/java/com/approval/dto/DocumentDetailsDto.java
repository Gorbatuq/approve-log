package com.approval.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class DocumentDetailsDto {
    private Long id;
    private String title;
    private String content;
    private String status;
    private String createdBy;
    private String approvedBy;
    private String rejectedBy;
    private LocalDateTime approvedAt;
    private LocalDateTime rejectedAt;
}
