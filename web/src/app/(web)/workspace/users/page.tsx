"use client";

import React, { useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import type { AuthUser } from "@/types/db/tables";
import WorkspaceTitle from "@/components/WorkspaceTitle";

const initialUsers: AuthUser[] = [
  {
    auth_id: 1,
    email: "alice@example.com",
    password_hash: "-",
    role: "admin",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as AuthUser,
  {
    auth_id: 2,
    email: "bob@example.com",
    password_hash: "-",
    role: "patient",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as AuthUser,
];

export default function Page() {
  const [users, setUsers] = useState<AuthUser[]>(initialUsers);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");

  function addUser() {
    const next: AuthUser = {
      auth_id: Date.now(),
      email,
      password_hash: "-",
      role: role as any,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as AuthUser;
    setUsers((s) => [next, ...s]);
    setEmail("");
    setRole("user");
    setOpen(false);
  }

  return (
    <section className="w-full h-[75vh] ">
      <WorkspaceTitle
        title="Users"
        subtext="Manage application users and roles."
        currentPage="Users"
        currentHref="/workspace/users"
      />
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Created</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.auth_id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {u.auth_id}
                  </td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{String(u.role)}</td>
                  <td className="px-4 py-2">
                    {new Date(u.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        color="gray"
                        onClick={() => alert(`Edit ${u.email}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        color="failure"
                        onClick={() =>
                          setUsers((s) =>
                            s.filter((x) => x.auth_id !== u.auth_id)
                          )
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal show={open} size="md" onClose={() => setOpen(false)}>
          <div className="bg-white rounded-lg shadow dark:bg-gray-50">
            <div className="flex items-start justify-between p-4 border-b rounded-t">
              <h3 className="text-lg font-semibold text-gray-900">
                Create User
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <TextInput
                  className="border-none"
                  value={email}
                  onChange={(e) =>
                    setEmail((e.target as HTMLInputElement).value)
                  }
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="flex items-center p-4 space-x-2 border-t rounded-b">
              <Button color="gray" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addUser}>Create</Button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
}
