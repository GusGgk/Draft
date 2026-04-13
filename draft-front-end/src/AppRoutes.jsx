import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';

// Import components
import App from './App';
import PageMain from './page-main/page-main';
import Onboarding from './onboarding/Onboarding';
import About from './about/About';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={routes.login} element={<App />} />
            <Route path={routes.home} element={<PageMain />} />
            <Route path={routes.onboarding} element={<Onboarding />} />
            <Route path={routes.about} element={<About />} />

            {/* Fallback for unknown routes */}
            <Route path="*" element={<App />} />
        </Routes>
    );
};

export default AppRoutes;
