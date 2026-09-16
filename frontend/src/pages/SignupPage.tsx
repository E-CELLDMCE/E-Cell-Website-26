import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    studentId: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main
        className="
          min-h-screen
          pt-28
          pb-12
          px-4
          flex
          items-center
          justify-center

          bg-[radial-gradient(circle_at_85%_15%,_#e00018_0%,_#9b0010_20%,_transparent_48%),radial-gradient(circle_at_10%_80%,_#d00012_0%,_#780008_25%,_transparent_52%),linear-gradient(135deg,_#180000_0%,_#050000_48%,_#170000_100%)]
        "
      >
        {/* LOGIN CARD */}
        <div
          className="
            w-full
            max-w-md

            bg-black/85
            backdrop-blur-xl

            border
            border-yellow-500/70

            rounded-[2.5rem]

            px-7
            md:px-10

            py-9

            shadow-[0_25px_70px_rgba(0,0,0,0.55)]
          "
        >
          {/* LOGO */}
          <div className="flex justify-center mb-5">
            <img
              src="/images/ecell-logo.png"
              alt="E-Cell DMCE Logo"
              className="
                h-16
                md:h-20
                w-auto
                object-contain
              "
            />
          </div>

          {/* HEADING */}
          <div className="text-center mb-7">
            <h1
              className="
                text-3xl
                md:text-4xl
                font-bold
                text-white
              "
            >
              Welcome Back!
            </h1>

            <p
              className="
                text-sm
                text-gray-400
                mt-2
              "
            >
              Login to continue your journey
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="
              flex
              flex-col
              items-center
              gap-5
            "
          >
            {/* STUDENT ID */}
            <div className="w-full max-w-sm">
              <label
                htmlFor="studentId"
                className="
                  block
                  text-sm
                  text-gray-300
                  mb-2
                  ml-3
                "
              >
                Student ID
              </label>

              <input
                id="studentId"
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter your Student ID"
                required
                className="
                  w-full

                  bg-white/10
                  backdrop-blur-md

                  border
                  border-white/20

                  text-white
                  text-sm

                  placeholder:text-gray-500

                  px-5
                  py-2.5

                  rounded-full

                  outline-none

                  focus:bg-white/15
                  focus:border-yellow-400/70
                  focus:ring-2
                  focus:ring-yellow-400/10

                  transition-all
                  duration-300
                "
              />
            </div>

            {/* PASSWORD */}
            <div className="w-full max-w-sm">
              <label
                htmlFor="password"
                className="
                  block
                  text-sm
                  text-gray-300
                  mb-2
                  ml-3
                "
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                required
                className="
                  w-full

                  bg-white/10
                  backdrop-blur-md

                  border
                  border-white/20

                  text-white
                  text-sm

                  placeholder:text-gray-500

                  px-5
                  py-2.5

                  rounded-full

                  outline-none

                  focus:bg-white/15
                  focus:border-yellow-400/70
                  focus:ring-2
                  focus:ring-yellow-400/10

                  transition-all
                  duration-300
                "
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="w-full max-w-sm text-right pr-2">
              <a
                href="#forgot"
                className="
                  text-xs
                  md:text-sm
                  font-semibold

                  text-red-400
                  hover:text-red-300

                  transition
                  duration-300
                "
              >
                Forgot Password?
              </a>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="
                w-full
                max-w-sm

                py-2.5

                rounded-full

                bg-gradient-to-r
                from-red-600
                via-red-700
                to-red-950

                border
                border-red-500/50

                text-white
                text-base
                font-bold
                tracking-wide

                hover:from-red-500
                hover:via-red-600
                hover:to-red-900

                hover:shadow-[0_0_22px_rgba(220,38,38,0.35)]
                hover:scale-[1.01]

                active:scale-[0.98]

                transition-all
                duration-300
              "
            >
              Login
            </button>
          </form>

          {/* BOTTOM SECTION */}
          <div className="text-center mt-6">
            <p
              className="
                text-xs
                text-gray-500
                mb-3
              "
            >
              or
            </p>

            <p
              className="
                text-sm
                text-gray-400
              "
            >
              New here?{' '}

              <a
                href="#signup"
                className="
                  text-yellow-400
                  font-semibold
                  hover:text-yellow-300
                  transition
                "
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}