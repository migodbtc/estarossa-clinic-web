"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<{ role: string; email?: string } | null>(
    null
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) {
        router.push("/auth/login");
        return;
      }
      const u = JSON.parse(raw);
      setUser(u);
    } catch (err) {
      router.push("/auth/login");
    }
  }, []);

  function logout() {
    localStorage.removeItem("user");
    router.push("/landing");
  }

  const role = user?.role || "guest";

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100 shadow p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/landing"
            className="font-bold text-gray-900 dark:text-slate-100"
          >
            Clinic
          </Link>
          <span className="text-sm text-zinc-600 dark:text-slate-300">
            Role: {role}
          </span>
        </div>
        <nav className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/dashboard">Home</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/settings">Settings</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard/help">Help</Link>
          </Button>
          <Button onClick={logout} variant="destructive" size="sm">
            Logout
          </Button>
        </nav>
      </header>
      <div className="p-6">
        <div className="mb-4">
          <RoleNav role={role} />
        </div>
        <Card className="bg-white text-gray-900 dark:bg-slate-800 dark:text-slate-100">
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}

function RoleNav({ role }: { role: string }) {
  if (role === "patient") {
    return (
      <nav className="flex gap-2">
        <Button asChild size="sm">
          <Link href="/dashboard/patient/overview">My Overview</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard/patient/appointments">My Appointments</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard/patient/medical-records">
            My Medical Records
          </Link>
        </Button>
      </nav>
    );
  }
  if (role === "nurse" || role === "doctor") {
    return (
      <nav className="flex gap-2">
        <Button asChild size="sm">
          <Link href="/dashboard/general/overview">Overview</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard/general/appointments">Appointments</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard/general/medical-records">Medical Records</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard/general/patients">Patients</Link>
        </Button>
      </nav>
    );
  }
  if (role === "admin") {
    return (
      <nav className="flex gap-2 flex-wrap">
        <Button asChild size="sm">
          <Link href="/dashboard/admin/users">User Management</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard/admin/schema">Schema Blueprint</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard/admin/crud/appointments">
            Appointments (CRUD)
          </Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard/admin/crud/medical-records">
            Medical Records (CRUD)
          </Link>
        </Button>
      </nav>
    );
  }

  return <div />;
}
