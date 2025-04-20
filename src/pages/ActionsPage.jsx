import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

// Icono Placeholder
const BoltIcon = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
</svg>
);

function ActionsPage() {
  return (
    <div className="max-w-4xl">
       <h2 className="text-2xl font-semibold text-text-main mb-6">Acciones del Agente</h2>
       <p className="text-base text-text-muted mb-8">
           Define acciones específicas que tu agente puede realizar, como enviar correos, agendar citas o conectarse a otras APIs.
       </p>
       <Card>
          {/* Placeholder para lista o constructor de acciones */}
          <div className="text-center py-12">
             <BoltIcon className="mx-auto h-12 w-12 text-gray-400" />
             <h3 className="mt-2 text-sm font-medium text-text-main">Sin acciones definidas</h3>
             <p className="mt-1 text-sm text-text-muted">Empieza añadiendo la primera acción para tu agente.</p>
             <div className="mt-6">
               <Button>
                 {/* Icono Plus podría ir aquí */}
                 Añadir Nueva Acción
               </Button>
             </div>
          </div>
          {/* Aquí podrías listar las acciones creadas */}
       </Card>
    </div>
  );
}
export default ActionsPage; 