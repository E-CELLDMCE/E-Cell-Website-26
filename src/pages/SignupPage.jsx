import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    branch: '',
    year: '',
    division: '',
    rollNo: '',
    email: '',
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
    console.log('Signup Data:', formData);
  };

  // Same transparent input style used in Login Page
  const inputStyle = `
    w-full
    bg-white/10
    backdrop-blur-md
    border border-white/20
    text-white text-sm
    placeholder:text-gray-500
    px-4 py-2.5
    rounded-lg
    outline-none
    focus:bg-white/15
    focus:border-yellow-400/70
    focus:ring-2
    focus:ring-yellow-400/10
    transition-all duration-300
  `;

  const labelStyle = `
    block
    text-sm
    text-gray-300
    mb-2
    ml-1
  `;

  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* BACKGROUND */}
      <main
        className="
          min-h-screen
          pt-28
          pb-12
          px-4
          flex
          flex-col
          items-center
          justify-center
          bg-[radial-gradient(circle_at_85%_15%,_#e00018_0%,_#9b0010_20%,_transparent_48%),radial-gradient(circle_at_10%_80%,_#d00012_0%,_#780008_25%,_transparent_52%),linear-gradient(135deg,_#180000_0%,_#050000_48%,_#170000_100%)]
        "
      >

        {/* TITLE */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Sign Up
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            Create your E-Cell account
          </p>
        </div>

        {/* TRANSPARENT GLASS CARD */}
        <div
          className="
            w-full
            max-w-lg
            bg-black/85
            backdrop-blur-xl
            border
            border-yellow-500/70
            rounded-[2.5rem]
            px-7
            md:px-9
            py-8
            shadow-[0_25px_70px_rgba(0,0,0,0.55)]
          "
        >

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* NAME */}
            <div>
              <label className={labelStyle}>
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className={inputStyle}
              />
            </div>

            {/* STUDENT ID */}
            <div>
              <label className={labelStyle}>
                Student ID
              </label>

              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter your Student ID"
                required
                className={inputStyle}
              />
            </div>

            {/* BRANCH + YEAR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className={labelStyle}>
                  Branch
                </label>

                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="e.g. Computer"
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Year
                </label>

                <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="e.g. SE"
                  required
                  className={inputStyle}
                />
              </div>

            </div>

            {/* DIVISION + ROLL NUMBER */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>
                <label className={labelStyle}>
                  Division
                </label>

                <input
                  type="text"
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  placeholder="e.g. A"
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Roll No.
                </label>

                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  placeholder="Enter roll number"
                  required
                  className={inputStyle}
                />
              </div>

            </div>

            {/* EMAIL */}
            <div>
              <label className={labelStyle}>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className={inputStyle}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className={labelStyle}>
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className={inputStyle}
              />
            </div>

            {/* SIGN UP BUTTON */}
            <button
              type="submit"
              className="
                w-full
                mt-3
                py-3
                rounded-xl
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
              Sign Up
            </button>

          </form>

          {/* LOGIN LINK */}
          <div className="text-center mt-6">

            <p className="text-sm text-gray-400">
              Already have an account?{' '}

              <a
                href="#login"
                className="
                  text-yellow-400
                  font-semibold
                  hover:text-yellow-300
                  transition
                "
              >
                Login
              </a>
            </p>

          </div>

        </div>

      </main>
    </div>
  );
}