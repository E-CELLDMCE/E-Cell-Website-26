import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  registrationsApi,
  MemberTicketResponse,
  RegistrationDetailResponse,
} from '../api/registrations';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getErrorMessage } from '../api/client';
import {
  Ticket,
  QrCode,
  Calendar,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export const MyTicketsPage: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<'tickets' | 'registrations'>('tickets');
  const [tickets, setTickets] = useState<MemberTicketResponse[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationDetailResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [ticketsData, regsData] = await Promise.all([
        registrationsApi.getMyTickets(),
        registrationsApi.getMyRegistrations(),
      ]);
      setTickets(ticketsData);
      setRegistrations(regsData);
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Failed to load tickets'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const downloadQrCode = (qrBase64: string, eventTitle: string) => {
    const link = document.createElement('a');
    link.href = qrBase64.startsWith('data:') ? qrBase64 : `data:image/png;base64,${qrBase64}`;
    link.download = `${eventTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_ticket_qr.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast.success('Ticket QR downloaded');
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
          <div>
            <span className="text-xs font-bold tracking-widest text-yellow-400 uppercase bg-yellow-950/40 border border-yellow-500/30 px-3 py-1 rounded-full">
              Student Passports & Credentials
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-2 uppercase tracking-tight">
              My Entry <span className="text-yellow-400">Tickets</span>
            </h1>
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchData}
            disabled={isLoading}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-yellow-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-yellow-400' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-2 p-1.5 rounded-2xl bg-neutral-950 border border-neutral-800 mb-8 max-w-md">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'tickets'
                ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            Approved Tickets ({tickets.length})
          </button>
          <button
            onClick={() => setActiveTab('registrations')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'registrations'
                ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-lg'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Ticket className="w-4 h-4" />
            All Registrations ({registrations.length})
          </button>
        </div>

        {/* TAB 1: APPROVED TICKETS WITH HIGH-RES BASE64 QR */}
        {activeTab === 'tickets' && (
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((n) => (
                  <div key={n} className="h-72 rounded-3xl bg-neutral-950 border border-neutral-900 animate-pulse" />
                ))}
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-20 rounded-3xl bg-neutral-950/60 border border-neutral-900 p-8 space-y-3">
                <Ticket className="w-12 h-12 text-yellow-500/40 mx-auto" />
                <h3 className="text-lg font-bold text-white uppercase">No Active Tickets Found</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Once your event registration and payment proof are approved by E-Cell coordinators, your unique entry ticket and gate QR code will appear here.
                </p>
                <div className="pt-2">
                  <Link
                    to="/events"
                    className="inline-block px-6 py-2.5 rounded-full bg-yellow-400 text-black text-xs font-black uppercase tracking-wider hover:bg-yellow-300 transition-colors"
                  >
                    Browse Events & Register
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {tickets.map((ticket, index) => {
                  const qrSrc = ticket.qr_code_base64.startsWith('data:')
                    ? ticket.qr_code_base64
                    : `data:image/png;base64,${ticket.qr_code_base64}`;

                  return (
                    <div
                      key={ticket.ticket_qr_token || index}
                      className="rounded-3xl bg-gradient-to-b from-neutral-900 to-neutral-950 border-2 border-yellow-500/70 overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between"
                    >
                      {/* Ticket Header */}
                      <div className="p-6 pb-4 bg-black/60 border-b border-neutral-800 flex items-start justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-black tracking-widest text-red-400 bg-red-950/80 border border-red-500/30 px-2.5 py-0.5 rounded-full">
                            Official Pass
                          </span>
                          <h3 className="text-xl font-black text-white mt-2 leading-snug">
                            {ticket.event_title}
                          </h3>
                        </div>

                        {/* Used / Active Badge */}
                        <div>
                          {ticket.ticket_used ? (
                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-neutral-800 text-neutral-400 border border-neutral-700">
                              Already Scanned
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              Valid Entry
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Ticket Body: QR Code & Info */}
                      <div className="p-6 flex flex-col sm:flex-row items-center gap-6 justify-between">
                        {/* QR Code Container */}
                        <div className="w-40 h-40 rounded-2xl bg-white p-2 shrink-0 shadow-lg flex items-center justify-center border-4 border-yellow-400/80">
                          <img
                            src={qrSrc}
                            alt="Ticket QR Code"
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Attendee Details */}
                        <div className="flex-1 text-center sm:text-left space-y-2">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                              Attendee Name
                            </span>
                            <p className="text-sm font-bold text-white">{user?.name || 'Student'}</p>
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                              Student ID
                            </span>
                            <p className="text-xs font-mono font-bold text-yellow-400">
                              {user?.stdid || 'N/A'}
                            </p>
                          </div>

                          {ticket.team_name && (
                            <div>
                              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                                Team Name
                              </span>
                              <p className="text-xs font-bold text-neutral-200">{ticket.team_name}</p>
                            </div>
                          )}

                          {ticket.event_date && (
                            <div>
                              <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                                Event Date
                              </span>
                              <p className="text-xs text-neutral-300">
                                {new Date(ticket.event_date).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Ticket Footer with download button */}
                      <div className="p-4 bg-black/80 border-t border-neutral-800 flex items-center justify-between text-xs">
                        <span className="font-mono text-[10px] text-neutral-500 truncate max-w-[200px]">
                          Token: {ticket.ticket_qr_token}
                        </span>
                        <button
                          onClick={() => downloadQrCode(qrSrc, ticket.event_title)}
                          className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 hover:border-yellow-400 text-yellow-400 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" /> Save QR
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ALL REGISTRATIONS HISTORY */}
        {activeTab === 'registrations' && (
          <div className="space-y-4">
            {registrations.length === 0 ? (
              <div className="text-center py-20 rounded-3xl bg-neutral-950/60 border border-neutral-900 p-8 space-y-3">
                <Ticket className="w-12 h-12 text-yellow-500/40 mx-auto" />
                <h3 className="text-lg font-bold text-white uppercase">No Registrations Yet</h3>
                <p className="text-xs text-neutral-400">You haven't initiated any event registrations.</p>
              </div>
            ) : (
              registrations.map((reg) => {
                let badge = (
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-yellow-400" /> Pending Approval
                  </span>
                );

                if (reg.status === 'approved') {
                  badge = (
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Approved
                    </span>
                  );
                } else if (reg.status === 'rejected') {
                  badge = (
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-red-400" /> Rejected
                    </span>
                  );
                } else if (reg.status === 'pending_payment') {
                  badge = (
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-neutral-800 text-yellow-400 border border-yellow-500/30">
                      Payment Required
                    </span>
                  );
                }

                return (
                  <div
                    key={reg.id}
                    className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-neutral-700 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white">
                          {reg.event_title || 'E-Cell Event'}
                        </h4>
                        {badge}
                      </div>
                      <p className="text-xs text-neutral-400">
                        {reg.team_name ? `Team: ${reg.team_name}` : 'Individual Entry'} • Amount: ₹{reg.amount_paid} • Leader: {reg.leader_name}
                      </p>
                      {reg.transaction_id && (
                        <p className="text-[11px] font-mono text-neutral-500">
                          UTR: {reg.transaction_id}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <Link
                        to={`/events/${reg.event_id}`}
                        className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-yellow-400 text-xs font-bold text-neutral-200 hover:text-yellow-400 flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Event Page
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default MyTicketsPage;
