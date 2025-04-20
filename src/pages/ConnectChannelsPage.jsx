import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
// Importar iconos específicos para WhatsApp, Instagram, Web

// Iconos Placeholder (Idealmente importar SVGs específicos)
const WhatsAppIcon = () => <span className="text-2xl">🟢</span>;
const InstagramIcon = () => <span className="text-2xl">🟣</span>;
const GlobeAltIcon = () => <span className="text-2xl">🌐</span>;

function ConnectChannelsPage() {
  const [isConnecting, setIsConnecting] = useState(null); // 'whatsapp', 'instagram', 'web'

  // Simular conexión
  const handleConnect = async (channel) => {
    setIsConnecting(channel);
    console.log(`Iniciando conexión con ${channel}...`);
    // Simular llamada API
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(`${channel} conectado (simulado).`);
    // Aquí actualizarías el estado para mostrar "Conectado" o detalles
    setIsConnecting(null);
  };

  return (
    <div className="max-w-4xl space-y-8">
       <h2 className="text-2xl font-semibold text-text-main">Conectar Canales</h2>

       {/* WhatsApp */}
       <Card>
         <div className="flex items-start space-x-4">
           <WhatsAppIcon />
           <div className="flex-1">
             <h3 className="text-lg font-medium text-text-main">WhatsApp</h3>
             <p className="text-sm text-text-muted mt-1 mb-4">Conecta tu número de WhatsApp Business API o genera un enlace directo wa.me para compartir.</p>
             {/* Aquí mostrarías estado de conexión o formulario */}
             <div className="space-y-4">
               <p className="text-sm font-medium text-text-muted">Opción 1: WhatsApp Business API (Recomendado)</p>
               {/* Formulario API Key / Número etc. */}
               <Button
                   onClick={() => handleConnect('WhatsApp API')}
                   disabled={isConnecting === 'WhatsApp API'}
                   className="w-full sm:w-auto"
               >
                   {isConnecting === 'WhatsApp API' ? 'Conectando...' : 'Conectar API'}
               </Button>
               <p className="text-sm font-medium text-text-muted pt-4">Opción 2: Enlace Directo wa.me</p>
               <div className="flex items-center space-x-2">
                   <Input id="wa-link-phone" placeholder="Número con código país (ej: +34...)" className="flex-1"/>
                   <Button variant="secondary" className="shrink-0">Generar Enlace</Button>
               </div>
             </div>
           </div>
         </div>
       </Card>

       {/* Instagram */}
        <Card>
         <div className="flex items-start space-x-4">
           <InstagramIcon />
           <div className="flex-1">
             <h3 className="text-lg font-medium text-text-main">Instagram</h3>
             <p className="text-sm text-text-muted mt-1 mb-4">Permite a tu agente responder mensajes directos y comentarios en tus publicaciones.</p>
              {/* Aquí mostrarías estado de conexión o botón */}
             <Button
                onClick={() => handleConnect('Instagram')}
                disabled={isConnecting === 'Instagram'}
             >
                 {isConnecting === 'Instagram' ? 'Conectando...' : 'Conectar Cuenta de Instagram'}
             </Button>
           </div>
         </div>
       </Card>

       {/* Web Widget */}
        <Card>
         <div className="flex items-start space-x-4">
           <GlobeAltIcon />
           <div className="flex-1">
             <h3 className="text-lg font-medium text-text-main">Widget Web</h3>
             <p className="text-sm text-text-muted mt-1 mb-4">Incrusta un chat en tu sitio web para que los visitantes interactúen con tu agente.</p>
              {/* Aquí mostrarías estado de conexión o botón/código */}
             <Button
                onClick={() => handleConnect('Web Widget')}
                variant="secondary"
                disabled={isConnecting === 'Web Widget'}
             >
                 {isConnecting === 'Web Widget' ? 'Generando...' : 'Obtener Código del Widget'}
             </Button>
             {/* Podría mostrar el snippet de código aquí después */}
           </div>
         </div>
       </Card>

    </div>
  );
}
export default ConnectChannelsPage; 