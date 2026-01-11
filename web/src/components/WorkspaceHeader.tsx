import { useSidebar } from "@/contexts/WorkspaceSidebarContext";
import {
  faBars,
  faPhone,
  faCircleInfo,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const WorkspaceHeader = () => {
  const { toggle } = useSidebar();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (res.status === 401) {
        toast.info("You are already logged out.");
        setTimeout(() => {
          router.push("/login");
        }, 500);
        return;
      }

      if (!res.ok) {
        toast.error("Logout failed, please try again!");
      } else {
        toast.success("Logged out successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 500);
      }
    } catch (e) {
      toast.error("Network error occured during logout!");
    }
  };

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
              onClick={handleLogout}
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
