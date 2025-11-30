import { createContext, useContext, useState } from "react";

type SidebarContextValue = {
  open: boolean;
  toggle: () => void;
  close: () => void;
  isOpen: () => boolean;
  setOpen: (v: boolean) => void;
};

const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
);

export const SidebarProvider = ({
  children,
  initialOpen = true,
}: {
  children: React.ReactNode;
  initialOpen?: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(initialOpen);

  const value: SidebarContextValue = {
    open,
    toggle: () => setOpen((s) => !s),
    close: () => setOpen(false),
    isOpen: () => open,
    setOpen,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return ctx;
};
