"use client";

import WorkspaceTitle from "@/components/WorkspaceTitle";
import { useMockUser } from "@/contexts/MockUserContext";
import { Role } from "@/types/db/enums";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Page() {
  const { user: mockUserCtx } = useMockUser();
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);

  const DoctorPatients = () => (
    <div className="w-full">
      {/* Row with search, entries, and button */}
      <div className="flex gap-4 w-full mb-6">
        {/* Search bar (60%) */}
        <div className="flex items-center bg-slate-200 rounded-xl px-4 py-2 w-[80%]">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-slate-500 mr-2"
          />
          <input
            type="text"
            className="bg-transparent outline-none flex-1 text-sm p-0 border-none text-slate-500"
            placeholder="Search patient name here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Number of entries (20%) */}
        <div className="flex items-center justify-center w-[10%]">
          <select
            className="w-full rounded-xl bg-slate-200 text-slate-600 text-sm font-medium px-4 py-2 outline-none border-none hover:cursor-pointer "
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
          >
            <option value={5}>5 entries</option>
            <option value={10}>10 entries</option>
            <option value={20}>20 entries</option>
            <option value={50}>50 entries</option>
          </select>
        </div>
        {/* Search button (20%) */}
        <div className="flex items-center justify-end w-[10%]">
          <button
            className="rounded-xl bg-[#22c55e] text-white font-semibold px-4 py-2 transition hover:bg-emerald-700 hover:cursor-pointer"
            onClick={() => {
              /* handle search here if needed */
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2" />
            Search
          </button>
        </div>
      </div>
      {/* ...rest of DoctorPatients content... */}
      <div className="bg-white rounded-xl shadow p-4">
        <p>Here you can view and manage your assigned patients.</p>
      </div>
    </div>
  );
  const NursePatients = () => (
    <div>
      <div className="bg-white rounded-xl shadow p-4">
        {/* Replace with actual patient list for nurses */}
        <p>Here you can view and assist with patient care.</p>
      </div>
    </div>
  );

  const AdminView = () => (
    <div>
      <div className="bg-white rounded-xl shadow p-4">
        {/* Replace with actual admin patient management */}
        <p>Admins can manage all patient records here.</p>
      </div>
    </div>
  );

  return (
    <section className="w-full h-[75vh]">
      <WorkspaceTitle
        title="Patients"
        subtext="Patient directory and quick view."
        currentPage="Patients"
        currentHref="/workspace/patients"
      />
      <main className="flex-1 p-2 row h-auto">
        {mockUserCtx.role === ("doctor" as Role) ? (
          <DoctorPatients />
        ) : mockUserCtx.role === ("nurse" as Role) ? (
          <NursePatients />
        ) : mockUserCtx.role === ("admin" as Role) ? (
          <AdminView />
        ) : (
          <div>Unknown role!</div>
        )}
      </main>
    </section>
  );
}
