"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faCircleInfo,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import type {
  AuthUser,
  UserProfile,
  Appointment,
  MedicalRecord,
} from "@/types/db/tables";
import type { Role } from "@/types/db/enums";
import { SidebarProvider } from "@/contexts/WorkspaceSidebarContext";
import { MockUserProvider } from "@/contexts/MockUserContext";
import WorkspaceSidebar from "@/components/WorkspaceSidebar";
import WorkspaceHeader from "@/components/WorkspaceHeader";
import MockUserOverlay from "@/components/debug/MockUserOverlay";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MockUserProvider>
      <SidebarProvider initialOpen={true}>
        <div className="min-h-screen flex bg-white">
          <WorkspaceSidebar />
          <div className="flex-1 flex flex-col overflow-auto">
            <WorkspaceHeader />
            <main className="w-full flex-1 pb-4 bg-white">
              <div className="w-full h-auto text-slate-900 p-6">{children}</div>
            </main>
          </div>

          <MockUserOverlay />
        </div>
      </SidebarProvider>
    </MockUserProvider>
  );
}
