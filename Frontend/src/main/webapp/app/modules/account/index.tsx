import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Settings from './settings/settings';
import { PasswordPage } from './password/password';

const AccountRoutes = () => (
  <div>
    <ErrorBoundaryRoutes>
      <Route path="settings" element={<Settings />} />
      <Route path="password" element={<PasswordPage/>} />
    </ErrorBoundaryRoutes>
  </div>
);

export default AccountRoutes;
