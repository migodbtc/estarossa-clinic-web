"use client";

import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-200 text-slate-800">
      <div className="mx-auto w-full sm:w-[90vw] md:w-[60vw] lg:w-[30vw]">
        <div className="bg-white px-8 py-12 rounded-xl">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
