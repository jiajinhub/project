import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs';
import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from 'app/config/store';
//import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
//import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export const App = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.account.isAuthenticated);
  //const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = useAppSelector(state => state.applicationProfile.inProduction);
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);

  const paddingTop = '60px';

  useEffect(() => {
      //dispatch(getSession());
      // dispatch(getProfile());
    }, []);
  return (
    <BrowserRouter basename={baseHref}>
      <div className="app-container component" style={{ paddingTop }}>
        <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
          <ErrorBoundary>
              <div className={`${isAuthenticated ? '' : 'hideNavBar'}`}>
                <Header
                  isAuthenticated={isAuthenticated}
                  isAdmin={false}
                  ribbonEnv={ribbonEnv}
                  isInProduction={isInProduction}
                  isOpenAPIEnabled={isOpenAPIEnabled}
                />
              </div>
          </ErrorBoundary>
        <div className="container-fluid view-container" id="app-view-container">
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

// <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
// <ErrorBoundary>
//           { isAuthenticated ? (
//             <Header
//               isAuthenticated={isAuthenticated}
//               isAdmin={false}
//               ribbonEnv={ribbonEnv}
//               isInProduction={isInProduction}
//               isOpenAPIEnabled={isOpenAPIEnabled}
//             />
//           ) : (
//             <div></div>
//           )}
//         </ErrorBoundary>

// <div className="container-fluid view-container" id="app-view-container">
//            <Card className="jh-card">
//             <ErrorBoundary>
//               <AppRoutes />
//             </ErrorBoundary>
//           </Card>
//           <Footer />
//         </div>
