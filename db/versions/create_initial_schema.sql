-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS untitledclinicdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE untitledclinicdb;
-- 1. auth_users: login + role
CREATE TABLE IF NOT EXISTS auth_users (
    auth_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('patient', 'doctor', 'nurse', 'admin') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE = InnoDB;
-- 2. user_profiles: personal info
CREATE TABLE IF NOT EXISTS user_profiles (
    profile_id INT AUTO_INCREMENT PRIMARY KEY,
    auth_id INT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    birthdate DATE,
    sex ENUM('male', 'female', 'other'),
    address TEXT,
    contact_number VARCHAR(50),
    specialization VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (auth_id) REFERENCES auth_users(auth_id)
) ENGINE = InnoDB;
-- 3. refresh_tokens: JWT refresh handling
CREATE TABLE IF NOT EXISTS refresh_tokens (
    token_id INT AUTO_INCREMENT PRIMARY KEY,
    auth_id INT NOT NULL,
    refresh_token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    revoked BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (auth_id) REFERENCES auth_users(auth_id)
) ENGINE = InnoDB;
-- 4. appointments: patient-staff scheduling
CREATE TABLE IF NOT EXISTS appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT NOT NULL,
    staff_id INT NOT NULL,
    date_time DATETIME NOT NULL,
    visit_reason TEXT,
    status ENUM('scheduled', 'completed', 'cancelled') NOT NULL DEFAULT 'scheduled',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES auth_users(auth_id),
    FOREIGN KEY (staff_id) REFERENCES auth_users(auth_id)
) ENGINE = InnoDB;
-- 5. medical_records: clinical info
CREATE TABLE IF NOT EXISTS medical_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT NOT NULL,
    patient_id INT NOT NULL,
    staff_id INT NOT NULL,
    diagnosis TEXT,
    notes TEXT,
    prescribed_meds TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id),
    FOREIGN KEY (patient_id) REFERENCES auth_users(auth_id),
    FOREIGN KEY (staff_id) REFERENCES auth_users(auth_id)
) ENGINE = InnoDB;
-- 6. audit_log: track changes
CREATE TABLE IF NOT EXISTS audit_log (
    audit_id INT AUTO_INCREMENT PRIMARY KEY,
    actor_user_id INT NOT NULL,
    table_name VARCHAR(255) NOT NULL,
    record_id INT NOT NULL,
    action ENUM('INSERT', 'UPDATE', 'DELETE') NOT NULL,
    old_values JSON,
    new_values JSON,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (actor_user_id) REFERENCES auth_users(auth_id)
) ENGINE = InnoDB;