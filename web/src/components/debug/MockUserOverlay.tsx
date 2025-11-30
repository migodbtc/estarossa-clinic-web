import { Role } from "@/types/db/enums";
import { AuthenticatedUser } from "@/types/custom";
import { useState } from "react";
import { initialMockUser } from "@/constants/mock";

const MockUserOverlay = () => {
  const [mockUser, setMockUser] = useState<AuthenticatedUser>(initialMockUser);
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-end flex-col-reverse gap-2">
        {overlayOpen ? (
          <div className="w-72 bg-white shadow-lg rounded p-3 text-sm text-slate-800">
            <div className="flex items-center justify-between mb-2">
              <strong>Mock User</strong>
              <button
                className="text-xs text-slate-500 hover:text-slate-700"
                onClick={() => setOverlayOpen(false)}
                aria-label="Close role editor"
              >
                Close
              </button>
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
          </div>
        ) : null}

        <button
          onClick={() => setOverlayOpen((v) => !v)}
          className="bg-slate-800 text-white px-3 py-2 rounded shadow-md"
          aria-label="Toggle mock user editor"
        >
          Edit Mock User
        </button>
      </div>
    </div>
  );
};

export default MockUserOverlay;
