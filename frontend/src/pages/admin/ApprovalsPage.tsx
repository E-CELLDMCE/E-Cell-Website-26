import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { adminApi } from '../../api/admin';
import { apiClient } from '../../api/client';
import { RegistrationDetailResponse } from '../../api/registrations';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../api/client';
import {
  CheckCircle2, XCircle, Clock, RefreshCw, AlertCircle, UserCheck, ExternalLink
} from 'lucide-react';

export const ApprovalsPage: React.FC = () => {
  const [eventId, setEventId] = useState<string>('');
  const [events, setEvents] = useState<{id:string;title:string}[]>([]);
  const [nextReg, setNextReg] = useState<RegistrationDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [showScreenshot, setShowScreenshot] = useState(false);
  const toast = useToast();

  const loadNext = async (id: string) => {
    setIsLoading(true);
    setLoadError(null);
    setShowScreenshot(false);
    try {
      if (!id) { setNextReg(null); setIsLoading(false); return; }
      const res = await apiClient.get(`/admin/events/${id}/registrations/next`);
      setNextReg(res.data ?? null);
    } catch (err: any) {
      const msg = getErrorMessage(err, 'Failed to load next registration');
      setLoadError(msg);
      console.error('ApprovalsPage /next error:', msg, err);
      toast.error(msg);
    } finally { setIsLoading(false); }
  };

  useEffect(() => {
    apiClient.get('/events/')
      .then(r => {
        const evs = r.data || [];
        setEvents(evs);
        if (evs.length > 0) {
          setEventId(evs[0].id);
          loadNext(evs[0].id);
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => {
        setEvents([]);
        setIsLoading(false);
      });
  }, []);

  const handleDecide = async (action: 'verified' | 'rejected', reason?: string) => {
    if (!nextReg) return;
    setActionInProgress(nextReg.id);
    try {
      const endpoint = action === 'verified' ? adminApi.approveRegistration : adminApi.rejectRegistration;
      await endpoint(nextReg.id);
      toast.success(`Registration ${action}`);
      await loadNext(eventId);
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Decision failed'));
    } finally {
      setActionInProgress(null);
    }
  };

  if (loadError) {
    return (
      <div className="p-8 text-red-400 flex items-center gap-2">
        <AlertCircle /> {loadError}
      </div>
    );
  }

  if (isLoading) return <div className="p-8 text-neutral-400">Loading next item...</div>;

  if (!nextReg) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mb-3">Next Pending Review</h1>
        <div className="mb-4">
          <label htmlFor="event-select" className="text-sm text-neutral-400 block mb-1">Event</label>
          <select
            id="event-select"
            value={eventId}
            onChange={e => { const id = e.target.value; setEventId(id); loadNext(id); }}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Select event…</option>
            {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
          </select>
        </div>
        <div className="p-8 text-neutral-300 text-center">
          <UserCheck className="mx-auto mb-2 w-8 h-8 text-neutral-500" />
          <h2 className="text-lg font-semibold">No pending registrations</h2>
          <p className="text-sm text-neutral-400">Review queue is empty — call /next when new registrations arrive.</p>
        </div>
      </div>
    );
  }

  const screenshotUrl = nextReg.payment_screenshot_url;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-3">Next Pending Review</h1>
      <div className="mb-4">
        <label htmlFor="event-select" className="text-sm text-neutral-400 block mb-1">Event</label>
        <select
          id="event-select"
          value={eventId}
          onChange={e => { const id = e.target.value; setEventId(id); loadNext(id); }}
          className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">Select event…</option>
          {events.map(ev => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
        </select>
      </div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-lg font-semibold">{nextReg.event_title ?? 'Event'}</h2>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30">Pending Approval</span>
        </div>
        <p><strong>Team / Student:</strong> {nextReg.leader_name ?? 'Unknown'}</p>
        <p><strong>Created:</strong> {new Date(nextReg.created_at).toLocaleString()}</p>
        <p><strong>Fee charged:</strong> {(nextReg as any).fee_charged ?? nextReg.amount_paid ?? '—'}</p>
        <p><strong>Early bird:</strong> {(nextReg as any).is_early_bird ? 'Yes' : 'No'}</p>
        <p><strong>Transaction ID:</strong> {nextReg.transaction_id ?? '—'}</p>

        {/* Payment screenshot preview */}
        <div className="mt-4">
          <p className="font-semibold mb-2">Payment Screenshot</p>
          {screenshotUrl ? (
            <>
              <img
                src={screenshotUrl}
                alt="Payment screenshot"
                onClick={() => setShowScreenshot(true)}
                className="w-full max-w-sm rounded-lg border border-neutral-700 cursor-pointer hover:border-red-500/60 transition-colors"
              />
              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowScreenshot(true)}
                  className="text-xs text-red-400 hover:text-red-300 font-bold uppercase"
                >
                  View Full Size
                </button>
                <a
                  href={screenshotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-neutral-400 hover:text-white font-bold uppercase flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" /> Open in new tab
                </a>
              </div>
            </>
          ) : (
            <p className="text-xs text-neutral-500">No screenshot uploaded.</p>
          )}
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={() => handleDecide('verified')} disabled={!!actionInProgress} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium">Verify</button>
          <button onClick={() => handleDecide('rejected', 'Rejected by admin')} disabled={!!actionInProgress} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium">Reject</button>
          <button onClick={() => loadNext(eventId)} className="px-3 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white text-sm"><RefreshCw className="w-4 h-4" /></button>
        </div>
        <p className="text-xs text-neutral-500 mt-3">Call /next again after deciding to load the following item.</p>
      </motion.div>

      {/* Full-screen screenshot modal */}
      {showScreenshot && screenshotUrl && (
        <div
          onClick={() => setShowScreenshot(false)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-6 cursor-zoom-out"
        >
          <img
            src={screenshotUrl}
            alt="Payment screenshot full size"
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full rounded-lg border border-neutral-700 shadow-2xl"
          />
          <button
            type="button"
            onClick={() => setShowScreenshot(false)}
            className="absolute top-6 right-6 text-white text-2xl font-bold hover:text-red-400"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ApprovalsPage;