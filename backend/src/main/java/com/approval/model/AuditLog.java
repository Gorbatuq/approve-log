package com.approval.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Document document;

    private String action; // CREATED / APPROVED / REJECTED

    @ManyToOne
    private User user;

    private LocalDateTime timestamp;
}
