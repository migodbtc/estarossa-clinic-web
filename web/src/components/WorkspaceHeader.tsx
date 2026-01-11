import { useSidebar } from "@/contexts/WorkspaceSidebarContext";
import {
  faBars,
  faPhone,
  faCircleInfo,
  faSignOutAlt,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const LogoutModal = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />
      <div className="relative z-10 bg-white rounded-xl shadow-xl p-8 w-full max-w-sm animate-scale-in">
        <button
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 transition hover:cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>
        <div className="flex items-center gap-2 mb-2">
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="text-red-600 text-xl"
          />
          <span className="font-bold text-lg text-slate-900">Sign Out</span>
        </div>
        <p className="text-slate-600 text-sm mb-6">
          Are you sure you want to log out of your Estarossa workspace? You’ll
          need to log in again to access your dashboard.
        </p>
        <div className="flex justify-end">
          <button
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white font-semibold px-4 py-2 rounded-xl transition"
            onClick={onConfirm}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkspaceHeader = () => {
  const { toggle } = useSidebar();
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

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
    <>
      <header className="w-full bg-white shadow-sm h-[10vh] border-2 border-b-slate-200">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                aria-label="Toggle sidebar"
                onClick={toggle}
                className="inline-flex items-center justify-center w-10 h-10 rounded-md text-slate-500 hover:text-[#22c55e] hover:cursor-pointer"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <button
                aria-label="Telephone"
                title="Call"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md text-slate-400 hover:text-[#22c55e] hover:cursor-pointer"
              >
                <FontAwesomeIcon icon={faPhone} />
              </button>

              <button
                aria-label="Info"
                title="Info"
                className="inline-flex items-center justify-center w-10 h-10 rounded-md text-slate-400 hover:text-[#22c55e] hover:cursor-pointer"
              >
                <FontAwesomeIcon icon={faCircleInfo} />
              </button>

              <button
                aria-label="Sign out"
                title="Sign out"
                type="button"
                onClick={() => setShowLogout((prev) => !prev)}
                className="inline-flex items-center justify-center w-10 h-10 rounded-md text-red-300 hover:text-[#22c55e] hover:cursor-pointer"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
          </div>
        </div>
      </header>
      <LogoutModal
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={() => {
          setShowLogout(false);
          handleLogout();
        }}
      />
    </>
  );
};

export default WorkspaceHeader;
