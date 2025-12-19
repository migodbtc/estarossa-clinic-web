"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faEnvelope,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
const ForgotPasswordPage = () => (
  <>
    <h1 className="text-lg font-bold text-slate-900 mb-1 text-center">
      <FontAwesomeIcon
        icon={faQuestion as IconProp}
        className="text-[#22c55e] mr-3"
      />
      Forgot password
    </h1>
    <p className="text-sm text-slate-600 mb-6 max-w-xs text-center mx-auto">
      Enter your email to reset your password
    </p>

    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1">
        <FontAwesomeIcon
          icon={faEnvelope as IconProp}
          className="text-slate-500"
        />
        <input
          type="email"
          placeholder="you@email.com"
          className="flex-1 bg-transparent outline-none text-xs border-none"
        />
      </div>

      <button
        type="submit"
        className={`w-full inline-flex justify-center items-center gap-2 rounded-xl px-4 py-2 bg-green-400 text-white text-md font-semibold hover:bg-green-300 hover:scale-105 hover:cursor-pointer transition disabled:opacity-60 disabled:cursor-not-allowed`}
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
