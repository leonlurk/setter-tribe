import React from 'react';
import { useParams, Outlet, NavLink, useLocation } from 'react-router-dom';

// Placeholder para datos del agente (se cargarían con useEffect y api.js)
const agentData = { name: 'Asistente de Ventas' };

const tabs = [
    { name: 'Persona IA', href: 'persona' },
    { name: 'Conocimientos', href: 'knowledge-base' },
    { name: 'Canales', href: 'channels' },
    { name: 'Acciones', href: 'actions' },
    { name: 'Publicar', href: 'publish' },
];

function AgentDetailPage() {
    const { agentId } = useParams();
    const location = useLocation(); // Para obtener la ruta completa

    // Determina la ruta base para NavLink
    const baseHref = `/agents/${agentId}`;

    return (
        <div>
            <h1 className="text-3xl font-bold text-text-main mb-2">
                Configurar Agente: <span className="text-primary">{agentData.name}</span> (ID: {agentId})
            </h1>
            <p className="text-base text-text-muted mb-8">Ajusta la personalidad, conocimientos y comportamiento de tu agente.</p>

            {/* Pestañas de Navegación */}
            <div className="mb-8 border-b border-border-color">
                <nav className="-mb-px flex space-x-8" aria-label="Pestañas del Agente">
                    {tabs.map((tab) => {
                        const to = `${baseHref}/${tab.href}`;
                        // Comprueba si la ruta actual coincide exactamente o es una subruta de la pestaña
                        const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);
                        return (
                            <NavLink
                                key={tab.name}
                                to={to}
                                className={({ isActive: routerIsActive }) => // Usar isActive de NavLink o la comprobación manual
                                    `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                        isActive // Priorizar nuestra lógica si es necesaria
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-text-muted hover:text-text-main hover:border-gray-300'
                                    }`
                                }
                                // aria-current={isActive ? 'page' : undefined} // aria-current se maneja por NavLink si className es una función
                            >
                                {tab.name}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>

            {/* Contenido de la pestaña (renderizado por rutas anidadas) */}
            <Outlet />
        </div>
    );
}

export default AgentDetailPage; 