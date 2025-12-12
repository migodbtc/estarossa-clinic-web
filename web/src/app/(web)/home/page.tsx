import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBookOpen,
  faChalkboardTeacher,
  faCheckCircle,
  faChevronDown,
  faCircle,
  faHospital,
  faInfo,
  faInfoCircle,
  faLaptopCode,
  faUserGraduate,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faReact, faPython } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faCode } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-100">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full z-30 " role="banner">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 w-full space-x-2">
            <div className="w-8 h-8 bg-[#22c55e] rounded-xl flex flex-col justify-center items-center">
              <FontAwesomeIcon
                icon={faHospital}
                className="w-4 h-4 text-white"
              />
            </div>
            <div className="text-xl font-semibold">Estarossa</div>

            {/* Centered nav */}
            <div className="hidden md:flex flex-1 justify-center ml-8 ">
              <nav
                className="flex space-x-2 text-sm"
                aria-label="Main navigation"
              >
                <a
                  className="rounded-xl px-4 py-1 cursor-pointer transform hover:text-slate-800 hover:bg-[#4ade80] transition"
                  href="#hero"
                >
                  Home
                </a>
                <a
                  className="rounded-xl px-4 py-1 cursor-pointer transform hover:text-slate-800 hover:bg-[#4ade80] transition"
                  href="#about"
                >
                  About
                </a>
                <a
                  className="rounded-xl px-4 py-1 cursor-pointer transform hover:text-slate-800 hover:bg-[#4ade80] transition"
                  href="#hero"
                >
                  Technologies
                </a>
                <a
                  className="rounded-xl px-4 py-1 cursor-pointer transform hover:text-slate-800 hover:bg-[#4ade80] transition"
                  href="#staff"
                >
                  Staff
                </a>
                <a
                  className="rounded-xl px-4 py-1 cursor-pointer transform hover:text-slate-800 hover:bg-[#4ade80] transition"
                  href="#services"
                >
                  Services
                </a>
                <a
                  className="rounded-xl px-4 py-1 cursor-pointer transform hover:text-slate-800 hover:bg-[#4ade80] transition"
                  href="#hero"
                >
                  Location
                </a>
                <a
                  className="rounded-xl px-4 py-1 cursor-pointer transform hover:text-slate-800 hover:bg-[#4ade80] transition"
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
                  className="bg-[#22c55e] text-white font-semibold inline-flex items-center justify-center min-w-24 rounded-xl px-4 py-1 hover:cursor-pointer transform hover:scale-105 hover:bg-[#4ade80] transition"
                >
                  Login
                </span>
              </a>

              <a href="/signup" className="inline-block">
                <span
                  role="button"
                  className="border-2 border-[#22c55e] text-[#22c55e] font-semibold inline-flex items-center justify-center min-w-24 rounded-xl px-4 py-1 hover:cursor-pointer transform hover:scale-105 hover:border-[#4ade80] hover:bg-[#4ade80] hover:text-white  transition"
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
        {/* Hero Section */}
        <section id="hero" className="bg-hero-section">
          <div className="relative py-20 min-h-screen flex items-center bg-linear-to-r from-slate-900 to-slate-900/50">
            <div className="mx-auto max-w-7xl px-8 sm:px-12 lg:px-16 w-full ">
              <div className="max-w-3xl text-left">
                <h1 className="text-4xl sm:text-3xl lg:text-5xl font-extrabold text-[#22c55e]">
                  The campus-wide clinical assistance you can trust
                </h1>
                <p className="mt-4 text-lg text-slate-100">
                  Estarossa is the web solution for students who need
                  assistance, nurses who want to manage their patients better,
                  and doctors who want to streamline their workflow. All in one
                  place, all in one platform.
                </p>

                <div className="flex flex-row mt-6 gap-4">
                  <a href="#cta">
                    <span
                      role="button"
                      className="inline-flex items-center justify-center min-w-48 rounded-xl px-6 py-3 text-md font-bold bg-[#22c55e] text-white hover:cursor-pointer transform hover:scale-105 hover:bg-[#4ade80] transition"
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
                      className="inline-flex items-center justify-center min-w-48 rounded-xl px-6 py-3 font-medium text-sm border-2 border-[#22c55e] text-[#22c55e] hover:cursor-pointer transform hover:scale-105 hover:border-[#4ade80] hover:bg-[#4ade80] hover:text-white  transition"
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
            <div className="w-48 h-24 absolute left-1/2 bottom-4 -translate-x-1/2 flex flex-col gap-4 justify-center items-center font-semibold">
              <span>Scroll for more!</span>
              <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4" />
            </div>
          </div>
        </section>

        <section
          id="about"
          className="bg-white h-[80vh] flex items-center justify-center"
        >
          <div className="w-full h-full grid grid-cols-12 gap-4 pt-16 px-8 max-w-7xl">
            <div className="col-span-6 h-full ">
              <div
                id="about_picture"
                className="w-full h-full flex justify-center items-center relative"
              >
                <div className="absolute w-3/5 h-2/4 bg-[#22c55e] rounded-4xl z-0"></div>

                <div className="w-3/4 h-full border-0 img-about-section relative z-10" />
              </div>
            </div>
            <div className="col-span-6 h-full flex flex-col justify-center space-y-2">
              <span className="font-semibold text-[#22c55e]">About Us</span>
              <h2 className="font-bold text-3xl text-slate-800">
                Estarossa's Mission and Vision
              </h2>
              <p className="text-slate-600 mb-4 text-justify">
                Estarossa was built with the vision of providing a solution to
                the current disarray between digital and physical workflows of
                Bon Dosco Polytechnic Institute. The system also provides a
                scalable, manageable, and intuitive control over the flow of
                information regarding both the students and the medical office
                of the school.
              </p>
              <span className="font-semibold text-slate-600">
                Quick facts include...
              </span>
              <div
                id="aboutUsQuickFacts"
                className="w-full grid grid-cols-2 gap-2 mb-6 text-slate-600"
              >
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faUserGraduate}
                    className="text-[#22c55e] w-5 h-5"
                  />
                  <span>Made by BDPI's IT Seniors</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faLaptopCode}
                    className="text-[#22c55e] w-5 h-5"
                  />
                  <span>Built with modern technologies</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-[#22c55e] w-5 h-5"
                  />
                  <span>Approved by OICT office</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faBookOpen}
                    className="text-[#22c55e] w-5 h-5"
                  />
                  <span>Finals project for IT420</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faChalkboardTeacher}
                    className="text-[#22c55e] w-5 h-5"
                  />
                  <span>Guided by Sir Marfe</span>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="text-[#22c55e] w-5 h-5"
                  />
                  <span>For Dosconians, By Dosconians</span>
                </div>
              </div>
              <button className="w-fit bg-[#22c55e] rounded-xl px-4 py-2 text-white font-semibold hover:cursor-pointer transform hover:scale-105 hover:bg-[#4ade80] transition">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Technical Specs Banner (Moved Below Carousel) */}
        <section
          id="tech"
          className="w-full bg-brand-hero border-y border-gray-100 py-12 relative z-20"
        >
          <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
            <div className="flex flex-col justify-center align-middle text-center mb-4">
              <span className="font-semibold text-[#22c55e] ">
                Technologies
              </span>
              <h2 className="font-bold text-2xl text-slate-800">
                Powered by Modern Innovation
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="flex flex-col items-center justify-center p-4 text-center hover:bg-brand-accent/20 rounded-xl transition-colors">
                <div className="mb-3">
                  <FontAwesomeIcon
                    icon={faCode}
                    className="w-10 h-10 text-[#22c55e]"
                  />
                </div>
                <h3 className="font-bold brand-primary">Next.js</h3>
                <p className="text-sm text-slate-800 mt-1">
                  Modern React Framework
                </p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center hover:bg-brand-accent/20 rounded-xl transition-colors">
                <div className="mb-3">
                  <FontAwesomeIcon
                    icon={faReact as any}
                    className="w-10 h-10 text-[#22c55e]"
                  />
                </div>
                <h3 className="font-bold brand-primary">React</h3>
                <p className="text-sm text-slate-800 mt-1">
                  Robust Frontend Library
                </p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center hover:bg-brand-accent/20 rounded-xl transition-colors">
                <div className="mb-3">
                  <FontAwesomeIcon
                    icon={faPython as any}
                    className="w-10 h-10 text-[#22c55e]"
                  />
                </div>
                <h3 className="font-bold brand-primary">Flask (Python)</h3>
                <p className="text-sm text-slate-800 mt-1">
                  High-Performance Backend
                </p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center hover:bg-brand-accent/20 rounded-xl transition-colors">
                <div className="mb-3">
                  <FontAwesomeIcon
                    icon={faDatabase}
                    className="w-10 h-10 text-[#22c55e]"
                  />
                </div>
                <h3 className="font-bold brand-primary">MySQL Database</h3>
                <p className="text-sm text-slate-800 mt-1">
                  Secure Data Management
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
            <h2 className="text-2xl font-semibold brand-primary">Staff</h2>
            <p className="mt-3 text-slate-800">
              Placeholder for staff or team listing.
            </p>
          </div>
        </section>

        <section
          id="services"
          className="py-16 bg-white min-h-[80vh] flex items-center"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold brand-primary">Services</h2>
            <p className="mt-3 text-slate-800">
              Placeholder for services provided.
            </p>
          </div>
        </section>

        <section
          id="location"
          className="py-16 bg-brand-accent/10 min-h-[80vh] flex items-center"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold brand-primary">Location</h2>
            <p className="mt-3 text-slate-800">
              Placeholder for address and map.
            </p>
          </div>
        </section>

        <section
          id="contact"
          className="py-16 bg-brand-accent/10 min-h-[80vh] flex items-center"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold brand-primary">Contact</h2>
            <p className="mt-3 text-slate-800">
              Placeholder content for contact or support information.
            </p>
          </div>
        </section>

        <section
          id="cta"
          className="py-16 bg-brand-solid text-white min-h-[80vh] flex items-center"
        >
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold brand-primary">
              Ready to get started?
            </h2>
            <p className="mt-3 text-slate-100">
              Call-to-action placeholder at the bottom of the main content.
            </p>
            <a
              href="/register"
              className="mt-6 inline-block rounded-md bg-white px-6 py-3 brand-primary font-medium hover:bg-brand-accent/20"
            >
              Register Now
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-brand-solid text-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold brand-primary">
                Untitled Clinic
              </h3>
              <p className="mt-2 text-sm text-slate-100">
                Small description or address goes here.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium brand-primary">Links</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="hover:text-brand-accent" href="#hero">
                    Home
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-accent" href="#features">
                    Features
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-accent" href="#about">
                    About
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-accent" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium brand-primary">Legal</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="hover:text-brand-accent" href="/privacy">
                    Privacy
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-accent" href="/terms">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-brand-secondary pt-6 text-center text-sm text-slate-100">
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
