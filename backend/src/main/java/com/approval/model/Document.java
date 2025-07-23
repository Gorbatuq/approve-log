package com.approval.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Getter
@Setter
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;

    @Enumerated(EnumType.STRING)
    private DocumentStatus status; // DRAFT, PENDING, APPROVED, REJECTED

    @ManyToOne
    private User createdBy;

    @ManyToOne
    private User approvedBy;

    private LocalDateTime approvedAt;
}
