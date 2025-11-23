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
        Welcome{role ? `, ${role}` : ""} — this is the single dashboard route.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="rounded-lg border bg-white p-4 dark:bg-slate-800">
            <h3 className="font-semibold mb-2">Overview</h3>
            <p className="text-sm text-gray-700 dark:text-slate-200">
              Placeholder content area where you can render different modules
              based on role.
            </p>
          </div>
        </div>
        <aside>
          <div className="rounded-lg border bg-white p-4 dark:bg-slate-800">
            <h4 className="font-medium">Quick Actions</h4>
            <ul className="mt-2 text-sm text-gray-700 dark:text-slate-200">
              <li>• Action one</li>
              <li>• Action two</li>
              <li>• Action three</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
