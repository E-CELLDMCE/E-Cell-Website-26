import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  Download,
  Edit,
  Plus,
  RefreshCw,
  TrendingUp,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [pendingRegs, setPendingRegs] = useState<RegistrationDetailResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const toast = useToast();

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [eventsData, pendingData] = await Promise.all([
        eventsApi.getEvents(),
        adminApi.getPendingRegistrations(),
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

  // Compute stats
  const totalEvents = events.length;
  const totalRegistrations = pendingRegs.length;
  const pendingApprovalsCount = pendingRegs.filter((r) => r.status === 'pending_approval').length;
  const approvedCount = pendingRegs.filter((r) => r.status === 'approved').length;

  return (
    <div className="space-y-8">
      
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Events */}
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-neutral-400">Total Events</span>
            <p className="text-3xl font-black text-white mt-1">{totalEvents}</p>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900 text-yellow-400">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Total Registrations */}
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-neutral-400">Registrations</span>
            <p className="text-3xl font-black text-white mt-1">{totalRegistrations}</p>
          </div>
          <div className="p-3 rounded-xl bg-neutral-900 text-cyan-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="p-6 rounded-2xl bg-neutral-950 border border-yellow-500/50 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-yellow-400">Needs Approval</span>
            <p className="text-3xl font-black text-yellow-400 mt-1">{pendingApprovalsCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-yellow-950/50 text-yellow-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Approved Passes */}
        <div className="p-6 rounded-2xl bg-neutral-950 border border-emerald-500/40 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">Approved Passes</span>
            <p className="text-3xl font-black text-emerald-400 mt-1">{approvedCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/50 text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Events List & Management Table */}
      <div className="rounded-3xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-tight">
              Event Management & Attendance Export
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Monitor registrations, edit capacity limits, and export attendee spreadsheets
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/events/new"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:from-red-500 hover:to-red-700 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" /> Create Event
            </Link>
          </div>
        </div>

        {/* Table Content */}
        {isLoading ? (
          <div className="p-12 text-center text-neutral-400 flex items-center justify-center gap-3">
            <RefreshCw className="w-5 h-5 animate-spin text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-wider">Loading Events...</span>
          </div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">
            <p className="text-sm">No events found in database.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-neutral-300">
              <thead className="bg-neutral-900/80 text-[10px] font-black uppercase tracking-widest text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th className="px-6 py-4">Event Title</th>
                  <th className="px-6 py-4">Fee / Type</th>
                  <th className="px-6 py-4">Total Regs</th>
                  <th className="px-6 py-4">Pending</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-xs">
                {events.map((event) => {
                  const eventRegs = pendingRegs.filter((r) => r.event_id === event.id);
                  const pendingThisEvent = eventRegs.filter((r) => r.status === 'pending_approval').length;

                  return (
                    <tr key={event.id} className="hover:bg-neutral-900/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">
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
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
                            {pendingThisEvent} pending
                          </span>
                        ) : (
                          <span className="text-neutral-500">0</span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-800 text-neutral-300">
                          {event.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleExportExcel(event.id, event.title)}
                            disabled={isExporting === event.id}
                            title="Download Attendee Excel Spreadsheet"
                            className="p-2 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-emerald-500 text-emerald-400 hover:bg-emerald-950/30 transition-colors cursor-pointer"
                          >
                            <FileSpreadsheet className="w-4 h-4" />
                          </button>

                          <Link
                            to={`/admin/events/${event.id}/edit`}
                            title="Edit Event"
                            className="p-2 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-yellow-400 text-yellow-400 hover:bg-yellow-950/30 transition-colors cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;
