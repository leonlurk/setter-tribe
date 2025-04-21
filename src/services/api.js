// src/services/api.js
// Quitamos el import de 'json' si no se usa react-router-dom aquí.
// import { json } from "react-router-dom";

// --- URL Base de la API ---
const API_BASE_URL = 'https://alets.com.ar/setter-api'; // URL del backend desplegado

// Función helper para manejar respuestas fetch
const handleResponse = async (response) => {
  if (!response.ok) {
    // Intenta obtener detalles del error del cuerpo JSON, si falla, usa statusText
    let errorData = { message: response.statusText };
    try {
        errorData = await response.json();
    } catch (e) {
        console.warn("No se pudo parsear el cuerpo de la respuesta de error como JSON.");
    }
    console.error('API Error Response:', response.status, errorData);
    // Usa el mensaje del errorData si existe, si no, usa el statusText o un mensaje genérico
    throw new Error(errorData?.message || response.statusText || `Error en la petición: ${response.status}`);
  }
  // Intenta parsear como JSON. Si el cuerpo está vacío o no es JSON, puede devolver null o lanzar error.
  try {
      // Verificar si la respuesta tiene contenido antes de intentar parsear
      const text = await response.text();
      if (!text) {
        // Si el cuerpo está vacío, devolver éxito (ej. para respuestas 204 No Content)
        return { success: true, message: "Operación exitosa (sin contenido)" };
      }
      // Intentar parsear el texto como JSON
      return JSON.parse(text);
  } catch (e) {
      // Si falla el parseo JSON (ej. /test devuelve texto plano)
      console.warn("Respuesta no es JSON, puede ser texto plano:", e);
      // En este caso, podrías devolver el texto directamente si eso es útil,
      // o un objeto indicando éxito si la respuesta fue 'ok' (status 2xx)
      // Para el caso específico de /test, lo manejamos en su propia función.
      // Para otros casos, devolvemos un objeto genérico de éxito.
      return { success: true, message: "Operación exitosa (respuesta no JSON)", responseBody: text }; // Devolver el texto puede ser útil
  }
};


// --- Agent Creation (NO IMPLEMENTADO EN BACKEND ACTUAL) ---
export const createAgent = async (agentData) => {
  console.warn('API Call: createAgent -> No implementado en backend actual', agentData);
  // Simulación simple, ya que el backend no tiene este endpoint
  return Promise.resolve({ success: true, agentId: `agent_dummy_${Date.now()}`, message: "Función no implementada en backend" });
  /* Ejemplo si existiera:
  try {
    const response = await fetch(`${API_BASE_URL}/api/agents`, { // Ruta hipotética
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agentData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating agent:', error);
    return { success: false, message: error.message };
  }
  */
};

// --- Knowledge Base (NO IMPLEMENTADO EN BACKEND ACTUAL) ---
export const getKnowledgeBase = async (agentId) => {
  console.warn('API Call: getKnowledgeBase -> No implementado en backend actual', agentId);
  // Simulación
   return Promise.resolve({
    success: true, // Indicar éxito simulado
    message: "Función no implementada en backend", // Mensaje claro
    information: 'Texto de ejemplo (simulado)...\n\nEste contenido es simulado porque el endpoint correspondiente no existe en el backend actual.',
    links: [{ url: 'https://www.ejemplo-simulado.com', frequency: 'monthly' }],
    files: [{ name: 'documento_simulado.pdf', usage: 'Información general simulada' }],
    qandas: [{ question: '¿Esta función está implementada?', answer: 'No, esta es una respuesta simulada.' }]
  });
  /* Ejemplo si existiera:
  try {
    const response = await fetch(`${API_BASE_URL}/api/agents/${agentId}/knowledge`); // Ruta hipotética
    return handleResponse(response);
  } catch (error) {
    console.error('Error getting knowledge base:', error);
    return { success: false, message: error.message, information: '', links: [], files: [], qandas: [] };
  }
  */
};

export const updateKnowledgeBase = async (agentId, knowledgeData) => {
  console.warn('API Call: updateKnowledgeBase -> No implementado en backend actual', agentId, knowledgeData);
  // Simulación
  return Promise.resolve({ success: true, message: "Función no implementada en backend" });
  /* Ejemplo si existiera:
  try {
    const response = await fetch(`${API_BASE_URL}/api/agents/${agentId}/knowledge`, { // Ruta hipotética
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(knowledgeData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error updating knowledge base:', error);
    return { success: false, message: error.message };
  }
  */
};


// --- Channels ---

// WhatsApp Status (QR Code, Ready State)
export const getWhatsAppStatus = async () => {
  console.log('API Call: getWhatsAppStatus -> /status');
  try {
    const response = await fetch(`${API_BASE_URL}/status`);
    // Esta ruta devuelve { qrCodeUrl, clientReady }
    // handleResponse parseará la respuesta JSON
    const data = await handleResponse(response);
    // Añadimos success:true si la llamada fue exitosa (implícito en handleResponse si no lanza error)
    return { ...data, success: true };
  } catch (error) {
    console.error('Error fetching WhatsApp status:', error);
    // Devolver un estado consistente en caso de error
    return { success: false, message: error.message, qrCodeUrl: null, clientReady: false };
  }
};

// connectWhatsApp (Simulada - El backend maneja la conexión internamente via /status y QR)
export const connectWhatsApp = async (connectionData) => {
   console.warn('API Call: connectWhatsApp -> No aplicable directamente. Usar getWhatsAppStatus para ver QR/estado.', connectionData);
   // El backend inicia la conexión al arrancar y expone el estado/QR via /status.
   // Esta función podría usarse para *mostrar* el QR obtenido de /status, no para iniciar conexión.
   // Devolvemos el estado actual para que el frontend pueda reaccionar.
   return getWhatsAppStatus();
};

// connectInstagram (NO IMPLEMENTADO EN BACKEND ACTUAL)
export const connectInstagram = async (credentials) => {
   console.warn('API Call: connectInstagram -> No implementado en backend actual', credentials);
   // Simulación
   return Promise.resolve({ success: true, message: "Función no implementada en backend" });
   /* Ejemplo si existiera:
    try {
      const response = await fetch(`${API_BASE_URL}/api/channels/instagram`, { // Ruta hipotética
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error connecting Instagram:', error);
      return { success: false, message: error.message };
    }
   */
};

// --- Agent Persona (NO IMPLEMENTADO EN BACKEND ACTUAL) ---
export const getAgentPersona = async (agentId) => {
  console.warn('API Call: getAgentPersona -> No implementado en backend actual', agentId);
  // Simulación
  return Promise.resolve({
    success: true,
    message: "Función no implementada en backend",
    name: `Agente ${agentId} Simulado`,
    role: 'Rol simulado por falta de endpoint',
    language: 'es',
    tone: 'Amable (simulado)',
    style: 'Claro (simulado)',
    guidelines: 'Directrices simuladas porque el backend no las provee.'
  });
  /* Ejemplo si existiera:
   try {
      const response = await fetch(`${API_BASE_URL}/api/agents/${agentId}/persona`); // Ruta hipotética
      return handleResponse(response);
    } catch (error) {
      console.error('Error getting agent persona:', error);
      return { success: false, message: error.message, name:'', role:'', language:'', tone:'', style:'', guidelines:'' };
    }
  */
};

export const updateAgentPersona = async (agentId, personaData) => {
  console.warn('API Call: updateAgentPersona -> No implementado en backend actual', agentId, personaData);
  // Simulación
  return Promise.resolve({ success: true, message: "Función no implementada en backend" });
  /* Ejemplo si existiera:
   try {
      const response = await fetch(`${API_BASE_URL}/api/agents/${agentId}/persona`, { // Ruta hipotética
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(personaData),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('Error updating agent persona:', error);
      return { success: false, message: error.message };
    }
   */
};

// --- Publishing (Simulado - Depende del estado de WhatsApp) ---
// Mapea el estado de WhatsApp a la información de publicación que necesita el frontend
export const getAgentPublishInfo = async (agentId) => {
  console.log('API Call: getAgentPublishInfo -> Usando /status del backend');
  // Reutilizamos getWhatsAppStatus ya que el estado de publicación depende de si WhatsApp está listo.
  const status = await getWhatsAppStatus();
  return {
      success: status.success, // Hereda el éxito de la llamada a /status
      // Mapeo de estados más detallado
      status: status.clientReady ? 'published' : (status.qrCodeUrl ? 'pending_qr' : 'disconnected'),
      connectedChannels: status.clientReady ? ['whatsapp'] : [],
      qrCodeUrl: status.qrCodeUrl, // Pasar el QR si existe
      lastPublished: null, // No disponible en backend actual
      message: status.message // Pasar mensaje de error si lo hubo
  };
};

// La acción de "publicar" no existe como tal, se simula basada en el estado
export const publishAgent = async (agentId) => {
  console.warn('API Call: publishAgent -> No aplicable directamente. El agente se "publica" cuando WhatsApp está listo.', agentId);
  // No hay una acción de "publicar" separada, depende del estado de WhatsApp.
  // Devolvemos el estado actual.
  const statusInfo = await getAgentPublishInfo(agentId); // Obtener estado actual
   return {
      success: statusInfo.success && statusInfo.status === 'published', // Éxito solo si ya está "published"
      status: statusInfo.status,
      lastPublished: statusInfo.status === 'published' ? new Date().toISOString() : null, // Simular fecha si está listo
      // Mensaje más informativo
      message: statusInfo.status === 'published' ? "El agente ya está activo (WhatsApp conectado)." :
               statusInfo.status === 'pending_qr' ? "El agente está esperando escaneo de QR." :
               "El agente no está listo (WhatsApp desconectado o error)."
   };
};

// --- NUEVAS FUNCIONES PARA ENDPOINTS DEL BACKEND REAL ---

// --- Reglas Simples ---
export const getRules = async () => {
  console.log('API Call: getRules -> /rules');
  try {
    const response = await fetch(`${API_BASE_URL}/rules`);
    return await handleResponse(response); // Devuelve array de reglas [{ trigger, response }]
  } catch (error) {
    console.error('Error fetching rules:', error);
    return []; // Devuelve array vacío en caso de error
  }
};

export const addRule = async (trigger, responseText) => {
  console.log('API Call: addRule -> /add-rule');
  try {
    const response = await fetch(`${API_BASE_URL}/add-rule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Asegurarse que el backend espera { trigger, response }
      body: JSON.stringify({ trigger: trigger.trim(), response: responseText.trim() }),
    });
    return await handleResponse(response); // Devuelve { success, rule } o { success, message }
  } catch (error) {
    console.error('Error adding rule:', error);
    return { success: false, message: error.message };
  }
};

export const deleteRule = async (trigger) => {
  console.log('API Call: deleteRule -> /delete-rule/:trigger');
  try {
    // El trigger puede contener caracteres especiales, hay que codificarlo
    const encodedTrigger = encodeURIComponent(trigger);
    const response = await fetch(`${API_BASE_URL}/delete-rule/${encodedTrigger}`, {
      method: 'DELETE',
    });
    return await handleResponse(response); // Devuelve { success, message }
  } catch (error) {
    console.error('Error deleting rule:', error);
    return { success: false, message: error.message };
  }
};

// --- Disparadores Gemini ---
export const getGeminiStarters = async () => {
  console.log('API Call: getGeminiStarters -> /gemini-starters');
  try {
    const response = await fetch(`${API_BASE_URL}/gemini-starters`);
    return await handleResponse(response); // Devuelve array de starters [{ trigger, prompt }]
  } catch (error) {
    console.error('Error fetching gemini starters:', error);
    return []; // Devuelve array vacío en caso de error
  }
};

export const addGeminiStarter = async (trigger, prompt) => {
  console.log('API Call: addGeminiStarter -> /add-gemini-starter');
  try {
    const response = await fetch(`${API_BASE_URL}/add-gemini-starter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trigger: trigger.trim(), prompt: prompt.trim() }),
    });
    return await handleResponse(response); // Devuelve { success, starter } o { success, message }
  } catch (error) {
    console.error('Error adding gemini starter:', error);
    return { success: false, message: error.message };
  }
};

export const deleteGeminiStarter = async (trigger) => {
  console.log('API Call: deleteGeminiStarter -> /delete-gemini-starter/:trigger');
  try {
    const encodedTrigger = encodeURIComponent(trigger);
    const response = await fetch(`${API_BASE_URL}/delete-gemini-starter/${encodedTrigger}`, {
      method: 'DELETE',
    });
    return await handleResponse(response); // Devuelve { success, message }
  } catch (error) {
    console.error('Error deleting gemini starter:', error);
    return { success: false, message: error.message };
  }
};

// --- Mensajes y Conversaciones ---
export const getMessages = async () => {
  console.log('API Call: getMessages -> /messages');
  try {
    const response = await fetch(`${API_BASE_URL}/messages`);
    return await handleResponse(response); // Devuelve array de mensajes [{ from, body, timestamp, ... }]
  } catch (error) {
    console.error('Error fetching messages:', error);
    return []; // Devuelve array vacío en caso de error
  }
};

export const sendMessage = async (number, message) => {
  console.log('API Call: sendMessage -> /send-message');
  if (!number || !message) {
      return { success: false, message: "Número y mensaje son requeridos." };
  }
  try {
    const response = await fetch(`${API_BASE_URL}/send-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number, message }),
    });
    return await handleResponse(response); // Devuelve { success, message }
  } catch (error) {
    console.error('Error sending message:', error);
    return { success: false, message: error.message };
  }
};

export const initiateConversation = async (number, promptForOpeningMessage) => {
  console.log('API Call: initiateConversation -> /initiate-conversation');
   if (!number || !promptForOpeningMessage) {
      return { success: false, message: "Número y prompt son requeridos." };
  }
  try {
    const response = await fetch(`${API_BASE_URL}/initiate-conversation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ number, promptForOpeningMessage }),
    });
    // Devuelve { success, message, openingMessage }
    const data = await handleResponse(response);
     // Añadimos success:true si la llamada fue exitosa
    return { ...data, success: true };
  } catch (error) {
    console.error('Error initiating conversation:', error);
    return { success: false, message: error.message };
  }
};

export const getActiveConversations = async () => {
    console.log('API Call: getActiveConversations -> /active-conversations');
    try {
        const response = await fetch(`${API_BASE_URL}/active-conversations`);
        return await handleResponse(response); // Devuelve objeto { senderId: prompt }
    } catch (error) {
        console.error('Error fetching active conversations:', error);
        return {}; // Devuelve objeto vacío en caso de error
    }
};

export const stopAiConversation = async (senderId) => {
    console.log('API Call: stopAiConversation -> /stop-ai-conversation/:senderId');
    try {
        const encodedSenderId = encodeURIComponent(senderId);
        const response = await fetch(`${API_BASE_URL}/stop-ai-conversation/${encodedSenderId}`, {
            method: 'POST', // El backend usa POST para esta ruta
             headers: { 'Content-Type': 'application/json' }, // Aunque no envíe body, es buena práctica
        });
        return await handleResponse(response); // Devuelve { success, message }
    } catch (error) {
        console.error('Error stopping AI conversation:', error);
        return { success: false, message: error.message };
    }
};

// --- Test Endpoint ---
// Útil para verificar conectividad básica con el backend
export const testApiConnection = async () => {
    console.log('API Call: testApiConnection -> /test');
    try {
      // Esta ruta devuelve solo texto plano
      const response = await fetch(`${API_BASE_URL}/test`);
      if (!response.ok) {
        // Usar statusText si está disponible, si no un mensaje genérico
        throw new Error(response.statusText || `Error en la petición: ${response.status}`);
      }
      const textData = await response.text();
      console.log("Respuesta de /test:", textData);
      // Devolvemos éxito si la respuesta es la esperada
      const expectedMessage = '¡Servidor funcionando correctamente!';
      return { success: textData === expectedMessage, message: textData };
    } catch (error) {
      console.error('Error testing API connection:', error);
      // Asegurarse de devolver el mensaje de error
      return { success: false, message: error.message };
    }
}