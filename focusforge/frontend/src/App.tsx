import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { OAuth2RedirectHandler } from './pages/OAuth2RedirectHandler';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

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
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
