import React from "react";
import Navbar from "../components/common/Navbar";

const EnspireInitiativepage: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">

            {/* =====================================================
          NAVBAR
          ===================================================== */}
            <Navbar />

            {/* =====================================================
          MAIN PAGE
          ===================================================== */}
            <main
                className="relative w-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('/img_vid/Initiativepages_background.png')",
                }}
            >
                <div className="relative z-10 w-full">

                    {/* ================= HERO ================= */}
                    <section className="flex flex-col items-center pt-16 sm:pt-20 md:pt-24 px-5">

                        {/* ENSPIRE SYMBOL */}
                        <img
                            src="/img_vid/enspire_logo.png"
                            alt="ENSPIRE Logo"
                            className="
      w-72
      sm:w-80
      md:w-96
      lg:w-[28rem]
      h-auto
      object-contain
    "
                        />

                        {/* ENSPIRE TITLE */}
                        <h1
                            className="
      mt-[-22px]
      sm:mt-[-25px]
      text-[48px]
      sm:text-[60px]
      md:text-[70px]
      lg:text-[80px]
      leading-none
      font-extrabold
      tracking-normal
      uppercase
      text-center
      bg-[linear-gradient(90deg,#FFF600_0%,#B48500_14%,#C7B480_91%)]
      bg-clip-text
      text-transparent
    "
                        >
                            ENSPIRE
                        </h1>

                        {/* UNDERLINE */}
                        <div
                            className="
      w-[190px]
      sm:w-[220px]
      md:w-[250px]
      h-[4px]
      bg-[#FFF600]
      mt-1
    "
                        />

                        {/* TAGLINE */}
                        <p
                            className="
      mt-2
      text-[#FFF600]
      text-sm
      sm:text-base
      md:text-lg
      font-extrabold
      uppercase
      tracking-normal
      underline
      underline-offset-4
    "
                        >
                            VISION TO VICTORY
                        </p>

                    </section>

                    {/* =================================================
              ABOUT ENSPIRE
              ================================================= */}
                    <section
                        className="
              max-w-4xl
              mx-auto
              px-6
              sm:px-8
              mt-16
              sm:mt-20
            "
                    >

                        <h2
                            className="
                text-center
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-extrabold
                uppercase
              "
                        >
                            <span className="text-white">ABOUT </span>
                            <span className="text-[#FFF600]">ENSPIRE</span>
                        </h2>

                        <div
                            className="
                mt-7
                max-w-3xl
                mx-auto
                text-center
                text-[12px]
                sm:text-[13px]
                md:text-[14px]
                leading-[1.65]
                font-medium
                text-white
              "
                        >

                            <p>
                                ENSPIRE is designed to bring together brilliant minds from the
                                worlds of Finance, Business, and Entrepreneurship. Whether
                                you're a budding entrepreneur, a finance enthusiast, or simply
                                curious about the future of business, this event is your
                                gateway to knowledge, networking, and exciting challenges.
                            </p>

                            <p className="mt-6">
                                The 5th Edition of one of the most dynamic Business and
                                Entrepreneurial Summits is set to inspire, innovate, and
                                transform ideas into success. Get ready for an event where
                                visionaries shape the future. Join us on March 17th, 18th &
                                19th, 2025, as we redefine Entrepreneurship, Finance, and
                                Leadership, turning bold visions into lasting victories. This
                                is ENSPIRE '25. This is Vision to Victory.
                            </p>

                        </div>

                    </section>

                    {/* =================================================
              EVENT GALLERY
              ================================================= */}
                    <section
                        className="
              max-w-4xl
              mx-auto
              px-5
              sm:px-8
              mt-12
              sm:mt-14
            "
                    >

                        <div
                            className="
                grid
                grid-cols-2
                gap-x-5
                gap-y-7
                sm:gap-x-8
                sm:gap-y-9
                max-w-3xl
                mx-auto
              "
                        >

                            {/* ================= EVENT 1 ================= */}
                            <div
                                className="
                  p-[9px]
                  sm:p-[11px]
                  rounded-[48px]
                  sm:rounded-[58px]
                  bg-[linear-gradient(90deg,#FABF40_17%,#FFF600_46%,#FCE503_72%,#F9D405_100%)]
                "
                            >
                                <div
                                    className="
                    overflow-hidden
                    rounded-[39px]
                    sm:rounded-[49px]
                    aspect-[1.4/1]
                  "
                                >
                                    <img
                                        src="/img_vid/event_1.png"
                                        alt="ENSPIRE Event 1"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* ================= EVENT 2 ================= */}
                            <div
                                className="
                  p-[9px]
                  sm:p-[11px]
                  rounded-[48px]
                  sm:rounded-[58px]
                  bg-[linear-gradient(90deg,#FABF40_17%,#FFF600_46%,#FCE503_72%,#F9D405_100%)]
                "
                            >
                                <div
                                    className="
                    overflow-hidden
                    rounded-[39px]
                    sm:rounded-[49px]
                    aspect-[1.4/1]
                  "
                                >
                                    <img
                                        src="/img_vid/event_2.png"
                                        alt="ENSPIRE Event 2"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* ================= GROUP PHOTO ================= */}
                            <div
                                className="
                  p-[9px]
                  sm:p-[11px]
                  rounded-[48px]
                  sm:rounded-[58px]
                  bg-[linear-gradient(90deg,#FABF40_17%,#FFF600_46%,#FCE503_72%,#F9D405_100%)]
                "
                            >
                                <div
                                    className="
                    overflow-hidden
                    rounded-[39px]
                    sm:rounded-[49px]
                    aspect-[1.4/1]
                  "
                                >
                                    <img
                                        src="/img_vid/group_photo.png"
                                        alt="ENSPIRE Group Photo"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* ================= ENSPIRE 25 ================= */}
                            <div
                                className="
                  p-[9px]
                  sm:p-[11px]
                  rounded-[48px]
                  sm:rounded-[58px]
                  bg-[linear-gradient(90deg,#FABF40_17%,#FFF600_46%,#FCE503_72%,#F9D405_100%)]
                "
                            >
                                <div
                                    className="
                    overflow-hidden
                    rounded-[39px]
                    sm:rounded-[49px]
                    aspect-[1.4/1]
                  "
                                >
                                    <img
                                        src="/img_vid/group_photo_enspire.png"
                                        alt="ENSPIRE 25"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                        </div>

                    </section>

                    {/* ================= CONTACT US ================= */}
                    <section className="w-full px-6 sm:px-10 md:px-16 lg:px-20 py-16">

                        <div className="w-full text-center">
                            <h2
                                className="inline-block font-extrabold mb-10"
                                style={{
                                    fontFamily: "Montserrat, sans-serif",
                                    fontSize: "48px",
                                    lineHeight: "1.1",
                                    background:
                                        "linear-gradient(90deg, #FFFFFF 0%, #FFF600 32%, #B58500 98%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                CONTACT US
                            </h2>
                        </div>
                        {/* Contact Cards */}
                        <div className="flex flex-col md:flex-row justify-center items-center gap-20 md:gap-32">

                            {/* ================= AKSHADA ================= */}
                            <div className="flex flex-col items-center text-center">

                                {/* Image Frame */}
                                <div
                                    className="p-[9px] sm:p-[10px]"
                                    style={{
                                        borderRadius: "58px",
                                        background:
                                            "linear-gradient(135deg, #FABF40 0%, #FFF600 46%, #F9D405 100%)",
                                    }}
                                >
                                    <div
                                        className="overflow-hidden bg-black"
                                        style={{
                                            width: "175px",
                                            height: "205px",
                                            borderRadius: "49px",
                                        }}
                                    >
                                        <img
                                            src="/img_vid/Event_initiative_head_1.png"
                                            alt="Akshada Sangore"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Name */}
                                <h3
                                    className="mt-5 text-xl sm:text-2xl font-extrabold"
                                    style={{
                                        fontFamily: "Montserrat, sans-serif",
                                        color: "#FFF600",
                                    }}
                                >
                                    AKSHADA SANGORE
                                </h3>

                                {/* Position */}
                                <p
                                    className="mt-2 text-sm sm:text-base font-bold text-white"
                                    style={{
                                        fontFamily: "Montserrat, sans-serif",
                                    }}
                                >
                                    EVENT INITIATIVE HEAD
                                </p>

                                {/* Social Icons */}
                                <div className="flex items-center justify-center gap-7 mt-5">

                                    {/* LinkedIn */}
                                    <a
                                        href="#"
                                        className="text-white hover:text-yellow-400 transition-colors"
                                        aria-label="Akshada LinkedIn"
                                    >
                                        <svg
                                            width="22"
                                            height="22"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.68H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM3.56 20.45h3.56V8.99H3.56v11.46z" />
                                        </svg>
                                    </a>

                                    {/* Email */}
                                    <a
                                        href="mailto:ecell.dmce.14@gmail.com"
                                        className="text-white hover:text-yellow-400 transition-colors"
                                        aria-label="Email Akshada"
                                    >
                                        <svg
                                            width="23"
                                            height="23"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <rect x="3" y="5" width="18" height="14" rx="2" />
                                            <path d="M3 7l9 6 9-6" />
                                        </svg>
                                    </a>

                                </div>
                            </div>


                            {/* ================= KOMAL ================= */}
                            <div className="flex flex-col items-center text-center">

                                {/* Image Frame */}
                                <div
                                    className="p-[9px] sm:p-[10px]"
                                    style={{
                                        borderRadius: "58px",
                                        background:
                                            "linear-gradient(135deg, #FABF40 0%, #FFF600 46%, #F9D405 100%)",
                                    }}
                                >
                                    <div
                                        className="overflow-hidden bg-black"
                                        style={{
                                            width: "175px",
                                            height: "205px",
                                            borderRadius: "49px",
                                        }}
                                    >
                                        <img
                                            src="/img_vid/Event_initiative_head_2.png"
                                            alt="Komal Sahu"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Name */}
                                <h3
                                    className="mt-5 text-xl sm:text-2xl font-extrabold"
                                    style={{
                                        fontFamily: "Montserrat, sans-serif",
                                        color: "#FFF600",
                                    }}
                                >
                                    KOMAL SAHU
                                </h3>

                                {/* Position */}
                                <p
                                    className="mt-2 text-sm sm:text-base font-bold text-white"
                                    style={{
                                        fontFamily: "Montserrat, sans-serif",
                                    }}
                                >
                                    EVENT INITIATIVE HEAD
                                </p>

                                {/* Social Icons */}
                                <div className="flex items-center justify-center gap-7 mt-5">

                                    {/* LinkedIn */}
                                    <a
                                        href="#"
                                        className="text-white hover:text-yellow-400 transition-colors"
                                        aria-label="Komal LinkedIn"
                                    >
                                        <svg
                                            width="22"
                                            height="22"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.68H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0-4.12zM3.56 20.45h3.56V8.99H3.56v11.46z" />
                                        </svg>
                                    </a>

                                    {/* Email */}
                                    <a
                                        href="mailto:ecell.dmce.14@gmail.com"
                                        className="text-white hover:text-yellow-400 transition-colors"
                                        aria-label="Email Komal"
                                    >
                                        <svg
                                            width="23"
                                            height="23"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <rect x="3" y="5" width="18" height="14" rx="2" />
                                            <path d="M3 7l9 6 9-6" />
                                        </svg>
                                    </a>

                                </div>
                            </div>

                        </div>
                    </section>
                </div>
            </main>

            {/* =====================================================
          FOOTER
          ===================================================== */}

        </div>
    );
};

export default EnspireInitiativepage;