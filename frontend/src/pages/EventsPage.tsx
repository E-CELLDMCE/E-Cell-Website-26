import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { eventsApi, EventItem } from '../api/events';
import { adminApi } from '../api/admin';
import { useToast } from '../context/ToastContext';
import { getErrorMessage } from '../api/client';
import { ErrorBoundary } from '../components/ErrorBoundary';
import {
  Calendar,
  Users,
  Clock,
  ArrowRight,
  Search,
  Sparkles,
  AlertCircle,
  X,
  Flame,
  Layers,
  RotateCcw,
} from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  formatDate: (isoString?: string | null) => string;
}

function toNumber(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? n : null;
}

function getActivePrice(event: EventItem): { active: number; original: number | null; isEarlyBird: boolean; seatsLeft: number | null } {
  const regular = toNumber(event.fee_amount) ?? 0;
  const earlyFee = toNumber(event.early_bird_fee);
  const capacity = event.early_bird_capacity ?? null;
  const taken = event.early_bird_taken ?? 0;

  const seatsLeft = capacity !== null ? Math.max(capacity - taken, 0) : null;

  const earlyBirdActive =
    event.early_bird_enabled === true &&
    earlyFee !== null &&
    earlyFee > 0 &&
    earlyFee < regular &&
    (capacity === null || taken < capacity);

  if (earlyBirdActive && earlyFee !== null) {
    return { active: earlyFee, original: regular, isEarlyBird: true, seatsLeft };
  }
  return { active: regular, original: null, isEarlyBird: false, seatsLeft };
}

export const EventCard: React.FC<EventCardProps> = ({ event, formatDate }) => {
  const priceInfo = getActivePrice(event);
  const isFree = priceInfo.active === 0;

  return (
    <div className="group rounded-3xl bg-neutral-950/80 border border-neutral-800/80 hover:border-red-500/70 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_12px_45px_rgba(239,68,68,0.2)] hover:-translate-y-1.5 h-full">
      {/* Event Poster Wrapper: aspect-[3/4] on desktop, aspect-[4/5] on mobile */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-t-2xl bg-neutral-900 flex items-center justify-center">
        {event.poster_url ? (
          <img
            src={event.poster_url}
            alt={event.title}
            className="w-full h-full object-contain bg-neutral-900 transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/img_vid/ecell-logo.png';
            }}
          />
        ) : (
          /* Styled cyber banner fallback */
          <div className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#2a0404] via-[#150202] to-black border-b border-neutral-800 select-none">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase font-black tracking-widest text-red-400 bg-red-950/80 border border-red-500/30 px-2.5 py-1 rounded-full">
                E-Cell Flagship
              </span>
              <span className="text-2xl opacity-40">⚡</span>
            </div>
            <div className="my-auto py-8 text-center px-4">
              <div className="inline-flex p-3 rounded-2xl bg-red-950/40 border border-red-500/20 mb-3 text-red-400">
                <Flame className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black text-white leading-snug line-clamp-3">
                {event.title}
              </h4>
            </div>
            <div className="text-center text-xs font-mono tracking-wider text-neutral-500 uppercase">
              Official E-Cell Conclave
            </div>
          </div>
        )}

        {/* Ambient top/bottom gradient scrim for badge contrast */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/80 via-black/30 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

        {/* Badges absolutely positioned over poster corners */}
        {/* Top-Left: E-CELL FLAGSHIP */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase bg-black/80 backdrop-blur-md text-red-400 border border-red-500/40 shadow-lg">
            <Sparkles className="w-3 h-3 text-red-400" />
            E-Cell Flagship
          </span>
        </div>

        {/* Top-Right: Fee Tag */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span
            className={`inline-flex items-center px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-lg backdrop-blur-md ${
              isFree
                ? 'bg-emerald-500 text-black shadow-emerald-500/20 font-extrabold'
                : 'bg-gradient-to-r from-red-600 to-rose-700 text-white border border-red-400/40 shadow-red-600/30'
            }`}
          >
            {isFree ? 'Free Pass' : priceInfo.isEarlyBird && priceInfo.original !== null ? (
              <span className="flex flex-col items-end leading-none gap-0.5">
                <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider">Early Bird</span>
                <span>₹{priceInfo.active.toFixed(2)}</span>
                <span className="text-[10px] font-semibold text-neutral-300 line-through opacity-60">₹{priceInfo.original.toFixed(2)}</span>
                {priceInfo.seatsLeft !== null && priceInfo.seatsLeft > 0 && (
                  <span className="text-[10px] font-semibold text-neutral-300">{priceInfo.seatsLeft} seat{priceInfo.seatsLeft === 1 ? '' : 's'} left</span>
                )}
              </span>
            ) : `₹${priceInfo.active.toFixed(2)}`}
          </span>
        </div>

        {/* Bottom-Left: Solo/Team Badge */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-yellow-400 border border-yellow-400/40 shadow-lg">
            <Users className="w-3.5 h-3.5 text-yellow-400" />
            {event.is_team_event
              ? `Team of ${event.min_team_size} - ${event.max_team_size}`
              : 'Solo Entry'}
          </span>
        </div>

        {/* Bottom-Right: Event Status */}
        {event.status && (
          <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-300 border border-neutral-700/60 shadow-lg">
              <span
                className={`w-2 h-2 rounded-full ${
                  event.status === 'upcoming'
                    ? 'bg-amber-400'
                    : event.status === 'ongoing'
                    ? 'bg-emerald-400 animate-pulse'
                    : 'bg-neutral-500'
                }`}
              />
              {event.status}
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900/80 rounded-b-2xl border-t border-neutral-900">
        <div>
          <h3 className="text-xl font-black text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-1">
            {event.title}
          </h3>
          <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed font-normal">
            {event.description}
          </p>
        </div>

        {/* Meta info: Date & Deadline & Capacity */}
        <div className="pt-3 border-t border-neutral-800/80 space-y-2.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-neutral-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-yellow-400" /> Event Date:
            </span>
            <span className="font-semibold text-white">
              {formatDate(event.event_date)}
            </span>
          </div>

          {event.registration_deadline && (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-neutral-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-red-400" /> Deadline:
              </span>
              <span className="font-semibold text-red-300">
                {formatDate(event.registration_deadline)}
              </span>
            </div>
          )}

          {event.max_capacity ? (
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-neutral-400 font-medium">
                <Layers className="w-3.5 h-3.5 text-emerald-400" /> Capacity:
              </span>
              <span className="font-semibold text-emerald-300">
                {event.max_capacity} Seats
              </span>
            </div>
          ) : null}
        </div>

        {/* Action Button */}
        <Link
          to={`/events/${event.id}`}
          className="w-full mt-2 py-3 rounded-xl bg-neutral-900 border border-neutral-700 group-hover:bg-red-600 group-hover:border-red-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md group/btn"
        >
          <span>View Details & Register</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};

const SkeletonCard: React.FC = () => (
  <div className="rounded-3xl bg-neutral-950/80 border border-neutral-900 overflow-hidden flex flex-col animate-pulse">
    <div className="w-full aspect-[4/5] sm:aspect-[3/4] bg-neutral-900 rounded-t-2xl relative">
      <div className="absolute top-3 left-3 w-28 h-6 rounded-full bg-neutral-800" />
      <div className="absolute top-3 right-3 w-20 h-6 rounded-full bg-neutral-800" />
      <div className="absolute bottom-3 left-3 w-24 h-6 rounded-full bg-neutral-800" />
    </div>
    <div className="p-5 sm:p-6 space-y-4">
      <div className="h-6 w-3/4 bg-neutral-900 rounded-lg" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-neutral-900/80 rounded" />
        <div className="h-3 w-5/6 bg-neutral-900/80 rounded" />
      </div>
      <div className="pt-3 border-t border-neutral-900 space-y-2">
        <div className="h-4 w-full bg-neutral-900/60 rounded" />
        <div className="h-4 w-2/3 bg-neutral-900/60 rounded" />
      </div>
      <div className="h-11 w-full bg-neutral-900 rounded-xl mt-2" />
    </div>
  </div>
);

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'team' | 'solo' | 'free'>('all');
  const toast = useToast();

  const handleDownloadExcel = async (eventId: string, title: string) => {
    setIsExporting(eventId);
    try {
      await adminApi.downloadExportExcel(eventId, title);
      toast.success(`Downloaded registrations report for ${title}`);
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Failed to download Excel report'));
    } finally {
      setIsExporting(null);
    }
  };

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

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;
      if (filterType === 'team') return e.is_team_event;
      if (filterType === 'solo') return !e.is_team_event;
      if (filterType === 'free') return Number(e.fee_amount) === 0;
      return true;
    });
  }, [events, searchTerm, filterType]);

  const formatDate = (isoString?: string | null) => {
    if (!isoString) return 'TBA';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const filterOptions = [
    { id: 'all' as const, label: 'All Events', count: events.length },
    { id: 'team' as const, label: 'Team Events', count: events.filter((e) => e.is_team_event).length },
    { id: 'solo' as const, label: 'Solo Pass', count: events.filter((e) => !e.is_team_event).length },
    { id: 'free' as const, label: 'Free Entry', count: events.filter((e) => Number(e.fee_amount) === 0).length },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-black text-white relative overflow-hidden">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-red-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-40 right-10 w-[450px] h-[300px] bg-yellow-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest shadow-inner mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            E-Cell Conclaves & Competitions
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">
            Explore <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Participate in flagship pitch tanks, 24-hour hackathons, and high-impact founder masterclasses. Form your team and secure entry passes.
          </p>
        </div>

        {/* Quick Stats Overview */}
        {!isLoading && events.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-12">
            <div className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-900 text-center">
              <div className="text-2xl font-black text-white">{events.length}</div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Total Events</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-900 text-center">
              <div className="text-2xl font-black text-yellow-400">
                {events.filter((e) => e.is_team_event).length}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Team Format</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-900 text-center">
              <div className="text-2xl font-black text-emerald-400">
                {events.filter((e) => Number(e.fee_amount) === 0).length}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Free Passes</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-950/70 border border-neutral-900 text-center">
              <div className="text-2xl font-black text-red-400">
                {events.filter((e) => !e.is_team_event).length}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Solo Passes</div>
            </div>
          </div>
        )}

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 pb-6 border-b border-neutral-900/80">
          {/* Search bar */}
          <div className="relative w-full md:w-96 group">
            <Search className="w-4 h-4 text-neutral-400 group-focus-within:text-yellow-400 absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by event title or keywords..."
              className="w-full pl-11 pr-10 py-2.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
            {filterOptions.map((f) => {
              const isActive = filterType === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-yellow-400 text-black shadow-md shadow-yellow-500/20'
                      : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <span>{f.label}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-extrabold ${
                      isActive ? 'bg-black/20 text-black' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <SkeletonCard key={n} />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 px-6 rounded-3xl bg-neutral-950/60 border border-neutral-900 max-w-lg mx-auto"
          >
            <div className="inline-flex p-4 rounded-full bg-neutral-900/80 border border-neutral-800 text-yellow-400 mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">No Events Found</h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-sm mx-auto leading-relaxed">
              {searchTerm
                ? `No events matching "${searchTerm}". Try clearing your search or adjusting filters.`
                : 'There are currently no active events in this category. Check back soon for upcoming announcements!'}
            </p>
            {(searchTerm || filterType !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                }}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-yellow-500/20 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset All Filters
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="h-full"
                >
                  <ErrorBoundary key={event.id}>
                    <EventCard event={event} formatDate={formatDate} />
                  </ErrorBoundary>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default EventsPage;
