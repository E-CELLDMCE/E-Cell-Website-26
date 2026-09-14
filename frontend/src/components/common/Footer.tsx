import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 w-full bg-black text-white font-['Montserrat']">

      {/* =====================================================
          MAIN FOOTER
          ===================================================== */}
      <div
        className="
          w-full
          bg-black
          px-8
          sm:px-12
          md:px-16
          lg:px-20
          py-10
          sm:py-12
        "
      >
        <div
          className="
            max-w-[1200px]
            mx-auto
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-10
            lg:gap-16
          "
        >

          {/* =================================================
              COLUMN 1 — LOGO + LOCATION
              ================================================= */}
          <div>
            <img
              src="/img_vid/ecell-logo.png"
              alt="E-CELL DMCE"
              className="
                w-[105px]
                sm:w-[115px]
                h-auto
                object-contain
              "
            />

            {/* Location */}
            <div className="flex items-start gap-2 mt-6">

              <span
                className="
                  text-red-500
                  text-sm
                  leading-none
                  mt-[2px]
                "
              >
                📍
              </span>

              <p
                className="
                  text-white/70
                  text-[12px]
                  sm:text-[13px]
                  leading-[1.5]
                  font-normal
                "
              >
                Location: Datta Meghe
                <br />
                College of Engineering, Navi
                <br />
                Mumbai
              </p>

            </div>
          </div>


          {/* =================================================
              COLUMN 2 — QUICK LINKS
              ================================================= */}
          <div>

            <h3
              className="
                text-white
                text-sm
                font-semibold
                mb-4
              "
            >
              Quick Links
            </h3>

            <div className="flex flex-col gap-[5px]">

              <a
                href="#"
                className="
                  text-white/70
                  text-[12px]
                  hover:text-white
                  transition-colors
                "
              >
                Home
              </a>

              <a
                href="#"
                className="
                  text-white/70
                  text-[12px]
                  hover:text-white
                  transition-colors
                "
              >
                About us
              </a>

              <a
                href="#"
                className="
                  text-white/70
                  text-[12px]
                  hover:text-white
                  transition-colors
                "
              >
                Event
              </a>

              <a
                href="#"
                className="
                  text-white/70
                  text-[12px]
                  hover:text-white
                  transition-colors
                "
              >
                Gallery
              </a>

              <a
                href="#"
                className="
                  text-white/70
                  text-[12px]
                  hover:text-white
                  transition-colors
                "
              >
                Team
              </a>

              <a
                href="#"
                className="
                  text-white/70
                  text-[12px]
                  hover:text-white
                  transition-colors
                "
              >
                Contact
              </a>

            </div>
          </div>


          {/* =================================================
              COLUMN 3 — RESOURCES + LEGAL
              ================================================= */}
          <div className="grid grid-cols-2 gap-8">

            {/* RESOURCES */}
            <div>

              <h3
                className="
                  text-white
                  text-sm
                  font-semibold
                  mb-4
                "
              >
                Resources
              </h3>

              <div className="flex flex-col gap-[5px]">

                <a
                  href="#"
                  className="
                    text-white/70
                    text-[12px]
                    hover:text-white
                    transition-colors
                  "
                >
                  FAQs
                </a>

                <a
                  href="#"
                  className="
                    text-white/70
                    text-[12px]
                    hover:text-white
                    transition-colors
                  "
                >
                  Register
                </a>

                <a
                  href="#"
                  className="
                    text-white/70
                    text-[12px]
                    hover:text-white
                    transition-colors
                  "
                >
                  Volunteer
                </a>

              </div>

            </div>


            {/* LEGAL */}
            <div>

              <h3
                className="
                  text-white
                  text-sm
                  font-semibold
                  mb-4
                "
              >
                Legal
              </h3>

              <div className="flex flex-col gap-[5px]">

                <a
                  href="#"
                  className="
                    text-white/70
                    text-[12px]
                    hover:text-white
                    transition-colors
                  "
                >
                  Privacy Policy
                </a>

                <a
                  href="#"
                  className="
                    text-white/70
                    text-[12px]
                    hover:text-white
                    transition-colors
                  "
                >
                  Terms &amp; Conditions
                </a>

              </div>

            </div>

          </div>


          {/* =================================================
              COLUMN 4 — CONTACT US
              ================================================= */}
          <div>

            <h3
              className="
                text-white
                text-sm
                font-semibold
                mb-4
              "
            >
              Contact Us
            </h3>

            <div className="flex flex-col gap-3">

              {/* EMAIL */}
              <a
                href="mailto:ecell.dmce.14@gmail.com"
                className="
                  flex
                  items-center
                  gap-2
                  text-white/70
                  text-[11px]
                  hover:text-white
                  transition-colors
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-4 h-4 shrink-0"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                  />
                  <path d="m3 7 9 6 9-6" />
                </svg>

                <span>
                  Ecell.dmce.14@gmail.com
                </span>
              </a>


              {/* INSTAGRAM */}
              <a
                href="#"
                className="
                  flex
                  items-center
                  gap-2
                  text-white/70
                  text-[11px]
                  hover:text-white
                  transition-colors
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-4 h-4 shrink-0"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>

                <span>
                  ecell_dmce
                </span>
              </a>


              {/* LINKEDIN */}
              <a
                href="#"
                className="
                  flex
                  items-center
                  gap-2
                  text-white/70
                  text-[11px]
                  hover:text-white
                  transition-colors
                "
              >
                <span
                  className="
                    w-4
                    h-4
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-[13px]
                    shrink-0
                  "
                >
                  in
                </span>

                <span>
                  Ecell_DMCE
                </span>
              </a>

            </div>

          </div>

        </div>
      </div>


      {/* =====================================================
          COPYRIGHT BAR
          ===================================================== */}
      <div
        className="
          w-full
          bg-black
          border-t
          border-white/60
          py-5
          px-5
          text-center
        "
      >
        <p
          className="
            text-white/60
            text-[11px]
            sm:text-xs
            font-normal
          "
        >
          © 2026 ECELL | E-CELL DMCE. All Rights Reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;