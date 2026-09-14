import React from 'react';
import { Mail } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

const NECInitiativesPage: React.FC = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-black text-white">

            {/* ================= NAVBAR ================= */}
            {/* Keep your existing Navbar here */}

            {/* ================= BACKGROUND ================= */}
            <div className="fixed inset-0 -z-0">
                <img
                    src="/img_vid/Initiativepages_background.png"
                    alt=""
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/25" />
            </div>

            <main className="relative z-10">

                {/* ================= HERO ================= */}
                <section
                    className="
                        mx-auto
                        w-full
                        max-w-6xl
                        px-4
                        pt-[105px]
                        sm:px-8
                        sm:pt-8
                        md:pt-12
                        lg:pt-24
                    "
                >
                    <div
                        className="
                            grid
                            grid-cols-[38%_62%]
                            items-center
                            gap-0
                            md:mx-auto
                            md:flex
                            md:w-fit
                            md:items-center
                            md:justify-center
                            md:gap-10
                            lg:gap-14
                        "
                    >

                        {/* ================= NEC LOGO ================= */}
                        <div
                            className="
                                flex
                                w-full
                                shrink-0
                                justify-center
                                md:w-auto
                                md:justify-center
                            "
                        >
                            <img
                                src="/img_vid/nec-logo.png"
                                alt="National Entrepreneurship Challenge"
                                className="
                                    h-auto
                                    w-[105px]
                                    object-contain
                                    sm:w-[180px]
                                    md:w-[260px]
                                    lg:w-[320px]
                                    xl:w-[360px]
                                "
                            />
                        </div>

                        {/* ================= TITLE ================= */}
                        <div
                            className="
                                min-w-0
                                w-full
                                shrink-0
                                pt-0
                                md:w-auto
                                md:pt-4
                            "
                        >
                            <h1
                                className="
                                    m-0
                                    flex
                                    w-max
                                    flex-col
                                    text-left
                                    uppercase
                                    font-extrabold
                                    leading-none
                                    tracking-normal
                                    bg-[linear-gradient(to_right,#FFF600_0%,#B48500_14%,#C7B480_57%,#FFFFFF_72%)]
                                    bg-clip-text
                                    text-transparent
                                    text-[22px]
                                    sm:text-[45px]
                                    md:text-[50px]
                                    lg:text-[65px]
                                    xl:text-[70px]
                                "
                                style={{
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: 800,
                                    letterSpacing: '0%',
                                    lineHeight: 'normal',
                                    gap: '0.16em',
                                }}
                            >
                                <span>National</span>
                                <span>Entrepreneurship</span>
                                <span>Challenge</span>
                            </h1>
                        </div>

                    </div>
                </section>


                {/* ================= WHAT IS NEC ================= */}
                <section
                    className="
                        mx-auto
                        max-w-4xl
                        px-7
                        pt-3
                        text-center
                        sm:px-8
                        sm:pt-14
                        md:pt-20
                    "
                >
                    <h2
                        className="
                            text-[20px]
                            font-extrabold
                            leading-tight
                            text-white
                            sm:text-4xl
                        "
                    >
                        What is{' '}
                        <span className="text-yellow-400">
                            NEC ?
                        </span>
                    </h2>

                    <p
                        className="
                            mx-auto
                            mt-4
                            max-w-[315px]
                            text-[8px]
                            leading-[1.35]
                            text-white/95
                            sm:mt-6
                            sm:max-w-3xl
                            sm:text-base
                            sm:leading-relaxed
                        "
                    >
                        Entrepreneurship Cell is essential for any college because it
                        develops students&apos; entrepreneurial spirit, which we believe is
                        instrumental for our country to develop. NEC is the platform that
                        helps colleges build an actively functioning E-Cell. It&apos;s a
                        6-month-long competition where students by giving them tasks that
                        are essential for any Entrepreneurship cell to work smoothly.
                    </p>
                </section>


                {/* ================= EVENT GALLERY ================= */}
                <section
                    className="
                        mx-auto
                        max-w-5xl
                        px-7
                        pt-7
                        sm:px-8
                        sm:pt-12
                        md:pt-16
                    "
                >

                    {/* ================= TOP TWO IMAGES ================= */}
                    <div
                        className="
                            mx-auto
                            grid
                            w-full
                            max-w-[390px]
                            grid-cols-2
                            gap-5
                            sm:max-w-[560px]
                            sm:gap-7
                        "
                    >

                        {/* ================= EVENT 1 ================= */}
                        <div
                            className="
                                overflow-hidden
                                rounded-[38px]
                                bg-[linear-gradient(to_right,#FABF40_17%,#FFF600_46%,#FCE503_72%,#F9D405_100%)]
                                p-[8px]
                            "
                        >
                            <div className="overflow-hidden rounded-[30px]">
                                <img
                                    src="/img_vid/nec-event_1.png"
                                    alt="NEC Event"
                                    className="
                                        block
                                        aspect-[4/3]
                                        h-full
                                        w-full
                                        object-cover
                                    "
                                />
                            </div>
                        </div>


                        {/* ================= EVENT 2 ================= */}
                        <div
                            className="
                                overflow-hidden
                                rounded-[38px]
                                bg-[linear-gradient(to_right,#FABF40_17%,#FFF600_46%,#FCE503_72%,#F9D405_100%)]
                                p-[8px]
                            "
                        >
                            <div className="overflow-hidden rounded-[30px]">
                                <img
                                    src="/img_vid/nec-event_2.png"
                                    alt="NEC Event"
                                    className="
                                        block
                                        aspect-[4/3]
                                        h-full
                                        w-full
                                        object-cover
                                    "
                                />
                            </div>
                        </div>

                    </div>


                    {/* ================= GROUP PHOTO ================= */}
                    <div
                        className="
                            mx-auto
                            mt-8
                            w-full
                            max-w-[390px]
                            overflow-hidden
                            rounded-[42px]
                            bg-[linear-gradient(to_right,#FABF40_17%,#FFF600_46%,#FCE503_72%,#F9D405_100%)]
                            p-[9px]
                            sm:mt-10
                            sm:max-w-[700px]
                        "
                    >
                        <div className="overflow-hidden rounded-[33px]">
                            <img
                                src="/img_vid/nec-group.png"
                                alt="NEC E-Cell Team"
                                className="
                                    block
                                    h-auto
                                    w-full
                                    object-cover
                                "
                            />
                        </div>
                    </div>

                </section>


                {/* ===================================================== */}
                {/* ================= CONTACT US ======================== */}
                {/* ===================================================== */}

                <section
                    className="
                        mx-auto
                        max-w-4xl
                        px-7
                        pb-12
                        pt-9
                        sm:px-8
                        sm:pb-20
                        sm:pt-16
                        md:pt-20
                    "
                >

                    {/* ================= CONTACT TITLE ================= */}
                    <h2
                        className="
                            mx-auto
                            w-fit
                            text-center
                            text-[32px]
                            font-extrabold
                            uppercase
                            leading-tight
                            tracking-normal
                            bg-[linear-gradient(90deg,#FFFFFF_0%,#FFF600_32%,#B58500_98%)]
                            bg-clip-text
                            text-transparent
                            sm:text-5xl
                        "
                        style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: 800,
                            letterSpacing: '0%',
                        }}
                    >
                        Contact Us
                    </h2>


                    {/* ================= CONTACT PERSON ================= */}
                    <div
                        className="
                            mx-auto
                            mt-6
                            flex
                            w-fit
                            items-center
                            gap-6
                            sm:mt-10
                            sm:gap-8
                        "
                    >

                        {/* ================= CHAIRPERSON IMAGE ================= */}
                        <div
                            className="
                                w-[155px]
                                shrink-0
                                overflow-hidden
                                rounded-[42px]
                                bg-[linear-gradient(to_right,#FABF40_17%,#FFF600_46%,#FCE503_72%,#F9D405_100%)]
                                p-[9px]
                                sm:w-[175px]
                                sm:rounded-[42px]
                                sm:p-[9px]
                            "
                        >
                            <div className="overflow-hidden rounded-[33px]">
                                <img
                                    src="/img_vid/nec-chairperson.png"
                                    alt="Aditya Dongre"
                                    className="
                                        block
                                        aspect-[3/4]
                                        w-full
                                        object-cover
                                    "
                                />
                            </div>
                        </div>


                        {/* ================= CONTACT DETAILS ================= */}
                        <div
                            className="
                                min-w-0
                                flex-1
                                text-left
                            "
                        >

                            {/* NAME */}
                            <h3
                                className="
        text-[20px]
        font-bold
        uppercase
        leading-tight
        text-yellow-400
        sm:text-2xl
    "
                                style={{
                                    fontFamily: "'Oswald', sans-serif",
                                    fontWeight: 700,
                                    letterSpacing: '0%',
                                }}
                            >
                                Aditya Dongre
                            </h3>

                            {/* DESIGNATION */}
                            <p
                                className="
        mt-1
        text-[16px]
        font-bold
        uppercase
        leading-tight
        text-white
        sm:text-base
    "
                                style={{
                                    fontFamily: "'Oswald', sans-serif",
                                    fontWeight: 700,
                                    letterSpacing: '0%',
                                }}
                            >
                                Chairperson
                            </p>
                            {/* ================= SOCIAL ICONS ================= */}
                            <div
                                className="
                                    mt-4
                                    flex
                                    items-center
                                    justify-start
                                    gap-3
                                "
                            >

                                {/* LINKEDIN */}
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
                                        text-white
                                        transition
                                        hover:border-[#f4c400]
                                        hover:text-[#f4c400]
                                    "
                                >
                                    <FaLinkedin size={18} />
                                </a>


                                {/* EMAIL */}
                                <a
                                    href="#"
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
                                        text-white
                                        transition
                                        hover:border-[#f4c400]
                                        hover:text-[#f4c400]
                                    "
                                >
                                    <Mail size={19} />
                                </a>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
};

export default NECInitiativesPage;