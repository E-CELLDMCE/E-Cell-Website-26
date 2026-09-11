import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { usersApi } from '../api/users';
import { getErrorMessage } from '../api/client';
import { UserCheck, Sparkles, BookOpen, Hash, Phone, Building } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [stdid, setStdid] = useState(user?.stdid || '');
  const [branch, setBranch] = useState(user?.branch || 'Computer Engineering');
  const [year, setYear] = useState<number>(user?.year || 2);
  const [phone, setPhone] = useState(user?.phone || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stdid.trim()) {
      toast.error('Student ID is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const updated = await usersApi.updateProfile({
        stdid: stdid.trim().toUpperCase(),
        branch: branch.trim(),
        year: Number(year),
        phone: phone.trim() || undefined,
      });

      updateUser(updated);
      toast.success('Profile completed successfully! You can now register for events.');
      navigate('/events');
    } catch (err: any) {
      const msg = getErrorMessage(err);
      if (msg.toLowerCase().includes('already') || msg.toLowerCase().includes('registered')) {
        toast.error('Student ID already in use');
      } else {
        toast.error(msg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-28 pb-16 px-4 flex items-center justify-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 50% 20%, #8b0000 0%, #300000 40%, #000000 90%)
        `,
      }}
    >
      <div className="w-full max-w-lg bg-black/90 backdrop-blur-2xl border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative z-10">
        
        {/* Header Icon */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-yellow-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-950/50">
          <UserCheck className="w-7 h-7 text-white" />
        </div>

        <div className="text-center mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-yellow-400 bg-yellow-950/40 border border-yellow-500/30 px-3 py-1 rounded-full">
            Required For Event Participation
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-3 uppercase tracking-tight">
            Complete Student Profile
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Your unique Student ID is required for team lookup, event passes, and digital certificate issuance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Student ID */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-yellow-400" />
              Student ID / Roll Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={stdid}
              onChange={(e) => setStdid(e.target.value)}
              placeholder="e.g. STD2026105 or 23CO102"
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono text-sm uppercase focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
            />
            <p className="text-[11px] text-neutral-500">Must be unique to your college enrollment.</p>
          </div>

          {/* Branch / Department */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-yellow-400" />
              Department / Branch <span className="text-red-500">*</span>
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors cursor-pointer"
            >
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
              <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
            </select>
          </div>

          {/* Year of Study */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-yellow-400" />
              Year of Study <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setYear(yr)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    year === yr
                      ? 'bg-yellow-400 text-black shadow-md shadow-yellow-500/30'
                      : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                  }`}
                >
                  Year {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-yellow-400" />
              Phone / WhatsApp Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-sm uppercase tracking-wider hover:from-red-500 hover:to-red-700 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all cursor-pointer"
          >
            {isSubmitting ? 'Saving Profile...' : 'Save & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
