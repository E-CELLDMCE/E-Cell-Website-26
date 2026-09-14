import React, { useEffect, useState, useRef } from 'react';
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
  Users,
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
  // All html5-qrcode teardown errors are swallowed because they only fire
  // during unmount and never affect active scanning.
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
      // clear() removes html5-qrcode's injected DOM nodes (video element etc.)
      // so React's unmount doesn't fight them.
      scanner.clear();
    } catch {
      // already cleared — safe to ignore
    }
    scannerRef.current = null;
    scannerStartedRef.current = false;
  };

  const startCamera = async () => {
    try {
      // Tear down any previous instance first so we never have two scanners
      // competing for the same #qr-reader DOM node.
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
      // Fire-and-forget — React's unmount can't await a Promise, but the
      // teardown is idempotent and swallows its own errors.
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
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-red-500 bg-red-950/60 border border-red-500/30 px-3 py-1 rounded-full">
            Live Entry Checkpoint
          </span>
          <h2 className="text-2xl font-black text-white mt-2 uppercase tracking-tight">
            Gate QR Ticket Scanner
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Validate attendee entry passes in real-time with row-level double-scan prevention
          </p>
        </div>

        <div className="flex gap-2">
          {isCameraActive ? (
            <button
              onClick={stopCamera}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              Stop Camera
            </button>
          ) : (
            <button
              onClick={startCamera}
              className="px-4 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-yellow-500/20 cursor-pointer"
            >
              <Camera className="w-4 h-4" /> Start Camera
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Scanner Feed & Manual Box Left */}
        <div className="md:col-span-6 space-y-6">
          
          {/* Live Camera Viewport */}
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Camera className="w-4 h-4 text-yellow-400" /> Camera Feed
            </h3>

            <div
              id="qr-reader"
              className="w-full rounded-2xl overflow-hidden bg-black border border-neutral-800 min-h-[260px] flex items-center justify-center text-center p-4"
            >
              {!isCameraActive && (
                <div className="text-neutral-500 space-y-2">
                  <QrCode className="w-12 h-12 mx-auto text-neutral-700" />
                  <p className="text-xs">Camera is off. Click "Start Camera" above or paste token below.</p>
                </div>
              )}
            </div>
          </div>

          {/* Manual Token Entry Box */}
          <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-yellow-400" /> Manual Token / Scanner Gun Entry
            </h3>

            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                type="text"
                value={manualToken}
                onChange={(e) => setManualToken(e.target.value)}
                placeholder="Paste ticket UUID token..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono text-xs focus:outline-none focus:border-yellow-400 transition-colors"
              />
              <button
                type="submit"
                disabled={isScanning || !manualToken.trim()}
                className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                {isScanning ? '...' : 'Scan'}
              </button>
            </form>
          </div>

        </div>

        {/* Scan Result Feedback Right */}
        <div className="md:col-span-6 space-y-6">
          
          {/* Result Card */}
          {scanResult ? (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-black border-2 border-emerald-500 space-y-4 shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400">
                    Admission Granted
                  </span>
                  <h3 className="text-xl font-black text-white">{scanResult.member_name}</h3>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Student ID:</span>
                  <span className="font-mono font-bold text-yellow-400">{scanResult.student_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Team Name:</span>
                  <span className="font-semibold text-white">{scanResult.team_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Timestamp:</span>
                  <span className="font-mono text-neutral-300">
                    {new Date(scanResult.scanned_at).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ) : scanError ? (
            <div className="p-8 rounded-3xl bg-gradient-to-br from-red-950/60 to-black border-2 border-red-500 space-y-4 shadow-[0_0_30px_rgba(239,68,68,0.2)] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-red-500/20 text-red-400">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-red-400">
                    Entry Denied / Invalid Pass
                  </span>
                  <h3 className="text-lg font-black text-white">Scan Rejected</h3>
                </div>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed bg-black/50 p-4 rounded-xl border border-red-900/40">
                {scanError}
              </p>
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-neutral-950 border border-neutral-800 text-center space-y-3">
              <UserCheck className="w-12 h-12 text-neutral-700 mx-auto" />
              <h4 className="text-sm font-bold text-white uppercase">Awaiting Next Ticket</h4>
              <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                Scan attendee QR code with the camera feed or submit ticket token directly.
              </p>
            </div>
          )}

          {/* Session Scan Log */}
          {history.length > 0 && (
            <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-yellow-400" /> Recent Gate Admissions ({history.length})
              </h4>
              <div className="divide-y divide-neutral-900">
                {history.map((h, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{h.member_name}</p>
                      <p className="text-[10px] text-neutral-500">ID: {h.student_id} • {h.team_name}</p>
                    </div>
                    <span className="font-mono text-[10px] text-emerald-400">
                      {new Date(h.scanned_at).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default GateScannerPage;
