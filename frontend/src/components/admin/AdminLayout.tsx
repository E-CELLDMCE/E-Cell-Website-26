import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  CheckSquare,
  QrCode,
  CalendarPlus,
  Users,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center bg-black text-white">
        <p className="text-sm font-bold text-neutral-400">Verifying Admin Privileges...</p>
      </div>
    );
  }

  // Guard: Must be admin
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { to: '/admin', end: true, label: 'Overview & Events', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/admin/approvals', end: false, label: 'Payment Approvals', icon: <CheckSquare className="w-4 h-4" /> },
    { to: '/admin/scan', end: false, label: 'Gate QR Scanner', icon: <QrCode className="w-4 h-4" /> },
    { to: '/admin/events/new', end: false, label: 'Create New Event', icon: <CalendarPlus className="w-4 h-4" /> },
    { to: '/admin/users', end: false, label: 'Manage & Promotions', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Admin Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white uppercase tracking-tight">
                  E-Cell Admin Console
                </h1>
                <span className="text-[10px] uppercase font-bold text-yellow-400 bg-yellow-950/60 border border-yellow-500/30 px-2 py-0.5 rounded">
                  Superadmin
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Logged in as <strong className="text-white">{user?.name}</strong> ({user?.email})
              </p>
            </div>
          </div>

          {/* Sub Navigation Links */}
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-yellow-400 text-black shadow-md shadow-yellow-500/20'
                      : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:text-white hover:border-neutral-700'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Child Routes Outlet */}
        <Outlet />

      </div>
    </div>
  );
};

export default AdminLayout;
