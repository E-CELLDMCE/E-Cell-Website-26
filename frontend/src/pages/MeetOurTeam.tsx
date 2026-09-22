import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import {
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";


// ======================================================
// TEAM MEMBER CARD
// ======================================================

const TeamMemberCard = ({
  name,
  role,
  image,
  description,
  objectPosition = "center 30%",
  linkedin = "#",
  email = "",
}: {
  name: string;
  role: string;
  image: string;
  description: string;
  objectPosition?: string;
  linkedin?: string;
  email?: string;
}) => {

  const [isFlipped, setIsFlipped] = useState(false);

  const gmailLink = email
    ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
        email
      )}`
    : "#";


  return (
    <div
      className="
        w-full
        max-w-[320px]
        [perspective:1000px]
      "
      onMouseLeave={() => setIsFlipped(false)}
    >

      {/* ==================================================
          COMPLETE CARD
          The ENTIRE card rotates
         ================================================== */}

      <div
        className={`
          relative
          w-full
          transition-transform
          duration-700
          ease-in-out
          [transform-style:preserve-3d]
          ${isFlipped ? "[transform:rotateY(180deg)]" : ""}
        `}
      >

        {/* ==================================================
            FRONT SIDE
           ================================================== */}

        <div
          className="
            relative
            w-full
            overflow-hidden
            rounded-[22px]
            bg-[#520006]
            shadow-lg
            [backface-visibility:hidden]
          "
        >

          {/* ==================================================
              HOVER AREA

              ONLY THIS PART activates the flip
             ================================================== */}

          <div
            onMouseEnter={() => setIsFlipped(true)}
            className="cursor-pointer"
          >

            {/* ================= PHOTO ================= */}

            <div className="p-5 pb-5">

              <div
                className="
                  aspect-[4/3]
                  overflow-hidden
                  rounded-tl-[22px]
                  rounded-br-[22px]
                  bg-[#8B0000]
                "
              >

                <img
                  src={image}
                  alt={name}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                  style={{
                    objectPosition,
                  }}
                />

              </div>

            </div>


            {/* ================= NAME + ROLE ================= */}

            <div
              className="
                bg-[#4d0000]
                text-center
                px-2
                py-1.5
              "
            >

              <h3
                className="
                  text-[18px]
                  sm:text-[19px]
                  font-bold
                  text-white
                  leading-tight
                "
              >
                {name}
              </h3>


              <p
                className="
                  font-team-role
                  text-[13px]
                  sm:text-[14px]
                  text-white
                  leading-tight
                "
              >
                {role}
              </p>

            </div>

          </div>


          {/* ==================================================
              BLACK ACTION BAR

              This does NOT trigger flip.

              It IS still part of the rotating card.
             ================================================== */}

          <div
            onMouseEnter={() => setIsFlipped(false)}
            className="
              flex
              items-center
              justify-between
              bg-black
              px-2
              py-2.5
            "
          >

            {/* ================= SOCIAL ICONS ================= */}

            <div className="flex items-center gap-7">

              {/* LinkedIn */}

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="
                  text-white
                  transition
                  hover:text-blue-400
                "
                aria-label={`${name} LinkedIn`}
              >
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="w-4 h-4"
                />
              </a>


              {/* Gmail */}

              <a
                href={gmailLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!email) {
                    e.preventDefault();
                  }

                  e.stopPropagation();
                }}
                className="
                  text-white
                  transition
                  hover:text-red-400
                "
                aria-label={`Email ${name}`}
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="w-4 h-4"
                />
              </a>

            </div>


            {/* ================= CONTACT BUTTON ================= */}

            <a
              href={gmailLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!email) {
                  e.preventDefault();
                }

                e.stopPropagation();
              }}
              className="
                rounded-full
                bg-[#b40000]
                px-3
                py-1
                text-[10px]
                font-semibold
                text-yellow-400
                transition
                hover:bg-[#d00000]
              "
            >
              Contact Me
            </a>

          </div>

        </div>


        {/* ==================================================
            BACK SIDE
           ================================================== */}

        <div
          className="
            absolute
            inset-0
            overflow-hidden
            rounded-tl-[22px]
            rounded-br-[22px]
            rounded-tr-none
            rounded-bl-none
            bg-gradient-to-br
            from-[#5a0004]
            via-[#420003]
            to-[#220002]
            [transform:rotateY(180deg)]
            [backface-visibility:hidden]
          "
        >

          {/* ==================================================
              HEAD INFORMATION
             ================================================== */}

          <div
            className="
              flex
              items-end
              px-3
              py-2.5
              sm:px-4
              sm:py-3
            "
          >

            {/* ================= CIRCULAR PHOTO ================= */}

            <div
              className="
                w-[90px]
                h-[90px]
                sm:w-[94px]
                sm:h-[94px]
                shrink-0
                overflow-hidden
                rounded-full
                border-2
                border-[#520006]
              "
            >

              <img
                src={image}
                alt={name}
                className="
                  w-full
                  h-full
                  object-cover
                "
                style={{
                  objectPosition,
                }}
              />

            </div>


            {/* ================= NAME + ROLE ================= */}

            <div
              className="
                ml-3
                min-w-0
                flex-1
              "
            >

              <h3
                className="
                  text-white
                  text-[19px]
                  sm:text-[21px]
                  font-bold
                  leading-tight
                "
              >
                {name
                  .toLowerCase()
                  .replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  )}
              </h3>


              <p
                className="
                  font-team-role
                  text-yellow-400
                  text-[15px]
                  sm:text-[17px]
                  leading-tight
                  mt-3
                "
              >

                {role === "Technical Head" ? (
                  <>
                    Technical
                    <br />
                    Head
                  </>
                ) : (
                  role
                )}

              </p>

            </div>


            {/* ================= SOCIAL ICONS ================= */}

            <div
              className="
                flex
                items-center
                gap-2.5
                shrink-0
              "
            >

              {/* LinkedIn */}

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-white
                  transition
                  hover:text-blue-400
                "
                aria-label={`${name} LinkedIn`}
              >
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  className="
                    w-7
                    h-7
                    sm:w-8
                    sm:h-8
                  "
                />
              </a>


              {/* Gmail */}

              <a
                href={gmailLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!email) {
                    e.preventDefault();
                  }

                  e.stopPropagation();
                }}
                className="
                  text-white
                  transition
                  hover:text-red-400
                "
                aria-label={`Email ${name}`}
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="
                    w-7
                    h-7
                    sm:w-8
                    sm:h-8
                  "
                />
              </a>

            </div>

          </div>


          {/* ==================================================
              YELLOW SEPARATOR
             ================================================== */}

          <div
            className="
              h-[3px]
              sm:h-[4px]
              w-full
              bg-yellow-400
            "
          />


          {/* ==================================================
              DESCRIPTION
             ================================================== */}

          <div
            className="
              flex
              items-center
              justify-center
              h-[calc(100%-130px)]
              px-5
              sm:px-6
              py-3
              sm:py-4
              text-center
            "
          >

            <p
              className="
                text-white
                text-[20px]
                sm:text-[22px]
                font-extrabold
                leading-tight
              "
            >
              "{description}"
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};


// ======================================================
// MEET OUR TEAM
// ======================================================

const MeetOurTeam = () => {

  return (
    <div
      className="
        team-page
        min-h-screen
        bg-[#0d0002]
        text-white
        overflow-hidden
      "
    >

      <section
        className="
          relative
          min-h-screen
          bg-[#0d0002]
          overflow-hidden
        "
      >

        {/* ================= BACKGROUND ================= */}

        <div
          className="
            absolute
            inset-0
            pointer-events-none
          "
          style={{
            background: `
              radial-gradient(
                ellipse 80% 55% at 0% 0%,
                rgba(150, 0, 15, 0.95) 0%,
                rgba(100, 0, 10, 0.65) 28%,
                rgba(40, 0, 5, 0.25) 55%,
                transparent 75%
              ),

              radial-gradient(
                ellipse 75% 55% at 100% 100%,
                rgba(150, 0, 15, 0.9) 0%,
                rgba(90, 0, 10, 0.6) 30%,
                rgba(35, 0, 5, 0.25) 55%,
                transparent 75%
              ),

              linear-gradient(
                135deg,
                #220005 0%,
                #140002 35%,
                #0f0002 55%,
                #160003 75%,
                #260006 100%
              )
            `,
          }}
        />


        {/* ================= HEADING LIGHT ================= */}

        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[55%]
            h-[22%]
            pointer-events-none
          "
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 50% 20%, rgba(220, 20, 20, 0.28), transparent 70%)",
          }}
        />


        {/* ================= PAGE CONTENT ================= */}

        <div
          className="
            relative
            z-10
            min-h-screen
            flex
            flex-col
          "
        >

          {/* ================= HEADING ================= */}

          <div className="pt-32 sm:pt-36 md:pt-40">

            <div
              className="
                max-w-4xl
                mx-auto
                text-center
              "
            >

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  font-extrabold
                  uppercase
                  tracking-wide
                  text-yellow-400
                  drop-shadow-[0_2px_8px_rgba(250,204,21,0.3)]
                  mb-6
                "
              >
                MEET OUR TEAM
              </h2>

            </div>

          </div>


          {/* ================= TEAM AREA ================= */}

          <div
            className="
              flex-1
              relative
              px-6
              pb-20
            "
          >

            <div className="max-w-6xl mx-auto">

              {/* ================= TOP HEAD ================= */}

              <div
                className="
                  flex
                  justify-center
                  mb-16
                "
              >

                <TeamMemberCard
                  name="ADITYA DONGRE"
                  role="Chairperson"
                  image="/team/aditya-dongre.png"
                  description="Turning Innovation Into Enterprise"
                  linkedin="https://www.linkedin.com/in/ACTUAL-LINKEDIN-USERNAME"
                  email="actualemail@gmail.com"
                />

              </div>


              {/* ================= TEAM GRID ================= */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-x-20
                  gap-y-14
                  justify-items-center
                "
              >

                {/* Row 1 */}

                <TeamMemberCard
                  name="HARPAL KOTADIYA"
                  role="Co-Chairperson"
                  image="/team/harpal-kotadiya.png"
                  description="Making The Chaos Looked By Organized."
                  linkedin="https://www.linkedin.com/in/ACTUAL-LINKEDIN-USERNAME"
                  email="actualemail@gmail.com"
                />

                <TeamMemberCard
                  name="NITESH SHETTY"
                  role="Co-Chairperson"
                  image="/team/nitesh-shetty.png"
                  objectPosition="center 20%"
                  description="Bridging Leadership, Building Empires"
                  linkedin="https://www.linkedin.com/in/nitesh-shetty-7804431b3?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  email=" niteshshetty235@gmail.com"
                />


                {/* Row 2 */}

                <TeamMemberCard
                  name="AKSHADA SANGORE"
                  role="Event Initiative Head"
                  image="/team/akshada-sangore.png"
                  description="Curating Innovation Into Reality"
                  linkedin="https://www.linkedin.com/in/ACTUAL-LINKEDIN-USERNAME"
                  email="actualemail@gmail.com"
                />

                <TeamMemberCard
                  name="KOMAL SAHU"
                  role="Event Initiative Head"
                  image="/team/komal-sahu.jpg"
                  objectPosition="center 10%"
                  description="Shaping Experiences That Matters"
                  linkedin="https://www.linkedin.com/in/ACTUAL-LINKEDIN-USERNAME"
                  email="actualemail@gmail.com"
                />


                {/* Row 3 */}

                <TeamMemberCard
                  name="JUI JAGTAP"
                  role="Public Relation Head"
                  image="/team/jui-jagtap.png"
                  description="Narrating The Future Of Business"
                  linkedin="https://www.linkedin.com/in/ACTUAL-LINKEDIN-USERNAME"
                  email="actualemail@gmail.com"
                />

                <TeamMemberCard
                  name="RIYA BEHERE"
                  role="Public Relation Head"
                  image="/team/riya-behere.png"
                  description="Building Bridges, Amplifying Voices"
                  linkedin="https://www.linkedin.com/in/ACTUAL-LINKEDIN-USERNAME"
                  email="actualemail@gmail.com"
                />


                {/* Row 4 */}

                <TeamMemberCard
                  name="KRISH MAHANWAR"
                  role="Technical Head"
                  image="/team/krish-mahanwar.png"
                  objectPosition="center 40%"
                  description="Powered By Code, Driven By Innovation."
                  linkedin="https://www.linkedin.com/in/ACTUAL-LINKEDIN-USERNAME"
                  email="actualemail@gmail.com"
                />

                <TeamMemberCard
                  name="MALASHRI SHRIRAGE"
                  role="Technical Head"
                  image="/team/malashri-shrirage.png"
                  objectPosition="center 20%"
                  description="From Creating Blueprint To Bytes"
                  linkedin="https://www.linkedin.com/in/ACTUAL-LINKEDIN-USERNAME"
                  email="actualemail@gmail.com"
                />


                {/* Row 5 */}

                <TeamMemberCard
                  name="VARSHA CHAURASIYA"
                  role="Creative Head"
                  image="/team/varsha-chaurasiya.png"
                  description="Where Imagination meets Impact"
                  linkedin="https://www.linkedin.com/in/ACTUAL-LINKEDIN-USERNAME"
                  email="actualemail@gmail.com"
                />

                <TeamMemberCard
                  name="SUNISH PANIGRAHY"
                  role="Creative Head"
                  image="/team/sunish-panigrahy.png"
                  description="Transforming abstract ideas into iconic identities"
                  linkedin="https://www.linkedin.com/in/ACTUAL-LINKEDIN-USERNAME"
                  email="actualemail@gmail.com"
                />


                {/* Row 6 */}

                <TeamMemberCard
                  name="ADVAY DESHMUKH"
                  role="Social Media Head"
                  image="/team/advay-deshmukh.jpg"
                  description="Connecting Minds, Capturing Stories"
                  linkedin="https://www.linkedin.com/in/ACTUAL-LINKEDIN-USERNAME"
                  email="actualemail@gmail.com"
                />

                <TeamMemberCard
                  name="SAYLI CHAUDHARI"
                  role="Social Media Head"
                  image="/team/sayli-chaudhari.png"
                  objectPosition="center 40%"
                  description="Crafting Conversations, Not Just Content"
                  linkedin="https://www.linkedin.com/in/ACTUAL-LINKEDIN-USERNAME"
                  email="actualemail@gmail.com"
                />


                {/* Row 7 */}

                <TeamMemberCard
                  name="ARYA KAMBLE"
                  role="Alumni Initiative Head"
                  image="/team/arya-kamble.png"
                  objectPosition="center 20%"
                  description="Reconnecting Minds, Igniting Ventures"
                  linkedin="https://www.linkedin.com/in/ACTUAL-LINKEDIN-USERNAME"
                  email="actualemail@gmail.com"
                />

                <TeamMemberCard
                  name="SADIYA SHAIKH"
                  role="Documentation Head"
                  image="/team/sadiya-shaikh.png"
                  objectPosition="center 50%"
                  description="Mapping The Journey From Ideation To Reality"
                  linkedin="https://www.linkedin.com/in/ACTUAL-LINKEDIN-USERNAME"
                  email="actualemail@gmail.com"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};


export default MeetOurTeam;