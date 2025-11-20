-- Mock data for `appointments` table
-- Import with: mysql -u <user> -p untitledclinicdb < db/mock/appointments_mock.sql
USE untitledclinicdb;
-- Columns: (patient_id, staff_id, date_time, visit_reason, status, created_at, updated_at)
INSERT INTO appointments (
        patient_id,
        staff_id,
        date_time,
        visit_reason,
        status,
        created_at,
        updated_at
    )
VALUES (
        1,
        3,
        '2025-11-20 10:00:00',
        'Routine checkup',
        'scheduled',
        '2025-11-01 09:00:00',
        '2025-11-01 09:00:00'
    ),
    (
        2,
        4,
        '2025-11-21 14:30:00',
        'Pediatric consultation',
        'scheduled',
        '2025-11-02 10:00:00',
        '2025-11-02 10:00:00'
    ),
    (
        7,
        3,
        '2025-10-01 08:30:00',
        'Follow-up for hypertension',
        'completed',
        '2025-09-20 08:00:00',
        '2025-10-01 09:00:00'
    ),
    (
        1,
        5,
        '2025-12-05 09:00:00',
        'Vaccination',
        'scheduled',
        '2025-11-05 12:00:00',
        '2025-11-05 12:00:00'
    );