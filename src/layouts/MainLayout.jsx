import React from 'react';
import Sidebar from './Sidebar';

function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-background text-text-main"> {/* Usar colores de config */}
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8"> {/* Más padding */}
        {children} {/* Aquí se renderizará el contenido de cada página */}
      </main>
    </div>
  );
}

export default MainLayout; 