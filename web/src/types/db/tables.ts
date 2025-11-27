import type {
  Role,
  AppointmentStatus,
  Sex,
  AuditAction,
} from "@/types/db/enums";

export interface AuthUser {
  auth_id: number;
  email: string;
  password_hash: string;
  role: Role;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export interface UserProfile {
  profile_id: number;
  auth_id: number;
  full_name: string;
  birthdate?: string | null; // YYYY-MM-DD
  sex?: Sex | null;
  address?: string | null;
  contact_number?: string | null;
  specialization?: string | null; // for staff
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

export interface Appointment {
  appointment_id: number;
  patient_id?: number | null;
  staff_id?: number | null;
  date_time: string; // ISO datetime
  visit_reason?: string | null;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
}

export interface MedicalRecord {
  record_id: number;
  appointment_id: number;
  patient_id: number;
  staff_id: number;
  diagnosis?: string | null;
  notes?: string | null;
  prescribed_meds?: string | null;
  created_at: string;
  updated_at: string;
}

export interface RefreshToken {
  token_id: number;
  auth_id: number;
  refresh_token: string;
  expires_at: string; // ISO datetime
  revoked: boolean;
  created_at: string;
}

export interface AuditLog {
  audit_id: number;
  actor_user_id: number;
  table_name: string;
  record_id: number;
  action: AuditAction;
  old_values?: Record<string, any> | null; // JSON column
  new_values?: Record<string, any> | null; // JSON column
  timestamp: string; // ISO datetime
}
