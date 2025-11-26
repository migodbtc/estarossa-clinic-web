"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faArrowRight,
  faEnvelope,
  faLock,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faFacebookF,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import AuthLayout from "@/components/layouts/AuthLayout";

const Page = () => {
  return (
    <AuthLayout>
      {/* Big logo area (FortAwesome + arrow-to-door) */}
      <div className="flex flex-col items-center gap-3 mb-4">
        <FontAwesomeIcon
          icon={faRightToBracket as IconProp}
          size="2x"
          className="text-slate-900"
        />
      </div>

      <h1 className="text-2xl font-bold text-slate-900 mb-2 text-center">
        Login with email
      </h1>
      <p className="text-sm text-slate-600 mb-6 max-w-xs text-center mx-auto">
        Sign in your registered account to access the Estarossa dashboard
      </p>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Email row */}
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2">
          <FontAwesomeIcon
            icon={faEnvelope as IconProp}
            className="text-slate-500"
          />
          <input
            type="email"
            placeholder="Enter your email here..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        {/* Password row */}
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2">
          <FontAwesomeIcon
            icon={faLock as IconProp}
            className="text-slate-500"
          />
          <input
            type="password"
            placeholder="Enter your password..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>

        {/* Forgot password link */}
        <div className="text-right">
          <a href="/forgot" className="text-sm text-slate-500 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Large sign in button */}
        <button
          type="submit"
          className="w-full py-3 text-lg rounded-2xl inline-flex items-center justify-center bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mt-2 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="text-sm text-slate-500">Or sign in with</div>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* SSO buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-3 border border-gray-200 rounded-2xl px-4 py-2 bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
          >
            <FontAwesomeIcon
              icon={faGoogle as IconProp}
              className="text-red-500"
            />
            <span className="text-sm">Google</span>
          </button>

          <button
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-3 border border-gray-200 rounded-2xl px-4 py-2 bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
          >
            <FontAwesomeIcon
              icon={faFacebookF as IconProp}
              className="text-blue-600"
            />
            <span className="text-sm">Facebook</span>
          </button>

          <button
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-3 border border-gray-200 rounded-2xl px-4 py-2 bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
          >
            <FontAwesomeIcon
              icon={faTwitter as IconProp}
              className="text-sky-500"
            />
            <span className="text-sm">Twitter</span>
          </button>
        </div>

        {/* Minimal back anchor */}
        <div className="mt-8 w-full flex justify-between">
          <a href="/home" className="text-sm text-slate-500 hover:underline ">
            <FontAwesomeIcon icon={faArrowLeft as IconProp} className="mr-4" />
            Back to home
          </a>
          <a
            href="/register"
            className="text-sm text-slate-500 hover:underline "
          >
            Create an account
            <FontAwesomeIcon icon={faArrowRight as IconProp} className="ml-4" />
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Page;
