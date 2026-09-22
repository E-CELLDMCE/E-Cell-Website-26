import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { eventsApi, EventItem } from '../../api/events';
import { adminApi } from '../../api/admin';
import { RegistrationDetailResponse } from '../../api/registrations';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../api/client';
import {
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  FileSpreadsheet,
  AlertCircle,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [pendingRegs, setPendingRegs] = useState<RegistrationDetailResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [eventToDelete, setEventToDelete] = useState<EventItem | null>(null);
  const toast = useToast();

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [eventsData, pendingData] = await Promise.all([
        eventsApi.getEvents(),
        adminApi.getPendingRegistrations().catch((e: any) => { console.error('pending registrations unavailable (design: /next only):', e); return []; }),
      ]);
      setEvents(eventsData);
      setPendingRegs(pendingData);
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Failed to load dashboard data'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleExportExcel = async (eventId: string, title: string) => {
    setIsExporting(eventId);
    try {
      await adminApi.downloadExportExcel(eventId, title);
      toast.success(`Exported registrations for ${title}`);
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Failed to download Excel export'));
    } finally {
      setIsExporting(null);
    }
  };

  const handleDeleteClick = (event: EventItem) => {
    setEventToDelete(event);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;
    const { id, title } = eventToDelete;
    setDeletingId(id);
    try {
      await eventsApi.deleteEvent(id);
      // Remove event from local state
      setEvents((prev) => prev.filter((e) => e.id !== id));
      // Remove registrations for this event to keep metric counters synchronized
      setPendingRegs((prev) => prev.filter((r) => r.event_id !== id));
      toast.success(`Event "${title}" removed from UI. Data retained in database for 7 days before automatic deletion.`);
      setEventToDelete(null);
    } catch (err: any) {
      toast.error(getErrorMessage(err, `Failed to delete event "${title}"`));
    } finally {
      setDeletingId(null);
    }
  };

  // Compute stats
  const totalEvents = events.length;
  const totalRegistrations = pendingRegs.length;
  const pendingApprovalsCount = pendingRegs.filter((r) => r.status === 'pending_approval').length;
  const approvedCount = pendingRegs.filter((r) => r.status === 'approved').length;

  const getStatusBadge = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s === 'active' || s === 'published' || s === 'open' || s === 'ongoing') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
          {status}
        </span>
      );
    }
    if (s === 'cancelled' || s === 'closed' || s === 'past' || s === 'ended') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-950/60 text-red-400 border border-red-500/30">
          {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-800/80 text-neutral-300 border border-neutral-700/60">
        {status || 'Upcoming'}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6 sm:space-y-8 pb-20 md:pb-0"
    >
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
        
        {/* Total Events */}
        <div className="group relative p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_4px_25px_rgba(220,38,38,0.12)] flex flex-col justify-between overflow-hidden">
          <div className="flex items-start justify-between">
            <span className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-neutral-400">
              Total Events
            </span>
            <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 group-hover:text-red-400 group-hover:border-red-500/30 transition-all duration-300">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
              {totalEvents}
            </p>
            <p className="text-[10px] text-neutral-400 mt-0.5">Active & archived</p>
          </div>
        </div>

        {/* Total Registrations */}
        <div className="group relative p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_4px_25px_rgba(220,38,38,0.12)] flex flex-col justify-between overflow-hidden">
          <div className="flex items-start justify-between">
            <span className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-neutral-400">
              Registrations
            </span>
            <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 group-hover:text-red-400 group-hover:border-red-500/30 transition-all duration-300">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
              {totalRegistrations}
            </p>
            <p className="text-[10px] text-neutral-400 mt-0.5">Across all events</p>
          </div>
        </div>

        {/* Needs Approval */}
        <div
          className={`group relative p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_25px_rgba(245,158,11,0.12)] flex flex-col justify-between overflow-hidden ${
            pendingApprovalsCount > 0 ? 'border-amber-500/40' : 'border-neutral-800/80 hover:border-amber-500/40'
          }`}
        >
          <div className="flex items-start justify-between">
            <span className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-amber-400">
              Needs Approval
            </span>
            <div className="p-2 sm:p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 group-hover:border-amber-500/60 transition-all duration-300">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              {pendingApprovalsCount}
            </p>
            <p className="text-[10px] text-amber-400/80 mt-0.5">Awaiting manual check</p>
          </div>
        </div>

        {/* Approved Passes */}
        <div className="group relative p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_4px_25px_rgba(16,185,129,0.12)] flex flex-col justify-between overflow-hidden">
          <div className="flex items-start justify-between">
            <span className="text-[11px] sm:text-xs uppercase font-bold tracking-wider text-emerald-400">
              Approved Passes
            </span>
            <div className="p-2 sm:p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 group-hover:border-emerald-500/60 transition-all duration-300">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
              {approvedCount}
            </p>
            <p className="text-[10px] text-emerald-400/80 mt-0.5">Tickets active</p>
          </div>
        </div>

      </div>

      {/* Events List & Management Section */}
      <div className="rounded-2xl sm:rounded-3xl bg-neutral-950/80 border border-neutral-800 overflow-hidden shadow-2xl">
        <div className="p-4 sm:p-6 border-b border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
              Event Management & Attendance Export
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Monitor registrations, edit capacity limits, and export attendee spreadsheets
            </p>
          </div>

          {/* Desktop Create Event Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/admin/events/new"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-md shadow-red-950/50 hover:shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Create Event
            </Link>
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="p-12 text-center text-neutral-400 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-red-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Loading Events...</span>
          </div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center text-neutral-400 space-y-3">
            <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto" />
            <p className="text-sm font-medium text-neutral-400">No events found in database.</p>
            <Link
              to="/admin/events/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs font-bold uppercase tracking-wider hover:border-red-500 hover:text-red-400 transition-all duration-300"
            >
              <Plus className="w-4 h-4" /> Create First Event
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table: Hidden on Mobile */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-neutral-300">
                <thead className="bg-neutral-900/60 text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-800/80">
                  <tr>
                    <th className="px-6 py-4">Event Title</th>
                    <th className="px-6 py-4">Fee / Type</th>
                    <th className="px-6 py-4">Total Regs</th>
                    <th className="px-6 py-4">Pending</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {events.map((event) => {
                    const eventRegs = pendingRegs.filter((r) => r.event_id === event.id);
                    const pendingThisEvent = eventRegs.filter((r) => r.status === 'pending_approval').length;

                    return (
                      <tr
                        key={event.id}
                        className="border-b border-neutral-800/50 hover:bg-white/5 transition-colors duration-200 group"
                      >
                        <td className="px-6 py-4 font-bold text-white group-hover:text-red-400 transition-colors duration-200">
                          <div className="line-clamp-1">{event.title}</div>
                          <span className="text-[10px] text-neutral-400 font-normal">
                            {event.event_date ? new Date(event.event_date).toLocaleDateString() : 'Date TBA'}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="font-semibold text-white">
                            {Number(event.fee_amount) === 0 ? 'Free' : `₹${event.fee_amount}`}
                          </span>
                          <span className="block text-[10px] text-neutral-400">
                            {event.is_team_event ? `Team (${event.min_team_size}-${event.max_team_size})` : 'Solo'}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="font-mono font-bold text-white">{eventRegs.length}</span>
                          {event.max_capacity && (
                            <span className="text-[10px] text-neutral-400"> / {event.max_capacity} cap</span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {pendingThisEvent > 0 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                              {pendingThisEvent} pending
                            </span>
                          ) : (
                            <span className="text-neutral-400">0</span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {getStatusBadge(event.status)}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Export Excel Button with Tooltip */}
                            <div className="relative group/tooltip">
                              <button
                                onClick={() => handleExportExcel(event.id, event.title)}
                                disabled={isExporting === event.id}
                                aria-label="Export Attendee Spreadsheet"
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-900 border border-neutral-700/80 text-emerald-400 hover:bg-emerald-950/50 hover:border-emerald-500 hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-sm"
                              >
                                {isExporting === event.id ? (
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <FileSpreadsheet className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 px-2 py-0.5 text-[10px] font-semibold bg-neutral-900 text-neutral-200 border border-neutral-750 rounded-md shadow-xl whitespace-nowrap z-20">
                                Export Excel
                              </span>
                            </div>

                            {/* Edit Event Button with Tooltip */}
                            <div className="relative group/tooltip">
                              <Link
                                to={`/admin/events/${event.id}/edit`}
                                aria-label="Edit Event"
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-900 border border-neutral-700/80 text-neutral-300 hover:text-white hover:bg-neutral-800 hover:border-neutral-500 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Link>
                              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 px-2 py-0.5 text-[10px] font-semibold bg-neutral-900 text-neutral-200 border border-neutral-750 rounded-md shadow-xl whitespace-nowrap z-20">
                                Edit Event
                              </span>
                            </div>

                            {/* Delete Event Button with Tooltip */}
                            <div className="relative group/tooltip">
                              <button
                                onClick={() => handleDeleteClick(event)}
                                disabled={deletingId === event.id}
                                aria-label="Delete Event"
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-900 border border-neutral-700/80 text-neutral-400 hover:text-red-400 hover:bg-red-950/40 hover:border-red-500/60 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-sm disabled:opacity-50"
                              >
                                {deletingId === event.id ? (
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-400" />
                                ) : (
                                  <Trash2 className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 px-2 py-0.5 text-[10px] font-semibold bg-neutral-900 text-neutral-200 border border-neutral-750 rounded-md shadow-xl whitespace-nowrap z-20">
                                Delete Event
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card-Based Layout: Visible only on small screens */}
            <div className="block md:hidden p-4 space-y-3">
              {events.map((event) => {
                const eventRegs = pendingRegs.filter((r) => r.event_id === event.id);
                const pendingThisEvent = eventRegs.filter((r) => r.status === 'pending_approval').length;

                return (
                  <div
                    key={event.id}
                    className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-300 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-bold text-white text-sm line-clamp-1">
                          {event.title}
                        </h3>
                        <span className="text-[11px] text-neutral-400 mt-0.5 block">
                          {event.event_date ? new Date(event.event_date).toLocaleDateString() : 'Date TBA'}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        {getStatusBadge(event.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 text-xs border-t border-neutral-800/60">
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-neutral-400 block">
                          Fee / Type
                        </span>
                        <span className="font-medium text-white">
                          {Number(event.fee_amount) === 0 ? 'Free' : `₹${event.fee_amount}`}
                        </span>
                        <span className="text-[10px] text-neutral-400 ml-1">
                          ({event.is_team_event ? `Team ${event.min_team_size}-${event.max_team_size}` : 'Solo'})
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-semibold text-neutral-400 block">
                          Registrations
                        </span>
                        <span className="font-mono font-bold text-white">{eventRegs.length}</span>
                        {event.max_capacity && (
                          <span className="text-[10px] text-neutral-400"> / {event.max_capacity}</span>
                        )}
                        {pendingThisEvent > 0 && (
                          <span className="ml-1.5 inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            {pendingThisEvent} pend
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60">
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                        Quick Actions
                      </span>
                      <div className="flex items-center gap-2">
                        {/* Export Button */}
                        <div className="relative group/mob-export">
                          <button
                            onClick={() => handleExportExcel(event.id, event.title)}
                            disabled={isExporting === event.id}
                            aria-label="Export Attendee Spreadsheet"
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-900 border border-neutral-700/80 text-emerald-400 hover:bg-emerald-950/50 hover:border-emerald-500 active:scale-90 transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-sm"
                          >
                            {isExporting === event.id ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <FileSpreadsheet className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>

                        {/* Edit Button */}
                        <div className="relative group/mob-edit">
                          <Link
                            to={`/admin/events/${event.id}/edit`}
                            aria-label="Edit Event"
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-900 border border-neutral-700/80 text-neutral-300 hover:text-white hover:bg-neutral-800 hover:border-neutral-500 active:scale-90 transition-all duration-300 cursor-pointer shadow-sm"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>
                        </div>

                        {/* Delete Button */}
                        <div className="relative group/mob-delete">
                          <button
                            onClick={() => handleDeleteClick(event)}
                            disabled={deletingId === event.id}
                            aria-label="Delete Event"
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-900 border border-neutral-700/80 text-neutral-400 hover:text-red-400 hover:bg-red-950/40 hover:border-red-500/60 active:scale-90 transition-all duration-300 cursor-pointer shadow-sm disabled:opacity-50"
                          >
                            {deletingId === event.id ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-400" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Floating Action Button (FAB) on Mobile for Create Event */}
      <Link
        to="/admin/events/new"
        aria-label="Create Event"
        className="md:hidden fixed bottom-6 right-6 z-40 flex items-center justify-center gap-2 h-12 px-4 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-[0_4px_25px_rgba(225,29,72,0.5)] border border-red-400/40 active:scale-95 transition-all duration-300 hover:shadow-[0_6px_30px_rgba(225,29,72,0.7)]"
      >
        <Plus className="w-4 h-4" />
        <span>Create Event</span>
      </Link>

      {/* Delete Confirmation Modal */}
      {eventToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Delete Event</h3>
                <p className="text-xs text-neutral-400">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-white">"{eventToDelete.title}"</span>? The event will be immediately hidden from the UI. Its data will remain safely stored in the database for 7 days, after which it will be permanently deleted.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEventToDelete(null)}
                disabled={Boolean(deletingId)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-all cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={Boolean(deletingId)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:scale-95 shadow-lg shadow-red-900/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {deletingId ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Event</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};


export default AdminDashboard;
