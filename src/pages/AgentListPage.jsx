import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

// Placeholder Data
const agents = [
  { id: '1', name: 'Asistente de Ventas', status: 'Activo', createdAt: '2024-03-10' },
  { id: '2', name: 'Soporte Técnico Nivel 1', status: 'Inactivo', createdAt: '2024-03-05' },
  { id: '3', name: 'Agente Inmobiliario Virtual', status: 'Activo', createdAt: '2024-02-20' },
];

function AgentListPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-text-main">Mis Agentes IA</h1>
        {/* Link a la página de creación (ruta podría cambiar) */}
        <Link to="/agents/new">
           <Button>Crear Nuevo Agente</Button>
        </Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border-color">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Nombre</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Estado</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">Fecha Creación</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border-color">
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-main">{agent.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                       agent.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                     }`}>
                       {agent.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-muted">{agent.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link to={`/agents/${agent.id}/persona`} className="text-primary hover:text-primary-dark mr-4">Editar</Link>
                    <button className="text-red-600 hover:text-red-800">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default AgentListPage; 