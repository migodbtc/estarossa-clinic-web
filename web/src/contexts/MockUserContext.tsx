"use client";
import React, { createContext, useContext, useState } from "react";
import { initialMockUser } from "@/constants/mock";
import type { AuthenticatedUser } from "@/types/models/user";

type MockUserContextValue = {
  user: AuthenticatedUser;
  setUser: (
    u:
      | Partial<AuthenticatedUser>
      | ((u: AuthenticatedUser) => AuthenticatedUser)
  ) => void;
};

const MockUserContext = createContext<MockUserContextValue | undefined>(
  undefined
);

export const MockUserProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUserState] = useState<AuthenticatedUser>(initialMockUser);

  const setUser = (
    u:
      | Partial<AuthenticatedUser>
      | ((u: AuthenticatedUser) => AuthenticatedUser)
  ) => {
    if (typeof u === "function") {
      setUserState((s) => ({
        ...s,
        ...(u as (u: AuthenticatedUser) => AuthenticatedUser)(s),
      }));
    } else {
      setUserState((s) => ({ ...s, ...u }));
    }
  };

  return (
    <MockUserContext.Provider value={{ user, setUser }}>
      {children}
    </MockUserContext.Provider>
  );
};

export const useMockUser = () => {
  const ctx = useContext(MockUserContext);
  if (!ctx) throw new Error("useMockUser must be used within MockUserProvider");
  return ctx;
};

// Optional variant that returns undefined when provider is not present.
export const useMockUserOptional = () => {
  return useContext(MockUserContext) as MockUserContextValue | undefined;
};

export default MockUserContext;
