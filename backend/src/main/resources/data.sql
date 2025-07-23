-- USERS
INSERT INTO users (id, username, password_hash, role) VALUES
(21, 'admin', '$2a$10$KLOmtTft0Bg3uTzLJytC3eLEtzwCah31rWeDqWK25ENWrJ5hsVtjW', 'MANAGER'),
(22, 'Mama',  '$2a$10$Fx2UxUStquhlVgBVWWug9uWReIMzeWB2M500BdDdLrCzxhoy4F3a', 'USER'),
(23, 'Tata',  '$2a$10$92fYB7fFXNPotGaEW9v7e7cczVbdB6qq2YglJmn2h/iseLLHH9My2', 'USER'),
(24, 'Kaka',  '$2a$10$xrVsFHZfNOxcT.IwW0q0G0ORh0znZk1KLCUdWkFt8JS5ujE5uETz', 'USER'),
(25, 'Lola',  '$2a$10$OzXfR7vH4WJYpVWNlqEqVeH0FGWGCqfLKDc2sPnNxIsWeNdJzhpdq', 'USER'),
(26, 'Gondon','$2a$10$GWocn/KDj10a8ll0BM2vuvMR/B0YhgK0RlBYAOuBYXmTgmlhHKB8a', 'USER');

-- DOCUMENTS
INSERT INTO documents (id, title, content, status, created_by_id, approved_by_id, approved_at) VALUES
(1, 'TT', 'CConti', 'DRAFT', 25, NULL, NULL);

-- AUDIT_LOGS
INSERT INTO audit_logs (id, action, timestamp, document_id, user_id) VALUES
(1, 'CREATED', '2025-07-23 18:01:48.160892', 1, 25);

-- AUTH_LOGS
INSERT INTO auth_logs (id, ip, success, timestamp, username) VALUES
(1, '0:0:0:0:0:0:0:1', true,  '2025-07-23 17:49:07.7389', 'Lola'),
(2, '127.0.0.1',     false, '2025-07-23 18:16:14.074944', 'Mama'),
(3, '127.0.0.1',     false, '2025-07-23 18:17:35.956282', 'Mama'),
(4, '127.0.0.1',     true,  '2025-07-23 18:19:51.551791', 'Lola');
