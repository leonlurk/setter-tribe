import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { createAgent, getAgentList } from '../../services/api'; // Añadir getAgentList (simulada)

function SelectCloneSourcePage() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [selectedAgentId, setSelectedAgentId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Cargar lista de agentes existentes (simulado)
  useEffect(() => {
    setIsLoading(true);
    // getAgentList() // Necesitaríamos esta función en api.js
    Promise.resolve([ // Simulamos la respuesta
        { id: 'agent_1713628688917', name: 'Agente Previo 1' },
        { id: 'agent_1713628688918', name: 'Asistente de Soporte Clonado' },
    ])
      .then(data => setAgents(data || []))
      .catch(error => console.error("Error cargando agentes:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreate = async () => {
     if (!selectedAgentId) return;
     setIsCreating(true);
     console.log(`Clonando agente ID: ${selectedAgentId}`);
     try {
        const sourceAgent = agents.find(a => a.id === selectedAgentId);
       const response = await createAgent({ type: 'clone', name: `Clon de ${sourceAgent?.name || 'Agente'}`, sourceAgentId: selectedAgentId });
       if (response?.success && response.agentId) {
         navigate(`/agents/${response.agentId}/persona`);
       } else {
         console.error("Error simulado clonando agente");
         setIsCreating(false);
       }
     } catch (error) {
       console.error("Error real clonando agente:", error);
       setIsCreating(false);
     }
   };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-text-main mb-4">Clonar Persona</h1>
      <p className="text-base text-text-muted mb-8">Selecciona un agente existente para duplicar su configuración de persona y conocimientos como punto de partida.</p>

      {isLoading ? (
        <p className="text-center text-text-muted">Cargando agentes disponibles...</p>
      ) : (
        <div className="space-y-4">
          {agents.length === 0 ? (
            <p className="text-center text-text-muted">No tienes otros agentes para clonar.</p>
          ) : (
            agents.map(agent => (
              <Card
                key={agent.id}
                className={`cursor-pointer border-2 ${selectedAgentId === agent.id ? 'border-primary ring-2 ring-primary' : 'border-transparent hover:border-border-color'}`}
                onClick={() => setSelectedAgentId(agent.id)}
              >
                <h3 className="font-semibold text-text-main">{agent.name}</h3>
                {/* Podrías añadir más detalles del agente aquí si la API los devuelve */}
              </Card>
            ))
          )}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <Button onClick={handleCreate} disabled={!selectedAgentId || isLoading || isCreating || agents.length === 0}>
          {isCreating ? 'Clonando Agente...' : 'Clonar Agente Seleccionado'}
        </Button>
      </div>
    </div>
  );
}

export default SelectCloneSourcePage; 