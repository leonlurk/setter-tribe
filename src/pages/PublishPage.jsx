import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { getAgentPublishInfo, publishAgent } from '../services/api';

// Heroicon
const ClipboardDocumentIcon = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
</svg>
);

const CheckCircleIcon = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
);

// Nuevo icono para refrescar
const ArrowPathIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

function PublishPage() {
  const { agentId } = useParams();
  const [publishInfo, setPublishInfo] = useState({
    status: 'disconnected', // Estados posibles: published, pending_qr, disconnected, error
    connectedChannels: [],
    qrCodeUrl: null,
    message: null,
    success: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false); // Para el botón de refrescar

  // Función para obtener el estado
  const fetchPublishInfo = useCallback(async () => {
     // Indicar carga solo si no es un refresco manual
    if (!isRefreshing) setIsLoading(true);
    try {
      const data = await getAgentPublishInfo(agentId);
      setPublishInfo(data);
      // Detener refresco si ya está publicado o si hay error persistente
       if (data.status === 'published' || !data.success) {
           return false; // Indica que no se necesita seguir refrescando
       }
       return true; // Indica que se debe seguir refrescando (pending_qr o disconnected)
    } catch (error) {
      // El error ya debería estar manejado en la función de api.js
      console.error("Error fetching publish info in component:", error);
      setPublishInfo(prev => ({ ...prev, status: 'error', message: error.message || 'Error desconocido', success: false }));
      return false; // Detener refresco en caso de error inesperado aquí
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [agentId, isRefreshing]); // Depender de agentId y isRefreshing

  // useEffect para la carga inicial y el refresco periódico
  useEffect(() => {
    let intervalId = null;
    let shouldContinueRefreshing = true;

    const runFetch = async () => {
      shouldContinueRefreshing = await fetchPublishInfo();
      // Si ya no necesita refrescar, limpiar intervalo
      if (!shouldContinueRefreshing && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
          console.log("Deteniendo refresco automático de estado.");
      }
    }

    runFetch(); // Primera llamada

    // Iniciar intervalo solo si es necesario
    intervalId = setInterval(async () => {
        if (shouldContinueRefreshing) {
            console.log("Refrescando estado de publicación...");
            runFetch();
        } else if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }, 7000); // Refrescar cada 7 segundos (un poco más que en ConnectChannels)

    // Limpiar al desmontar
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [fetchPublishInfo]); // Depender de la función fetch memorizada

  const handleRefresh = () => {
      setIsRefreshing(true); // Activar estado de refresco manual
      // fetchPublishInfo se llamará automáticamente por el cambio en isRefreshing en la dependencia del useCallback
      // O podemos llamarlo explícitamente si quitamos isRefreshing de la dependencia:
      fetchPublishInfo();
  }

  const renderStatusBadge = () => {
    switch (publishInfo.status) {
      case 'published':
        return <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Publicado</span>;
      case 'pending_qr':
        return <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Esperando QR</span>;
      case 'disconnected':
        return <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Desconectado</span>;
      case 'error':
         return <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Error</span>;
      default:
        return <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Desconocido</span>;
    }
  };

  if (isLoading) {
    return <p className="text-center text-text-muted">Cargando información de publicación...</p>;
  }

  return (
    <div className="max-w-3xl space-y-8">
       <div className="flex justify-between items-center">
           <h2 className="text-2xl font-semibold text-text-main">Publicar Agente</h2>
           <div className="flex items-center space-x-2">
                {renderStatusBadge()} {/* Usar el badge dinámico */}
                <Button onClick={handleRefresh} variant="secondary" className="text-xs py-1 px-3" disabled={isRefreshing}>
                     <ArrowPathIcon className={`w-4 h-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Refrescando...' : 'Refrescar'}
                </Button>
           </div>
       </div>

        {/* Mostrar error general si existe */}
        {!publishInfo.success && publishInfo.message && (
            <Card className="border-red-500 bg-red-50">
                <p className="text-red-700 text-sm">Error: {publishInfo.message}</p>
            </Card>
        )}

       {/* Mostrar QR si está pendiente */}
        {publishInfo.status === 'pending_qr' && publishInfo.qrCodeUrl && (
            <Card>
                 <h3 className="text-lg font-medium text-text-main mb-2">Conectar WhatsApp</h3>
                 <p className="text-sm text-text-muted mb-4">Escanea el código QR con tu aplicación de WhatsApp para activar el agente.</p>
                 <div className="text-center p-4 border border-border-main rounded-md">
                    <img src={publishInfo.qrCodeUrl} alt="Código QR de WhatsApp" className="mx-auto border border-border-main p-1 max-w-xs" />
                    <p className="text-xs text-text-muted mt-2">Ve a WhatsApp &gt; Dispositivos Vinculados &gt; Vincular un dispositivo.</p>
                 </div>
            </Card>
        )}

        {/* Indicar si está publicado */}
         {publishInfo.status === 'published' && (
            <Card className="border-green-500 bg-green-50">
                 <div className="flex items-center">
                    <CheckCircleIcon className="w-6 h-6 text-green-600 mr-3"/>
                    <div>
                        <h3 className="text-lg font-medium text-green-800">Agente Publicado y Activo</h3>
                        <p className="text-sm text-green-700 mt-1">El agente está conectado a través de WhatsApp y listo para interactuar.</p>
                    </div>
                </div>
            </Card>
        )}

         {/* Mensaje si está desconectado */}
         {publishInfo.status === 'disconnected' && (
            <Card>
                 <h3 className="text-lg font-medium text-text-main mb-2">Agente Desconectado</h3>
                 <p className="text-sm text-text-muted">El agente no está conectado a WhatsApp. Refresca el estado o revisa la conexión en el servidor.</p>
            </Card>
        )}

    </div>
  );
}
export default PublishPage; 