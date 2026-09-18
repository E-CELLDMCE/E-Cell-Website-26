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
    { to: '/admin', end: true, label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/approvals', end: false, label: 'Approvals', icon: CheckSquare },
    { to: '/admin/scan', end: false, label: 'Scanner', icon: QrCode },
    { to: '/admin/events/new', end: false, label: 'Create Event', icon: CalendarPlus },
    { to: '/admin/users', end: false, label: 'Manage Users', icon: Users },
  ];

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20 px-4 sm:px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Admin Navigation & Header Section */}
        <header className="pb-5 border-b border-neutral-800/80 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/30 text-red-500 shadow-[0_0_15px_rgba(220,38,38,0.25)] flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    E-Cell Admin Console
                  </h1>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-red-400 bg-red-950/50 border border-red-500/30 px-2.5 py-0.5 rounded-full shadow-sm">
                    Superadmin
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5 truncate">
                  Logged in as <strong className="text-neutral-200">{user?.name}</strong> ({user?.email})
                </p>
              </div>
            </div>
          </div>

          {/* Clean, horizontally scrollable pill tab bar */}
          <div className="overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 py-1">
            <nav className="flex items-center gap-2 min-w-max pb-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 cursor-pointer select-none active:scale-95 ${
                        isActive
                          ? 'bg-neutral-900 text-white border border-neutral-700/80 shadow-inner'
                          : 'bg-neutral-950/60 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800/80'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <IconComponent
                          className={`w-3.5 h-3.5 transition-colors duration-300 ${
                            isActive ? 'text-red-500' : 'text-neutral-400'
                          }`}
                        />
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="absolute -bottom-1 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </header>

        {/* Child Routes Outlet */}
        <Outlet />

      </div>
    </div>
  );
};

export default AdminLayout;
