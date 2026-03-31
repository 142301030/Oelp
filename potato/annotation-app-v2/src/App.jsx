import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

import LoginPage                 from './pages/LoginPage';
import RoleSelectionPage         from './pages/RoleSelectionPage';
import UserInstructionsPage      from './pages/user/UserInstructionsPage';
import UploadPage                from './pages/user/UploadPage';
import PurposePage               from './pages/user/PurposePage';
import ConfigurePage             from './pages/user/ConfigurePage';
import AnnotatorInstructionsPage from './pages/annotator/AnnotatorInstructionsPage';
import AnnotationPage            from './pages/annotator/AnnotationPage';
import DonePage                  from './pages/annotator/DonePage';

function RequireAuth({ children }) {
  const { state } = useApp();
  const loc = useLocation();
  if (!state.isLoggedIn) return <Navigate to="/login" state={{ from: loc }} replace />;
  return children;
}

function RequireData({ children }) {
  const { state } = useApp();
  if (!state.uploadedData) return <Navigate to="/user/upload" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login"  element={<LoginPage />} />
      <Route path="/role-select" element={<RequireAuth><RoleSelectionPage /></RequireAuth>} />

      {/* Uploader flow */}
      <Route path="/user"              element={<Navigate to="/user/instructions" replace />} />
      <Route path="/user/instructions" element={<RequireAuth><UserInstructionsPage /></RequireAuth>} />
      <Route path="/user/upload"       element={<RequireAuth><UploadPage /></RequireAuth>} />
      <Route path="/user/purpose"      element={<RequireAuth><RequireData><PurposePage /></RequireData></RequireAuth>} />
      <Route path="/user/configure"    element={<RequireAuth><RequireData><ConfigurePage /></RequireData></RequireAuth>} />

      {/* Annotator flow */}
      <Route path="/annotator"              element={<Navigate to="/annotator/instructions" replace />} />
      <Route path="/annotator/instructions" element={<RequireAuth><AnnotatorInstructionsPage /></RequireAuth>} />
      <Route path="/annotator/annotate"     element={<RequireAuth><AnnotationPage /></RequireAuth>} />
      <Route path="/annotator/done"         element={<RequireAuth><DonePage /></RequireAuth>} />

      <Route path="/"  element={<Navigate to="/login" replace />} />
      <Route path="*"  element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
