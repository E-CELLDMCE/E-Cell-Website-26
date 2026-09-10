import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import SmoothScroll from './components/common/SmoothScroll';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import AboutUsPage from './pages/AboutUsPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import GalleryPage from './pages/GalleryPage';
import TeamPage from './pages/TeamPage';
import InitiativesPage from './pages/InitiativesPage';
import BlogsPage from './pages/BlogsPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import MyTicketsPage from './pages/MyTicketsPage';

// Admin Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import EventEditorPage from './pages/admin/EventEditorPage';
import ApprovalsPage from './pages/admin/ApprovalsPage';
import GateScannerPage from './pages/admin/GateScannerPage';
import UserManagePage from './pages/admin/UserManagePage';

export const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <SmoothScroll>
            <div className="flex flex-col min-h-screen bg-black text-white antialiased selection:bg-red-600 selection:text-white">
              <Navbar />
              
              <main className="flex-grow">
                <Routes>
                  {/* Public & Student Pages (accessible to all including admins) */}
                  <Route path="/" element={<Home />} />
                  <Route path="/about-us" element={<AboutUsPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/events/:id" element={<EventDetailPage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/initiatives" element={<InitiativesPage />} />
                  <Route path="/blogs" element={<BlogsPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/onboarding" element={<OnboardingPage />} />
                  <Route path="/tickets" element={<MyTicketsPage />} />

                  {/* Admin Protected Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="events/new" element={<EventEditorPage />} />
                    <Route path="events/:id/edit" element={<EventEditorPage />} />
                    <Route path="approvals" element={<ApprovalsPage />} />
                    <Route path="scan" element={<GateScannerPage />} />
                    <Route path="users" element={<UserManagePage />} />
                  </Route>

                  {/* 404 Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </SmoothScroll>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;