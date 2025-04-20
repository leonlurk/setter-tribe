import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { getAgentPublishInfo } from '../services/api';

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

function PublishPage() {
  const { agentId } = useParams();
  const [publishInfo, setPublishInfo] = useState({ url: '', status: 'inactive' });
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Cargar info de publicación (simulado)
  useEffect(() => {
    setIsLoading(true);
    getAgentPublishInfo(agentId)
      .then(data => {
        if (data) {
          setPublishInfo({
             url: data.url || `https://agente.koafy.com/${agentId}?nombreAgente`,
             status: data.status || 'active' // 'active' o 'inactive'
            });
        }
      })
      .catch(error => console.error("Error cargando info de publicación:", error))
      .finally(() => setIsLoading(false));
  }, [agentId]);

  const copyToClipboard = () => {
    if (!publishInfo.url) return;
    navigator.clipboard.writeText(publishInfo.url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500); // Reset after 2.5 seconds
    });
  };

  const handleTogglePublish = async () => {
     console.log("Cambiando estado de publicación...");
     // Llamar a API para activar/desactivar (simulado)
     // const newStatus = publishInfo.status === 'active' ? 'inactive' : 'active';
     // await updateAgentStatus(agentId, newStatus);
     // setPublishInfo(prev => ({...prev, status: newStatus }));
     alert("Funcionalidad de activar/desactivar no implementada en simulación.");
  }

  if (isLoading) {
    return <p className="text-center text-text-muted">Cargando información de publicación...</p>;
  }

  return (
    <div className="max-w-3xl space-y-8">
       <div className="flex justify-between items-center">
           <h2 className="text-2xl font-semibold text-text-main">Publicar Agente</h2>
           <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    publishInfo.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                    {publishInfo.status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
                <Button onClick={handleTogglePublish} variant="secondary" className="text-xs py-1 px-3">
                    {publishInfo.status === 'active' ? 'Desactivar' : 'Activar'}
                </Button>
           </div>
       </div>

       <Card>
          <h3 className="text-lg font-medium text-text-main mb-2">Enlace Público del Agente</h3>
          <p className="text-sm text-text-muted mb-4">Comparte este enlace único para que los usuarios interactúen con tu agente a través de una interfaz web.</p>
          <div className="flex items-center space-x-2">
             <Input
               id="agent-url"
               name="agentUrl"
               value={publishInfo.url}
               readOnly
               className="bg-gray-100 flex-1" // Estilo para readonly
               placeholder="Generando enlace..."
             />
             <Button onClick={copyToClipboard} variant="secondary" className="shrink-0">
                {copied ? <CheckCircleIcon className="w-5 h-5 mr-1 text-green-600"/> : <ClipboardDocumentIcon className="w-5 h-5 mr-1"/>}
                {copied ? 'Copiado' : 'Copiar'}
             </Button>
          </div>
       </Card>

        <Card title="Widget Web (Embebido)">
             <p className="text-sm text-text-muted mb-4">Copia y pega este código en tu sitio web para añadir un botón de chat flotante.</p>
             <Textarea
                readOnly
                rows={5}
                className="text-xs bg-gray-100 font-mono"
                value={`<script>\n  window.setterAgentConfig = {\n    agentId: "${agentId}",\n    // Opciones de personalización (color, posición, etc.)\n  };\n</script>\n<script src="https://cdn.koafy.com/widget.js" async defer></script>`}
            />
            <div className="mt-4 flex justify-end">
                <Button variant="secondary">Copiar Código</Button>
            </div>
       </Card>

       {/* Podrían ir otras opciones como QR code */}

    </div>
  );
}
export default PublishPage; 