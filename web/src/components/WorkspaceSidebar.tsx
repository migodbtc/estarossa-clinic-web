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
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";

type WorkspaceSidebarProps = {
  role?: Role;
};
type SidebarRow = Record<string, { href: string; label: string }[]>;

type SidebarLinkProps = {
  href: string;
  label: string;
  compact: boolean;
  isActive: boolean;
};

const ROLE_BUTTONS: Record<string, SidebarRow> = {
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

const getIconForLabel = (label: string) => {
  if (label.includes("Appoint")) {
    return faCalendarCheck;
  } else if (label.includes("Record") || label.includes("Medical")) {
    return faFileMedicalAlt;
  } else if (label.includes("Patient")) {
    return faUsers;
  } else if (label.includes("Users")) {
    return faUser;
  } else if (label.includes("Audits")) {
    return faClipboard;
  } else if (label.includes("DB")) {
    return faDatabase;
  } else if (label.includes("Profile")) {
    return faIdBadge;
  } else if (label.includes("Settings")) {
    return faCog;
  } else if (label.includes("Overview")) {
    return faListAlt;
  } else {
    return faClipboardList;
  }
};

const SidebarLink = React.memo(
  ({ href, label, compact = false, isActive = false }: SidebarLinkProps) => {
    const icon = getIconForLabel(label);
    const baseClass = compact
      ? "flex items-center gap-3 w-12 text-left px-3 py-2 rounded-xl text-white bg-slate-600 text-sm"
      : "flex items-center gap-3 w-full text-left px-3 py-2 rounded-xl bg-slate-600 hover:bg-slate-500 text-sm";
    const activeClass = isActive
      ? "border-2 border-slate-400 bg-slate-300"
      : "";

    if (compact) {
      return (
        <Link
          href={href}
          className={`${baseClass} ${activeClass}`}
          aria-label={label}
          aria-current={isActive ? "page" : undefined}
        >
          <span className="w-5 text-center">
            <FontAwesomeIcon icon={icon} />
          </span>
        </Link>
      );
    }
    return (
      <Link
        href={href}
        className={`${baseClass} ${activeClass}`}
        aria-label={label}
        aria-current={isActive ? "page" : undefined}
      >
        <span className="w-full text-left flex gap-3">
          <FontAwesomeIcon icon={icon} className="flex-1 m-auto" />
          <span className="flex-7">{label}</span>
        </span>
      </Link>
    );
  }
);

export default function WorkspaceSidebar({
  role = "patient" as Role,
}: WorkspaceSidebarProps) {
  const { open } = useSidebar();
  const pathname = usePathname() || "/";

  const sections = useMemo(() => {
    return ROLE_BUTTONS[role as string] ?? ROLE_BUTTONS["patient"];
  }, [role]);

  const cleanPathName = (p: string) =>
    p === "/" ? "/" : p.replace(/\/+$/, "");
  const currentPath = cleanPathName(pathname);

  const isLinkActive = (href: string, exact = true) => {
    const h = cleanPathName(href);
    if (exact) return currentPath === h;
    return (
      cleanPathName(href) === currentPath || currentPath.startsWith(href + "/")
    );
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

        <div className="w-full mt-3">
          <nav aria-label="Sidebar" className="space-y-4">
            {Object.entries(sections).map(([sectionTitle, items]) => (
              <div key={sectionTitle} className="mb-4">
                <div className="text-xs uppercase text-slate-300 font-semibold mb-2">
                  {open ? sectionTitle : `${sectionTitle.substring(0, 4)}...`}
                </div>
                <ul className="space-y-1">
                  {items.map((b) => (
                    <li key={b.href}>
                      <SidebarLink
                        href={b.href}
                        label={b.label}
                        compact={!open}
                        isActive={isLinkActive(b.href)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
