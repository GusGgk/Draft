import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';

// Import components
import App from './App';
import PageMain from './page-main/page-main';
import Onboarding from './onboarding/Onboarding';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={routes.login} element={<App />} />
            <Route path={routes.home} element={<PageMain />} />
            <Route path={routes.onboarding} element={<Onboarding />} />

            {/* Fallback for unknown routes */}
            <Route path="*" element={<App />} />
        </Routes>
    );
};

export default AppRoutes;
