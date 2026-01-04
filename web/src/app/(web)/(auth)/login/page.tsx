"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  faArrowLeft,
  faArrowRight,
  faEnvelope,
  faLock,
  faRightToBracket,
  faSignIn,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faFacebookF,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { toast } from "sonner";
// Layout is provided by the route `app/(web)/(auth)/layout.tsx` so don't import it here

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // email & password must be something
    if (!(email && password)) {
      toast.error("Please enter both username and password!");
      return;
    }

    toast.success(
      "Login form has been submitted! Please wait for a few seconds for registration to be complete..."
    );

    const form = { email: email, password: password };

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // Try to show the most specific error message possible
        toast.error(
          data.message ||
            data.error?.message ||
            "Login failed. Please try again."
        );
        return;
      } else {
        toast.success(data.message || "Registration successful!");
        // setTimeout(() => {
        //   router.push("/login");
        // }, 2000);
      }
    } catch (err) {
      toast.error("Network or server error. Please try again.");
      console.error("Login fetch error:", err);
    }
  };

  return (
    <>
      <h1 className="text-lg font-bold text-slate-900 text-center">
        <FontAwesomeIcon icon={faSignIn} className="text-[#22c55e] mr-3" />
        Login with Email
      </h1>
      <p className="text-xs text-slate-600 mb-6 max-w-2xs text-center mx-auto">
        Sign in your registered account to access the Estarossa dashboard
      </p>

      <form className="space-y-2" onSubmit={handleSubmit}>
        {/* Email row */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1">
          <FontAwesomeIcon
            icon={faEnvelope as IconProp}
            className="text-slate-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Enter your email here..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent outline-none text-xs border-none"
            autoComplete="email"
            required
          />
        </div>

        {/* Password row */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1">
          <FontAwesomeIcon
            icon={faLock as IconProp}
            className="text-slate-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 bg-transparent outline-none text-xs border-none"
            autoComplete="current-password"
            required
          />
        </div>

        {/* Forgot password link */}
        <div className="text-right">
          <a
            href="/forgot"
            className="text-xs text-slate-500 hover:underline mb-2"
          >
            Forgot password?
          </a>
        </div>

        {/* Large sign in button */}
        <button
          type="submit"
          className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-1 bg-green-400 text-white text-lg font-semibold hover:bg-green-300 hover:scale-105 hover:cursor-pointer
          transition disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          <FontAwesomeIcon
            icon={faRightToBracket}
            className="w-4 h-4 text-white "
          />{" "}
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mt-2 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="text-xs text-slate-500">Or sign in with</div>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* SSO buttons */}
        <div className="flex flex-row gap-2">
          <button
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-3 border border-gray-200 rounded-2xl px-4 py-2 bg-transparent hover:bg-gray-50 focus:outline-none transform hover:scale-105 hover:cursor-pointer  focus:ring-2 focus:ring-indigo-100 transition"
          >
            <FontAwesomeIcon
              icon={faGoogle as IconProp}
              className="text-red-500"
            />
            <span className="text-xs">Google</span>
          </button>

          <button
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-3 border border-gray-200 rounded-2xl px-4 py-2 bg-transparent hover:bg-gray-50 focus:outline-none transform hover:scale-105 hover:cursor-pointer  focus:ring-2 focus:ring-indigo-100 transition"
          >
            <FontAwesomeIcon
              icon={faFacebookF as IconProp}
              className="text-blue-600"
            />
            <span className="text-xs">Facebook</span>
          </button>

          <button
            type="button"
            className="flex-1 inline-flex items-center justify-center gap-3 border border-gray-200 rounded-2xl px-4 py-2 bg-transparent hover:bg-gray-50 focus:outline-none transform hover:scale-105 hover:cursor-pointer focus:ring-2 focus:ring-indigo-100 transition"
          >
            <FontAwesomeIcon
              icon={faTwitter as IconProp}
              className="text-sky-500"
            />
            <span className="text-xs">Twitter</span>
          </button>
        </div>

        {/* Minimal back anchor */}
        <div className="mt-8 w-full flex justify-between">
          <a href="/home" className="text-xs text-slate-500 hover:underline ">
            <FontAwesomeIcon icon={faArrowLeft as IconProp} className="mr-4" />
            Back to home
          </a>
          <a
            href="/register"
            className="text-xs text-slate-500 hover:underline "
          >
            Create an account
            <FontAwesomeIcon icon={faArrowRight as IconProp} className="ml-4" />
          </a>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
