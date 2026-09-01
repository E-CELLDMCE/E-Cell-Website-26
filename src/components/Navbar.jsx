import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'HOME', href: '#home', active: true },
    { name: 'ABOUT US', href: '#about' },
    { name: 'EVENTS', href: '#events' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'TEAM', href: '#team' },
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

              {/* Hover underline */}
              <span
                className="
                  absolute
                  -bottom-2
                  left-0
                  w-0
                  h-[2px]
                  bg-red-600
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />

            </a>
          ))}

        </div>


        {/* ================= STUDENT DASHBOARD ================= */}

        <div className="hidden lg:flex items-center">

          <a
  href="/dashboard"
  className="
    px-5
    py-2.5
    rounded-lg

    bg-gradient-to-r
    from-yellow-500
    via-amber-500
    to-yellow-600

    border
    border-yellow-400

    text-black
    text-sm
    font-extrabold
    tracking-wide

    hover:from-yellow-400
    hover:via-amber-400
    hover:to-yellow-500

    hover:shadow-[0_0_22px_rgba(234,179,8,0.35)]
    hover:scale-[1.03]

    active:scale-[0.98]

    transition-all
    duration-300
  "
>
  STUDENT DASHBOARD
</a>

        </div>


        {/* ================= MOBILE HAMBURGER ================= */}

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
            bg-black/98
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


          {/* MOBILE DASHBOARD BUTTON */}

          <a
  href="/dashboard"
  className="
    px-5
    py-2.5
    rounded-lg

    bg-gradient-to-r
    from-yellow-500
    via-amber-500
    to-yellow-600

    border
    border-yellow-400

    text-black
    text-sm
    font-extrabold
    tracking-wide

    hover:from-yellow-400
    hover:via-amber-400
    hover:to-yellow-500

    hover:shadow-[0_0_22px_rgba(234,179,8,0.35)]
    hover:scale-[1.03]

    active:scale-[0.98]

    transition-all
    duration-300
  "
>
  STUDENT DASHBOARD
</a>
        </div>

      )}

    </nav>
  );
};

export default Navbar;