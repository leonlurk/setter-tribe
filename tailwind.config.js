/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8B5CF6', // Mantenemos violeta para acentos si es necesario fuera del sidebar
        'sidebar-bg': '#0d0420', // Fondo principal del sidebar de TRIBE IA
        'sidebar-border': '#2d3748', // Un gris oscuro para bordes internos (ajustar si es necesario)
        'sidebar-text-main': '#FFFFFF', // Texto principal blanco
        'sidebar-text-muted': '#a0aec0', // Texto secundario gris claro (ajustar si es necesario)
        'sidebar-item-active-bg': 'rgba(255, 255, 255, 0.1)', // Blanco con 10% opacidad para fondo activo
        'sidebar-item-hover-bg': 'rgba(255, 255, 255, 0.05)', // Blanco con 5% opacidad para fondo hover

        // Colores para el contenido principal (mantienen tema claro)
        'background': '#F9FAFB',
        'surface': '#FFFFFF',
        'text-main': '#1F2937',
        'text-muted': '#6B7280',
        'border-color': '#E5E7EB',
      },
      fontFamily: {
        // Podrías añadir 'Poppins' si la instalas/importas
        // sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
     require('@tailwindcss/forms'),
  ],
}

