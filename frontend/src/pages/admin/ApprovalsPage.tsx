import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { adminApi } from '../../api/admin';
import { RegistrationDetailResponse } from '../../api/registrations';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../api/client';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  AlertCircle,
  RefreshCw,
  Filter,
  X,
  CreditCard,
  Users,
} from 'lucide-react';

export const ApprovalsPage: React.FC = () => {
  const [registrations, setRegistrations] = useState<RegistrationDetailResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('pending_approval');
  const [selectedScreenshotUrl, setSelectedScreenshotUrl] = useState<string | null>(null);
  const toast = useToast();

  const loadRegistrations = async () => {
    setIsLoading(true);
    try {
      const data = await adminApi.getPendingRegistrations();
      setRegistrations(data);
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Failed to fetch registrations'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRegistrations();
  }, []);

  const handleApprove = async (regId: string) => {
    setActionInProgress(regId);
    try {
      await adminApi.approveRegistration(regId);
      toast.success('Registration approved & digital ticket passes issued!');
      // Update local state
      setRegistrations((prev) =>
        prev.map((r) => (r.id === regId ? { ...r, status: 'approved' } : r))
      );
    } catch (err: any) {
      if (err.response?.status === 409) {
        toast.error('Action failed — registration already processed');
      } else {
        toast.error(getErrorMessage(err, 'Failed to approve registration'));
      }
    } finally {
      setActionInProgress(null);
    }
  };

  const handleReject = async (regId: string) => {
    setActionInProgress(regId);
    try {
      await adminApi.rejectRegistration(regId);
      toast.warning('Registration rejected. Student has been granted retry attempt.');
      setRegistrations((prev) =>
        prev.map((r) => (r.id === regId ? { ...r, status: 'rejected', retry_count: r.retry_count + 1 } : r))
      );
    } catch (err: any) {
      if (err.response?.status === 409) {
        toast.error('Action failed — registration already processed');
      } else {
        toast.error(getErrorMessage(err, 'Failed to reject registration'));
      }
    } finally {
      setActionInProgress(null);
    }
  };

  const filteredList = registrations.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'approved') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
          Approved
        </span>
      );
    }
    if (status === 'rejected') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-950/60 text-red-400 border border-red-500/30">
          Rejected
        </span>
      );
    }
    if (status === 'pending_approval') {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
          Pending Approval
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-800 text-neutral-300 border border-neutral-700">
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Header & Controls */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-950/80 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-red-500" />
            <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
              Registration & Payment Approvals
            </h2>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Review submitted bank UTRs, verify payment screenshots, and grant event admission
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <div className="relative flex-1 md:w-64">
            <Filter className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-red-500/50 transition-all duration-300 cursor-pointer appearance-none"
            >
              <option value="pending_approval">Pending Approval (Action Req.)</option>
              <option value="approved">Approved Passes</option>
              <option value="rejected">Rejected</option>
              <option value="pending_payment">Awaiting Payment</option>
              <option value="all">All Registrations</option>
            </select>
          </div>

          <button
            onClick={loadRegistrations}
            disabled={isLoading}
            aria-label="Refresh Registrations"
            className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-500/50 text-neutral-300 hover:text-white transition-all duration-300 cursor-pointer active:scale-95 disabled:opacity-50 shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-red-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Registrations List */}
      {isLoading ? (
        <div className="p-16 text-center text-neutral-400 flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-red-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Loading Registrations...</span>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="py-16 text-center rounded-2xl sm:rounded-3xl bg-neutral-950/60 border border-neutral-900 p-8 space-y-2">
          <CheckCircle2 className="w-12 h-12 text-neutral-700 mx-auto" />
          <h3 className="text-base font-bold text-white uppercase">Queue Empty</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            No registrations currently found in "{filterStatus.replace('_', ' ')}" status.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredList.map((reg) => {
            const isProcessing = actionInProgress === reg.id;

            return (
              <div
                key={reg.id}
                className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 shadow-lg"
              >
                {/* Event & Leader Details */}
                <div className="space-y-3 flex-1 w-full min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
                      {reg.event_title || 'E-Cell Event'}
                    </span>
                    {getStatusBadge(reg.status)}
                    {reg.retry_count > 0 && (
                      <span className="text-[10px] text-red-400 font-bold bg-red-950/40 border border-red-500/30 px-2 py-0.5 rounded-full">
                        Retried {reg.retry_count}x
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs text-neutral-400 bg-neutral-900/40 p-3 rounded-xl border border-neutral-800/60">
                    <div>
                      <strong className="text-neutral-300 font-semibold block text-[10px] uppercase">Leader:</strong>
                      <span className="text-white truncate block">{reg.leader_name} ({reg.leader_stdid || 'No ID'})</span>
                    </div>
                    <div>
                      <strong className="text-neutral-300 font-semibold block text-[10px] uppercase">Team:</strong>
                      <span className="text-white truncate block">{reg.team_name || 'Solo Registration'}</span>
                    </div>
                    <div>
                      <strong className="text-neutral-300 font-semibold block text-[10px] uppercase">Fee Amount:</strong>
                      <span className="font-semibold text-emerald-400">₹{reg.amount_paid}</span>
                    </div>
                    <div className="sm:col-span-2 md:col-span-3 pt-1 border-t border-neutral-800/60 flex items-center gap-2 flex-wrap">
                      <strong className="text-neutral-300 font-semibold text-[10px] uppercase">Transaction / UTR:</strong>
                      <span className="font-mono text-xs text-neutral-200 font-bold bg-neutral-900 px-2 py-0.5 rounded border border-neutral-700/80">
                        {reg.transaction_id || 'Not Submitted'}
                      </span>
                    </div>
                  </div>

                  {/* Members Roster Preview */}
                  {reg.members && reg.members.length > 1 && (
                    <div className="pt-1">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider flex items-center gap-1">
                        <Users className="w-3 h-3 text-neutral-400" />
                        Roster ({reg.members.length} members):
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {reg.members.map((m) => (
                          <span
                            key={m.id}
                            className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300"
                          >
                            {m.student_name} ({m.student_stdid || 'N/A'})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions & Proof */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto lg:flex-shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-800/80">
                  {/* View Screenshot Button */}
                  {reg.payment_screenshot_url ? (
                    <button
                      onClick={() => setSelectedScreenshotUrl(reg.payment_screenshot_url || null)}
                      className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700/80 hover:border-neutral-500 text-neutral-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 cursor-pointer shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5 text-neutral-400" />
                      <span>View Screenshot</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-neutral-400 italic px-2 py-1 text-center">
                      No screenshot uploaded
                    </span>
                  )}

                  {/* Approve Action */}
                  {reg.status !== 'approved' && (
                    <button
                      onClick={() => handleApprove(reg.id)}
                      disabled={isProcessing}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md shadow-emerald-950/40 active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                      <span>Approve</span>
                    </button>
                  )}

                  {/* Reject Action */}
                  {reg.status !== 'rejected' && (
                    <button
                      onClick={() => handleReject(reg.id)}
                      disabled={isProcessing}
                      className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-red-500/40 text-red-400 hover:bg-red-950/40 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      <span>Reject</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SCREENSHOT MODAL VIEWER */}
      <AnimatePresence>
        {selectedScreenshotUrl && (
          <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-2xl w-full bg-neutral-950 border border-neutral-800 rounded-3xl p-4 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="text-sm font-bold uppercase text-white tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-red-500" />
                  Payment Proof Screenshot
                </h3>
                <button
                  onClick={() => setSelectedScreenshotUrl(null)}
                  className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors active:scale-95 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="rounded-2xl overflow-auto bg-black flex items-center justify-center p-2 flex-1 min-h-0">
                <img
                  src={selectedScreenshotUrl}
                  alt="Proof of Payment"
                  className="max-h-[60vh] w-auto object-contain rounded-xl"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedScreenshotUrl(null)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-white text-xs font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ApprovalsPage;
