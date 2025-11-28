"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faClipboardList,
  faFileMedicalAlt,
  faUser,
  faUsers,
  faDatabase,
  faUserMd,
  faPhone,
  faCircleInfo,
  faSignOutAlt,
  faCog,
  faIdBadge,
  faClipboard,
  faBars,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import type {
  AuthUser,
  UserProfile,
  Appointment,
  MedicalRecord,
} from "@/types/db/tables";
import type { Role } from "@/types/db/enums";

export default function Layout({ children }: { children: React.ReactNode }) {
  const initialMockUser: AuthUser & Partial<UserProfile> = {
    auth_id: 1,
    email: "admin@example.com",
    password_hash: "",
    role: "admin" as Role,
    // avoid generating dates during render (SSR/client mismatch)
    created_at: "",
    updated_at: "",

    profile_id: 1,
    full_name: "Site Admin",
    birthdate: null,
    sex: null,
    address: null,
    contact_number: "555-0100",
    specialization: "",
  };
  const [mockUser, setMockUser] = useState<AuthUser & Partial<UserProfile>>(
    initialMockUser
  );
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // populate mock lists and timestamps on client only to avoid
  // SSR <-> client hydration differences caused by Date.now()/toLocaleString
  const [mockAppointments, setMockAppointments] = useState<Appointment[]>([]);
  const [mockRecords, setMockRecords] = useState<MedicalRecord[]>([]);

  React.useEffect(() => {
    const now = new Date().toISOString();
    setMockUser((s) => ({ ...s, created_at: now, updated_at: now }));

    const appointments: Appointment[] = [
      {
        appointment_id: 7,
        patient_id: 1,
        staff_id: 2,
        date_time: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        visit_reason: "Checkup",
        status: "scheduled",
        created_at: now,
        updated_at: now,
      },
    ];

    const records: MedicalRecord[] = [
      {
        record_id: 1,
        appointment_id: 7,
        patient_id: 1,
        staff_id: 2,
        diagnosis: "Healthy",
        notes: "All good",
        prescribed_meds: null,
        created_at: now,
        updated_at: now,
      },
    ];

    setMockAppointments(appointments);
    setMockRecords(records);
  }, []);

  const roleButtons: Record<
    string,
    Record<string, { href: string; label: string }[]>
  > = {
    patient: {
      Dashboard: [{ href: "/workspace/overview", label: "Overview" }],
      Workspace: [
        { href: "/workspace/appointments", label: "My Appointments" },
        { href: "/workspace/records", label: "My Medical Records" },
      ],
      Miscellaneous: [
        { href: "/workspace/profile", label: "Profile" },
        { href: "/workspace/settings", label: "Settings" },
      ],
    },
    doctor: {
      Dashboard: [{ href: "/workspace/overview", label: "Overview" }],
      Workspace: [
        { href: "/workspace/appointments", label: "Today's Appointments" },
        { href: "/workspace/patients", label: "Patient List" },
        { href: "/workspace/records", label: "Records" },
      ],
      Miscellaneous: [
        { href: "/workspace/profile", label: "Profile" },
        { href: "/workspace/settings", label: "Settings" },
      ],
    },
    nurse: {
      Dashboard: [{ href: "/workspace/overview", label: "Overview" }],
      Workspace: [
        { href: "/workspace/appointments", label: "Today's Appointments" },
        { href: "/workspace/patients", label: "Patient List" },
        { href: "/workspace/records", label: "Records" },
      ],
      Miscellaneous: [
        { href: "/workspace/profile", label: "Profile" },
        { href: "/workspace/settings", label: "Settings" },
      ],
    },
    admin: {
      Dashboard: [{ href: "/workspace/overview", label: "Overview" }],
      Workspace: [
        { href: "/workspace/users", label: "Users" },
        { href: "/workspace/audits", label: "Audits" },
        { href: "/workspace/db", label: "DB Console" },
      ],
      Miscellaneous: [
        { href: "/workspace/profile", label: "Profile" },
        { href: "/workspace/settings", label: "Settings" },
      ],
    },
  };

  const initials = (nameOrEmail?: string) => {
    const source = nameOrEmail || mockUser.email || "";
    return source
      .split(" ")
      .filter(Boolean)
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // assemble mock users and role-aware recent changes for right column
  const [mockUsers, setMockUsers] = useState<AuthUser[]>([]);

  React.useEffect(() => {
    // add some mock users (one is the current mockUser)
    const now = new Date().toISOString();
    setMockUsers([
      {
        auth_id: 1,
        email: "admin@example.com",
        password_hash: "",
        role: "admin" as Role,
        created_at: now,
        updated_at: now,
      },
      {
        auth_id: 2,
        email: "jane.patient@example.com",
        password_hash: "",
        role: "patient" as Role,
        created_at: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 2
        ).toISOString(),
        updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        auth_id: 3,
        email: "dr.smith@example.com",
        password_hash: "",
        role: "doctor" as Role,
        created_at: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 5
        ).toISOString(),
        updated_at: new Date(
          Date.now() - 1000 * 60 * 60 * 24 * 1
        ).toISOString(),
      },
    ]);
  }, []);

  type ActivityItem = {
    type: "appointment" | "record" | "user";
    id: number;
    title: string;
    time: string;
    patient_id?: number | null;
    staff_id?: number | null;
  };

  const activityItems: ActivityItem[] = [
    ...mockAppointments.map((a) => ({
      type: "appointment" as const,
      id: a.appointment_id,
      title: a.visit_reason || "Appointment",
      time: a.date_time || "",
      patient_id: a.patient_id,
      staff_id: a.staff_id,
    })),
    ...mockRecords.map((r) => ({
      type: "record" as const,
      id: r.record_id,
      title: r.diagnosis || "Medical record",
      time: r.created_at || "",
      patient_id: r.patient_id,
      staff_id: r.staff_id,
    })),
    ...mockUsers.map((u) => ({
      type: "user" as const,
      id: u.auth_id,
      title: u.email || `user-${u.auth_id}`,
      time: u.updated_at || u.created_at || "",
    })),
  ]
    .filter((it) => it.time)
    .sort((x, y) => new Date(y.time).getTime() - new Date(x.time).getTime());

  const activityForRole: ActivityItem[] = ((): ActivityItem[] => {
    if (mockUser.role === "patient") {
      return activityItems.filter(
        (it) => it.type !== "user" && it.patient_id === mockUser.auth_id
      );
    }
    if (mockUser.role === "doctor" || mockUser.role === "nurse") {
      return activityItems.filter(
        (it) => it.type === "appointment" || it.type === "record"
      );
    }
    // admin: include user changes + appointments + records
    return activityItems.filter(
      (it) =>
        it.type === "user" || it.type === "appointment" || it.type === "record"
    );
  })().slice(0, 8);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar (outside group) */}
      <aside
        className={`bg-slate-700 text-white rounded transition-width duration-200 ease-in-out overflow-hidden shrink-0 ${
          sidebarOpen ? "w-64" : "w-22"
        }`}
        style={{ minHeight: `100vh` }}
      >
        <div className="w-64 p-4 pt-4 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full bg-slate-500 flex items-center justify-center text-xl font-semibold ${
                sidebarOpen ? "" : "mx-auto"
              }`}
            >
              <FontAwesomeIcon icon={faUserMd} />
            </div>
            {sidebarOpen ? (
              <div>
                <div className="text-lg font-semibold">Estarossa</div>
              </div>
            ) : null}
          </div>

          {sidebarOpen ? (
            <div className="w-full mt-3">
              <nav aria-label="Sidebar" className="space-y-4">
                {Object.entries(
                  roleButtons[mockUser.role as unknown as string] || {}
                ).map(([sectionTitle, items]) => (
                  <div key={sectionTitle} className="mb-4">
                    <div className="text-xs uppercase text-slate-300 font-semibold mb-2">
                      {sectionTitle}
                    </div>
                    <ul className="space-y-1">
                      {items.map((b) => (
                        <li key={b.href}>
                          <Link
                            href={b.href}
                            className="flex items-center gap-3 w-full text-left px-3 py-2 rounded bg-slate-600 hover:bg-slate-500 text-sm"
                            aria-label={b.label}
                          >
                            <span className="w-5 text-center">
                              {b.label.includes("Appoint") ? (
                                <FontAwesomeIcon icon={faCalendarCheck} />
                              ) : b.label.includes("Record") ||
                                b.label.includes("Medical") ? (
                                <FontAwesomeIcon icon={faFileMedicalAlt} />
                              ) : b.label.includes("Patient") ? (
                                <FontAwesomeIcon icon={faUsers} />
                              ) : b.label.includes("Users") ? (
                                <FontAwesomeIcon icon={faUser} />
                              ) : b.label.includes("Audits") ? (
                                <FontAwesomeIcon icon={faClipboard} />
                              ) : b.label.includes("DB") ? (
                                <FontAwesomeIcon icon={faDatabase} />
                              ) : b.label.includes("Profile") ? (
                                <FontAwesomeIcon icon={faIdBadge} />
                              ) : b.label.includes("Settings") ? (
                                <FontAwesomeIcon icon={faCog} />
                              ) : b.label.includes("Overview") ? (
                                <FontAwesomeIcon icon={faListAlt} />
                              ) : (
                                <FontAwesomeIcon icon={faClipboardList} />
                              )}
                            </span>
                            <span>{b.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          ) : null}
        </div>
      </aside>

      {/* Right column: header + main grouped */}
      <div className="flex-1 flex flex-col">
        <header className="w-full bg-white shadow-sm h-[10vh] border-2 border-b-slate-200">
          <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <button
                  aria-label="Toggle sidebar"
                  onClick={() => setSidebarOpen((s) => !s)}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-md text-slate-700 hover:bg-slate-100"
                >
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  aria-label="Telephone"
                  title="Call"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <FontAwesomeIcon icon={faPhone} />
                </button>

                <button
                  aria-label="Info"
                  title="Info"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <FontAwesomeIcon icon={faCircleInfo} />
                </button>

                <button
                  aria-label="Sign out"
                  title="Sign out"
                  type="button"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-md text-red-300 hover:text-red-600 hover:bg-red-50"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="w-full">
            {/* Main content */}
            <section className="flex-1">
              <div className="w-full bg-white text-slate-900 p-6 flex flex-col overflow-auto min-h-[90vh]">
                {children}
              </div>
            </section>
          </div>
        </main>
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex items-end flex-col-reverse gap-2">
          {overlayOpen ? (
            <div className="w-72 bg-white shadow-lg rounded p-3 text-sm text-slate-800">
              <div className="flex items-center justify-between mb-2">
                <strong>Mock User</strong>
                <button
                  className="text-xs text-slate-500 hover:text-slate-700"
                  onClick={() => setOverlayOpen(false)}
                  aria-label="Close role editor"
                >
                  Close
                </button>
              </div>

              <label className="block text-xs text-slate-600">Role</label>
              <select
                value={mockUser.role as string}
                onChange={(e) =>
                  setMockUser((s) => ({ ...s, role: e.target.value as Role }))
                }
                className="w-full mb-2 rounded border px-2 py-1 text-sm border-none"
              >
                <option value="patient">patient</option>
                <option value="doctor">doctor</option>
                <option value="nurse">nurse</option>
                <option value="admin">admin</option>
              </select>

              <label className="block text-xs text-slate-600">Name</label>
              <input
                value={mockUser.full_name || ""}
                onChange={(e) =>
                  setMockUser((s) => ({ ...s, full_name: e.target.value }))
                }
                className="w-full mb-2 rounded border px-2 py-1 text-sm border-none"
              />

              <label className="block text-xs text-slate-600">Contact</label>
              <input
                value={mockUser.contact_number || ""}
                onChange={(e) =>
                  setMockUser((s) => ({ ...s, contact_number: e.target.value }))
                }
                className="w-full mb-2 rounded border px-2 py-1 text-sm border-none"
              />
            </div>
          ) : null}

          <button
            onClick={() => setOverlayOpen((v) => !v)}
            className="bg-slate-800 text-white px-3 py-2 rounded shadow-md"
            aria-label="Toggle mock user editor"
          >
            Edit Mock User
          </button>
        </div>
      </div>
    </div>
  );
}
