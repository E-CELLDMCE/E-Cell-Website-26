import React, { useEffect, useState } from 'react';
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
  CheckCircle2,
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
    <div className="space-y-6">
      
      {/* Header & Search */}
      <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">
            User Management & Admin Promotions
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Superadmin privileges: browse registered students and promote leaders to administrative role
          </p>
        </div>

        {/* Search input */}
        <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, student ID..."
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Student List */}
      <div className="rounded-3xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-12 text-center text-neutral-400 flex items-center justify-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Loading Student Directory...</span>
          </div>
        ) : students.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">
            <p className="text-sm">No students found matching query.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-300">
              <thead className="bg-neutral-900/80 text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="px-6 py-4">Student Name</th>
                  <th className="px-6 py-4">Student ID</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Branch / Year</th>
                  <th className="px-6 py-4 text-right">Promote Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-xs">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-neutral-900/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-black text-yellow-400">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-white">{student.name}</p>
                        <span className="text-[10px] text-neutral-500">{student.phone || 'No phone'}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-mono font-bold text-yellow-400">
                      {student.stdid || <span className="text-neutral-500 font-sans italic">Not Set</span>}
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
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 ml-auto transition-all shadow-md cursor-pointer disabled:opacity-50"
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
        )}
      </div>

    </div>
  );
};

export default UserManagePage;
