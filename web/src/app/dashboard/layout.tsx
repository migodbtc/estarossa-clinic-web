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
      <header className="bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100 shadow p-4">
        <div className="container mx-auto flex items-center justify-between">
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
          <div className="flex items-center gap-3">
            <Button asChild size="sm">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button onClick={logout} variant="destructive" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto grid grid-cols-[240px_1fr] gap-6 p-6">
        <aside aria-label="Sidebar" className="rounded-lg">
          <Card className="bg-white text-gray-900 dark:bg-slate-800 dark:text-slate-100 h-full">
            <CardHeader>
              <CardTitle className="text-lg">Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <RoleNav role={role} />
            </CardContent>
          </Card>
        </aside>

        <main aria-label="Main content">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              Placeholder dashboard. All subroutes redirect here.
            </p>
          </div>
          <Card className="bg-white text-gray-900 dark:bg-slate-800 dark:text-slate-100">
            <CardContent>{children}</CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

function RoleNav({ role }: { role: string }) {
  if (role === "patient") {
    return (
      <nav className="flex flex-col gap-2">
        <Button asChild size="sm">
          <Link href="/dashboard">My Overview</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard">My Appointments</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard">My Medical Records</Link>
        </Button>
      </nav>
    );
  }
  if (role === "nurse" || role === "doctor") {
    return (
      <nav className="flex flex-col gap-2">
        <Button asChild size="sm">
          <Link href="/dashboard">Overview</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard">Appointments</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard">Medical Records</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard">Patients</Link>
        </Button>
      </nav>
    );
  }
  if (role === "admin") {
    return (
      <nav className="flex flex-col gap-2">
        <Button asChild size="sm">
          <Link href="/dashboard">User Management</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard">Schema Blueprint</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard">Appointments (CRUD)</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/dashboard">Medical Records (CRUD)</Link>
        </Button>
      </nav>
    );
  }

  return <div />;
}
