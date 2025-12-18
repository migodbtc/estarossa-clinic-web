"use client";

import React, { useState, memo, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBookOpen,
  faChalkboardTeacher,
  faCheckCircle,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCircle,
  faEnvelope,
  faHospital,
  faInfo,
  faInfoCircle,
  faLaptopCode,
  faMapPin,
  faMinus,
  faPhone,
  faUserGraduate,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faReact, faPython } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faCode } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  // SERVICES CAROUSEL SLIDES
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const carouselSlides = [
    {
      title: "Online Appointment Booking",
      text: "Connection between students and medical staff is easier with online appointment scheduling through the platform, with real-time availability and automated reminders.",
      image: "/img/home/service_1.jpg",
    },
    {
      title: "Track Medical Records",
      text: "Securely view and download medical records such as vaccination history and past visit summaries, all in one web application.",
      image: "/img/home/service_2.jpg",
    },
    {
      title: "Health Announcements & Notifications",
      text: "Receive timely updates about campus health advisories, vaccination drives, and clinic schedules via the web portal and email notifications.",
      image: "/img/home/service_3.jpg",
    },
    {
      title: "Symptom Checker & Triage",
      text: "Use an interactive tool to input symptoms and receive guidance on whether to visit the clinic, self-care tips, or emergency instructions, streamlining clinic visits.",
      image: "/img/home/service_4.jpg",
    },
    {
      title: "Wellness Resources & Teleconsultation",
      text: "Access curated health articles, mental wellness resources, and book virtual consultations with clinic staff for non-urgent concerns.",
      image: "/img/home/service_5.jpg",
    },
  ];

  const goToSlide = (idx: number) => {
    if (idx === currentSlide) return;
    setPrevSlide(currentSlide);
    setCurrentSlide(idx);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setPrevSlide(null), 700);
  };

  const prev = () =>
    goToSlide(
      currentSlide === 0 ? carouselSlides.length - 1 : currentSlide - 1
    );
  const next = () => goToSlide((currentSlide + 1) % carouselSlides.length);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  const CarouselSlide = memo(
    ({
      slide,
      active,
      className = "",
    }: {
      slide: (typeof carouselSlides)[0];
      active: boolean;
      className?: string;
    }) => (
      <div
        style={{ backgroundImage: `url('${slide.image}')` }}
        className={`absolute w-full h-full flex flex-col items-center justify-center transition-opacity duration-700 bg-top bg-cover bg-slate-900
        ${active ? "opacity-100" : "opacity-0"}
        ${className}
      `}
      >
        <div className="w-full h-full bg-slate-900/70 backdrop-blur-sm">
          <div className="w-[70%] h-full  flex flex-col justify-center items-center mx-auto">
            <h3 className="w-full text-3xl font-bold text-[#22c55e] mb-4 text-center ">
              {slide.title}
            </h3>
            <p className="w-2xl text-lg text-white text-center ">
              {slide.text}
            </p>
          </div>
        </div>
      </div>
    )
  );

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
          className="w-full bg-slate-100 border-y border-gray-100 py-12 relative z-20"
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
              <div className="flex flex-col items-center justify-center p-4 text-center rounded-xl hover:scale-110 transition">
                <div className="mb-3">
                  <FontAwesomeIcon
                    icon={faCode}
                    className="w-10 h-10 text-[#22c55e]"
                  />
                </div>
                <h3 className="font-bold text-slate-800">Next.js</h3>
                <p className="text-sm text-slate-800 mt-1">
                  Modern React Framework
                </p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center rounded-xl hover:scale-110 transition">
                <div className="mb-3">
                  <FontAwesomeIcon
                    icon={faReact as any}
                    className="w-10 h-10 text-[#22c55e]"
                  />
                </div>
                <h3 className="font-bold text-slate-800">React</h3>
                <p className="text-sm text-slate-800 mt-1">
                  Robust Frontend Library
                </p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center rounded-xl hover:scale-110 transition">
                <div className="mb-3">
                  <FontAwesomeIcon
                    icon={faPython as any}
                    className="w-10 h-10 text-[#22c55e]"
                  />
                </div>
                <h3 className="font-bold text-slate-800">Flask (Python)</h3>
                <p className="text-sm text-slate-800 mt-1">
                  High-Performance Backend
                </p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 text-center rounded-xl hover:scale-110 transition">
                <div className="mb-3">
                  <FontAwesomeIcon
                    icon={faDatabase}
                    className="w-10 h-10 text-[#22c55e]"
                  />
                </div>
                <h3 className="font-bold text-slate-800">MySQL Database</h3>
                <p className="text-sm text-slate-800 mt-1">
                  Secure Data Management
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="staff"
          className="py-16 bg-white min-h-[80vh] flex flex-col items-center"
        >
          <div className="mb-8 text-center">
            <span className="font-semibold text-[#22c55e]">Staff</span>
            <h2 className="font-bold mb-2 text-3xl text-slate-800">
              Meet the People of Estarossa
            </h2>
            <p className="w-2xl text-slate-600 text-justify">
              Estarossa is not only the system that simplifies and automates,
              but also the people that are involved within the usage of the
              system. Meet the staff below!
            </p>
          </div>
          <div className="w-4xl h-auto mx-auto mb-8 grid grid-cols-3 grid-rows-2 gap-8 ">
            <div className="">
              <div className="w-full h-96 bg-[url('/img/home/doc1.jpeg')] bg-center bg-cover rounded-2xl flex items-center relative overflow-hidden border-2 border-slate-200 transform hover:scale-105 hover:cursor-pointer transition">
                <div className="w-full h-full p-4 bg-linear-to-t from-slate-800 to-transparent"></div>
                <div className="w-[80%] p-4 px-6 bg-white rounded-2xl absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col justify-center text-center items-center">
                  <p className="w-auto text-xs text-slate-600 text-justify mb-2 italic">
                    "Serving people for 15 years as a doctor, now I am able to
                    serve back to my alma mater!"
                  </p>
                  <h2 className="font-bold text-slate-800 text-xs">
                    Dr. Sundar Pragataryu, MD, DNB, FIAP
                  </h2>
                </div>
              </div>
            </div>
            <div className="">
              <div className="w-full h-96 bg-[url('/img/home/doc2.jpeg')] bg-center bg-cover rounded-2xl flex items-center relative overflow-hidden border-2 border-slate-200 transform hover:scale-105 hover:cursor-pointer transition">
                <div className="w-full h-full p-4 bg-linear-to-t from-slate-800 to-transparent"></div>
                <div className="w-[80%] p-4 px-6 bg-white rounded-2xl absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col justify-center text-center items-center">
                  <p className="w-auto text-xs text-slate-600 text-justify mb-2 italic">
                    "Every child deserves a champion. My passion is helping
                    Colorado's kids grow up healthy and strong."
                  </p>
                  <h2 className="font-bold text-slate-800 text-xs">
                    Dr. Jackson Carter, MD, FAAP, MPH
                  </h2>
                </div>
              </div>
            </div>
            <div className="">
              <div className="w-full h-96 bg-[url('/img/home/doc3.jpg')] bg-top bg-cover rounded-2xl flex items-center relative overflow-hidden border-2 border-slate-200 transform hover:scale-105 hover:cursor-pointer transition">
                <div className="w-full h-full p-4 bg-linear-to-t from-slate-800 to-transparent"></div>
                <div className="w-[80%] p-4 px-6 bg-white rounded-2xl absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col justify-center text-center items-center">
                  <p className="w-auto text-xs text-slate-600 text-justify mb-2 italic">
                    "Caring for children is not just my job, it's my calling.
                    Proud to serve Taiwan's next generation."
                  </p>
                  <h2 className="font-bold text-slate-800 text-xs">
                    Dr. Mei-Ling Hsu, MD, PhD, FIAP
                  </h2>
                </div>
              </div>
            </div>
            <div className="">
              <div className="w-full h-96 bg-[url('/img/home/nurse1.jpg')] bg-top bg-cover rounded-2xl flex items-center relative overflow-hidden border-2 border-slate-200 transform hover:scale-105 hover:cursor-pointer transition">
                <div className="w-full h-full p-4 bg-linear-to-t from-slate-800 to-transparent"></div>
                <div className="w-[80%] p-4 px-6 bg-white rounded-2xl absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col justify-center text-center items-center">
                  <p className="w-auto text-xs text-slate-600 text-justify mb-2 italic">
                    "Nursing is about compassion and connection. I am honored to
                    care for our diverse community."
                  </p>
                  <h2 className="font-bold text-slate-800 text-xs">
                    Layla Benali, RN, CPN
                  </h2>
                </div>
              </div>
            </div>
            <div className="">
              <div className="w-full h-96 bg-[url('/img/home/nurse2.jpg')] bg-top bg-cover rounded-2xl flex items-center relative overflow-hidden border-2 border-slate-200 transform hover:scale-105 hover:cursor-pointer transition">
                <div className="w-full h-full p-4 bg-linear-to-t from-slate-800 to-transparent"></div>
                <div className="w-[80%] p-4 px-6 bg-white rounded-2xl absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col justify-center text-center items-center">
                  <p className="w-auto text-xs text-slate-600 text-justify mb-2 italic">
                    "Every day is a new opportunity to make a difference in a
                    child's life."
                  </p>
                  <h2 className="font-bold text-slate-800 text-xs">
                    Emily Thompson, RN, BSN, CPN
                  </h2>
                </div>
              </div>
            </div>
            <div className="">
              <div className="w-full h-96 bg-[url('/img/home/nurse3.jpg')] bg-top bg-cover rounded-2xl flex items-center relative overflow-hidden border-2 border-slate-200 transform hover:scale-105 hover:cursor-pointer transition">
                <div className="w-full h-full p-4 bg-linear-to-t from-slate-800 to-transparent"></div>
                <div className="w-[80%] p-4 px-6 bg-white rounded-2xl absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col justify-center text-center items-center">
                  <p className="w-auto text-xs text-slate-600 text-justify mb-2 italic">
                    "Caring for children and families is my greatest joy."
                  </p>
                  <h2 className="font-bold text-slate-800 text-xs">
                    Sarah Williams, RN, MSN
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className=" bg-slate-100 h-auto flex flex-col items-center pt-8"
        >
          <div className="mb-8 text-center">
            <span className="font-semibold text-[#22c55e]">Services</span>
            <h2 className="font-bold mb-2 text-3xl text-slate-800">
              See How Estarossa Can Help You
            </h2>
            <p className="w-2xl text-slate-600 text-justify">
              Estarossa is not only the system that simplifies and automates,
              but also the people that are involved within the usage of the
              system. Meet the staff below!
            </p>
          </div>
          <div className="w-full px-auto h-full flex flex-col items-center justify-center">
            <div className="relative w-full h-[70vh] flex items-center justify-center">
              {/* Left Arrow */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-[#22c55e] p-3 hover:cursor-pointer transition hover:text-green-400 hover:scale-110"
                aria-label="Previous Slide"
              >
                <FontAwesomeIcon icon={faChevronLeft} size="3x" />
              </button>
              {/* Carousel Slides */}
              <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
                {prevSlide !== null && prevSlide !== currentSlide && (
                  <CarouselSlide
                    slide={carouselSlides[prevSlide]}
                    active={false}
                    className="z-30 pointer-events-none"
                  />
                )}
                <CarouselSlide
                  slide={carouselSlides[currentSlide]}
                  active={true}
                  // z-20 for stacking order
                  className="z-20"
                />
              </div>
              {/* Right Arrow */}
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-[#22c55e] p-3 hover:cursor-pointer transition hover:text-green-400 hover:scale-110"
                aria-label="Next Slide"
              >
                <FontAwesomeIcon icon={faChevronRight} size="3x" />
              </button>
              {/* Dots */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {carouselSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-2 h-2 rounded-full border-2 border-[#22c55e] transition-all duration-300 focus:outline-none
            ${
              idx === currentSlide
                ? "bg-[#22c55e] scale-110 shadow"
                : "bg-transparent"
            }
          `}
                    aria-label={`Go to slide ${idx + 1}`}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="location"
          className="py-16 bg-brand-accent/10 h-screen flex items-center"
        >
          <div className="w-6xl h-full mx-auto grid grid-cols-2 gap-8">
            <div className="h-full flex flex-col justify-center items-start">
              <span className="font-semibold text-[#22c55e]">Location</span>
              <h2 className="font-bold text-3xl text-slate-800">
                Where to Find Us?
              </h2>
              <p className="text-slate-600 mb-4 text-justify">
                Our clinic is conveniently located at the heart of the Bon Dosco
                Polytechnic Institute campus, making it easily accessible for
                students, staff, and visitors.
              </p>
              <div className="w-full grid grid-cols-2 grid-rows-2 gap-4">
                <div className="row-span-2 flex flex-col">
                  <strong className="text-slate-600">
                    <FontAwesomeIcon
                      icon={faMapPin}
                      className="w-6 h-6 text-[#22c55e]"
                    />{" "}
                    Address
                  </strong>
                  <p className="text-slate-500 text-justify">
                    Estarossa Clinic, Building A, Bon Dosco Polytechnic
                    Institute, 123 University Avenue, City of Dosconia, 4000
                    Laguna, Philippines
                  </p>
                </div>
                <div className="flex flex-col">
                  <strong className="text-slate-600">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="w-6 h-6 text-[#22c55e]"
                    />{" "}
                    Telephone
                  </strong>
                  <p className="text-slate-500 text-justify">(049) 123-4567</p>
                </div>
                <div className="flex flex-col">
                  <strong className="text-slate-600">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="w-6 h-6 text-[#22c55e]"
                    />{" "}
                    Email Address
                  </strong>
                  <p className="text-slate-500 text-justify">
                    estarossa.clinic@bdpi.edu.ph
                  </p>
                </div>
              </div>
            </div>
            <div className="h-full">
              <iframe
                title="Estarossa Clinic Location"
                src="https://www.google.com/maps?q=14.5995,120.9842&z=16&output=embed"
                width="100%"
                height="100%"
                className="w-full h-full rounded-2xl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
        <section
          id="cta"
          className="bg-cta-section text-white h-screen flex items-center"
        >
          <div className="w-full h-full bg-slate-900/70 backdrop-blur-md flex items-center">
            <div className="mx-auto max-w-3xl px-8 text-center flex flex-col gap-4">
              <span className="font-semibold text-[#22c55e]">
                Get Started Today
              </span>
              <h2 className="font-bold text-3xl text-slate-200">
                Experience Hassle-Free Healthcare on Campus
              </h2>
              <p className="text-slate-400 text-justify">
                Join Estarossa Clinic and unlock a new level of convenience,
                care, and connection. Book appointments online, access your
                medical records anytime, and stay updated with the latest health
                announcements—all in one secure platform. Take charge of your
                well-being and make every clinic visit easier than ever.
              </p>
              <a
                href="/register"
                className="w-fit mx-auto inline-block rounded-xl bg-[#22c55e] px-6 py-3 font-bold text-white transform hover:scale-110 hover:bg-[#4ade80] transition"
              >
                <FontAwesomeIcon
                  icon={faUserPlus}
                  className="w-4 h-4 text-white mr-2"
                />{" "}
                Register Now – It’s Free!
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-800 text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-[#22c55e]">
                Estarossa Web Clinic System
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                The modern clinic management platform for students, staff, and
                healthcare professionals at Bon Dosco Polytechnic Institute.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#22c55e]">
                Social Media
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="hover:text-brand-accent" href="#hero">
                    BDPI Official Website
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-accent" href="#features">
                    BDPI Official Facebook Page
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-accent" href="#about">
                    BDPI Official Linkedin Page
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-accent" href="#contact">
                    Lead Developer LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#22c55e]">
                Resources
              </h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="hover:text-brand-accent" href="/about">
                    About Estarossa
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-accent" href="/services">
                    Services Overview
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-accent" href="/staff">
                    Meet the Staff
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-accent" href="/faq">
                    Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <a className="hover:text-brand-accent" href="/contact">
                    Contact & Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-600 pt-6 text-center text-sm text-slate-400 flex flex-row justify-between">
            <small className="text-sm">
              © {new Date().getFullYear()} Estarossa Clinic Web System. All
              rights reserved.
            </small>
            <small className="text-sm">
              Terms & Conditions • Privacy Policy
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
