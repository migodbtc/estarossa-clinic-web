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
  faCog,
  faIdBadge,
  faClipboard,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import type {
  AuthUser,
  UserProfile,
  Appointment,
  MedicalRecord,
} from "@/types/db/tables";
import type { Role } from "@/types/db/enums";

export const WorkspaceLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
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

  const todaysAppointmentsForStaff = mockAppointments.filter((a) => {
    if (!a.date_time) return false;
    const d = new Date(a.date_time);
    const today = new Date();
    return (
      a.staff_id === mockUser.auth_id &&
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  });

  const recentActivity = [
    ...mockAppointments.map((a) => ({
      type: "appointment" as const,
      id: a.appointment_id,
      title: a.visit_reason || "Appointment",
      time: a.date_time,
    })),
    ...mockRecords.map((r) => ({
      type: "record" as const,
      id: r.record_id,
      title: r.diagnosis || "Medical record",
      time: r.created_at,
    })),
  ]
    .sort((x, y) => new Date(y.time).getTime() - new Date(x.time).getTime())
    .slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-black">
                Estarossa
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="pl-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                  aria-label="Sign out"
                >
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-12 gap-4 items-start">
            <aside className="col-span-12 sm:col-span-3 bg-slate-700 text-white p-4 pt-6 rounded min-h-[70vh] h-auto overflow-auto self-start">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-500 flex items-center justify-center text-xl font-semibold">
                    {initials(mockUser.full_name || mockUser.email)}
                  </div>
                  <div>
                    <div className="text-base font-semibold">
                      {mockUser.full_name || mockUser.email}
                    </div>
                    <div className="mt-1">
                      <span className="inline-flex items-center gap-2 text-xs bg-slate-600 text-white px-2 py-0.5 rounded">
                        <FontAwesomeIcon icon={faIdBadge} className="text-xs" />
                        <span className="font-medium">{mockUser.role}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full mt-3 space-y-4">
                  {Object.entries(
                    roleButtons[mockUser.role as unknown as string] || {}
                  ).map(([sectionTitle, items]) => (
                    <div key={sectionTitle}>
                      <div className="text-xs uppercase text-slate-300 font-semibold mb-2">
                        {sectionTitle}
                      </div>
                      <div className="space-y-2">
                        {items.map((b) => (
                          <Link
                            key={b.href}
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
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <section className="col-span-12 sm:col-span-6 px-6 flex">
              <div className="w-full bg-white text-slate-900 p-6 rounded flex flex-col overflow-auto min-h-[80vh]">
                {children}
              </div>
            </section>

            <aside className="col-span-12 sm:col-span-3 bg-slate-700 text-white p-4 pt-6 rounded min-h-[70vh] h-auto overflow-auto self-start">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {mockUser.role === "patient" && (
                    <>
                      <div className="bg-slate-600 p-3 rounded">
                        <div className="text-xs text-slate-300">Upcoming</div>
                        <div className="text-xl font-bold mt-1">0</div>
                        <div className="text-xs opacity-80">appointments</div>
                      </div>
                      <div className="bg-slate-600 p-3 rounded">
                        <div className="text-xs text-slate-300">Records</div>
                        <div className="text-xl font-bold mt-1">
                          {
                            mockRecords.filter(
                              (r) => r.patient_id === mockUser.auth_id
                            ).length
                          }
                        </div>
                        <div className="text-xs opacity-80">
                          medical records
                        </div>
                      </div>
                    </>
                  )}

                  {(mockUser.role === "doctor" ||
                    mockUser.role === "nurse") && (
                    <>
                      <div className="bg-slate-600 p-3 rounded">
                        <div className="text-xs text-slate-300">Today's</div>
                        <div className="text-xl font-bold mt-1">
                          {todaysAppointmentsForStaff.length}
                        </div>
                        <div className="text-xs opacity-80">appointments</div>
                      </div>
                      <div className="bg-slate-600 p-3 rounded">
                        <div className="text-xs text-slate-300">Assigned</div>
                        <div className="text-xl font-bold mt-1">
                          {
                            new Set(
                              mockAppointments
                                .filter((a) => a.staff_id === mockUser.auth_id)
                                .map((a) => a.patient_id)
                            ).size
                          }
                        </div>
                        <div className="text-xs opacity-80">patients</div>
                      </div>
                    </>
                  )}

                  {mockUser.role === "admin" && (
                    <>
                      <div className="bg-slate-600 p-3 rounded">
                        <div className="text-xs text-slate-300">Users</div>
                        <div className="text-xl font-bold mt-1">5</div>
                        <div className="text-xs opacity-80">total users</div>
                      </div>
                      <div className="bg-slate-600 p-3 rounded">
                        <div className="text-xs text-slate-300">
                          Appointments
                        </div>
                        <div className="text-xl font-bold mt-1">
                          {mockAppointments.length}
                        </div>
                        <div className="text-xs opacity-80">total</div>
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">Activity</div>
                  <div className="space-y-2">
                    {recentActivity.map((a) => (
                      <div
                        key={`${a.type}-${a.id}`}
                        className="bg-slate-600 p-2 rounded text-sm"
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{a.title}</div>
                          <div className="text-xs opacity-80">
                            {new Date(a.time).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-xs opacity-75 mt-1">
                          {a.type === "appointment" ? "Appointment" : "Record"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold mb-2">
                    Quick Actions
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-2 flex-wrap">
                      {(mockUser.role === "admin"
                        ? [
                            { href: "/workspace/users", label: "Users" },
                            { href: "/workspace/db", label: "DB Console" },
                          ]
                        : mockUser.role === "patient"
                        ? [
                            { href: "/workspace/records", label: "My Records" },
                            {
                              href: "/workspace/appointments",
                              label: "My Appointments",
                            },
                          ]
                        : [
                            {
                              href: "/workspace/appointments",
                              label: "Today's Appointments",
                            },
                            {
                              href: "/workspace/patients",
                              label: "Patient List",
                            },
                          ]
                      ).map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="bg-slate-600 px-3 py-1 rounded text-sm"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

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
                className="w-full mb-2 rounded border px-2 py-1 text-sm"
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
                className="w-full mb-2 rounded border px-2 py-1 text-sm"
              />

              <label className="block text-xs text-slate-600">Contact</label>
              <input
                value={mockUser.contact_number || ""}
                onChange={(e) =>
                  setMockUser((s) => ({ ...s, contact_number: e.target.value }))
                }
                className="w-full mb-2 rounded border px-2 py-1 text-sm"
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
};
