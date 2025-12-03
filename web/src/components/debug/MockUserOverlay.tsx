import { Role } from "@/types/db/enums";
import React, { useState, useEffect } from "react";
import { initialMockUser } from "@/constants/mock";
import { AuthenticatedUser } from "@/types/models/user";
import { useMockUser } from "@/contexts/MockUserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const MockUserOverlay = () => {
  const { user: mockUserCtx, setUser } = useMockUser();
  const [mockUser, setMockUser] = useState<AuthenticatedUser>(mockUserCtx);
  const [overlayOpen, setOverlayOpen] = useState(false);

  // keep local edit state synced if provider changes externally
  useEffect(() => setMockUser(mockUserCtx), [mockUserCtx]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-end flex-col-reverse gap-2">
        {overlayOpen ? (
          <div className="w-72 bg-white border border-slate-200 text-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <strong>Mock User</strong>
            </div>

            <label className="block text-xs text-slate-600">Role</label>
            <select
              value={mockUser.role as string}
              onChange={(e) =>
                setMockUser((s) => ({ ...s, role: e.target.value as Role }))
              }
              className="w-full mb-2 rounded border px-2 py-1 text-sm border-none"
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
              className="w-full mb-2 rounded border px-2 py-1 text-sm border-none"
            />

            <label className="block text-xs text-slate-600">Contact</label>
            <input
              value={mockUser.contact_number || ""}
              onChange={(e) =>
                setMockUser((s) => ({
                  ...s,
                  contact_number: e.target.value,
                }))
              }
              className="w-full mb-2 rounded border px-2 py-1 text-sm border-none"
            />

            <div className="flex gap-2 mt-2">
              <button
                className="px-3 py-1 rounded bg-slate-600 text-white"
                onClick={() => {
                  // persist edits to the shared context so components re-render
                  setUser(mockUser);
                  setOverlayOpen(false);
                }}
              >
                Save
              </button>

              <button
                className="px-3 py-1 rounded bg-white border"
                onClick={() => {
                  setMockUser(mockUserCtx);
                  setOverlayOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}

        <button
          onClick={() => setOverlayOpen((v) => !v)}
          className="bg-white border border-slate-200 text-slate-800 px-4 py-2 rounded-xl text-sm hover:cursor-pointer"
          aria-label="Toggle mock user editor"
        >
          <FontAwesomeIcon icon={faEdit} /> {overlayOpen ? "Close" : "Edit"}{" "}
          Mock User
        </button>
      </div>
    </div>
  );
};

export default MockUserOverlay;
