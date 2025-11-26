"use client";

import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-slate-800 relative">
      {/* Full-size black -> transparent gradient overlay (bottom -> top) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-linear-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Content container placed above the overlay; includes auth card wrapper */}
      <div className="relative z-10 w-full px-6 py-8">
        <div className="mx-auto w-full max-w-3xl">
          <div className="bg-white/95 rounded-xl shadow-lg backdrop-blur-sm mx-auto w-full sm:w-[90%] md:w-[60%] lg:w-[30vw]">
            <div className="p-8 pt-12">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
