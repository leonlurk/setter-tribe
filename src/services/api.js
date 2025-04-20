// src/services/api.js

// Simula una llamada a la API con un retraso
const fakeApiCall = (data, delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(data), delay));

// --- Agent Creation ---
export const createAgent = async (agentData) => {
  console.log('API Call: createAgent', agentData);
  // Aquí iría la llamada real: axios.post('/api/agents', agentData) o fetch(...)
  return fakeApiCall({ success: true, agentId: `agent_${Date.now()}` });
};

// --- Knowledge Base ---
export const getKnowledgeBase = async (agentId) => {
  console.log('API Call: getKnowledgeBase', agentId);
  // Aquí iría: axios.get(`/api/agents/${agentId}/knowledge`)
  return fakeApiCall({
    information: 'Texto de ejemplo existente...',
    links: [{ url: 'https://www.ejemplo.com', frequency: 'monthly' }],
    files: [{ name: 'documento_previo.pdf', usage: 'Información general' }],
    qandas: [{ question: 'Pregunta frecuente?', answer: 'Respuesta detallada.' }]
  });
};

export const updateKnowledgeBase = async (agentId, knowledgeData) => {
  console.log('API Call: updateKnowledgeBase', agentId, knowledgeData);
  // Aquí iría: axios.put(`/api/agents/${agentId}/knowledge`, knowledgeData)
  return fakeApiCall({ success: true });
};

// --- Channels (WhatsApp, Instagram) ---
export const connectWhatsApp = async (connectionData) => {
   console.log('API Call: connectWhatsApp', connectionData);
   // Aquí iría: axios.post('/api/channels/whatsapp', connectionData)
   // Podría devolver un link wa.link o estado de conexión
   return fakeApiCall({ success: true, link: `wa.link/fake${Date.now()}` });
};

export const connectInstagram = async (credentials) => {
   console.log('API Call: connectInstagram', credentials);
   // Aquí iría: axios.post('/api/channels/instagram', credentials)
   return fakeApiCall({ success: true });
};

// --- Other potential API calls ---

// Añadimos la función para obtener la persona (simulada)
export const getAgentPersona = async (agentId) => {
  console.log('API Call: getAgentPersona', agentId);
  // Simular respuesta con datos de persona
  return fakeApiCall({
    success: true,
    name: `Agente ${agentId} Placeholder`,
    role: 'Rol placeholder cargado de API',
    language: 'es',
    tone: 'Amable',
    style: 'Claro y conciso',
    guidelines: 'Directrices cargadas de API.'
  });
};

// Añadimos la función para actualizar la persona (simulada)
export const updateAgentPersona = async (agentId, personaData) => {
  console.log('API Call: updateAgentPersona', agentId, personaData);
  // Simular respuesta de éxito
  return fakeApiCall({ success: true });
};

// publishAgent(agentId)
// getAgentList()
// etc. 