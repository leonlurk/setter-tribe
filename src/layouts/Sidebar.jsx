import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Heroicons (SVG como componentes React)
const RectangleStackIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0l5.571 3m-5.571-3l-5.571 3m11.142 0l-5.571 3m5.571-3v11.25c0 .621-.504 1.125-1.125 1.125h-5.571c-.621 0-1.125-.504-1.125-1.125v-11.25m11.142 0l4.179 2.25M12 15.75l-4.179 2.25m0 0l4.179 2.25 4.179-2.25m-8.358 0l4.179 2.25M3.375 7.5l4.179 2.25m0 0l4.179 2.25M7.55 15.75l4.179-2.25m-4.179 2.25v-11.25a1.125 1.125 0 011.125-1.125h1.5a1.125 1.125 0 011.125 1.125v11.25m-3.75 0h3.75m-3.75 0L7.5 18l-4.125-2.25" />
  </svg>
);

const ChartBarIcon = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
</svg>
);

const Cog6ToothIcon = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.646.87.333.184.726.217 1.08.092l1.26-.365c.513-.148.975.342.792.816l-1.26 2.203c-.253.44-.686.756-1.175.82l-1.37.098c-.41.03-.786.217-1.05.49l-1.07 1.07c-.318.317-.744.497-1.18.497s-.862-.18-1.18-.497l-1.07-1.07c-.263-.274-.64-.46-1.05-.49l-1.37-.098c-.49-.064-.922-.38-1.175-.82l-1.26-2.203c-.183-.474.279-.964.792-.816l1.26.365c.354.125.747.092 1.08-.092.333-.184.582-.496.646-.87l.213-1.281zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM3 15.75a3 3 0 013-3h12a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V15.75z" />
</svg>
);

const SunIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const MoonIcon = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
</svg>
);

// Icono para Automatización
const WrenchScrewdriverIcon = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.145l-5.457 5.457a3.003 3.003 0 00-4.242-4.242l-4.283 5.109a3.375 3.375 0 00-.942 2.586l-.008.008A3.375 3.375 0 005.378 21l.008.007a3.375 3.375 0 002.586-.942l5.108-4.283a3.001 3.001 0 004.242-4.242Z" />
</svg>
);

// Icono para Logs y Acciones
const ChatBubbleLeftRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.1-3.102a11.25 11.25 0 01-5.176 0l-3.1 3.102v-3.091c-.34-.02-.68-.045-1.02-.072-1.133-.093-1.98-1.057-1.98-2.193V10.608c0-.97.616-1.813 1.5-2.097M15.75 6.75v-1.5c0-1.5-1.5-2.25-3.75-2.25S8.25 3.75 8.25 5.25v1.5m7.5 0v4.5m-7.5-4.5v4.5m7.5 0H8.25m7.5 0h1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-9.75c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125H8.25" />
  </svg>
);

const NavLink = ({ to, Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

  // Estilos basados en tema oscuro de TRIBE IA
  const baseClass = 'flex items-center w-full px-4 py-2.5 rounded-lg transition-colors duration-150 text-sidebar-text-muted'; // Texto muted por defecto
  const activeClass = 'bg-sidebar-item-active-bg text-sidebar-text-main font-semibold'; // Fondo activo, texto blanco principal y negrita
  const inactiveClass = 'hover:text-sidebar-text-main hover:bg-sidebar-item-hover-bg'; // Hover texto principal y fondo hover

  return (
     <li>
       <Link
         to={to}
         className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
         title={label}
       >
         {/* Icono blanco por defecto */}
         <Icon className="w-6 h-6 mr-4 shrink-0 text-white" />
         <span className="flex-1 text-sm font-medium">{label}</span>
       </Link>
     </li>
  );
};

function Sidebar() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Asumimos dark por defecto como en TRIBE IA

  return (
    // Ancho fijo, fondo oscuro, texto blanco, bordes redondeados TR
    <aside className="w-72 h-screen bg-sidebar-bg flex flex-col text-sidebar-text-main rounded-tr-3xl shadow-lg shrink-0">
      {/* Logo Section - Aumentar altura */}
      <div className="h-28 flex items-center justify-center px-6 border-b border-sidebar-border"> {/* Aumentado h-20 a h-28 */}
          <img src="/logoBlanco.png" alt="Setter AI" className="h-16" /> {/* Logo centrado por flex */}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {/* Mantener las mismas secciones que definimos antes */}
          <NavLink to="/agents" Icon={RectangleStackIcon} label="Agentes" />
          <NavLink to="/analytics" Icon={ChartBarIcon} label="Analíticas" />
          {/* Añadir enlaces a nuevas páginas */}
          <NavLink to="/automation-rules" Icon={WrenchScrewdriverIcon} label="Automatización" />
          <NavLink to="/messages-log" Icon={ChatBubbleLeftRightIcon} label="Logs y Acciones" />
      </nav>

      {/* Bottom Section */}
      <div className="px-4 pb-6 pt-4 border-t border-sidebar-border">
        <ul className="space-y-2">
             {/* Theme Toggle Button (Placeholder) */}
             <li>
                <button
                   onClick={() => setIsDarkMode(!isDarkMode)}
                   className="flex items-center w-full px-4 py-2.5 rounded-lg text-sidebar-text-muted hover:text-sidebar-text-main hover:bg-sidebar-item-hover-bg"
                 >
                  {isDarkMode ? <SunIcon className="w-6 h-6 mr-4 text-white" /> : <MoonIcon className="w-6 h-6 mr-4 text-white" />}
                  <span className="flex-1 text-sm font-medium">{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
                </button>
             </li>
            {/* Settings Link */}
            <NavLink to="/settings" Icon={Cog6ToothIcon} label="Ajustes" />
        </ul>
         {/* User Profile Section */}
         <div className="mt-6 pt-6 border-t border-sidebar-border">
             <Link to="/settings" className="flex items-center group">
                {/* Placeholder Avatar */}
                <img
                   src="/assets/user.png" // Placeholder de imagen como en TRIBE IA
                   alt="Avatar"
                   className="w-10 h-10 rounded-full mr-3 shrink-0 border border-sidebar-border group-hover:opacity-90"
                   onError={(e) => { // Fallback simple
                      e.target.onerror = null;
                      e.target.outerHTML = `<div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold mr-3 shrink-0 group-hover:opacity-90">U</div>`;
                   }}
                />
                <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-semibold text-sidebar-text-main group-hover:text-gray-200 truncate">Nombre Usuario</p>
                    <p className="text-xs text-sidebar-text-muted truncate">usuario@ejemplo.com</p>
                </div>
             </Link>
         </div>
      </div>
    </aside>
  );
}

export default Sidebar;