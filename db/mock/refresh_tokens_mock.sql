-- Mock data for `refresh_tokens` table
-- Import with: mysql -u <user> -p untitledclinicdb < db/mock/refresh_tokens_mock.sql
USE untitledclinicdb;
-- Columns: (auth_id, refresh_token, expires_at, revoked, created_at)
INSERT INTO refresh_tokens (
        auth_id,
        refresh_token,
        expires_at,
        revoked,
        created_at
    )
VALUES (
        1,
        'rtoken_patient1_abc123',
        '2026-01-10 09:15:00',
        0,
        '2025-01-10 09:15:00'
    ),
    (
        2,
        'rtoken_patient2_def456',
        '2026-02-05 11:30:00',
        0,
        '2025-02-05 11:30:00'
    ),
    (
        3,
        'rtoken_doctor1_ghi789',
        '2026-03-12 08:00:00',
        0,
        '2025-03-12 08:00:00'
    ),
    (
        5,
        'rtoken_nurse1_jkl012',
        '2026-05-15 07:45:00',
        0,
        '2025-05-15 07:45:00'
    ),
    (
        8,
        'rtoken_nurse2_mno345',
        '2026-08-22 09:00:00',
        0,
        '2025-08-22 09:00:00'
    );