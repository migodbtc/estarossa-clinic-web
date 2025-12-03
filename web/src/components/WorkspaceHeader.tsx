import { useSidebar } from "@/contexts/WorkspaceSidebarContext";
import {
  faBars,
  faPhone,
  faCircleInfo,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const WorkspaceHeader = () => {
  const { toggle } = useSidebar();

  return (
    <header className="w-full bg-white shadow-sm h-[10vh] border-2 border-b-slate-200">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle sidebar"
              onClick={toggle}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md text-slate-700 hover:bg-slate-100 hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              aria-label="Telephone"
              title="Call"
              className="inline-flex items-center justify-center w-10 h-10 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faPhone} />
            </button>

            <button
              aria-label="Info"
              title="Info"
              className="inline-flex items-center justify-center w-10 h-10 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faCircleInfo} />
            </button>

            <button
              aria-label="Sign out"
              title="Sign out"
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 rounded-md text-red-300 hover:text-red-600 hover:bg-red-50 hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WorkspaceHeader;
