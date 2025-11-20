-- Mock data for `auth_users` table
-- Import with: mysql -u <user> -p untitledclinicdb < db/mock/auth_users_mock.sql
USE untitledclinicdb;
-- NOTE: `auth_id` is AUTO_INCREMENT so we do not specify it.
-- Columns: (email, password_hash, role, created_at, updated_at)
INSERT INTO auth_users (
        email,
        password_hash,
        role,
        created_at,
        updated_at
    )
VALUES (
        'patient1@example.com',
        'password123',
        'patient',
        '2025-01-10 09:15:00',
        '2025-01-10 09:15:00'
    ),
    (
        'patient2@example.com',
        'password123',
        'patient',
        '2025-02-05 11:30:00',
        '2025-02-05 11:30:00'
    ),
    (
        'doctor1@example.com',
        '$2b$12$EXAMPLEHASHEDPWD1',
        'doctor',
        '2025-03-12 08:00:00',
        '2025-03-12 08:00:00'
    ),
    (
        'doctor2@example.com',
        '$2b$12$EXAMPLEHASHEDPWD2',
        'doctor',
        '2025-04-20 14:20:00',
        '2025-04-20 14:20:00'
    ),
    (
        'nurse1@example.com',
        'password123',
        'nurse',
        '2025-05-15 07:45:00',
        '2025-05-15 07:45:00'
    ),
    (
        'admin@example.com',
        '$2b$12$EXAMPLEHASHEDADM',
        'admin',
        '2025-06-01 12:00:00',
        '2025-06-01 12:00:00'
    );
-- Optional: a few extra rows for variety
INSERT INTO auth_users (
        email,
        password_hash,
        role,
        created_at,
        updated_at
    )
VALUES (
        'patient3@example.com',
        'password123',
        'patient',
        '2025-07-08 10:10:00',
        '2025-07-08 10:10:00'
    ),
    (
        'nurse2@example.com',
        'password123',
        'nurse',
        '2025-08-22 09:00:00',
        '2025-08-22 09:00:00'
    );