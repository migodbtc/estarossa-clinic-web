"use client";

import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-auth-layout">
      <div className="w-full h-full flex items-center justify-center bg-slate-200/25 backdrop-blur-lg text-slate-800">
        <div className="mx-auto w-[30vw]">
          <div className="bg-white px-8 py-12 rounded-xl w-full mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
