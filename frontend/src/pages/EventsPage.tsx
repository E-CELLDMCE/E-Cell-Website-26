import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eventsApi, EventItem } from '../api/events';
import { useToast } from '../context/ToastContext';
import { getErrorMessage } from '../api/client';
import {
  Calendar,
  Users,
  Clock,
  Tag,
  ArrowRight,
  Search,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'team' | 'solo' | 'free'>('all');
  const toast = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsApi.getEvents();
        setEvents(data);
      } catch (err: any) {
        toast.error(getErrorMessage(err, 'Failed to load events'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [toast]);

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (filterType === 'team') return e.is_team_event;
    if (filterType === 'solo') return !e.is_team_event;
    if (filterType === 'free') return Number(e.fee_amount) === 0;
    return true;
  });

  const formatDate = (isoString?: string | null) => {
    if (!isoString) return 'TBA';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-red-500 uppercase bg-red-950/50 border border-red-500/30 px-3.5 py-1 rounded-full">
            E-Cell Conclaves & Competitions
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-3 uppercase tracking-tight">
            Explore <span className="text-yellow-400">Events</span>
          </h1>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Participate in flagship pitch tanks, 24-hour hackathons, and high-impact founder masterclasses. Form your team and secure entry passes.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-neutral-900">
          {/* Search bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by event title or keywords..."
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-sm text-white focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            {[
              { id: 'all', label: 'All Events' },
              { id: 'team', label: 'Team Events' },
              { id: 'solo', label: 'Solo Pass' },
              { id: 'free', label: 'Free Entry' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer ${
                  filterType === f.id
                    ? 'bg-yellow-400 text-black shadow-md shadow-yellow-500/20'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 rounded-3xl bg-neutral-950 border border-neutral-900 animate-pulse"
              />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-neutral-950/60 border border-neutral-900 p-8">
            <AlertCircle className="w-12 h-12 text-yellow-500/50 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white uppercase">No Events Found</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
              {searchTerm
                ? `No events matching "${searchTerm}". Try resetting your search filters.`
                : 'There are currently no active events in this category. Check back soon!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
              const isFree = Number(event.fee_amount) === 0;

              return (
                <div
                  key={event.id}
                  className="rounded-3xl bg-neutral-950/90 border border-neutral-800 hover:border-red-500/70 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_10px_35px_rgba(220,38,38,0.2)] hover:-translate-y-1.5 group"
                >
                  {/* Event Poster / Visual Header */}
                  <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
                    {event.poster_url ? (
                      <img
                        src={event.poster_url}
                        alt={event.title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      /* Styled cyber banner fallback */
                      <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#2a0404] via-[#150202] to-black border-b border-neutral-800">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] uppercase font-black tracking-widest text-red-400 bg-red-950/80 border border-red-500/30 px-2.5 py-1 rounded-full">
                            E-Cell Flagship
                          </span>
                          <span className="text-2xl opacity-40">⚡</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-white leading-snug line-clamp-2">
                            {event.title}
                          </h4>
                        </div>
                      </div>
                    )}

                    {/* Team badge over poster */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                      <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-yellow-400 border border-yellow-400/40 flex items-center gap-1.5 shadow-md">
                        <Users className="w-3 h-3" />
                        {event.is_team_event
                          ? `Team of ${event.min_team_size} - ${event.max_team_size}`
                          : 'Solo Entry'}
                      </span>
                    </div>

                    {/* Fee Tag top-right */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg ${
                          isFree
                            ? 'bg-emerald-500 text-black'
                            : 'bg-gradient-to-r from-red-600 to-red-800 text-white border border-red-500/50'
                        }`}
                      >
                        {isFree ? 'Free Pass' : `₹${event.fee_amount}`}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                        {event.title}
                      </h3>
                      <p className="mt-2 text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Meta info: Date & Deadline */}
                    <div className="pt-3 border-t border-neutral-900 space-y-2 text-xs text-neutral-300">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-neutral-400">
                          <Calendar className="w-3.5 h-3.5 text-yellow-400" /> Event Date:
                        </span>
                        <span className="font-semibold text-white">
                          {formatDate(event.event_date)}
                        </span>
                      </div>

                      {event.registration_deadline && (
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-neutral-400">
                            <Clock className="w-3.5 h-3.5 text-red-400" /> Deadline:
                          </span>
                          <span className="font-semibold text-red-300">
                            {formatDate(event.registration_deadline)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/events/${event.id}`}
                      className="w-full mt-2 py-3 rounded-xl bg-neutral-900 border border-neutral-700 group-hover:bg-red-600 group-hover:border-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      View Details & Register
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default EventsPage;
