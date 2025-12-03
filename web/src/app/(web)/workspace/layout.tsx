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
        <div className="min-h-screen flex">
          <WorkspaceSidebar />
          <div className="flex-1 flex flex-col">
            <WorkspaceHeader />
            <main className="flex-1 overflow-auto">
              <div className="w-full">
                <section className="flex-1">
                  <div className="w-full bg-white text-slate-900 p-6 flex flex-col overflow-auto min-h-[90vh]">
                    {children}
                  </div>
                </section>
              </div>
            </main>
          </div>

          <MockUserOverlay />
        </div>
      </SidebarProvider>
    </MockUserProvider>
  );
}
