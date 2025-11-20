-- Mock data for `user_profiles` table
-- Import with: mysql -u <user> -p untitledclinicdb < db/mock/user_profiles_mock.sql
USE untitledclinicdb;
-- Columns: (auth_id, full_name, birthdate, sex, address, contact_number, specialization, created_at, updated_at)
INSERT INTO user_profiles (
        auth_id,
        full_name,
        birthdate,
        sex,
        address,
        contact_number,
        specialization,
        created_at,
        updated_at
    )
VALUES (
        1,
        'Juan Dela Cruz',
        '1990-05-20',
        'male',
        '123 Sampaloc St, Manila',
        '09171234567',
        NULL,
        '2025-01-10 09:15:00',
        '2025-01-10 09:15:00'
    ),
    (
        2,
        'Maria Clara',
        '1985-08-12',
        'female',
        '45 Rizal Ave, Quezon City',
        '09179876543',
        NULL,
        '2025-02-05 11:30:00',
        '2025-02-05 11:30:00'
    ),
    (
        3,
        'Dr. Roberto Santos',
        '1978-03-02',
        'male',
        '12 Health Rd, Makati',
        '09170001111',
        'General Medicine',
        '2025-03-12 08:00:00',
        '2025-03-12 08:00:00'
    ),
    (
        4,
        'Dr. Anne Reyes',
        '1980-11-22',
        'female',
        '88 Wellness Blvd, Pasig',
        '09170002222',
        'Pediatrics',
        '2025-04-20 14:20:00',
        '2025-04-20 14:20:00'
    ),
    (
        5,
        'Nurse Carla Lopez',
        '1992-07-07',
        'female',
        '7 Care St, Mandaluyong',
        '09170003333',
        NULL,
        '2025-05-15 07:45:00',
        '2025-05-15 07:45:00'
    ),
    (
        6,
        'Admin User',
        '1988-10-10',
        'other',
        '1 Admin Plaza, City',
        '09170004444',
        NULL,
        '2025-06-01 12:00:00',
        '2025-06-01 12:00:00'
    ),
    (
        7,
        'Pedro Santos',
        '2000-09-05',
        'male',
        '200 Barangay St, City',
        '09170005555',
        NULL,
        '2025-07-08 10:10:00',
        '2025-07-08 10:10:00'
    ),
    (
        8,
        'Nurse Joy',
        '1994-02-14',
        'female',
        '99 Clinic Ave, City',
        '09170006666',
        NULL,
        '2025-08-22 09:00:00',
        '2025-08-22 09:00:00'
    );