import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Camera,
  Users,
  Settings,
  Image as ImageIcon,
  BarChart3,
  Plus,
  CreditCard
} from 'lucide-react';

import DashboardLayout from './components/layout/DashboardLayout';

// Super Admin Pages
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import StudiosManagement from './pages/super-admin/Studios';
import SuperAdminAnalytics from './pages/super-admin/Analytics';
import SuperAdminSettings from './pages/super-admin/Settings';
import SuperAdminPricing from './pages/super-admin/PricingPlans';
import StudioDetails from './pages/super-admin/StudioDetails';

// Studio Pages
import StudioDashboard from './pages/studio/Dashboard';
import Events from './pages/studio/Events';
import CreateEvent from './pages/studio/CreateEvent';
import Analytics from './pages/studio/Analytics';
import SettingsPage from './pages/studio/Settings';

// Guest Pages
import GuestEventGallery from './pages/guest/EventGallery';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

import { backend_url } from './config/backend';
import axios from 'axios';

const SuperAdminLayoutWrapper = ({ children, title }: { children: React.ReactNode, title: string }) => {
  const items = [
    { name: 'Overview', href: '/super-admin/dashboard', icon: LayoutDashboard },
    { name: 'Studios', href: '/super-admin/studios', icon: Users },
    { name: 'Analytics', href: '/super-admin/analytics', icon: BarChart3 },
    { name: 'Plans', href: '/super-admin/plans', icon: CreditCard },
    { name: 'Settings', href: '/super-admin/settings', icon: Settings },
  ];
  return <DashboardLayout items={items} title={title}>{children}</DashboardLayout>;
};

const StudioLayoutWrapper = ({ children, title }: { children: React.ReactNode, title: string }) => {
  const items = [
    { name: 'Dashboard', href: '/studio/dashboard', icon: LayoutDashboard },
    { name: 'My Events', href: '/studio/events', icon: Camera },
    { name: 'Create Event', href: '/studio/create-event', icon: Plus },
    { name: 'All Photos', href: '/studio/photos', icon: ImageIcon },
    { name: 'Analytics', href: '/studio/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/studio/settings', icon: Settings },
  ];
  return <DashboardLayout items={items} title={title}>{children}</DashboardLayout>;
};

const App = () => {
  const backendHealthCheck = async () => {
    const url = `${backend_url}/health`;
    const res = await axios.get(url);
    if (res && res.status === 200 && res.data?.status === "ok") {
      console.log("Backend is healthy");
    } else {
      console.log("Backend is not healthy");
    }
  }
  const test = async () => {
    const url = `${backend_url}/test`;
    const res = await axios.post(url, { a: 10, b: 20 });
    console.log(res.data);
  }
  const sample = async () => {
    const url = `${backend_url}/sample`
    const res = await axios.get(url);
    console.log(res.data);
  }

  useEffect(() => {
    backendHealthCheck();
    test();
    sample();
  }, []);
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* Redirect Root to Login for demo purposes */}
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

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
        <Route path="/super-admin/analytics" element={
          <SuperAdminLayoutWrapper title="Platform Analytics">
            <SuperAdminAnalytics />
          </SuperAdminLayoutWrapper>
        } />
        <Route path="/super-admin/settings" element={
          <SuperAdminLayoutWrapper title="System Settings">
            <SuperAdminSettings />
          </SuperAdminLayoutWrapper>
        } />
        <Route path="/super-admin/plans" element={
          <SuperAdminLayoutWrapper title="Subscription Plans">
            <SuperAdminPricing />
          </SuperAdminLayoutWrapper>
        } />
        <Route path="/super-admin/studio/:studioId" element={
          <SuperAdminLayoutWrapper title="Studio Profile">
            <StudioDetails />
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
            <div className="p-8 text-center bg-card rounded-3xl border border-border">
              <h2 className="text-2xl font-bold">Event Photos</h2>
              <p className="text-muted-foreground">This page is under construction.</p>
            </div>
          </StudioLayoutWrapper>
        } />
        <Route path="/studio/events" element={
          <StudioLayoutWrapper title="Events List">
            <Events />
          </StudioLayoutWrapper>
        } />
        <Route path="/studio/create-event" element={
          <StudioLayoutWrapper title="Create New Event">
            <CreateEvent />
          </StudioLayoutWrapper>
        } />
        <Route path="/studio/analytics" element={
          <StudioLayoutWrapper title="Analytics">
            <Analytics />
          </StudioLayoutWrapper>
        } />
        <Route path="/studio/settings" element={
          <StudioLayoutWrapper title="Settings">
            <SettingsPage />
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