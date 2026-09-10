import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { adminApi } from '../../api/admin';
import { UserProfile } from '../../api/users';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../api/client';
import {
  Users,
  Search,
  ShieldPlus,
  RefreshCw,
  GraduationCap,
  Mail,
  AlertCircle,
} from 'lucide-react';

export const UserManagePage: React.FC = () => {
  const [students, setStudents] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPromoting, setIsPromoting] = useState<string | null>(null);
  const toast = useToast();

  const fetchStudents = async (query = '') => {
    setIsLoading(true);
    try {
      const data = await adminApi.getStudentsForPromotion(query);
      setStudents(data);
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Failed to fetch students'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(search);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStudents(search);
  };

  const handlePromote = async (studentId: string, studentName: string) => {
    if (!window.confirm(`Are you sure you want to promote ${studentName} to Admin?`)) {
      return;
    }

    setIsPromoting(studentId);
    try {
      await adminApi.promoteUser(studentId);
      toast.success(`${studentName} has been promoted to Admin!`);
      // Refresh list
      fetchStudents(search);
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Failed to promote user'));
    } finally {
      setIsPromoting(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Header & Search */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-950/80 border border-neutral-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-red-500" />
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
              User Management & Admin Promotions
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Superadmin privileges: browse registered students and promote leaders to administrative role
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, student ID..."
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-500/50 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-red-950/40 cursor-pointer active:scale-95 shrink-0 flex items-center justify-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search</span>
          </button>
        </form>
      </div>

      {/* Student List Container */}
      <div className="rounded-2xl sm:rounded-3xl bg-neutral-950/80 border border-neutral-800 overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-12 text-center text-neutral-400 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-red-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Loading Student Directory...
            </span>
          </div>
        ) : students.length === 0 ? (
          <div className="p-12 text-center text-neutral-400 space-y-2">
            <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto" />
            <p className="text-sm font-medium text-neutral-300">No students found matching query.</p>
            <p className="text-xs text-neutral-400">Try searching for a different name, email, or student ID.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-neutral-300">
                <thead className="bg-neutral-900/60 text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-800/80">
                  <tr>
                    <th className="px-6 py-4">Student Name</th>
                    <th className="px-6 py-4">Student ID</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Branch / Year</th>
                    <th className="px-6 py-4 text-right">Promote Action</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-neutral-800/50 hover:bg-white/5 transition-colors duration-200 group"
                    >
                      <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-950/50 border border-red-500/30 flex items-center justify-center text-xs font-black text-red-400 flex-shrink-0">
                          {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white group-hover:text-red-400 transition-colors duration-200">
                            {student.name}
                          </p>
                          <span className="text-[10px] text-neutral-400">{student.phone || 'No phone'}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-mono font-bold text-neutral-200">
                        {student.stdid ? (
                          <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[11px]">
                            {student.stdid}
                          </span>
                        ) : (
                          <span className="text-neutral-400 font-sans italic text-[11px]">Not Set</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-neutral-300">
                        {student.email}
                      </td>

                      <td className="px-6 py-4 text-neutral-400">
                        {student.branch ? `${student.branch} (Yr ${student.year || '-'})` : 'Profile Incomplete'}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handlePromote(student.id, student.name)}
                          disabled={isPromoting === student.id}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-all duration-300 shadow-md shadow-red-950/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50"
                        >
                          <ShieldPlus className="w-3.5 h-3.5" />
                          {isPromoting === student.id ? 'Promoting...' : 'Promote to Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card-Based View: One card per student */}
            <div className="block md:hidden p-4 space-y-3">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-red-950/60 border border-red-500/30 flex items-center justify-center text-sm font-black text-red-400 flex-shrink-0">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-sm truncate">{student.name}</h3>
                        <p className="text-[11px] text-neutral-400 truncate">{student.email}</p>
                      </div>
                    </div>
                    {student.stdid && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neutral-900 border border-neutral-800 text-neutral-300 flex-shrink-0">
                        {student.stdid}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800/60 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-neutral-400 block">
                        Branch & Year
                      </span>
                      <span className="text-neutral-300 text-[11px]">
                        {student.branch ? `${student.branch} (Yr ${student.year || '-'})` : 'Incomplete'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-neutral-400 block">
                        Phone
                      </span>
                      <span className="text-neutral-300 text-[11px]">
                        {student.phone || 'No phone registered'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-800/60">
                    <button
                      onClick={() => handlePromote(student.id, student.name)}
                      disabled={isPromoting === student.id}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md shadow-red-950/40 active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                      <ShieldPlus className="w-4 h-4" />
                      {isPromoting === student.id ? 'Promoting User...' : 'Promote to Admin'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default UserManagePage;
