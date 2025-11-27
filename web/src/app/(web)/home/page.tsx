import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faInfo,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <header className="w-full bg-white shadow-sm" role="banner">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full">
            <div className="text-xl font-semibold text-slate-900">
              Untitled Clinic
            </div>

            {/* Centered nav */}
            <div className="hidden md:flex flex-1 justify-left ml-8">
              <nav
                className="flex space-x-6 text-sm"
                aria-label="Main navigation"
              >
                <a className="text-slate-700 hover:text-slate-900" href="#hero">
                  Home
                </a>
                <a
                  className="text-slate-700 hover:text-slate-900"
                  href="#about"
                >
                  About
                </a>
                <a
                  className="text-slate-700 hover:text-slate-900"
                  href="#staff"
                >
                  Staff
                </a>
                <a
                  className="text-slate-700 hover:text-slate-900"
                  href="#services"
                >
                  Services
                </a>
                <a
                  className="text-slate-700 hover:text-slate-900"
                  href="#contact"
                >
                  Contact
                </a>
              </nav>
            </div>

            {/* Right actions: Login (brand) and Signup (outline) */}
            <div className="flex items-center gap-4">
              <a href="/login" className="inline-block">
                <span
                  role="button"
                  className="inline-flex items-center justify-center min-w-32 rounded-md px-3 py-2 text-sm btn-brand"
                >
                  Login
                </span>
              </a>

              <a href="/signup" className="inline-block">
                <span
                  role="button"
                  className="inline-flex items-center justify-center min-w-32 rounded-md px-3 py-2 text-sm btn-outline-brand"
                >
                  Sign Up
                </span>
              </a>

              <div className="md:hidden">{/* mobile nav placeholder */}</div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section
          id="hero"
          className="relative py-20 min-h-[80vh] flex items-center bg-brand-hero"
        >
          {/* Simplified hero: neutral background with centered content. Image/overlay removed. */}
          <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 w-full">
            <div className="max-w-3xl text-left">
              <h1 className="text-4xl sm:text-3xl lg:text-5xl font-extrabold text-slate-900">
                The campus-wide clinical assistance you can trust
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Estarossa is the web solution for students who need assistance,
                nurses who want to manage their patients better, and doctors who
                want to streamline their workflow. All in one place, all in one
                platform.
              </p>

              <div className="flex flex-row mt-6 gap-4">
                <a href="#cta">
                  <span
                    role="button"
                    className="inline-flex items-center justify-center min-w-48 rounded-md px-6 py-3 text-md font-bold btn-brand"
                  >
                    Get Started
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="ml-3 w-4 h-4 btn-icon text-white"
                    />
                  </span>
                </a>

                <a href="#about" className="inline-block">
                  <span
                    role="button"
                    className="inline-flex items-center justify-center min-w-48 rounded-md px-6 py-3 font-medium text-sm btn-outline-brand"
                  >
                    Learn More
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="ml-3 w-4 h-4 btn-icon"
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="py-16 bg-gray-100 min-h-[80vh] flex items-center"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold">About</h2>
            <p className="mt-3 text-slate-600">
              Placeholder content for about section.
            </p>
          </div>
        </section>

        {/* Technical Specs Banner (Moved Below Carousel) */}
        <section
          id="tech"
          className="w-full bg-white border-y border-gray-100 py-12 relative z-20"
        >
          <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="flex flex-col items-center justify-center p-4 text-center hover:bg-gray-50/50 rounded-xl transition-colors">
                <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-xl flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <path
                      d="M10 17L5 12L10 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 17L19 12L14 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">Next.js / React</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Robust Frontend Architecture
                </p>
              </div>

              <div className="flex flex-col items-center justify-center p-4 text-center hover:bg-gray-50/50 rounded-xl transition-colors">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <ellipse
                      cx="12"
                      cy="6"
                      rx="8"
                      ry="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">MySQL Database</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Secure Data Management
                </p>
              </div>

              <div className="flex flex-col items-center justify-center p-4 text-center hover:bg-gray-50/50 rounded-xl transition-colors">
                <div className="w-12 h-12 bg-green-50 text-brand-green rounded-xl flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-green-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="6"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <rect
                      x="3"
                      y="14"
                      width="18"
                      height="6"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle cx="7" cy="7" r="1" fill="currentColor" />
                    <circle cx="7" cy="17" r="1" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900">Flask API Server</h3>
                <p className="text-sm text-gray-500 mt-1">
                  High-Performance Backend
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="staff"
          className="py-16 bg-white min-h-[80vh] flex items-center"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold">Staff</h2>
            <p className="mt-3 text-slate-600">
              Placeholder for staff or team listing.
            </p>
          </div>
        </section>

        <section
          id="services"
          className="py-16 bg-gray-50 min-h-[80vh] flex items-center"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold">Services</h2>
            <p className="mt-3 text-slate-600">
              Placeholder for services provided.
            </p>
          </div>
        </section>

        <section
          id="location"
          className="py-16 bg-amber-50 min-h-[80vh] flex items-center"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold">Location</h2>
            <p className="mt-3 text-slate-600">
              Placeholder for address and map.
            </p>
          </div>
        </section>

        <section
          id="contact"
          className="py-16 bg-amber-50 min-h-[80vh] flex items-center"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="mt-3 text-slate-600">
              Placeholder content for contact or support information.
            </p>
          </div>
        </section>

        <section
          id="cta"
          className="py-16 bg-indigo-600 text-white min-h-[80vh] flex items-center"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Ready to get started?
            </h2>
            <p className="mt-3 text-indigo-100">
              Call-to-action placeholder at the bottom of the main content.
            </p>
            <a
              href="/register"
              className="mt-6 inline-block rounded-md bg-white px-6 py-3 text-indigo-700 font-medium hover:bg-gray-100"
            >
              Register Now
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold">
                Untitled Clinic
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Small description or address goes here.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Links</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="hover:text-white" href="#hero">
                    Home
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="#features">
                    Features
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="#about">
                    About
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Legal</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="hover:text-white" href="/privacy">
                    Privacy
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="/terms">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
            <small>
              © {new Date().getFullYear()} Untitled Clinic. All rights reserved.
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
