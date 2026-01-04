"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faArrowRight,
  faBirthdayCake,
  faEnvelope,
  faHourglassHalf,
  faIdBadge,
  faLocationDot,
  faLock,
  faPencil,
  faPhoneAlt,
  faQuestion,
  faRightToBracket,
  faUserEdit,
  faUserPlus,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faFacebookF,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { toast } from "sonner";

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthdate: "",
    sex: "",
    address: "",
    contactNumber: "",
    agreePrivacy: false,
    agreeTerms: false,
  }); // centralized form state object

  // helper func for form state var
  const update = (k: string, v: any) => setForm((s) => ({ ...s, [k]: v }));

  // check that all fields filled before advance
  const canAdvance = () => {
    if (step === 1) return true;
    if (step === 2) {
      return (
        form.email.trim() && form.password.trim() && form.confirmPassword.trim()
      );
    }
    if (step === 3) {
      return (
        form.firstName.trim() &&
        form.middleName.trim() &&
        form.lastName.trim() &&
        form.birthdate.trim()
      );
    }
    if (step === 4) {
      return (
        form.sex.trim() &&
        form.address.trim() &&
        form.contactNumber.trim() &&
        form.agreePrivacy &&
        form.agreeTerms
      );
    }
    return false;
  };

  // helper funcs for form page navigation
  const next = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!canAdvance()) return;

    if (step == 2) {
      const passwordsIdentical = form.password === form.confirmPassword;
      if (!passwordsIdentical) {
        toast.error(
          "Passwords within the registration form are not identical! Please recheck and try again..."
        );
        return;
      }
    }

    if (step == 3) {
      const currentDate = Number(Date.now().toString());
      const birthdateConverted = Date.parse(form.birthdate);

      if (birthdateConverted > currentDate) {
        // Birthdate if conditional to register within allowed date range (not further than today)
        toast.error("You can't register further than the current date!");
        return;
      }

      const MINIMUM_AGE_REQUIREMENT = 410248800000; // user must be 13+
      const minAllowedBirthDate = currentDate - MINIMUM_AGE_REQUIREMENT;
      if (birthdateConverted >= minAllowedBirthDate) {
        // Birthdate if conditional to check whether the user is 13 years old and above
        toast.error(
          "Only users 13 years old and above are allowed to register within the web application!"
        );
        return;
      }
    }

    setStep((s) => Math.min(4, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canAdvance()) return;

    if (form.contactNumber.length != 11) {
      toast.error("Please input a valid 12-digit phone number!");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
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
            "Registration failed. Please try again."
        );
        return;
      } else {
        toast.success(data.message || "Registration successful!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      toast.error("Network or server error. Please try again.");
      console.error("Registration fetch error:", err);
    }
  };

  return (
    <>
      <h1 className="text-lg font-bold text-slate-900 mb-1 text-center">
        {step === 1 && (
          <>
            <FontAwesomeIcon
              icon={faUserEdit}
              className="text-[#22c55e] mr-3"
            />
            Register Account
          </>
        )}
        {step === 2 && (
          <>
            <FontAwesomeIcon
              icon={faQuestion}
              className="text-[#22c55e] mr-3"
            />
            Tell Us About You
          </>
        )}
        {step === 3 && (
          <>
            <FontAwesomeIcon icon={faPencil} className="text-[#22c55e] mr-3" />
            Few More Details Please
          </>
        )}
        {step === 4 && (
          <>
            <FontAwesomeIcon
              icon={faHourglassHalf}
              className="text-[#22c55e] mr-3"
            />
            Almost Done!
          </>
        )}
      </h1>

      <p className="text-sm text-slate-600 mb-6 max-w-xs text-center mx-auto">
        {step === 1 &&
          "Sign up to create your account and access Estarossa dashboard"}
        {step === 2 && "Provide a contact email and your full name"}
        {step === 3 && "Add birthdate, sex and your address"}
        {step === 4 && "Add contact number and accept our policies"}
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Step 1: Intro + SSO */}
        {step === 1 && (
          <>
            <button
              type="button"
              onClick={next}
              className={`w-full inline-flex justify-center items-center gap-2 rounded-xl px-4 py-2 bg-green-400 text-white text-md font-semibold
              hover:bg-green-300 hover:scale-105 hover:cursor-pointer
              transition disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              Get Started
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="text-xs text-slate-500">Or register with</div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

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
          </>
        )}

        {/* Step 2: email & names */}
        {step === 2 && (
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs text-slate-500">
                Email address
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1">
                <FontAwesomeIcon
                  icon={faEnvelope as IconProp}
                  className="text-slate-500"
                />
                <input
                  id="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  type="email"
                  placeholder="Email address"
                  className="flex-1 bg-transparent outline-none text-xs border-none"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs text-slate-500">
                Password
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1">
                <FontAwesomeIcon
                  icon={faEnvelope as IconProp}
                  className="text-slate-500"
                />
                <input
                  id="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="flex-1 bg-transparent outline-none text-xs border-none"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs text-slate-500">
                Confirm Password
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1">
                <FontAwesomeIcon
                  icon={faEnvelope as IconProp}
                  className="text-slate-500"
                />
                <input
                  id="confirmPassword"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  type="password"
                  placeholder="Confirm Password"
                  className="flex-1 bg-transparent outline-none text-xs border-none"
                  required
                />
              </div>
            </div>
          </>
        )}

        {/* Step 3: birthdate, sex, address */}
        {step === 3 && (
          <>
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="text-xs text-slate-500">
                First name
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1">
                <FontAwesomeIcon
                  icon={faIdBadge as IconProp}
                  className="text-slate-500"
                />
                <input
                  id="firstName"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  type="text"
                  placeholder="First name"
                  className="flex-1 bg-transparent outline-none text-xs border-none"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="middleName" className="text-xs text-slate-500">
                Middle name
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1">
                <FontAwesomeIcon
                  icon={faIdBadge as IconProp}
                  className="text-slate-500"
                />
                <input
                  id="middleName"
                  value={form.middleName}
                  onChange={(e) => update("middleName", e.target.value)}
                  type="text"
                  placeholder="Middle name"
                  className="flex-1 bg-transparent outline-none text-xs border-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="text-xs text-slate-500">
                Last name
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1">
                <FontAwesomeIcon
                  icon={faIdBadge as IconProp}
                  className="text-slate-500"
                />
                <input
                  id="lastName"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  type="text"
                  placeholder="Last name"
                  className="flex-1 bg-transparent outline-none text-xs border-none"
                  required
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="birthdate" className="text-xs text-slate-500">
                Birthdate
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1">
                <FontAwesomeIcon
                  icon={faBirthdayCake as IconProp}
                  className="text-slate-500"
                />
                <input
                  id="birthdate"
                  value={form.birthdate}
                  onChange={(e) => update("birthdate", e.target.value)}
                  type="date"
                  className="flex-1 bg-transparent outline-none text-xs border-none"
                  required
                />
              </div>
            </div>
          </>
        )}

        {/* Step 4: contact + agreements */}
        {step === 4 && (
          <>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="sex" className="text-xs text-slate-500">
                Sex
              </label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1">
                <FontAwesomeIcon
                  icon={faVenusMars as IconProp}
                  className="text-slate-500"
                />
                <select
                  id="sex"
                  value={form.sex}
                  onChange={(e) => update("sex", e.target.value)}
                  className="flex-1 bg-transparent outline-none text-xs border-none"
                  required
                >
                  <option value="">Select sex</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="address" className="text-xs text-slate-500">
                Address
              </label>

              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1">
                <FontAwesomeIcon
                  icon={faLocationDot as IconProp}
                  className="text-slate-500"
                />
                <input
                  id="address"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  type="text"
                  placeholder="Address"
                  className="flex-1 bg-transparent outline-none text-xs border-none"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="contactNumber" className="text-xs text-slate-500">
                Contact number
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-1">
                <FontAwesomeIcon
                  icon={faPhoneAlt as IconProp}
                  className="text-slate-500"
                />
                <input
                  id="contactNumber"
                  value={form.contactNumber}
                  onChange={(e) => update("contactNumber", e.target.value)}
                  type="tel"
                  placeholder="Contact number"
                  className="flex-1 bg-transparent outline-none text-xs border-none"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm text-slate-700">
              <div className="text-xs text-slate-500">Agreements</div>
              <label className="inline-flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={form.agreePrivacy}
                  onChange={(e) => update("agreePrivacy", e.target.checked)}
                  className="border-slate-500 rounded-md hover:cursor-pointer"
                />
                I agree to the{" "}
                <a
                  href="#"
                  className="text-emerald-600 underline hover:cursor-pointer hover:text-emerald-400 transition"
                >
                  Privacy Policy
                </a>
              </label>

              <label className="inline-flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => update("agreeTerms", e.target.checked)}
                  className="border-slate-500 rounded-md hover:cursor-pointer"
                />
                I agree to the{" "}
                <a
                  href="#"
                  className="text-emerald-600 underline hover:cursor-pointer hover:text-emerald-400 transition"
                >
                  Terms & Conditions
                </a>
              </label>
            </div>
          </>
        )}

        {/* Navigation - shown under inputs and only for relevant steps */}
        {step > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-2 text-xs text-slate-500 hover:underline hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faArrowLeft as IconProp} /> Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={(e) => next(e)}
                disabled={!canAdvance()}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-1 bg-green-400 text-white text-sm font-semibold ${
                  canAdvance() &&
                  "hover:bg-green-300 hover:scale-110 hover:cursor-pointer"
                } transition disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                Next{" "}
                <FontAwesomeIcon
                  icon={faArrowRight as IconProp}
                  className="ml-1"
                />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canAdvance()}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-1 bg-green-400 text-white text-sm font-semibold ${
                  canAdvance() &&
                  "hover:bg-green-300 hover:scale-110 hover:cursor-pointer"
                } transition disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                <FontAwesomeIcon icon={faUserPlus} /> Create Account
              </button>
            )}
          </div>
        )}
      </form>

      {step === 1 && (
        <div className="mt-8 w-full flex">
          <a href="/login" className="text-xs text-slate-500 hover:underline ">
            <FontAwesomeIcon icon={faArrowLeft as IconProp} className="mr-4" />
            Back to login
          </a>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
