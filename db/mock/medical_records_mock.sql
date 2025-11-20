-- Mock data for `medical_records` table
-- Import with: mysql -u <user> -p untitledclinicdb < db/mock/medical_records_mock.sql
USE untitledclinicdb;
-- Columns: (appointment_id, patient_id, staff_id, diagnosis, notes, prescribed_meds, created_at, updated_at)
INSERT INTO medical_records (
        appointment_id,
        patient_id,
        staff_id,
        diagnosis,
        notes,
        prescribed_meds,
        created_at,
        updated_at
    )
VALUES (
        3,
        7,
        3,
        'Hypertension',
        'Patient reports occasional headaches and elevated BP readings at home.',
        'Lisinopril 10mg once daily',
        '2025-10-01 09:15:00',
        '2025-10-01 09:15:00'
    ),
    (
        1,
        1,
        3,
        'Healthy',
        'Routine check – no acute findings.',
        NULL,
        '2025-11-20 11:00:00',
        '2025-11-20 11:00:00'
    );