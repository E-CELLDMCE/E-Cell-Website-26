import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Mail, MapPin, Upload } from 'lucide-react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import ecellLogo from '../assets/ecell-logo.png';
import InitiativeBackground from '../components/InitiativeBackground';
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  branch: string;
  year: string;
  division: string;
  rollNo: string;
  transactionId: string;
  screenshot: File | null;
}

export const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    branch: '',
    year: '',
    division: '',
    rollNo: '',
    transactionId: '',
    screenshot: null,
  });

  const [fileName, setFileName] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setFormData((prev) => ({
        ...prev,
        screenshot: file,
      }));

      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        payload.append(key, value);
      }
    });

    try {
      // Connect this endpoint when the FastAPI backend is ready.
      //
      // const response = await fetch(
      //   'http://localhost:8000/api/register',
      //   {
      //     method: 'POST',
      //     body: payload,
      //   }
      // );

      console.log('Form submitted successfully:', formData);
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  const inputClass =
    'w-full h-10 px-3 bg-[#b78d8d] text-black rounded-md border border-[#d5aaaa] outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 placeholder:text-gray-700';

  const labelClass =
    'block text-[13px] text-[#f3c65a] mb-1 font-medium';

  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* ================= NAVBAR ================= */}
      <nav className="h-14 bg-black flex items-center justify-between px-5 md:px-10 border-b border-gray-800">

        {/* Logo */}
        <div className="flex items-center">
          <div className="leading-none">
            <div className="text-red-600 font-black text-xl tracking-tight">
              E
              <span className="text-yellow-400">CELL</span>
            </div>
            <div className="text-[7px] text-gray-300 tracking-[0.25em]">
              ENTREPRENEURSHIP CELL
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-7 text-[10px] font-semibold">
          <a href="#home" className="hover:text-red-500 transition">
            HOME
          </a>
          <a href="#about" className="hover:text-red-500 transition">
            ABOUT US
          </a>
          <a href="#event" className="hover:text-red-500 transition">
            EVENT
          </a>
          <a href="#gallery" className="hover:text-red-500 transition">
            GALLERY
          </a>
          <a href="#team" className="hover:text-red-500 transition">
            TEAM
          </a>
          <a href="#initiative" className="hover:text-red-500 transition">
            INITIATIVE
          </a>
          <a href="#blogs" className="hover:text-red-500 transition">
            BLOGS
          </a>
        </div>
      </nav>

      {/* ================= MAIN ================= */}
<main
  className="
    relative
    min-h-[calc(100vh-56px)]
    overflow-hidden
    bg-black
  "
>
  <InitiativeBackground />

        {/* Registration container */}
        <div className="relative z-10 flex justify-center px-4 py-10 md:py-14">

<div
  className="
    w-full
    max-w-[560px]
    rounded-2xl
    bg-[#D70000]/40
    px-5 py-6
    md:px-7 md:py-6
    shadow-[0_20px_70px_rgba(0,0,0,0.65)]
  "
  style={{ fontFamily: "'Montagu Slab', serif" }}
>
            {/* Heading */}
            <h1 className="text-center text-2xl md:text-3xl font-bold text-[#ffd04a] mb-7">
              Register Here
            </h1>

            <form onSubmit={handleSubmit}>

              {/* ===== ROW 1 ===== */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">

                <div>
                  <label className={labelClass}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>

                {/* ===== ROW 2 ===== */}

                <div>
                  <label className={labelClass}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Student-ID</label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>

                {/* ===== ROW 3 ===== */}

                <div>
                  <label className={labelClass}>Branch</label>
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Year</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>

                {/* ===== ROW 4 ===== */}

                <div>
                  <label className={labelClass}>Division</label>
                  <input
                    type="text"
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Roll no.</label>
                  <input
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleInputChange}
                    required
                    className={inputClass}
                  />
                </div>

              </div>

              {/* ================= PAYMENT ================= */}
              <div className="mt-5">

                <label className={labelClass}>
                  Payment
                </label>

                <div className="flex justify-center">

                  <div className="w-[185px] rounded-xl bg-[#f4f7fb] p-3 text-black shadow-lg">

                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
                        <img
                          src="https://via.placeholder.com/150"
                          alt="Payment account"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <span className="text-[11px] font-semibold">
                        Abhin Shetty
                      </span>
                    </div>

                    <div className="bg-white p-1.5 rounded-md">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=abhin.shetty50@oksbi&am=100.00"
                        alt="UPI QR Code"
                        className="w-full aspect-square"
                      />
                    </div>

                    <p className="text-[8px] text-gray-500 mt-2 text-center">
                      UPI ID: abhin.shetty50@oksbi
                    </p>

                    <p className="text-[8px] text-gray-400 text-center">
                      Amount: ₹100.00
                    </p>

                    <p className="text-[7px] text-gray-400 text-center mt-1">
                      Scan to pay with any UPI app
                    </p>

                  </div>

                </div>
              </div>

              {/* ================= SCREENSHOT ================= */}
              <div className="mt-5">

                <label className={labelClass}>
                  Screenshot
                </label>

                <div className="h-10 rounded-md bg-[#b78d8d] border border-[#d5aaaa] flex items-center overflow-hidden">

                <label
  className="
   h-[80%]
my-1
px-1.5
flex
    items-center
    gap-2
    bg-gradient-to-r from-[#8F0000] to-[#290000]
    hover:bg-[#c00000]
    rounded-xl
    text-[#ffd04a]
    text-[9px]
    font-semibold
    cursor-pointer
    transition
  "
>
                    <Upload size={14} />
                    Choose File

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>

                  <span className="px-3 text-xs text-gray-700 truncate">
                    {fileName || 'No file chosen'}
                  </span>

                </div>
              </div>

              {/* ================= TRANSACTION ID ================= */}
              <div className="mt-4">

                <label className={labelClass}>
                  Transaction-ID
                </label>

                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                />

              </div>

              {/* ================= REGISTER ================= */}
              <div className="mt-5">

                <button
                  type="submit"
                  className="
                  w-[75%] mx-auto block
                    h-10
                    rounded-md
                    bg-gradient-to-r from-[#8F0000] to-[#290000]
                    hover:from-[#e00000] hover:to-[#850000]
                    text-[#ffd04a]
                    font-bold
                    text-lg
                    transition
                    shadow-lg
                  "
                >
                  Register
                </button>

              </div>

            </form>

          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black border-t border-gray-800 text-gray-400">

        <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

            {/* Brand */}
            <div>
             <img
  src={ecellLogo}
  alt="ECELL DMCE"
  className="w-24 h-auto object-contain"
/>
              <p className="text-[10px] text-gray-400 mt-2 flex items-start gap-1">
                <MapPin size={13} className="text-red-500 shrink-0" />
                <span>
                  Location: Datta Meghe College of Engineering,
                  Navi Mumbai
                </span>
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white text-xs font-semibold mb-3">
                Quick Links
              </h4>

              <ul className="space-y-1 text-[10px]">
                <li>
                  <a href="#home" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#event" className="hover:text-white">
                    Event
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-white">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#team" className="hover:text-white">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white text-xs font-semibold mb-3">
                Resources
              </h4>

              <ul className="space-y-1 text-[10px]">
                <li>
                  <a href="#faqs" className="hover:text-white">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#register" className="hover:text-white">
                    Register
                  </a>
                </li>
                <li>
                  <a href="#volunteer" className="hover:text-white">
                    Volunteer
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white text-xs font-semibold mb-3">
                Contact Us
              </h4>

              <ul className="space-y-2 text-[10px]">

                <li className="flex items-center gap-2">
                  <Mail size={13} className="text-red-500" />
                  <span>Ecell.dmce.14@gmail.com</span>
                </li>

                <li className="flex items-center gap-2">
  <FaInstagram size={13} className="text-red-500" />
  <a
    href="https://www.instagram.com/ecell_dmce?stkn=MWRnbXB2c2VzZHRuNg=="
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-red-500 transition"
  >
    ecell_dmce
  </a>
</li>

               <li className="flex items-center gap-2">
  <FaLinkedin size={13} className="text-red-500" />
  <a
    href="https://www.linkedin.com/company/e-celldmce/"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-red-500 transition"
  >
    ECell_DMCE
  </a>
</li>
              </ul>
            </div>

          </div>

          <div className="border-t border-gray-800 mt-7 pt-4 text-center text-[9px] text-gray-600">
            © 2026 ECELL | E-CELL DMCE. All Rights Reserved.
          </div>

        </div>

      </footer>

    </div>
  );
};