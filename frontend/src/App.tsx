import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import SmoothScroll from './components/common/SmoothScroll';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import MyTicketsPage from './pages/MyTicketsPage';
import { RegistrationPage } from './pages/registration';
import NECInitiativesPage from './pages/NECInitiativesPage';
import AlumniInitiativePage from './pages/AlumniInitiativePage';
import EnspireInitiativepage from './pages/EnspireInitiativepage';

// Admin Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import EventEditorPage from './pages/admin/EventEditorPage';
import ApprovalsPage from './pages/admin/ApprovalsPage';
import GateScannerPage from './pages/admin/GateScannerPage';
import UserManagePage from './pages/admin/UserManagePage';


const AppContent: React.FC = () => {
  const location = useLocation();

  const isStandalonePage =
    location.pathname === '/register' ||
    location.pathname === '/registration';

  return (
    <div className="flex flex-col min-h-screen bg-black text-white antialiased selection:bg-red-600 selection:text-white">

      {/* ================= NAVBAR ================= */}
      {!isStandalonePage && <Navbar />}

      <main className="flex-grow">

        <Routes>

          {/* ===================================================== */}
          {/* ================= PUBLIC PAGES ====================== */}
          {/* ===================================================== */}

          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/onboarding"
            element={<OnboardingPage />}
          />

          <Route
            path="/events"
            element={<EventsPage />}
          />

          <Route
            path="/events/:id"
            element={<EventDetailPage />}
          />

          <Route
            path="/tickets"
            element={<MyTicketsPage />}
          />

          <Route
            path="/register"
            element={<RegistrationPage />}
          />

          <Route
            path="/registration"
            element={<RegistrationPage />}
          />


          {/* ================= INITIATIVES ================= */}

          <Route
            path="/initiatives"
            element={<NECInitiativesPage />}
          />

          <Route
            path="/initiatives/alumni"
            element={<AlumniInitiativePage />}
          />

          {/* ================= ENSPIRE ================= */}

          <Route
            path="/enspire"
            element={<EnspireInitiativepage />}
          />


          {/* ===================================================== */}
          {/* ================= ADMIN ROUTES ====================== */}
          {/* ===================================================== */}

          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            <Route
              index
              element={<AdminDashboard />}
            />

            <Route
              path="events/new"
              element={<EventEditorPage />}
            />

            <Route
              path="events/:id/edit"
              element={<EventEditorPage />}
            />

            <Route
              path="approvals"
              element={<ApprovalsPage />}
            />

            <Route
              path="scan"
              element={<GateScannerPage />}
            />

            <Route
              path="users"
              element={<UserManagePage />}
            />
          </Route>


          {/* ===================================================== */}
          {/* ================= 404 FALLBACK ====================== */}
          {/* ===================================================== */}

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>

      </main>

      {/* ================= FOOTER ================= */}
      {!isStandalonePage && <Footer />}

    </div>
  );
};


export const App = () => {
  return (
    <BrowserRouter>

      <ToastProvider>

        <AuthProvider>

          <SmoothScroll>

            <AppContent />

          </SmoothScroll>

        </AuthProvider>

      </ToastProvider>

    </BrowserRouter>
  );
};


export default App;