import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth as useClerkAuth } from '@clerk/clerk-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppLayout } from './components/Layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { DsaRoadmapPage } from './pages/DsaRoadmapPage';
import { SmartRevisionPage } from './pages/SmartRevisionPage';
import { TaskManagementPage } from './pages/TaskManagementPage';
import { SchedulePlannerPage } from './pages/SchedulePlannerPage';
import { FocusTimerPage } from './pages/FocusTimerPage';
import { DeadlinesPage } from './pages/DeadlinesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AptitudeZohoPage } from './pages/AptitudeZohoPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { SSOCallback } from './pages/SSOCallback';
import { ZohoQuestionsPage } from './pages/ZohoQuestionsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn, isLoaded } = useClerkAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading FocusForge...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/sso-callback" element={<SSOCallback />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="tasks" element={<TaskManagementPage />} />
            <Route path="dsa" element={<DsaRoadmapPage />} />
            <Route path="revision" element={<SmartRevisionPage />} />
            <Route path="schedule" element={<SchedulePlannerPage />} />
            <Route path="focus" element={<FocusTimerPage />} />
            <Route path="deadlines" element={<DeadlinesPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="aptitude-zoho" element={<AptitudeZohoPage />} />
            <Route path="zoho-questions" element={<ZohoQuestionsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

