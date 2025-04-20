import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Select from '../components/Select';
import Button from '../components/Button';
import { getAgentPersona, updateAgentPersona } from '../services/api';

function PersonaAIPage() {
  const { agentId } = useParams();
  const [personaData, setPersonaData] = useState({
    agentName: '',
    agentRole: '',
    language: 'es',
    tone: '',
    style: '',
    guidelines: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAgentPersona(agentId)
      .then(data => {
        if (data) {
          setPersonaData({
            agentName: data.name || `Agente ${agentId}`,
            agentRole: data.role || '',
            language: data.language || 'es',
            tone: data.tone || '',
            style: data.style || '',
            guidelines: data.guidelines || ''
          });
        }
      })
      .catch(error => console.error("Error cargando persona:", error))
      .finally(() => setIsLoading(false));
  }, [agentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonaData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    console.log("Guardando Persona IA:", personaData);
    try {
        const response = await updateAgentPersona(agentId, personaData);
        if (response && response.success) {
            console.log("Persona guardada con éxito");
        } else {
             console.error("Error simulado al guardar persona");
        }
    } catch(error) {
        console.error("Error real al guardar persona:", error);
    } finally {
        setIsSaving(false);
    }
  };

  if (isLoading) {
    return <p className="text-center text-text-muted">Cargando datos de persona...</p>;
  }

  return (
    <div className="max-w-3xl">
       <Card title="Definir Persona del Agente IA">
         <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
             <div className="space-y-6">
                <Input
                    label="Nombre del Agente"
                    id="agentName"
                    name="agentName"
                    placeholder="Ej: Carolina, Asistente Virtual"
                    value={personaData.agentName}
                    onChange={handleChange}
                    required
                 />
                <Textarea
                    label="Rol del Agente"
                    id="agentRole"
                    name="agentRole"
                    placeholder="Describe el rol principal de tu agente. Sé específico."
                    rows={4}
                    hint="Ej: Asistente ejecutivo encargado de agendar reuniones y gestionar correos."
                    value={personaData.agentRole}
                    onChange={handleChange}
                 />
                 <Select
                     label="Idioma Principal"
                     id="language"
                     name="language"
                     value={personaData.language}
                     onChange={handleChange}
                 >
                     <option value="es">Español</option>
                     <option value="en">Inglés</option>
                     <option value="pt">Portugués</option>
                 </Select>

                 <Input
                    label="Tono de Comunicación"
                    id="tone"
                    name="tone"
                    placeholder="Ej: Amable, Profesional, Cercano, Divertido"
                    value={personaData.tone}
                    onChange={handleChange}
                    hint="¿Cómo debe sonar tu agente?"
                 />
                 <Textarea
                    label="Estilo de Escritura"
                    id="style"
                    name="style"
                    placeholder="Describe cómo debe escribir tu agente."
                    rows={3}
                    hint="Ej: Usa emojis ocasionalmente, respuestas cortas y directas, evita jerga técnica."
                    value={personaData.style}
                    onChange={handleChange}
                 />
                 <Textarea
                    label="Directrices y Restricciones"
                    id="guidelines"
                    name="guidelines"
                    placeholder="Instrucciones específicas o temas que debe evitar."
                    rows={5}
                    hint="Ej: Nunca prometer descuentos no aprobados. Siempre preguntar por el email al final. No hablar de política."
                    value={personaData.guidelines}
                    onChange={handleChange}
                 />

                 <div className="pt-6 flex justify-end">
                   <Button type="submit" disabled={isSaving}>
                       {isSaving ? 'Guardando...' : 'Guardar Cambios de Persona'}
                   </Button>
                 </div>
             </div>
         </form>
       </Card>
    </div>
  );
}
export default PersonaAIPage; 