import React from 'react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

function ProfileSettingsPage() {
    const handleSaveProfile = () => console.log("Guardando perfil...");
    const handleSavePassword = () => console.log("Guardando contraseña...");

    return (
        <div>
            <h1 className="text-3xl font-bold text-text-main mb-8">Configuración de Cuenta</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card title="Información del Perfil">
                        <div className="space-y-4">
                            <Input label="Nombre Completo" name="fullName" placeholder="Tu nombre" />
                            <Input label="Correo Electrónico" name="email" type="email" placeholder="tu@email.com" />
                            {/* Añadir más campos si es necesario: Empresa, Rol, etc. */}
                            <div className="pt-4 flex justify-end">
                                <Button onClick={handleSaveProfile}>Guardar Perfil</Button>
                            </div>
                        </div>
                    </Card>
                    <Card title="Cambiar Contraseña">
                         <div className="space-y-4">
                             <Input label="Contraseña Actual" name="currentPassword" type="password" />
                             <Input label="Nueva Contraseña" name="newPassword" type="password" />
                             <Input label="Confirmar Nueva Contraseña" name="confirmPassword" type="password" />
                             <div className="pt-4 flex justify-end">
                                 <Button onClick={handleSavePassword}>Actualizar Contraseña</Button>
                             </div>
                         </div>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                     <Card title="Plan y Facturación">
                          <p className='text-sm text-text-muted'>Plan Actual: <span className='font-medium text-primary'>Gratuito</span></p>
                           <p className='text-sm text-text-muted mt-2'>Detalles de facturación y opciones de actualización (Próximamente).</p>
                            <Button variant="secondary" className='mt-4 w-full'>Administrar Suscripción</Button>
                     </Card>
                      <Card title="Cerrar Sesión" className="mt-8">
                           <Button variant="danger" className='w-full'>Cerrar Sesión</Button>
                     </Card>
                </div>
            </div>
        </div>
    );
}
export default ProfileSettingsPage; 