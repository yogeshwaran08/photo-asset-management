import React, { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Camera,
  Users,
  Settings,
  Image as ImageIcon,
  BarChart3,
  CreditCard,
  Plus
} from 'lucide-react';

import DashboardLayout from './components/layout/DashboardLayout';

import SuperAdminDashboard from './pages/super-admin/Dashboard';
import StudiosManagement from './pages/super-admin/Studios';
import SuperAdminAnalytics from './pages/super-admin/Analytics';
import SuperAdminSettings from './pages/super-admin/Settings';
import SuperAdminPricing from './pages/super-admin/PricingPlans';
import StudioDetails from './pages/super-admin/StudioDetails';

import StudioDashboard from './pages/studio/Dashboard';
import Events from './pages/studio/Events';
import CreateEvent from './pages/studio/CreateEvent';
import Analytics from './pages/studio/Analytics';
import EventDetails from './pages/studio/EventDetails';
import ProfileSetup from './pages/studio/ProfileSetup';

import SettingsLayout from './components/layout/SettingsLayout';
import Profile from './pages/studio/settings/Profile';
import Branding from './pages/studio/settings/Branding';
import Domains from './pages/studio/settings/Domains';
import Integrations from './pages/studio/settings/Integrations';
import MyPlans from './pages/studio/settings/MyPlans';
import Invoices from './pages/studio/settings/Invoices';

import GuestEventGallery from './pages/guest/EventGallery';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import useUserStore from './store/userStore';

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
    { 
      name: 'My Events', 
      href: '/studio/events', 
      icon: Camera,
      subItems: [
        { name: 'All Events', href: '/studio/events', icon: ImageIcon },
        { name: 'Create Event', href: '/studio/create-event', icon: Plus }
      ]
    },
    { name: 'Analytics', href: '/studio/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/studio/settings', icon: Settings },
  ];
  return <DashboardLayout items={items} title={title}>{children}</DashboardLayout>;
};

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user } = useUserStore();
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'admin') {
      return <Navigate to="/super-admin/dashboard" replace />;
    } else {
      return <Navigate to="/studio/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  if (user) {
    if (user.role === 'admin') {
      return <Navigate to="/super-admin/dashboard" replace />;
    } else {
      return <Navigate to="/studio/dashboard" replace />;
    }
  }
  return <>{children}</>;
};

const App = () => {
  const { user, loading, refreshJwt } = useUserStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      await refreshJwt();
      setIsInitializing(false);
    }
    initAuth()
  }, [])

  if (isInitializing) return null;

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/auth/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/auth/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />

        <Route path="/" element={
          !user ? 
          <Navigate to="/auth/login" replace /> : 
          (user.role === 'admin' ? <Navigate to="/super-admin/dashboard" replace /> : <Navigate to="/studio/dashboard" replace />)
        } />

        <Route path="/super-admin/dashboard" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <SuperAdminLayoutWrapper title="Platform Overview">
              <SuperAdminDashboard />
            </SuperAdminLayoutWrapper>
          </ProtectedRoute>
        } />
        <Route path="/super-admin/studios" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <SuperAdminLayoutWrapper title="Studio Management">
              <StudiosManagement />
            </SuperAdminLayoutWrapper>
          </ProtectedRoute>
        } />
        <Route path="/super-admin/analytics" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <SuperAdminLayoutWrapper title="Platform Analytics">
              <SuperAdminAnalytics />
            </SuperAdminLayoutWrapper>
          </ProtectedRoute>
        } />
        <Route path="/super-admin/settings" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <SuperAdminLayoutWrapper title="System Settings">
              <SuperAdminSettings />
            </SuperAdminLayoutWrapper>
          </ProtectedRoute>
        } />
        <Route path="/super-admin/plans" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <SuperAdminLayoutWrapper title="Subscription Plans">
              <SuperAdminPricing />
            </SuperAdminLayoutWrapper>
          </ProtectedRoute>
        } />
        <Route path="/super-admin/studio/:studioId" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <SuperAdminLayoutWrapper title="Studio Profile">
              <StudioDetails />
            </SuperAdminLayoutWrapper>
          </ProtectedRoute>
        } />

        <Route path="/studio/dashboard" element={
          <ProtectedRoute allowedRoles={['studio']}>
            <StudioLayoutWrapper title="Studio Home">
              <StudioDashboard />
            </StudioLayoutWrapper>
          </ProtectedRoute>
        } />

        <Route path="/studio/events" element={
          <ProtectedRoute allowedRoles={['studio']}>
            <StudioLayoutWrapper title="Events List">
              <Events />
            </StudioLayoutWrapper>
          </ProtectedRoute>
        } />
        <Route path="/studio/events/:eventId" element={
          <StudioLayoutWrapper title="Event Management">
            <EventDetails />
          </StudioLayoutWrapper>
        } />
        <Route path="/studio/create-event" element={
          <ProtectedRoute allowedRoles={['studio']}>
            <StudioLayoutWrapper title="Create New Event">
              <CreateEvent />
            </StudioLayoutWrapper>
          </ProtectedRoute>
        } />
        <Route path="/studio/analytics" element={
          <ProtectedRoute allowedRoles={['studio']}>
            <StudioLayoutWrapper title="Analytics">
              <Analytics />
            </StudioLayoutWrapper>
          </ProtectedRoute>
        } />
        <Route path="/studio/settings" element={
          <ProtectedRoute allowedRoles={['studio']}>
            <StudioLayoutWrapper title="Settings">
              <SettingsLayout>
                <Profile />
              </SettingsLayout>
            </StudioLayoutWrapper>
          </ProtectedRoute>
        } />
        <Route path="/studio/settings/profile" element={
          <ProtectedRoute allowedRoles={['studio']}>
            <StudioLayoutWrapper title="Settings">
              <SettingsLayout>
                <Profile />
              </SettingsLayout>
            </StudioLayoutWrapper>
          </ProtectedRoute>
        } />
        <Route path="/studio/settings/branding" element={
          <ProtectedRoute allowedRoles={['studio']}>
            <StudioLayoutWrapper title="Settings">
              <SettingsLayout>
                <Branding />
              </SettingsLayout>
            </StudioLayoutWrapper>
          </ProtectedRoute>
        } />
        <Route path="/studio/settings/domains" element={
          <ProtectedRoute allowedRoles={['studio']}>
            <StudioLayoutWrapper title="Settings">
              <SettingsLayout>
                <Domains />
              </SettingsLayout>
            </StudioLayoutWrapper>
          </ProtectedRoute>
        } />
        <Route path="/studio/settings/integrations" element={
          <ProtectedRoute allowedRoles={['studio']}>
            <StudioLayoutWrapper title="Settings">
              <SettingsLayout>
                <Integrations />
              </SettingsLayout>
            </StudioLayoutWrapper>
          </ProtectedRoute>
        } />
        <Route path="/studio/settings/plans" element={
          <ProtectedRoute allowedRoles={['studio']}>
            <StudioLayoutWrapper title="Settings">
              <SettingsLayout>
                <MyPlans />
              </SettingsLayout>
            </StudioLayoutWrapper>
          </ProtectedRoute>
        } />
        <Route path="/studio/settings/invoices" element={
          <ProtectedRoute allowedRoles={['studio']}>
            <StudioLayoutWrapper title="Settings">
              <SettingsLayout>
                <Invoices />
              </SettingsLayout>
            </StudioLayoutWrapper>
          </ProtectedRoute>
        } />

        <Route path="/studio/profile-setup" element={<ProfileSetup />} />

        {/* Guest Routes - Dynamic Event View */}
        <Route path="/event/:eventId" element={<GuestEventGallery />} />

        {/* Demo Path for Guest View */}
        <Route path="/demo/event" element={<GuestEventGallery />} />
      </Routes>
    </Router>
  );
};

export default App;