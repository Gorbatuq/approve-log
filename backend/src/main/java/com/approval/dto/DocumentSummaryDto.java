package com.approval.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DocumentSummaryDto {
    private Long id;
    private String title;
    private String status;
    private String createdBy;
}
