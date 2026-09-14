import React from "react";

interface Alumni {
    name: string;
    image: string;
    scale: number;
    objectPosition: string;
}

const alumni: Alumni[] = [
    {
        name: "Ms. Shivpriya R. Sumbha",
        image: "/img_vid/Speaker_1_filled.png",
        scale: 1,
        objectPosition: "center center",
    },

    {
        name: "Mr. Sherrin Varghese",
        image: "/img_vid/Speaker_2_filled.png",
        scale: 1,
        objectPosition: "center 20%",
    },

    {
        name: "Mr. Abhijit Mehta",
        image: "/img_vid/Speaker_3_filled.png",
        scale: 1,
        objectPosition: "center 20%",
    },

    {
        name: "Mr. Anand Karapurkar",
        image: "/img_vid/Speaker_4_filled.png",
        scale: 1,
        objectPosition: "center 20%",
    },
];

const AlumniPage: React.FC = () => {
    return (
        <div className="min-h-screen overflow-x-hidden bg-black text-white">

            {/* =====================================================
                NAVBAR
            ===================================================== */}


            {/* =====================================================
                MAIN
            ===================================================== */}

            <main className="relative min-h-screen overflow-hidden pt-[72px]">

                {/* =================================================
                    BACKGROUND
                ================================================== */}

                <div className="fixed inset-0 z-0">

                    <img
                        src="/img_vid/Initiativepages_background.png"
                        alt=""
                        className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/10" />

                </div>


                {/* =================================================
                    PAGE CONTENT
                ================================================== */}

                <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-24 sm:px-10 lg:px-16">


                    {/* =================================================
                        ALUMNI HEADER
                    ================================================== */}

                    <section
                        className="
                            relative
                            left-1/2
                            flex
                            w-screen
                            -translate-x-1/2
                            flex-col
                            items-center
                            justify-center
                            pt-20
                            text-center
                            sm:pt-24
                            md:pt-28
                        "
                    >

                        {/* =================================================
                            ALUMNI LOGO
                        ================================================== */}

                        <img
                            src="/img_vid/Alumni_logo.png"
                            alt="Alumni"
                            className="
        w-[270px]
        object-contain
        sm:w-[300px]
        md:w-[330px]
        -mb-10
    "
                        />

                        {/* =================================================
                            TITLE
                        ================================================== */}

                        <h1
                            className="
                                mt-3
                                text-[48px]
                                font-extrabold
                                leading-none
                                tracking-normal
                                bg-gradient-to-r
                                from-[#fff600]
                                via-[#b48500]
                                to-[#c7b480]
                                bg-clip-text
                                text-transparent
                                sm:text-[68px]
                                md:text-[90px]
                            "
                        >
                            ALUMNI
                        </h1>


                        {/* =================================================
                            TAGLINE
                        ================================================== */}

                        <p
                            className="
                                mt-2
                                text-[10px]
                                font-bold
                                tracking-wide
                                text-[#fff200]
                                sm:text-[11px]
                                md:text-[13px]
                            "
                        >
                            BRIDGING IDEAS ACROSS GENERATIONS
                        </p>

                    </section>


                    {/* =================================================
                        ABOUT ALUMNI
                    ================================================== */}

                    <section
                        id="about-alumni"
                        className="mx-auto mt-12 max-w-[850px] text-center"
                    >

                        <h2
                            className="
                                text-2xl
                                font-extrabold
                                sm:text-3xl
                                md:text-4xl
                            "
                        >
                            ABOUT{" "}
                            <span className="text-[#f4c400]">
                                ALUMNI
                            </span>
                        </h2>


                        <p
                            className="
                                mx-auto
                                mt-5
                                max-w-[780px]
                                text-base
                                leading-6
                                text-white
                                sm:text-base
                                md:text-lg
                                md:leading-6
                            "
                        >
                            The Alumni Initiative Of Our E-Cell Is All About Keeping The
                            Bond Alive Between Those Who Once Dreamt Here And Those Who Are
                            Dreaming Now. Through This Platform, We Bring Together Our Alumni
                            Who Have Carved Their Own Path And Have Contributed To The
                            Startup Ecosystem. Through Their Stories And Experiences, Ideas,
                            And Insights Can Flow Both Ways. Alumni Can Share The Lessons
                            They've Learned, The Wins, The Struggles, And The Journeys Beyond
                            College While Students Get The Chance To Learn, Be Inspired, And
                            Even Collaborate. Our Vision Is To Create A Space Where The Spirit
                            Of Entrepreneurship Never Stops Growing, Where Everyone Remains
                            Connected Through The Next Big Idea.
                        </p>

                    </section>


                    {/* =================================================
                        OUR ALUMNI
                    ================================================== */}

                    <section
                        id="our-alumni"
                        className="mt-12 sm:mt-16 md:mt-20"
                    >

                        <h2
                            className="
                                text-center
                                w-fit
                                mx-auto
                                font-['Montserrat']
                                font-extrabold
                                tracking-normal
                                text-2xl
                                sm:text-3xl
                                md:text-5xl
                                bg-clip-text
                                text-transparent
                            "
                            style={{
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundImage:
                                    "linear-gradient(90deg, #FFFFFF 0%, #FFF600 32%, #B58500 98%)",
                            }}
                        >
                            OUR ALUMNI
                        </h2>


                        {/* =================================================
                            ALUMNI GRID
                        ================================================== */}

                        <div
                            className="
                                mx-auto
                                mt-10
                                grid
                                max-w-[650px]
                                grid-cols-1
                                justify-items-center
                                gap-y-12
                                sm:grid-cols-2
                                sm:gap-x-20
                                sm:gap-y-14
                                md:mt-12
                                md:gap-x-24
                                md:gap-y-16
                            "
                        >

                            {alumni.map((person) => (
                                <div
                                    key={person.name}
                                    className="flex flex-col items-center"
                                >

                                    {/* IMAGE FRAME */}

                                    <div
                                        className="
                                            relative
                                            h-[240px]
                                            w-[190px]
                                            rounded-[42px]
                                            p-[10px]
                                            overflow-hidden
                                            shadow-none
                                            sm:h-[250px]
                                            sm:w-[195px]
                                            md:h-[260px]
                                            md:w-[200px]
                                        "
                                        style={{
                                            background:
                                                "linear-gradient(90deg, #FBAF40 17%, #FFF600 46%, #FCE503 72%, #F9D405 100%)",
                                        }}
                                    >

                                        {/* PHOTO */}

                                        <div className="relative h-full w-full overflow-hidden rounded-[32px]">

                                            <img
                                                src={person.image}
                                                alt={person.name}
                                                className="absolute inset-0 h-full w-full object-cover"
                                                style={{
                                                    transform: `scale(${person.scale})`,
                                                    transformOrigin: "center",
                                                }}
                                            />

                                        </div>

                                    </div>


                                    {/* NAME */}

                                    <p
                                        className="
                                            mt-3
                                            text-center
                                            text-[15px]
                                            font-extrabold
                                            text-[#f4c400]
                                            sm:text-[16px]
                                            md:text-[17px]
                                        "
                                    >
                                        {person.name}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </section>


                    {/* =================================================
                        CONTACT US
                    ================================================== */}

                    <section
                        id="contact-us"
                        className="mt-16 pb-5 sm:mt-20 md:mt-24"
                    >

                        {/* HEADING */}

                        <h2
                            className="
                                text-center
                                w-fit
                                mx-auto
                                font-['Montserrat']
                                font-extrabold
                                tracking-normal
                                text-2xl
                                sm:text-3xl
                                md:text-5xl
                                bg-clip-text
                                text-transparent
                            "
                            style={{
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundImage:
                                    "linear-gradient(90deg, #FFFFFF 0%, #FFF600 32%, #B58500 98%)",
                            }}
                        >
                            CONTACT US
                        </h2>


                        {/* CONTACT */}

                        <div
                            className="
                                mx-auto
                                mt-8
                                flex
                                max-w-[550px]
                                flex-col
                                items-center
                                justify-center
                                gap-6
                                sm:flex-row
                                sm:gap-8
                            "
                        >

                            {/* ARYA IMAGE */}

                            <div
                                className="
                                    relative
                                    h-[190px]
                                    w-[155px]
                                    rounded-[42px]
                                    p-[10px]
                                    overflow-hidden
                                    sm:h-[200px]
                                    sm:w-[165px]
                                    md:h-[210px]
                                    md:w-[175px]
                                "
                                style={{
                                    background:
                                        "linear-gradient(90deg, #FBAF40 17%, #FFF600 46%, #FCE503 72%, #F9D405 100%)",
                                }}
                            >

                                <div className="relative h-full w-full overflow-hidden rounded-[32px]">

                                    <img
                                        src="/img_vid/Alumni_initiative_head_filled.png"
                                        alt="Arya Kamble"
                                        className="h-full w-full object-cover"
                                    />

                                </div>

                            </div>


                            {/* DETAILS */}

                            <div className="text-center sm:text-left">

                                <h3
                                    className="
                                        text-xl
                                        font-extrabold
                                        text-[#f4c400]
                                        sm:text-2xl
                                    "
                                >
                                    ARYA KAMBLE
                                </h3>


                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        font-extrabold
                                        text-white
                                        sm:text-sm
                                    "
                                >
                                    ALUMNI INITIATIVE HEAD
                                </p>


                                {/* SOCIAL ICONS */}

                                <div
                                    className="
                                        mt-4
                                        flex
                                        justify-center
                                        gap-3
                                        sm:justify-start
                                    "
                                >

                                    <a
                                        href="#"
                                        aria-label="LinkedIn"
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-md
                                            border
                                            border-white/70
                                            text-sm
                                            font-bold
                                            transition
                                            hover:border-[#f4c400]
                                            hover:text-[#f4c400]
                                        "
                                    >
                                        in
                                    </a>


                                    <a
                                        href="mailto:"
                                        aria-label="Email"
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-md
                                            border
                                            border-white/70
                                            text-base
                                            transition
                                            hover:border-[#f4c400]
                                            hover:text-[#f4c400]
                                        "
                                    >
                                        ✉
                                    </a>

                                </div>

                            </div>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
};

export default AlumniPage;