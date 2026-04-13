import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from './routes';

// Import components
import App from './App';
import PageMain from './view/page-main/page-main';
import Onboarding from './view/onboarding/Onboarding';
import Perfil from './view/perfil/perfil';
import EditarPerfil from './view/editarPerfil/editarPerfil';
import Configuracoes from './view/configuracoesPage/configuracoes';
import About from './about/About';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path={routes.login} element={<App />} />
            <Route path={routes.home} element={<PageMain />} />
            <Route path={routes.onboarding} element={<Onboarding />} />
            <Route path={routes.perfil} element={<Perfil />} />
            <Route path={routes.editarPerfil} element={<EditarPerfil />} />
            <Route path={routes.configuracoes} element={<Configuracoes />} />
              <Route path={routes.about} element={<About />} />

            {/* Fallback for unknown routes */}
            <Route path="*" element={<App />} />
        </Routes>
    );
};

export default AppRoutes;
