import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';

// Heroicons
const InformationCircleIcon = (props) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.25 5.25m.47-5.47l.25-5.25M11.25 11.25h.008v.015h-.008v-.015zm0 0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12 21a9 9 0 100-18 9 9 0 000 18z" />
</svg>
);
const LinkIcon = (props) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
</svg>
);
const DocumentArrowUpIcon = (props) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
</svg>
);
const QuestionMarkCircleIcon = (props) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
</svg>
);
const ChevronDownIcon = (props) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
);
const ArrowUpTrayIcon = (props) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>
);
// --------------------------------------------------


// Componente para una sección colapsable (solo visual por ahora)
const CollapsibleSection = ({ title, Icon, children }) => {
  // Estado para controlar si está abierto (no implementado aquí)
  const isOpen = true; // Siempre abierto por ahora

  return (
     <div className="border-b border-border-color last:border-b-0">
        <button className="flex justify-between items-center w-full py-4 text-left">
          <div className="flex items-center">
            <Icon className="w-5 h-5 mr-3 text-primary" />
            <span className="font-medium text-text-main">{title}</span>
          </div>
          <ChevronDownIcon className={`w-5 h-5 text-text-muted transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="pb-6 space-y-4">
            {children}
          </div>
        )}
      </div>
  );
};


// Subcomponentes para cada sección del formulario
const InformationSection = () => (
  <CollapsibleSection title="Información" Icon={InformationCircleIcon}>
    <Textarea
      id="info-text"
      name="information"
      rows="5"
      placeholder="Resume la empresa, funciones de los productos, preguntas frecuentes de los clientes, pauta o servicios..."
      label="Información para su agente"
      hint="Agregue información basada en texto para entrenar a su agente."
    />
  </CollapsibleSection>
);

const LinkSection = () => (
  <CollapsibleSection title="Enlace URL" Icon={LinkIcon}>
    <Input
      type="url"
      id="link-url"
      name="linkUrl"
      placeholder="https://www.ejemplo.com"
      label="Introducir una URL"
    />
    {/* Aquí podrías añadir los radio buttons para la frecuencia de análisis */}
     <p className="text-xs text-text-muted">Proporcione una URL para que su agente la analice dinámicamente (diario, semanal, mensual).</p>
  </CollapsibleSection>
);

const FileUploadSection = () => (
  <CollapsibleSection title="Archivo" Icon={DocumentArrowUpIcon}>
    <label className="block text-sm font-medium text-text-main mb-1">
      Subir Archivo
    </label>
    <div className="mt-1 flex justify-center px-6 pt-10 pb-10 border-2 border-border-color border-dashed rounded-md bg-background">
      <div className="space-y-1 text-center">
        <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-text-muted" />
        <div className="flex text-sm text-text-muted justify-center">
          <label htmlFor="file-upload" className="relative cursor-pointer bg-surface rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary px-1">
            <span>Cargar un archivo</span>
            <input id="file-upload" name="file" type="file" className="sr-only" />
          </label>
          <p className="pl-1">o arrastre y suelte</p>
        </div>
        <p className="text-xs text-text-muted">PDF, DOCX, TXT hasta 10MB</p> {/* Ajustar tipos/tamaño */}
      </div>
    </div>
    <Textarea
      id="file-usage"
      name="fileUsage"
      rows="2"
      placeholder="Ej: Usar como fuente principal para responder preguntas sobre características del producto."
      label="¿Cómo debe su agente utilizar este archivo?"
      hint="Describe cómo debe usar el archivo su agente."
     />
  </CollapsibleSection>
);

const QandASection = () => (
   <CollapsibleSection title="Preguntas y Respuestas" Icon={QuestionMarkCircleIcon}>
     <Textarea
      id="qa-question"
      name="qaQuestion"
      rows="2"
      placeholder="Ej: ¿Cuál es el horario de atención?"
      label="Pregunta"
      hint="Entrene a la IA con pares de preguntas y respuestas."
    />
    <Textarea
      id="qa-answer"
      name="qaAnswer"
      rows="4"
      placeholder="Ej: Nuestro horario es de Lunes a Viernes de 9:00 a 18:00."
      label="Respuesta"
    />
   </CollapsibleSection>
);


// Componente principal de la página
function KnowledgeBasePage() {
  // Aquí iría el estado para manejar los datos del formulario
  // const [formData, setFormData] = useState({ information: '', linkUrl: '', etc... });

  const handleSave = () => {
      console.log("Guardando base de conocimientos...");
      // Llamar a updateKnowledgeBase(agentId, formData) del servicio api.js
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Encabezado y Pestañas (visuales, sin lógica de cambio) */}
      <div className="mb-8">
           {/* Aquí podríamos tener un componente Tabs real */}
           <div className="border-b border-border-color">
               <nav className="-mb-px flex space-x-8" aria-label="Pestañas">
                   <button className="border-transparent text-text-muted hover:text-text-main hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                       Persona IA
                   </button>
                   <button className="border-primary text-primary whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm" aria-current="page">
                       Conocimientos
                   </button>
                   {/* <button className="border-transparent text-text-muted hover:text-text-main hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                       Canales
                   </button>
                    <button className="border-transparent text-text-muted hover:text-text-main hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                       Acciones
                   </button> */}
                   <button className="border-transparent text-text-muted hover:text-text-main hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                       Publicar
                   </button>
               </nav>
           </div>
      </div>

       <h1 className="text-3xl font-bold text-text-main mb-2">Base de Conocimientos</h1>
       <p className="text-base text-text-muted mb-8">Entrene a su agente para que ofrezca respuestas contextualizadas que aseguren respuestas precisas.</p>

       {/* Usamos Card para envolver las secciones */}
       <Card className="divide-y divide-border-color p-0"> {/* divide-y para líneas entre secciones */}
           <div className="p-6 sm:p-8"><InformationSection /></div>
           <div className="p-6 sm:p-8"><LinkSection /></div>
           <div className="p-6 sm:p-8"><FileUploadSection /></div>
           <div className="p-6 sm:p-8"><QandASection /></div>
       </Card>

        {/* Botón Guardar */}
       <div className="mt-8 flex justify-end">
           <Button onClick={handleSave}>
               Guardar Cambios
           </Button>
        </div>
    </div>
  );
}

export default KnowledgeBasePage; 