package com.approval.repository;

import com.approval.model.Document;
import com.approval.model.DocumentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    // Counting by status
    long countByStatus(DocumentStatus status);

    // JOIN FETCH for audit
    @Query("SELECT d FROM Document d " +
            "LEFT JOIN FETCH d.auditLogs l " +
            "LEFT JOIN FETCH l.user " +
            "WHERE d.id = :id")
    Optional<Document> findByIdWithAuditLogs(@Param("id") Long id);
}
