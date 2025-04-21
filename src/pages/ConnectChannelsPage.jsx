import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
// Importar la función real de la API
import { getWhatsAppStatus } from '../services/api';
// Importar iconos específicos para WhatsApp, Instagram, Web

// Iconos Placeholder (Idealmente importar SVGs específicos)
const WhatsAppIcon = () => <span className="text-2xl">🟢</span>;
const InstagramIcon = () => <span className="text-2xl">🟣</span>;
const GlobeAltIcon = () => <span className="text-2xl">🌐</span>;

function ConnectChannelsPage() {
  const [isConnecting, setIsConnecting] = useState(null); // 'whatsapp', 'instagram', 'web'
  // Estado para WhatsApp
  const [whatsAppStatus, setWhatsAppStatus] = useState({ qrCodeUrl: null, clientReady: false, message: null, success: true });
  const [isLoadingWhatsApp, setIsLoadingWhatsApp] = useState(true);

  // useEffect para obtener el estado de WhatsApp periódicamente
  useEffect(() => {
    let intervalId = null;

    const fetchStatus = async () => {
      // No mostrar carga en actualizaciones periódicas, solo la inicial
      // setIsLoadingWhatsApp(true); // Opcional: mostrar carga en cada fetch
      try {
        const status = await getWhatsAppStatus();
        setWhatsAppStatus(status);
        // Si ya está conectado, podemos dejar de preguntar tan seguido
        if (status.clientReady) {
            if (intervalId) clearInterval(intervalId);
            // Opcional: seguir preguntando menos frecuentemente por si se desconecta
            // intervalId = setInterval(fetchStatus, 30000); // Cada 30 segundos
        }
      } catch (error) {
        // El error ya se maneja en getWhatsAppStatus, que devuelve success:false
        console.error("Error en fetchStatus:", error);
        // Podríamos establecer un estado de error aquí si fuera necesario
      } finally {
          setIsLoadingWhatsApp(false); // Quitar carga después del primer fetch
      }
    };

    // Primera llamada inmediata
    fetchStatus();

    // Iniciar intervalo para refrescar (especialmente para el QR)
    intervalId = setInterval(fetchStatus, 5000); // Cada 5 segundos

    // Limpiar intervalo al desmontar el componente
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []); // El array vacío asegura que se ejecuta solo al montar y desmontar

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
             <p className="text-sm text-text-muted mt-1 mb-4">
                 Conecta tu número escaneando el código QR con la app WhatsApp en tu teléfono.
             </p>
             {/* Mostrar estado de conexión real */}
             <div className="p-4 border border-border-main rounded-md min-h-[150px] flex flex-col justify-center items-center">
                {isLoadingWhatsApp ? (
                    <p className="text-text-muted">Cargando estado de WhatsApp...</p>
                ) : !whatsAppStatus.success ? (
                    <p className="text-red-500">Error: {whatsAppStatus.message || 'No se pudo obtener el estado.'}</p>
                ) : whatsAppStatus.clientReady ? (
                    <div className="text-center">
                        <p className="text-lg font-semibold text-green-600">WhatsApp Conectado</p>
                        <p className="text-sm text-text-muted">Tu agente está listo para recibir y enviar mensajes.</p>
                    </div>
                ) : whatsAppStatus.qrCodeUrl ? (
                    <div className="text-center">
                        <p className="text-text-main mb-2">Escanea este código QR desde WhatsApp:</p>
                        <img src={whatsAppStatus.qrCodeUrl} alt="Código QR de WhatsApp" className="mx-auto border border-border-main p-1" />
                        <p className="text-xs text-text-muted mt-2">Ve a WhatsApp &gt; Dispositivos Vinculados &gt; Vincular un dispositivo.</p>
                    </div>
                ) : (
                    <p className="text-text-muted">WhatsApp desconectado. Esperando código QR o reconexión...</p>
                )}
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