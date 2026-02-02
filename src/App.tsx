import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Camera,
  Users,
  Settings,
  Image as ImageIcon,
  BarChart3
} from 'lucide-react';

import DashboardLayout from './components/layout/DashboardLayout';

// Super Admin Pages
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import StudiosManagement from './pages/super-admin/Studios';

// Studio Pages
import StudioDashboard from './pages/studio/Dashboard';
import EventPhotos from './pages/studio/EventPhotos';

// Guest Pages
import GuestEventGallery from './pages/guest/EventGallery';

const SuperAdminLayoutWrapper = ({ children, title }: { children: React.ReactNode, title: string }) => {
  const items = [
    { name: 'Overview', href: '/super-admin/dashboard', icon: LayoutDashboard },
    { name: 'Studios', href: '/super-admin/studios', icon: Users },
    { name: 'Analytics', href: '/super-admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/super-admin/settings', icon: Settings },
  ];
  return <DashboardLayout items={items} title={title}>{children}</DashboardLayout>;
};

const StudioLayoutWrapper = ({ children, title }: { children: React.ReactNode, title: string }) => {
  const items = [
    { name: 'Dashboard', href: '/studio/dashboard', icon: LayoutDashboard },
    { name: 'My Events', href: '/studio/events', icon: Camera },
    { name: 'All Photos', href: '/studio/photos', icon: ImageIcon },
    { name: 'Analytics', href: '/studio/analytics', icon: BarChart3 },
    { name: 'Customization', href: '/studio/theme', icon: Settings },
  ];
  return <DashboardLayout items={items} title={title}>{children}</DashboardLayout>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect Root to Studio Dashboard for demo purposes */}
        <Route path="/" element={<Navigate to="/studio/dashboard" replace />} />

        {/* Super Admin Routes */}
        <Route path="/super-admin/dashboard" element={
          <SuperAdminLayoutWrapper title="Platform Overview">
            <SuperAdminDashboard />
          </SuperAdminLayoutWrapper>
        } />
        <Route path="/super-admin/studios" element={
          <SuperAdminLayoutWrapper title="Studio Management">
            <StudiosManagement />
          </SuperAdminLayoutWrapper>
        } />

        {/* Studio Routes */}
        <Route path="/studio/dashboard" element={
          <StudioLayoutWrapper title="Studio Home">
            <StudioDashboard />
          </StudioLayoutWrapper>
        } />
        <Route path="/studio/photos" element={
          <StudioLayoutWrapper title="Event Photography">
            <EventPhotos />
          </StudioLayoutWrapper>
        } />
        <Route path="/studio/events" element={
          <StudioLayoutWrapper title="Events List">
            <StudioDashboard />
          </StudioLayoutWrapper>
        } />

        {/* Guest Routes - Dynamic Event View */}
        <Route path="/event/:eventId" element={<GuestEventGallery />} />

        {/* Demo Path for Guest View */}
        <Route path="/demo/event" element={<GuestEventGallery />} />
      </Routes>
    </Router>
  );
};

export default App;