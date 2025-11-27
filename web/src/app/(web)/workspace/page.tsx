"use client";
import React from "react";
import Link from "next/link";

const WorkspacePage: React.FC = () => {
  // Replace this mock with a real fetch from your auth API (e.g. web/src/lib/api/auth.ts)
  const mockUser = {
    email: "admin@example.com",
    role: "admin",
    full_name: "Site Admin",
    contact_number: "555-0100",
    specialization: "",
  };

  const roleButtons: Record<string, { href: string; label: string }[]> = {
    patient: [
      { href: "/workspace/appointments", label: "My Appointments" },
      { href: "/workspace/records", label: "My Records" },
      { href: "/workspace/profile", label: "Profile" },
    ],
    doctor: [
      { href: "/workspace/appointments", label: "Today's Appointments" },
      { href: "/workspace/patients", label: "Patient List" },
      { href: "/workspace/records/new", label: "Create Record" },
    ],
    nurse: [
      { href: "/workspace/appointments", label: "Today's Appointments" },
      { href: "/workspace/patients", label: "Patient List" },
    ],
    admin: [
      { href: "/workspace/users", label: "Users" },
      { href: "/workspace/audits", label: "Audits" },
      { href: "/workspace/db", label: "DB Console" },
    ],
  };

  // small helper to render avatar from initials
  const initials = (nameOrEmail: string) =>
    nameOrEmail
      .split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-black">
                Estarossa
              </span>
            </div>

            <div className="flex items-center space-x-3">
              {/* Secondary buttons (left of sign out) */}
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-slate-700 hover:bg-slate-100"
                aria-label="Info"
              >
                <i className="fa fa-info-circle" aria-hidden="true" />
                <span className="sr-only">Info</span>
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-slate-700 hover:bg-slate-100"
                aria-label="Contact"
              >
                <i className="fa fa-envelope" aria-hidden="true" />
                <span className="sr-only">Contact</span>
              </button>

              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-slate-700 hover:bg-slate-100"
                aria-label="Help"
              >
                <i className="fa fa-question-circle" aria-hidden="true" />
                <span className="sr-only">Help</span>
              </button>

              {/* Sign out on the far right */}
              <div className="pl-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                  aria-label="Sign out"
                >
                  <i className="fa fa-sign-out" aria-hidden="true" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main section */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-12 gap-4 items-start">
            {/* Left column (3) - user card + role buttons */}
            <aside className="col-span-12 sm:col-span-3 bg-slate-700 text-white p-4 rounded h-[70vh] overflow-auto self-start">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-500 flex items-center justify-center text-xl font-semibold">
                    {initials(mockUser.full_name || mockUser.email)}
                  </div>
                  <div>
                    <div className="text-base font-semibold">
                      {mockUser.full_name || mockUser.email}
                    </div>
                    <div className="text-sm opacity-90">{mockUser.role}</div>
                  </div>
                </div>

                {mockUser.specialization ? (
                  <div className="text-sm opacity-90">
                    {mockUser.specialization}
                  </div>
                ) : null}

                {mockUser.contact_number ? (
                  <div className="text-sm opacity-90">
                    {mockUser.contact_number}
                  </div>
                ) : null}

                <div className="w-full mt-3 space-y-2">
                  {(roleButtons[mockUser.role] || []).map((b) => (
                    <Link
                      key={b.href}
                      href={b.href}
                      className="block w-full text-left px-3 py-2 rounded bg-slate-600 hover:bg-slate-500 text-sm"
                      aria-label={b.label}
                    >
                      {b.label}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* Center column (6) - card grows to near bottom of viewport and scrolls when content overflows */}
            <section className="col-span-12 sm:col-span-6 px-6 flex">
              <div className="w-full bg-teal-500 text-white p-6 rounded flex flex-col overflow-auto min-h-[80vh]">
                <h2 className="text-2xl font-bold">Main Area</h2>
                <div className="mt-3">
                  <p>Primary content and workspace goes here.</p>
                  {/* Example long content placeholder to show scrolling behavior when content overflows */}
                  <div className="mt-4 space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <p key={i} className="text-sm opacity-90">
                        Example line {i + 1} — this demonstrates auto-scrolling
                        inside the main card when content grows taller than the
                        available space.
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Right column (3) - fixed height 70vh and scrollable if its content overflows */}
            <aside className="col-span-12 sm:col-span-3 bg-slate-700 text-white p-4 rounded h-[70vh] overflow-auto self-start">
              <h3 className="text-lg font-semibold">Right</h3>
              <p className="text-sm mt-2">Secondary content</p>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkspacePage;
