import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { eventsApi, EventCreatePayload } from '../../api/events';
import { adminApi } from '../../api/admin';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../api/client';
import {
  ArrowLeft,
  Clock,
  Users,
  Image,
  QrCode,
  DollarSign,
  AlertCircle,
  Loader2,
} from 'lucide-react';

const formatMb = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

const ImageUploadField: React.FC<{
  label: string;
  icon: React.ReactNode;
  currentUrl: string;
  onUploaded: (url: string) => void;
  onClear: () => void;
  upload: (file: File) => Promise<string>;
}> = ({ label, icon, currentUrl, onUploaded, onClear, upload }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [compressionInfo, setCompressionInfo] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setCompressionInfo(null);
    const originalSize = file.size;
    setIsUploading(true);
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 2000,
        useWebWorker: true,
      });
      setCompressionInfo(`${formatMb(originalSize)} -> ${formatMb(compressed.size)}`);
      const url = await upload(compressed);
      onUploaded(url);
    } catch (err: any) {
      setError(getErrorMessage(err, 'Upload failed'));
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
        {icon}
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-black file:font-bold file:text-xs file:uppercase file:cursor-pointer focus:outline-none focus:border-yellow-400 transition-colors disabled:opacity-60"
        />
        {isUploading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[10px] text-neutral-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-yellow-400" />
            Uploading...
          </div>
        )}
      </div>
      {compressionInfo && !error && (
        <p className="text-[10px] text-neutral-500">{compressionInfo}</p>
      )}
      {error && (
        <p className="text-[10px] text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
      {currentUrl && !error && (
        <div className="mt-2 flex items-start gap-3 p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
          <img
            src={currentUrl}
            alt={`${label} preview`}
            className="w-16 h-16 object-cover rounded-md border border-neutral-800"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-green-400 font-bold uppercase">Uploaded</p>
            <p className="text-[10px] text-neutral-500 truncate">{currentUrl}</p>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="text-[10px] text-neutral-400 hover:text-red-400 font-bold uppercase"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export const EventEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [feeAmount, setFeeAmount] = useState<number>(0);
  const [isTeamEvent, setIsTeamEvent] = useState(false);
  const [minTeamSize, setMinTeamSize] = useState<number>(1);
  const [maxTeamSize, setMaxTeamSize] = useState<number>(1);
  const [maxCapacity, setMaxCapacity] = useState<string>('');
  const [eventDate, setEventDate] = useState('');
  const [registrationDeadline, setRegistrationDeadline] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [paymentQrUrl, setPaymentQrUrl] = useState('');
  const [status, setStatus] = useState('upcoming');

  useEffect(() => {
    if (isEditing && id) {
      const fetchEvent = async () => {
        try {
          const e = await eventsApi.getEvent(id);
          setTitle(e.title);
          setDescription(e.description);
          setFeeAmount(Number(e.fee_amount) || 0);
          setIsTeamEvent(e.is_team_event);
          setMinTeamSize(e.min_team_size || 1);
          setMaxTeamSize(e.max_team_size || 1);
          setMaxCapacity(e.max_capacity ? String(e.max_capacity) : '');
          setEventDate(e.event_date ? new Date(e.event_date).toISOString().slice(0, 16) : '');
          setRegistrationDeadline(
            e.registration_deadline ? new Date(e.registration_deadline).toISOString().slice(0, 16) : ''
          );
          setPosterUrl(e.poster_url || '');
          setPaymentQrUrl(e.payment_qr_url || '');
          setStatus(e.status || 'upcoming');
        } catch (err: any) {
          toast.error(getErrorMessage(err, 'Failed to load event for editing'));
        } finally {
          setIsLoading(false);
        }
      };

      fetchEvent();
    }
  }, [id, isEditing, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error('Title and description are required');
      return;
    }

    if (minTeamSize < 1) {
      toast.error('Minimum team size must be at least 1');
      return;
    }

    if (maxTeamSize < minTeamSize) {
      toast.error('Maximum team size cannot be less than minimum team size');
      return;
    }

    setIsSaving(true);
    const payload: EventCreatePayload = {
      title: title.trim(),
      description: description.trim(),
      fee_amount: Number(feeAmount),
      is_team_event: isTeamEvent,
      min_team_size: Number(minTeamSize),
      max_team_size: Number(maxTeamSize),
      max_capacity: maxCapacity ? Number(maxCapacity) : null,
      event_date: eventDate ? new Date(eventDate).toISOString() : null,
      registration_deadline: registrationDeadline ? new Date(registrationDeadline).toISOString() : null,
      poster_url: posterUrl.trim() || null,
      payment_qr_url: paymentQrUrl.trim() || null,
      status,
    };

    try {
      if (isEditing && id) {
        await eventsApi.updateEvent(id, payload);
        toast.success('Event updated successfully');
      } else {
        await eventsApi.createEvent(payload);
        toast.success('Event created successfully');
      }
      navigate('/admin');
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Failed to save event'));
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm font-bold text-neutral-400">Loading Event Configuration...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              {isEditing ? 'Edit Event Details' : 'Create New Event'}
            </h2>
            <p className="text-xs text-neutral-400">
              Configure parameters, registration limits, and pricing
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6 shadow-2xl">
        
        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            Event Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. E-Summit 2026: Pitch Tank"
            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            Description / Overview <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide competition format, eligibility, prizes, and schedule details..."
            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
          />
        </div>

        {/* Fee & Capacity Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-yellow-400" />
              Registration Fee (INR)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={feeAmount}
              onChange={(e) => setFeeAmount(Number(e.target.value))}
              placeholder="0 for Free"
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
            />
            <p className="text-[10px] text-neutral-500">Set to 0 if event has free entry.</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-yellow-400" />
              Max Participant Capacity
            </label>
            <input
              type="number"
              min="1"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
              placeholder="Unlimited if left empty"
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>
        </div>

        {/* Team Event Toggles */}
        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Team Competition Event
              </span>
              <p className="text-[11px] text-neutral-400">
                Allow participants to form teams and add teammates by Student ID
              </p>
            </div>
            <input
              type="checkbox"
              checked={isTeamEvent}
              onChange={(e) => {
                setIsTeamEvent(e.target.checked);
                if (!e.target.checked) {
                  setMinTeamSize(1);
                  setMaxTeamSize(1);
                } else if (maxTeamSize === 1) {
                  setMinTeamSize(2);
                  setMaxTeamSize(4);
                }
              }}
              className="w-5 h-5 accent-yellow-400 rounded cursor-pointer"
            />
          </div>

          {isTeamEvent && (
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-[10px] uppercase font-bold text-neutral-400">
                  Minimum Team Size
                </label>
                <input
                  type="number"
                  min="1"
                  value={minTeamSize}
                  onChange={(e) => setMinTeamSize(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-neutral-400">
                  Maximum Team Size
                </label>
                <input
                  type="number"
                  min={minTeamSize}
                  value={maxTeamSize}
                  onChange={(e) => setMaxTeamSize(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Dates Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-yellow-400" />
              Event Date & Time
            </label>
            <input
              type="datetime-local"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              Registration Deadline
            </label>
            <input
              type="datetime-local"
              value={registrationDeadline}
              onChange={(e) => setRegistrationDeadline(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>
        </div>

        {/* URLs & Media Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ImageUploadField
            label="Poster Image"
            icon={<Image className="w-3.5 h-3.5 text-yellow-400" />}
            currentUrl={posterUrl}
            onUploaded={(url) => setPosterUrl(url)}
            onClear={() => setPosterUrl('')}
            upload={adminApi.uploadPoster}
          />

          <ImageUploadField
            label="Payment UPI QR Code"
            icon={<QrCode className="w-3.5 h-3.5 text-yellow-400" />}
            currentUrl={paymentQrUrl}
            onUploaded={(url) => setPaymentQrUrl(url)}
            onClear={() => setPaymentQrUrl('')}
            upload={adminApi.uploadPaymentQr}
          />
        </div>

        {/* Status Dropdown */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
            Event Lifecycle Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors cursor-pointer"
          >
            <option value="draft">Draft (Hidden from Public)</option>
            <option value="upcoming">Upcoming (Accepting Registrations)</option>
            <option value="ongoing">Ongoing (Live Now)</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-neutral-900 flex justify-end gap-3">
          <Link
            to="/admin"
            className="px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white font-bold text-xs uppercase tracking-wider"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3 rounded-full bg-yellow-400 text-black font-black text-xs uppercase tracking-wider hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-500/20 cursor-pointer"
          >
            {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Publish Event'}
          </button>
        </div>

      </form>

    </div>
  );
};

export default EventEditorPage;
