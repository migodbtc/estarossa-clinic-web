// Primitive DB-related types derived from the SQL schema

export type Role = "patient" | "doctor" | "nurse" | "admin";
export type AppointmentStatus = "scheduled" | "completed" | "cancelled";
export type Sex = "male" | "female" | "other";
export type AuditAction = "INSERT" | "UPDATE" | "DELETE";

// Re-export any small helper types here in the future
