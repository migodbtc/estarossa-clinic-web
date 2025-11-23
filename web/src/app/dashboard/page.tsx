"use client";

import { useEffect, useState } from "react";

export default function DashboardHome() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const u = JSON.parse(raw);
        setRole(u.role);
      }
    } catch (err) {
      setRole(null);
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
      <p className="mb-4">
        Welcome{role ? `, ${role}` : ""} — choose a section from the nav.
      </p>
    </div>
  );
}
