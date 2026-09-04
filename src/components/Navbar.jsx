import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '#home', active: true },
    { name: 'ABOUT US', href: '#about' },
    { name: 'EVENTS', href: '#events' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'TEAM', href: '/team' },
    { name: 'INITIATIVE', href: '#initiative' },
    { name: 'BLOGS', href: '#blogs' },
  ];

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        bg-black/95
        backdrop-blur-md
        border-b
        border-red-950
      "
    >
      <div
        className="
          max-w-[1500px]
          mx-auto
          h-20
          px-6
          lg:px-12
          flex
          items-center
          justify-between
        "
      >

        {/* ================= LOGO ================= */}

        <a
          href="#home"
          className="flex items-center"
        >
          <img
            src="/images/ecell-logo.png"
            alt="E-Cell DMCE Logo"
            className="
              h-12
              md:h-14
              w-auto
              object-contain
            "
          />
        </a>


        {/* ================= DESKTOP NAVIGATION ================= */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-7
          "
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`
                relative
                group
                text-sm
                font-semibold
                tracking-wide
                transition-all
                duration-300

                ${
                  link.active
                    ? 'text-yellow-400'
                    : 'text-gray-200 hover:text-yellow-400'
                }
              `}
            >
              {link.name}

              {/* HOVER UNDERLINE */}

              <span
                className="
                  absolute
                  -bottom-2
                  left-0
                  w-0
                  h-[2px]
                  bg-yellow-400
                  group-hover:w-full
                  transition-all
                  duration-300
                "
              />
            </a>
          ))}
        </div>


        {/* ================= STUDENT DASHBOARD ICON ================= */}

        <div className="hidden lg:flex items-center">

          <a
            href="/dashboard"
            title="Student Dashboard"
            aria-label="Student Dashboard"
            className="
              w-11
              h-11

              flex
              items-center
              justify-center

              rounded-full

              bg-yellow-400/5

              border
              border-yellow-400/60

              text-yellow-400

              hover:bg-yellow-400
              hover:text-black
              hover:border-yellow-400

              hover:shadow-[0_0_20px_rgba(250,204,21,0.35)]
              hover:scale-105

              active:scale-95

              transition-all
              duration-300
            "
          >

            {/* USER / PROFILE ICON */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 20.25a7.5 7.5 0 0115 0"
              />
            </svg>

          </a>

        </div>


        {/* ================= MOBILE MENU BUTTON ================= */}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="
            lg:hidden
            flex
            items-center
            justify-center

            text-white

            hover:text-yellow-400

            transition
          "
          aria-label="Toggle navigation menu"
        >

          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >

            {isOpen ? (

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />

            ) : (

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />

            )}

          </svg>

        </button>

      </div>


      {/* ================= MOBILE MENU ================= */}

      {isOpen && (

        <div
          className="
            lg:hidden

            bg-black/95
            backdrop-blur-md

            border-t
            border-gray-900

            px-7
            py-6
          "
        >

          <div className="flex flex-col gap-1">

            {navLinks.map((link) => (

              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                  py-3

                  text-sm
                  font-semibold
                  tracking-wide

                  border-b
                  border-gray-900

                  transition-all
                  duration-300

                  ${
                    link.active
                      ? 'text-yellow-400'
                      : 'text-gray-200 hover:text-yellow-400'
                  }
                `}
              >
                {link.name}
              </a>

            ))}

          </div>


          {/* ================= MOBILE STUDENT DASHBOARD ================= */}

          <a
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="
              mt-6

              flex
              items-center
              justify-center
              gap-3

              w-full

              py-3

              rounded-full

              bg-yellow-400/5

              border
              border-yellow-400/60

              text-yellow-400

              text-sm
              font-semibold

              hover:bg-yellow-400
              hover:text-black

              transition-all
              duration-300
            "
          >

            {/* PROFILE ICON */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-5 h-5"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 20.25a7.5 7.5 0 0115 0"
              />

            </svg>

            Student Dashboard

          </a>

        </div>

      )}

    </nav>
  );
};

export default Navbar;