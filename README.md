# approve-log

# Approve Log — Spring Boot Backend

Server part of the document management system with authorization, action logging and brute-force protection.

## ⚙️ Technologies

- Java 21, Spring Boot 3.5
- Spring Security + JWT
- Spring Data JPA + PostgreSQL
- Validation (JSR-303)
- REST API + Exception Handling
- Gradle

## 🧱 Architecture

- `User`: managers and regular users
- `Document`: documents with content, status, author, approval
- `AuditLog`: history of actions on documents
- `AuthLog`: log of successful/unsuccessful logins by IP

## 🔐 Security

- JWT tokens
- Role-based access via `@PreAuthorize`
- Brute-force protection via `Thread.sleep()` for login errors
- Login filter with IP logging

## 🚀 Launch

1. **Configure the database**
PostgreSQL:
```sql
CREATE DATABASE approval;
