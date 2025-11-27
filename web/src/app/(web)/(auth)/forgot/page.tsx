"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const ForgotPasswordPage = () => (
  <>
    <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">
      Forgot password
    </h1>
    <p className="text-sm text-slate-600 mb-6 max-w-xs text-center mx-auto">
      Enter your email to reset your password
    </p>

    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2">
        <input
          type="email"
          placeholder="you@email.com"
          className="flex-1 bg-transparent outline-none text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 text-lg rounded-2xl inline-flex items-center justify-center bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
      >
        Send reset link
      </button>

      <div className="mt-8 w-full flex">
        <a href="/login" className="text-sm text-slate-500 hover:underline ">
          <FontAwesomeIcon icon={faArrowLeft as IconProp} className="mr-4" />
          Back to login
        </a>
      </div>
    </form>
  </>
);

export default ForgotPasswordPage;
