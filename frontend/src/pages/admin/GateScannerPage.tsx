import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Html5Qrcode } from 'html5-qrcode';
import { adminApi, TicketScanResult } from '../../api/admin';
import { useToast } from '../../context/ToastContext';
import { getErrorMessage } from '../../api/client';
import {
  QrCode,
  CheckCircle2,
  AlertCircle,
  Camera,
  Keyboard,
  RefreshCw,
  UserCheck,
  Clock,
  SquareSlash,
} from 'lucide-react';

export const GateScannerPage: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [manualToken, setManualToken] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<TicketScanResult | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [history, setHistory] = useState<TicketScanResult[]>([]);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  // Tracks whether the html5-qrcode instance has finished starting successfully,
  // so cleanup only runs on a fully-started scanner.
  const scannerStartedRef = useRef(false);
  // Tracks whether the component is still mounted, to avoid setState-after-unmount.
  const isMountedRef = useRef(true);
  const toast = useToast();

  const handleProcessToken = async (token: string) => {
    if (!token.trim()) return;

    setIsScanning(true);
    setScanResult(null);
    setScanError(null);

    try {
      const res = await adminApi.scanTicket(token.trim());
      if (!isMountedRef.current) return;
      setScanResult(res);
      setHistory((prev) => [res, ...prev.slice(0, 9)]);
      toast.success(`Entry Approved: ${res.member_name}`);
    } catch (err: any) {
      if (!isMountedRef.current) return;
      const msg = getErrorMessage(err, 'Failed to scan ticket');
      setScanError(msg);
      toast.error(msg);
    } finally {
      if (isMountedRef.current) {
        setIsScanning(false);
      }
    }
  };

  // Safely stop and clear the scanner. No-op if it was never started.
  const teardownScanner = async () => {
    const scanner = scannerRef.current;
    if (!scanner || !scannerStartedRef.current) {
      scannerRef.current = null;
      return;
    }
    try {
      await scanner.stop();
    } catch {
      // already stopped or never fully started — safe to ignore
    }
    try {
      scanner.clear();
    } catch {
      // already cleared — safe to ignore
    }
    scannerRef.current = null;
    scannerStartedRef.current = false;
  };

  const startCamera = async () => {
    try {
      await teardownScanner();

      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      await scanner.start(
        { facingMode: 'environment' },
        config,
        (decodedText) => {
          handleProcessToken(decodedText);
        },
        () => {
          // ignore scan frame errors
        }
      );

      scannerStartedRef.current = true;
      if (isMountedRef.current) {
        setIsCameraActive(true);
      }
    } catch (err: any) {
      console.error('Failed to start camera scanner', err);
      await teardownScanner();
      if (isMountedRef.current) {
        toast.error('Unable to access device camera. Please use manual token entry.');
        setIsCameraActive(false);
      }
    }
  };

  const stopCamera = async () => {
    await teardownScanner();
    if (isMountedRef.current) {
      setIsCameraActive(false);
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      void teardownScanner();
    };
  }, []);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualToken.trim()) {
      handleProcessToken(manualToken.trim());
      setManualToken('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="max-w-5xl mx-auto space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-950/80 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 bg-red-950/60 border border-red-500/30 px-2.5 py-0.5 rounded-full">
              Live Entry Checkpoint
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white mt-1.5 uppercase tracking-tight">
            Gate QR Ticket Scanner
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Validate attendee entry passes in real-time with double-scan protection
          </p>
        </div>

        <div className="w-full sm:w-auto">
          {isCameraActive ? (
            <button
              onClick={stopCamera}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-neutral-900 border border-red-500/40 hover:bg-red-950/40 text-red-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <SquareSlash className="w-4 h-4" /> Stop Camera
            </button>
          ) : (
            <button
              onClick={startCamera}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-red-950/50 hover:shadow-red-600/30 active:scale-95 cursor-pointer"
            >
              <Camera className="w-4 h-4" /> Start Camera
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Scanner Feed & Manual Box Left */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Live Camera Viewport */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-950/80 border border-neutral-800 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Camera className="w-4 h-4 text-red-500" /> Camera Feed
            </h3>

            <div
              id="qr-reader"
              className="w-full rounded-2xl overflow-hidden bg-black border border-neutral-800/80 min-h-[260px] flex items-center justify-center text-center p-4 relative"
            >
              {!isCameraActive && (
                <div className="text-neutral-500 space-y-2 p-4">
                  <QrCode className="w-12 h-12 mx-auto text-neutral-700" />
                  <p className="text-xs text-neutral-400">
                    Camera is off. Click "Start Camera" above or paste token below.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Manual Token Entry Box */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-950/80 border border-neutral-800 space-y-3.5 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-red-500" /> Manual Token / Scanner Gun Entry
            </h3>

            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                type="text"
                value={manualToken}
                onChange={(e) => setManualToken(e.target.value)}
                placeholder="Paste ticket UUID token..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono text-xs placeholder-neutral-500 focus:outline-none focus:border-red-500/50 transition-all duration-300"
              />
              <button
                type="submit"
                disabled={isScanning || !manualToken.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-md shadow-red-950/40 active:scale-95 cursor-pointer shrink-0 disabled:opacity-50"
              >
                {isScanning ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  'Scan'
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Scan Result Feedback Right */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Result Card */}
          {scanResult ? (
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-950/50 via-neutral-950 to-neutral-950 border border-emerald-500/50 space-y-4 shadow-[0_0_30px_rgba(16,185,129,0.15)] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-emerald-500/20 text-emerald-400 flex-shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 block">
                    Admission Granted
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white truncate">{scanResult.member_name}</h3>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Student ID:</span>
                  <span className="font-mono font-bold text-neutral-200 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                    {scanResult.student_id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Team Name:</span>
                  <span className="font-semibold text-white truncate ml-2">{scanResult.team_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Timestamp:</span>
                  <span className="font-mono text-neutral-300">
                    {new Date(scanResult.scanned_at).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ) : scanError ? (
            <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-red-950/50 via-neutral-950 to-neutral-950 border border-red-500/50 space-y-4 shadow-[0_0_30px_rgba(239,68,68,0.15)] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-red-500/20 text-red-400 flex-shrink-0">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-black tracking-widest text-red-400 block">
                    Entry Denied / Invalid Pass
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white">Scan Rejected</h3>
                </div>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed bg-black/60 p-3.5 rounded-xl border border-red-900/40">
                {scanError}
              </p>
            </div>
          ) : (
            <div className="p-8 rounded-2xl sm:rounded-3xl bg-neutral-950/80 border border-neutral-800 text-center space-y-3 shadow-xl">
              <UserCheck className="w-12 h-12 text-neutral-700 mx-auto" />
              <h4 className="text-sm font-bold text-white uppercase">Awaiting Next Ticket</h4>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Scan attendee QR code with the camera feed or submit ticket token directly.
              </p>
            </div>
          )}

          {/* Session Scan Log */}
          {history.length > 0 && (
            <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-neutral-950/80 border border-neutral-800 space-y-3 shadow-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-red-500" /> Recent Gate Admissions ({history.length})
              </h4>
              <div className="divide-y divide-neutral-900 max-h-60 overflow-y-auto">
                {history.map((h, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-xs gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate">{h.member_name}</p>
                      <p className="text-[10px] text-neutral-400 truncate">ID: {h.student_id} • {h.team_name}</p>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-400 shrink-0">
                      {new Date(h.scanned_at).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </motion.div>
  );
};

export default GateScannerPage;
