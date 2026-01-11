"use client";

import SexBadge from "@/components/ui/SexBadge";
import WorkspaceTitle from "@/components/WorkspaceTitle";
import { mockPatients } from "@/constants/mock";
import { useMockUser } from "@/contexts/MockUserContext";
import { Role } from "@/types/db/enums";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
  faBirthdayCake,
  faEllipsisH,
  faIdBadge,
  faMagnifyingGlass,
  faMapMarkerAlt,
  faPhone,
  faUser,
  faUserMd,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Page() {
  const { user: mockUserCtx } = useMockUser();
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  const totalEntries = mockPatients.length;
  const totalPages = Math.ceil(totalEntries / entries);

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
      {/* Main table */}
      <div className="w-full overflow-x-auto ">
        <table className="min-w-[900px] w-full text-left">
          <thead>
            <tr className="text-slate-400 text-xs font-semibold border-b-2 border-slate-200">
              <th className="px-4 py-3">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Name
              </th>
              <th className="px-4 py-3">
                <FontAwesomeIcon icon={faBirthdayCake} className="mr-2" />
                Birthdate
              </th>
              <th className="px-4 py-3">
                <FontAwesomeIcon icon={faVenusMars} className="mr-2" />
                Sex
              </th>
              <th className="px-4 py-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                Address
              </th>
              <th className="px-4 py-3">
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Contact
              </th>
              <th className="px-4 py-3">
                <FontAwesomeIcon icon={faEllipsisH} className="mr-2" />
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mockPatients.slice(0, entries).map((p) => (
              <tr
                key={p.profile_id}
                className="bg-white even:bg-slate-50 text-sm text-slate-700"
              >
                <td className="px-4 py-2">{p.full_name}</td>
                <td className="px-4 py-2">{p.birthdate}</td>
                <td className="px-4 py-2">
                  <SexBadge sex={p.sex} />
                </td>
                <td className="px-4 py-2">{p.address}</td>
                <td className="px-4 py-2">{p.contact_number}</td>
                <td className="px-4 py-2 text-center">
                  <button className="p-2 rounded-full hover:bg-slate-200 transition hover:cursor-pointer">
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Table controls + details */}
      {/* Pagination row */}
      <div className="flex w-full justify-between items-center mt-2 px-2">
        {/* Displaying count */}
        <div className="text-slate-500 text-sm font-medium">
          Displaying {Math.min(entries, totalEntries)} out of {totalEntries}
        </div>
        {/* Pagination controls */}
        <div className="flex items-center gap-2">
          <button
            className="rounded-xl  text-slate-500 px-3 py-1 transition hover:bg-slate-200 hover:text-slate-700 hover:cursor-pointer font-semibold"
            onClick={() => setPage(1)}
            disabled={page === 1}
            aria-label="First page"
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button>
          <button
            className="rounded-xl  text-slate-500 px-3 py-1 transition hover:bg-slate-200 hover:text-slate-700 hover:cursor-pointer font-semibold"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <span className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm">
            {page}
          </span>
          <button
            className="rounded-xl  text-slate-500 px-3 py-1 transition hover:bg-slate-200 hover:text-slate-700 hover:cursor-pointer font-semibold"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button
            className="rounded-xl  text-slate-500 px-3 py-1 transition hover:bg-slate-200 hover:text-slate-700 hover:cursor-pointer font-semibold"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            aria-label="Last page"
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </button>
        </div>
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
    <section className="w-full min-h-[75vh]">
      <WorkspaceTitle
        title="Patients"
        subtext="Patient directory and quick view."
        currentPage="Patients"
        currentHref="/workspace/patients"
      />
      <main className="flex-1 p-2 row h-auto pb-16">
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
