"use client";
import React from "react";
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
