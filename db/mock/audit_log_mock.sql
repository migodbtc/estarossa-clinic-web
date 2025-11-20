-- Mock data for `audit_log` table
-- Import with: mysql -u <user> -p untitledclinicdb < db/mock/audit_log_mock.sql
USE untitledclinicdb;
-- Columns: (actor_user_id, table_name, record_id, action, old_values, new_values, timestamp)
INSERT INTO audit_log (
        actor_user_id,
        table_name,
        record_id,
        action,
        old_values,
        new_values,
        timestamp
    )
VALUES (
        8,
        'auth_users',
        1,
        'INSERT',
        NULL,
        '{"email":"patient1@example.com","role":"patient"}',
        '2025-01-10 09:15:00'
    ),
    (
        8,
        'user_profiles',
        1,
        'INSERT',
        NULL,
        '{"full_name":"Juan Dela Cruz","auth_id":1}',
        '2025-01-10 09:16:00'
    ),
    (
        3,
        'medical_records',
        1,
        'INSERT',
        NULL,
        '{"appointment_id":3,"diagnosis":"Hypertension"}',
        '2025-10-01 09:20:00'
    );