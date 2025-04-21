import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
// Importamos React Router si lo usamos más adelante para las páginas
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Páginas Principales
import AgentListPage from './pages/AgentListPage';
// import CreateAgentPage from './pages/CreateAgentPage'; // Esta ya no será una ruta directa
import AnalyticsPage from './pages/AnalyticsPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import AutomationRulesPage from './pages/AutomationRulesPage';
import MessagesLogPage from './pages/MessagesLogPage';

// --- Páginas de Creación ---
import CreateAgentLandingPage from './pages/CreateAgentPage'; // Renombramos para claridad
import SelectFormPage from './pages/creation/SelectFormPage';
import SelectTemplatePage from './pages/creation/SelectTemplatePage';
import SelectCloneSourcePage from './pages/creation/SelectCloneSourcePage';
// --------------------------

// Páginas de Detalle de Agente (anidadas)
import AgentDetailPage from './pages/AgentDetailPage'; // Layout con pestañas
import PersonaAIPage from './pages/PersonaAIPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import ConnectChannelsPage from './pages/ConnectChannelsPage';
import ActionsPage from './pages/ActionsPage';
import PublishPage from './pages/PublishPage';

function App() {
  return (
    // <Router> // Descomentar si usamos React Router
      <MainLayout>
         <Routes>  {/* Usar Routes para definir las rutas */}
           {/* Ruta raíz redirige a la lista de agentes */}
           <Route path="/" element={<Navigate to="/agents" replace />} />

           {/* Rutas principales */}
           <Route path="/agents" element={<AgentListPage />} />
           {/* Rutas de Creación */}
           <Route path="/agents/new" element={<CreateAgentLandingPage />} />
           <Route path="/agents/new/select-form" element={<SelectFormPage />} />
           <Route path="/agents/new/select-template" element={<SelectTemplatePage />} />
           <Route path="/agents/new/select-clone" element={<SelectCloneSourcePage />} />
           {/* ---- */}
           <Route path="/analytics" element={<AnalyticsPage />} />
           <Route path="/settings" element={<ProfileSettingsPage />} />
           <Route path="/automation-rules" element={<AutomationRulesPage />} />
           <Route path="/messages-log" element={<MessagesLogPage />} />

           {/* Rutas de Detalle de Agente (Anidadas) */}
           <Route path="/agents/:agentId" element={<AgentDetailPage />}>
              {/* Ruta índice (por defecto) redirige a Persona IA */}
              <Route index element={<Navigate to="persona" replace />} />
              <Route path="persona" element={<PersonaAIPage />} />
              <Route path="knowledge-base" element={<KnowledgeBasePage />} />
              <Route path="channels" element={<ConnectChannelsPage />} />
              <Route path="actions" element={<ActionsPage />} />
              <Route path="publish" element={<PublishPage />} />
           </Route>

           {/* Ruta Not Found */}
           <Route path="*" element={<NotFoundPage />} />
         </Routes>
      </MainLayout>
    // </Router> // Descomentar si usamos React Router
  );
}

export default App;
