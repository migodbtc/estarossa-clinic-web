"use client";
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
  faClipboard,
  faCog,
  faIdBadge,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import type { Role } from "@/types/db/enums";
import { useSidebar } from "@/contexts/WorkspaceSidebarContext";

type WorkspaceSidebarProps = {
  role?: Role;
};

export default function WorkspaceSidebar({
  role = "patient" as Role,
}: WorkspaceSidebarProps) {
  const { open } = useSidebar();

  // Sidebar rows
  type SidebarRow = Record<string, { href: string; label: string }[]>;

  const roleButtons: Record<string, SidebarRow> = {
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

  return (
    <aside
      className={`bg-slate-700 text-white rounded transition-width duration-200 ease-in-out overflow-hidden shrink-0 ${
        open ? "w-64" : "w-22"
      }`}
      style={{ minHeight: `100vh` }}
    >
      <div className="w-64 p-4 pt-4 flex flex-col items-start gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full bg-slate-500 flex items-center justify-center text-xl font-semibold ${
              open ? "" : "mx-auto"
            }`}
          >
            <FontAwesomeIcon icon={faUserMd} />
          </div>
          {open ? (
            <div>
              <div className="text-lg font-semibold">Estarossa</div>
            </div>
          ) : null}
        </div>

        {open ? (
          <div className="w-full mt-3">
            <nav aria-label="Sidebar" className="space-y-4">
              {Object.entries(roleButtons[role as string] || {}).map(
                ([sectionTitle, items]) => (
                  <div key={sectionTitle} className="mb-4">
                    <div className="text-xs uppercase text-slate-300 font-semibold mb-2">
                      {sectionTitle}
                    </div>
                    <ul className="space-y-1">
                      {items.map((b) => (
                        <li key={b.href}>
                          <Link
                            href={b.href}
                            className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-xl bg-slate-600 hover:bg-slate-500 text-sm"
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
                )
              )}
            </nav>
          </div>
        ) : (
          <div className="w-full mt-3">
            <nav aria-label="Sidebar" className="space-y-4">
              {Object.entries(roleButtons[role as string] || {}).map(
                ([sectionTitle, items]) => (
                  <div key={sectionTitle} className="mb-4">
                    <div className="text-xs uppercase text-slate-300 font-semibold mb-2">
                      {`${sectionTitle.substring(0, 4)}...`}
                    </div>
                    <ul className="space-y-1">
                      {items.map((b) => (
                        <li key={b.href}>
                          <Link
                            href={b.href}
                            className="flex items-center gap-3 w-12 text-left px-3 py-2 rounded-xl text-white bg-slate-600 text-sm"
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
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
}
