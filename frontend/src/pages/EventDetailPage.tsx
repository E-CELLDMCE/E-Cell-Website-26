import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { eventsApi, EventItem } from '../api/events';
import {
  registrationsApi,
  StudentLookup,
  RegistrationSimpleResponse,
  RegistrationDetailResponse,
} from '../api/registrations';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getErrorMessage } from '../api/client';
import {
  Calendar,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Upload,
  ArrowLeft,
  Trash2,
  Plus,
  RefreshCw,
  CreditCard,
  Sparkles,
} from 'lucide-react';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const toast = useToast();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Registration Form State
  const [teamName, setTeamName] = useState('');
  const [teammateStdidInput, setTeammateStdidInput] = useState('');
  const [teammates, setTeammates] = useState<StudentLookup[]>([]);
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Active / Existing Registration State
  const [activeRegistration, setActiveRegistration] = useState<
    RegistrationSimpleResponse | RegistrationDetailResponse | null
  >(null);

  // Payment Gate State
  const [transactionId, setTransactionId] = useState('');
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);

  // Load Event Details and existing registration (if any)
  useEffect(() => {
    if (!id) return;

    const fetchEventData = async () => {
      try {
        const data = await eventsApi.getEvent(id);
        setEvent(data);

        // Check if current user already has a registration for this event
        if (user) {
          try {
            const myRegs = await registrationsApi.getMyRegistrations();
            const existing = myRegs.find((r) => r.event_id === id);
            if (existing) {
              setActiveRegistration(existing);
              if (existing.transaction_id) {
                setTransactionId(existing.transaction_id);
              }
            }
          } catch {
            // Ignore error if student has no registrations yet
          }
        }
      } catch (err: any) {
        toast.error(getErrorMessage(err, 'Failed to load event details'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, [id, user, toast]);

  // Teammate Lookup by Student ID
  const handleLookupTeammate = async () => {
    if (!teammateStdidInput.trim()) {
      toast.warning('Please enter a Student ID to look up');
      return;
    }

    const cleanStdid = teammateStdidInput.trim().toUpperCase();

    // Check if adding yourself
    if (user?.stdid && cleanStdid === user.stdid.toUpperCase()) {
      toast.warning('You are the team leader and already included in the team');
      return;
    }

    // Check if already in teammate list
    if (teammates.some((m) => m.stdid.toUpperCase() === cleanStdid)) {
      toast.warning('This teammate has already been added');
      return;
    }

    // Check max team size
    if (event && teammates.length + 1 >= event.max_team_size) {
      toast.warning(`Maximum team size for this event is ${event.max_team_size}`);
      return;
    }

    setIsLookingUp(true);
    try {
      const student = await registrationsApi.lookupStudent(cleanStdid);
      setTeammates((prev) => [...prev, student]);
      setTeammateStdidInput('');
      toast.success(`Found and added ${student.name}`);
    } catch (err: any) {
      if (err.response?.status === 404) {
        toast.error('No student found with this ID. Ask them to log in and complete their profile first.');
      } else {
        toast.error(getErrorMessage(err, 'Failed to look up student'));
      }
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleRemoveTeammate = (stdid: string) => {
    setTeammates((prev) => prev.filter((m) => m.stdid !== stdid));
  };

  // Submit Registration (Solo or Team)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.warning('Please log in first to register for events');
      navigate('/login', { state: { from: { pathname: `/events/${id}` } } });
      return;
    }

    if (!user.stdid || user.stdid.trim() === '') {
      toast.warning('Please complete your student profile before registering');
      navigate('/onboarding');
      return;
    }

    if (!event) return;

    // Team validations
    if (event.is_team_event) {
      if (!teamName.trim()) {
        toast.error('Please enter a team name');
        return;
      }

      const totalMembers = 1 + teammates.length;
      if (totalMembers < event.min_team_size || totalMembers > event.max_team_size) {
        toast.error(`Team size must be between ${event.min_team_size} and ${event.max_team_size}`);
        return;
      }
    }

    setIsRegistering(true);
    try {
      const res = await registrationsApi.registerTeam({
        event_id: event.id,
        team_name: event.is_team_event ? teamName.trim() : undefined,
        member_stdids: teammates.map((m) => m.stdid),
      });

      setActiveRegistration(res);
      toast.success(res.message || 'Registration initiated!');

      // If fee is 0, registration is instantly complete
      if (Number(event.fee_amount) === 0) {
        toast.success('Free registration confirmed! Your entry pass is ready in My Tickets.');
        navigate('/tickets');
      }
    } catch (err: any) {
      const status = err.response?.status;
      const detail = err.response?.data?.detail || '';

      if (status === 409) {
        toast.error('Student already registered for this event');
      } else if (status === 400) {
        if (detail.toLowerCase().includes('capacity') || detail.toLowerCase().includes('full')) {
          toast.error('Event is full');
        } else if (detail.toLowerCase().includes('deadline')) {
          toast.error('Registration closed');
        } else if (detail.toLowerCase().includes('team size')) {
          toast.error(`Team size must be between ${event.min_team_size} and ${event.max_team_size}`);
        } else {
          toast.error(detail || 'Registration failed');
        }
      } else {
        toast.error(getErrorMessage(err, 'Failed to create registration'));
      }
    } finally {
      setIsRegistering(false);
    }
  };

  // Screenshot Selection & Browser Compression
  const handleScreenshotChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    try {
      const options = {
        maxSizeMB: 0.5, // ~500KB target
        maxWidthOrHeight: 1600,
        useWebWorker: true,
      };

      const compressed = await imageCompression(file, options);
      setPaymentScreenshot(compressed);

      // Create preview
      const previewUrl = URL.createObjectURL(compressed);
      setScreenshotPreview(previewUrl);
      toast.info(`Screenshot compressed: ${(compressed.size / 1024).toFixed(0)} KB`);
    } catch (err) {
      console.error('Image compression error', err);
      setPaymentScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
    } finally {
      setIsCompressing(false);
    }
  };

  // Submit Payment Proof
  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!activeRegistration) return;
    if (!transactionId.trim()) {
      toast.error('Please enter the UTR / Transaction Reference ID');
      return;
    }
    if (!paymentScreenshot) {
      toast.error('Please upload your payment screenshot proof');
      return;
    }

    setIsSubmittingPayment(true);
    try {
      const updated = await registrationsApi.submitPayment(
        activeRegistration.id,
        transactionId.trim(),
        paymentScreenshot
      );

      setActiveRegistration((prev: any) => ({
        ...prev,
        status: 'pending_approval',
        transaction_id: transactionId.trim(),
      }));

      toast.success('Payment submitted, waiting for admin approval');
    } catch (err: any) {
      toast.error(getErrorMessage(err, 'Failed to submit payment'));
    } finally {
      setIsSubmittingPayment(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 text-yellow-400 animate-spin" />
          <p className="text-sm font-bold tracking-wider text-neutral-400">Loading Event Details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 text-center bg-black text-white">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Event Not Found</h2>
        <Link to="/events" className="mt-4 inline-block text-yellow-400 hover:underline text-sm">
          &larr; Back to all events
        </Link>
      </div>
    );
  }

  const isFree = Number(event.fee_amount) === 0;
  const isRejected = (activeRegistration as any)?.status === 'rejected';
  const isPendingApproval = (activeRegistration as any)?.status === 'pending_approval';
  const isApproved = (activeRegistration as any)?.status === 'approved';
  const isPendingPayment = !activeRegistration || (activeRegistration as any)?.status === 'pending_payment';

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Back navigation */}
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-yellow-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to events
        </Link>

        {/* Main Grid: Event Details Left, Registration/Payment Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: Event Information */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Poster Header */}
            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl">
              {event.poster_url ? (
                <img
                  src={event.poster_url}
                  alt={event.title}
                  className="w-full h-72 sm:h-80 object-cover object-center"
                />
              ) : (
                <div className="w-full h-64 p-8 bg-gradient-to-br from-[#380404] via-[#1c0202] to-black flex flex-col justify-between">
                  <span className="text-xs uppercase font-black tracking-widest text-yellow-400">
                    E-Cell DMCE
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                    {event.title}
                  </h1>
                </div>
              )}

              <div className="absolute top-4 right-4">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-xl ${
                    isFree
                      ? 'bg-emerald-500 text-black'
                      : 'bg-gradient-to-r from-red-600 to-red-800 text-white border border-red-500/50'
                  }`}
                >
                  {isFree ? 'Free Pass' : `₹${event.fee_amount}`}
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
                {event.title}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Key Event Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-900">
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-yellow-400" /> Event Date
                </span>
                <p className="mt-1 text-sm font-bold text-white">
                  {event.event_date ? new Date(event.event_date).toLocaleDateString() : 'TBA'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-red-400" /> Deadline
                </span>
                <p className="mt-1 text-sm font-bold text-white">
                  {event.registration_deadline
                    ? new Date(event.registration_deadline).toLocaleDateString()
                    : 'Open'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-cyan-400" /> Team Format
                </span>
                <p className="mt-1 text-sm font-bold text-white">
                  {event.is_team_event
                    ? `${event.min_team_size} - ${event.max_team_size} Members`
                    : 'Solo Registration'}
                </p>
              </div>
            </div>

            {/* Event Guidelines */}
            <div className="p-6 rounded-2xl bg-neutral-950/80 border border-neutral-900 space-y-3">
              <h4 className="text-xs uppercase font-bold tracking-widest text-yellow-400">
                Registration Guidelines:
              </h4>
              <ul className="text-xs text-neutral-400 space-y-2 list-disc pl-4 leading-relaxed">
                <li>Every participant must have an active student profile with their unique Student ID.</li>
                <li>Team leaders are responsible for entering teammates' registered Student IDs.</li>
                <li>Each student can only be registered once for this specific event.</li>
                <li>Digital entry QR passes will be unlocked once registration and payment are approved.</li>
              </ul>
            </div>

          </div>

          {/* RIGHT COLUMN: Registration & Payment Gate */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">

              {/* CASE 1: APPROVED TICKET STATUS */}
              {isApproved && (
                <div className="p-8 rounded-3xl bg-gradient-to-b from-emerald-950/50 to-neutral-950 border border-emerald-500/60 text-center space-y-4 shadow-2xl">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase">
                    Registration Approved!
                  </h3>
                  <p className="text-xs text-neutral-300">
                    Your spot is fully secured. Your digital entry ticket with QR Code is live.
                  </p>
                  <Link
                    to="/tickets"
                    className="inline-flex items-center justify-center w-full py-3.5 rounded-full bg-emerald-500 text-black font-black text-xs uppercase tracking-wider hover:bg-emerald-400 transition-all shadow-lg"
                  >
                    View Ticket in My Tickets &rarr;
                  </Link>
                </div>
              )}

              {/* CASE 2: PENDING ADMIN APPROVAL */}
              {isPendingApproval && (
                <div className="p-8 rounded-3xl bg-neutral-950 border border-yellow-500/60 text-center space-y-4 shadow-2xl">
                  <div className="w-14 h-14 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center mx-auto border border-yellow-500/40">
                    <Clock className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase">
                    Awaiting Admin Approval
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Payment proof received! E-Cell admin coordinators are currently verifying your transaction. Your ticket will activate upon approval.
                  </p>
                  <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-left text-xs text-neutral-400">
                    <p><span className="text-white font-bold">Transaction Ref:</span> {transactionId || (activeRegistration as any)?.transaction_id || 'Submitted'}</p>
                    <p className="mt-1"><span className="text-white font-bold">Status:</span> <span className="text-yellow-400">Pending Verification</span></p>
                  </div>
                </div>
              )}

              {/* CASE 3: REJECTED STATUS (WITH RETRY UI) */}
              {isRejected && (
                <div className="p-6 rounded-3xl bg-red-950/40 border-2 border-red-500 text-center space-y-4 shadow-2xl">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/40">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-white uppercase">
                    Payment Verification Rejected
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    The payment screenshot or transaction ID was rejected by the admin. Please upload a clear receipt with visible UTR number.
                  </p>
                  <p className="text-[11px] text-red-400 font-bold uppercase">
                    Retry Attempts: {(activeRegistration as any)?.retry_count || 1} / 3
                  </p>
                </div>
              )}

              {/* CASE 4: PAYMENT GATE (If Registration created and Fee > 0 and (Pending Payment OR Rejected Retry)) */}
              {activeRegistration && !isFree && (isPendingPayment || isRejected) && (
                <div className="p-7 rounded-3xl bg-neutral-950 border border-yellow-500/50 space-y-5 shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
                    <h3 className="text-base font-black text-white uppercase flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-yellow-400" />
                      Payment Gate (₹{event.fee_amount})
                    </h3>
                    <span className="text-[10px] font-bold text-yellow-400 uppercase bg-yellow-950/50 px-2 py-0.5 rounded border border-yellow-500/30">
                      Step 2 of 2
                    </span>
                  </div>

                  {/* QR Code Section */}
                  <div className="flex flex-col items-center p-4 rounded-2xl bg-black border border-neutral-800 text-center">
                    <p className="text-xs text-neutral-400 mb-2">Scan Official E-Cell UPI QR to Pay:</p>
                    <div className="w-48 h-48 rounded-xl bg-white p-2 shadow-md flex items-center justify-center">
                      {event.payment_qr_url ? (
                        <img
                          src={event.payment_qr_url}
                          alt="Payment QR"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        /* Default Dynamic QR generator fallback */
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=ecell@dmce.ac.in&pn=ECELL_DMCE&am=${event.fee_amount}&cu=INR`}
                          alt="UPI Payment QR"
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-neutral-300 mt-2">
                      UPI ID: <strong className="text-yellow-400">ecell@dmce.ac.in</strong>
                    </span>
                  </div>

                  {/* Payment Submission Form */}
                  <form onSubmit={handleSubmitPayment} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                        Transaction ID / UTR <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        placeholder="e.g. 423985123901 or UPI Ref"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono text-sm uppercase focus:outline-none focus:border-yellow-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                        Payment Screenshot <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        required={!screenshotPreview}
                        onChange={handleScreenshotChange}
                        className="w-full text-xs text-neutral-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300 cursor-pointer"
                      />
                      {isCompressing && (
                        <p className="text-[10px] text-yellow-400 animate-pulse">
                          Compressing screenshot to ~500KB...
                        </p>
                      )}
                    </div>

                    {screenshotPreview && (
                      <div className="mt-2 rounded-xl overflow-hidden border border-neutral-800 max-h-36">
                        <img
                          src={screenshotPreview}
                          alt="Screenshot Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmittingPayment || isCompressing}
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-xs uppercase tracking-wider hover:from-red-500 hover:to-red-700 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all cursor-pointer"
                    >
                      {isSubmittingPayment ? 'Submitting Proof...' : 'Upload Payment & Submit'}
                    </button>
                  </form>
                </div>
              )}

              {/* CASE 5: INITIAL REGISTRATION FORM (Solo or Team) */}
              {!activeRegistration && (
                <div className="p-7 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6 shadow-2xl">
                  <div className="pb-3 border-b border-neutral-900">
                    <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                      Event Registration
                    </span>
                    <h3 className="text-lg font-black text-white uppercase mt-0.5">
                      {event.is_team_event ? 'Team Entry Registration' : 'Solo Entry Registration'}
                    </h3>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-5">
                    {/* If Team Event: Team Name */}
                    {event.is_team_event && (
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                          Team Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          placeholder="e.g. Apex Innovators"
                          className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                      </div>
                    )}

                    {/* Team Leader Profile (Current user) */}
                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-yellow-400">
                        Team Leader (You)
                      </span>
                      <p className="text-white font-bold">{user ? user.name : 'Not Logged In'}</p>
                      <p className="text-neutral-400">{user?.email} • {user?.stdid || 'No Student ID'}</p>
                    </div>

                    {/* If Team Event: Teammate Lookup & Roster */}
                    {event.is_team_event && (
                      <div className="space-y-3 pt-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                          <span>Teammates ({teammates.length + 1} / {event.max_team_size})</span>
                          <span className="text-[10px] text-neutral-500 lowercase">
                            min {event.min_team_size} - max {event.max_team_size}
                          </span>
                        </label>

                        {/* Lookup input bar */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={teammateStdidInput}
                            onChange={(e) => setTeammateStdidInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleLookupTeammate();
                              }
                            }}
                            placeholder="Enter teammate's Student ID"
                            className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono text-xs uppercase focus:outline-none focus:border-yellow-400 transition-colors"
                          />
                          <button
                            type="button"
                            onClick={handleLookupTeammate}
                            disabled={isLookingUp}
                            className="px-4 py-2.5 rounded-xl bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider hover:bg-yellow-300 transition-colors cursor-pointer shrink-0"
                          >
                            {isLookingUp ? '...' : <Plus className="w-4 h-4" />}
                          </button>
                        </div>

                        {/* Teammates List */}
                        {teammates.length > 0 && (
                          <div className="space-y-2 pt-1">
                            {teammates.map((mate) => (
                              <div
                                key={mate.stdid}
                                className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs"
                              >
                                <div>
                                  <p className="font-bold text-white">{mate.name}</p>
                                  <p className="text-[10px] text-neutral-400 font-mono">
                                    {mate.stdid} • {mate.email}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTeammate(mate.stdid)}
                                  className="text-neutral-500 hover:text-red-400 p-1 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Submit Registration Button */}
                    <button
                      type="submit"
                      disabled={isRegistering}
                      className="w-full mt-4 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-red-800 text-white font-black text-xs uppercase tracking-wider hover:from-red-500 hover:to-red-700 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all cursor-pointer"
                    >
                      {isRegistering
                        ? 'Initiating...'
                        : isFree
                        ? 'Confirm Free Registration'
                        : `Proceed to Payment (₹${event.fee_amount})`}
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EventDetailPage;
