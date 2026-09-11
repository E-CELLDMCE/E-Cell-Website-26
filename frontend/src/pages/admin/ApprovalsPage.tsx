import React, { useEffect, useState } from 'react';
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
  Search,
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

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white uppercase tracking-tight">
            Registration & Payment Approvals
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Review submitted bank UTRs, verify payment screenshots, and grant event admission
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-xs text-white focus:outline-none focus:border-yellow-400 cursor-pointer"
          >
            <option value="pending_approval">Pending Approval (Action Required)</option>
            <option value="approved">Approved Passes</option>
            <option value="rejected">Rejected</option>
            <option value="pending_payment">Awaiting Payment</option>
            <option value="all">All Registrations</option>
          </select>

          <button
            onClick={loadRegistrations}
            disabled={isLoading}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-yellow-400 text-yellow-400 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Registrations List */}
      {isLoading ? (
        <div className="py-20 text-center text-neutral-400 flex items-center justify-center gap-3">
          <RefreshCw className="w-5 h-5 animate-spin text-yellow-400" />
          <span className="text-xs font-bold uppercase tracking-wider">Loading Registrations...</span>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-neutral-950/60 border border-neutral-900 p-8 space-y-2">
          <CheckCircle2 className="w-12 h-12 text-neutral-600 mx-auto" />
          <h3 className="text-base font-bold text-white uppercase">Queue Empty</h3>
          <p className="text-xs text-neutral-400">
            No registrations currently found in "{filterStatus}" status.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredList.map((reg) => {
            const isProcessing = actionInProgress === reg.id;
            const canReview = reg.status === 'pending_approval' || reg.status === 'rejected';

            return (
              <div
                key={reg.id}
                className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                {/* Event & Leader Details */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-sm font-black text-white">
                      {reg.event_title || 'E-Cell Event'}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        reg.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : reg.status === 'rejected'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      }`}
                    >
                      {reg.status.replace('_', ' ')}
                    </span>
                    {reg.retry_count > 0 && (
                      <span className="text-[10px] text-red-400 font-bold">
                        (Retried {reg.retry_count}x)
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-4 text-xs text-neutral-400">
                    <p>
                      <strong className="text-neutral-300">Leader:</strong> {reg.leader_name} ({reg.leader_stdid || 'No ID'})
                    </p>
                    <p>
                      <strong className="text-neutral-300">Team:</strong> {reg.team_name || 'Solo Registration'}
                    </p>
                    <p>
                      <strong className="text-neutral-300">Fee Amount:</strong> ₹{reg.amount_paid}
                    </p>
                    <p className="sm:col-span-2">
                      <strong className="text-neutral-300">Transaction / UTR:</strong>{' '}
                      <span className="font-mono text-yellow-400 font-bold">
                        {reg.transaction_id || 'Not Submitted'}
                      </span>
                    </p>
                  </div>

                  {/* Members Roster preview */}
                  {reg.members && reg.members.length > 1 && (
                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                        Roster ({reg.members.length} members):
                      </span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {reg.members.map((m) => (
                          <span
                            key={m.id}
                            className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300"
                          >
                            {m.student_name} ({m.student_stdid || 'N/A'})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions & Proof */}
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
                  {/* View Screenshot Button */}
                  {reg.payment_screenshot_url ? (
                    <button
                      onClick={() => setSelectedScreenshotUrl(reg.payment_screenshot_url || null)}
                      className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-yellow-400 text-yellow-400 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Screenshot
                    </button>
                  ) : (
                    <span className="text-[11px] text-neutral-500 italic px-3">No screenshot uploaded</span>
                  )}

                  {/* Approve / Reject Actions */}
                  {reg.status !== 'approved' && (
                    <button
                      onClick={() => handleApprove(reg.id)}
                      disabled={isProcessing}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve
                    </button>
                  )}

                  {reg.status !== 'rejected' && (
                    <button
                      onClick={() => handleReject(reg.id)}
                      disabled={isProcessing}
                      className="px-4 py-2 rounded-xl bg-neutral-900 border border-red-500/40 text-red-400 hover:bg-red-950/40 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SCREENSHOT MODAL VIEWER */}
      {selectedScreenshotUrl && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-sm font-bold uppercase text-white tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-yellow-400" />
                Payment Proof Screenshot
              </h3>
              <button
                onClick={() => setSelectedScreenshotUrl(null)}
                className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden bg-black flex items-center justify-center max-h-[70vh]">
              <img
                src={selectedScreenshotUrl}
                alt="Proof of Payment"
                className="max-h-[68vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedScreenshotUrl(null)}
                className="px-5 py-2 rounded-xl bg-yellow-400 text-black text-xs font-bold uppercase tracking-wider"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ApprovalsPage;
