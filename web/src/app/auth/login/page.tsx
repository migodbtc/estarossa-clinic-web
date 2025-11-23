"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");

  function doLogin(e: React.FormEvent) {
    e.preventDefault();
    // Mock login: store user in localStorage for guard
    const user = { email: email || `${role}@example.com`, role };
    localStorage.setItem("user", JSON.stringify(user));
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <Card className="w-full max-w-md bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-slate-100">
            Login (mock)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={doLogin} className="space-y-4">
            <div>
              <label className="block mb-2 text-gray-800 dark:text-slate-200">
                Email
              </label>
              <Input
                className="bg-white text-gray-900 dark:bg-slate-800 dark:text-slate-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-800 dark:text-slate-200">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mb-2 p-2 border rounded bg-white text-gray-900 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="patient">Patient</option>
                <option value="nurse">Nurse</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Login</Button>
              <Button variant="ghost" asChild>
                <a href="/landing">Cancel</a>
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
