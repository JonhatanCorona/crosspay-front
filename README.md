# 💳 CrossPay Frontend
Mini Pasarela de Pagos (Frontend) con Panel Administrativo

## 🚀 Descripción del Proyecto
CrossPay es una aplicación de frontend moderna que simula una pasarela de pagos, ofreciendo una interfaz de usuario limpia y un panel administrativo seguro para gestionar las transacciones registradas.

Este proyecto está diseñado para demostrar habilidades de desarrollo full-stack, conectándose a una API de backend para la autenticación y la gestión de datos.

## Funcionalidades Clave

| Módulo               | Descripción                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| Página de Pagos      | Permite registrar pagos simulados con opciones para seleccionar divisa (COP o USD), ingresar monto, descripción y datos de la tarjeta. |
| Panel Administrativo | Acceso seguro a un dashboard que lista todas las transacciones registradas, con capacidades de paginación y filtrado. |
| Autenticación        | Implementación de una página de login para el acceso exclusivo al portal administrativo. |

## 🛠 Tecnologías Usadas

| Categoría      | Tecnología             | Versión |
|----------------|----------------------|---------|
| Framework      | Next.js (App Router)  | 15      |
| Librería UI    | React                 | 19      |
| Estilización   | TailwindCSS           | 4       |
| Animaciones    | Framer Motion         | Latest  |
| Utilidades     | js-cookie, Lucide React, React Toastify | Latest |
| Lenguaje       | TypeScript            | Latest  |

## ⚡ Instalación y Configuración

| Paso | Comando / Acción | Descripción |
|------|-----------------|-------------|
| 1    | `git clone https://github.com/JonhatanCorona/crosspay-front.git`<br>`cd crosspay-front` | Clonar el repositorio y moverse a la carpeta del proyecto. |
| 2    | `npm install` | Instalar todas las dependencias del proyecto (requiere Node.js v18+). |
| 3    | Crear `.env` con:<br>`NEXT_PUBLIC_API_URL=http://localhost:3001` | Configurar la URL del backend local. |
| 4    | `npm run dev` | Iniciar el servidor de desarrollo y abrir la app en el navegador: [http://localhost:3000](http://localhost:3000) |

## 📁 Estructura del Proyecto

| Carpeta / Archivo       | Descripción |
|------------------------|------------|
| `app/`                 | Rutas de la aplicación (App Router de Next.js) |
| `app/admin/`           | Panel administrativo (`/admin`) |
| `app/login/`           | Página de login (`/login`) |
| `app/payment/`         | Página de pagos (`/payment`) |
| `app/page.tsx`         | Landing page (`/`) |
| `app/layout.tsx`       | Layout global de la app |
| `app/globals.css`      | Estilos globales |
| `components/`          | Componentes reutilizables |
| `components/admin/`    | Componentes del panel administrativo |
| `components/home/`     | Componentes de la landing page |
| `components/login/`    | Componentes de login |
| `components/payment/`  | Componentes de pagos |
| `helpers/`             | Servicios de API (Axios, Fetch, etc.) |
| `public/`              | Archivos estáticos (logos, SVGs de tarjetas) |
| `utils/`               | Funciones y utilidades generales |
| `.env`                 | Variables de entorno |
| `package.json`         | Dependencias y scripts del proyecto |
| `tailwind.config.js`   | Configuración de TailwindCSS |

## 🔗 Endpoints del Backend

| Método | Ruta           | Descripción                                             |
|--------|---------------|---------------------------------------------------------|
| POST   | auth/login         | Autentica al usuario administrador.                     |
| POST   | /transactions  | Registra una nueva transacción (pago simulado).         |
| GET    | admin/transactions  | Obtiene el listado completo de transacciones (con paginación y filtros). |

## 📌 Notas Finales

| Concepto | Descripción |
|-----------|------------|
| Simulación | Esta aplicación no realiza validaciones bancarias reales ni procesa dinero. Todos los datos se manejan y almacenan de forma local en el backend simulado. |
| Despliegue | El Frontend está desplegado en Vercel: `https://crosspay-front.vercel.app/`. |

## ⚙️ Razones de la Elección del Stack

- **Next.js + React:** Permite construir interfaces rápidas y escalables, con rutas dinámicas y fácil integración con el backend.
- **TailwindCSS:** Facilita un diseño responsivo y consistente sin escribir CSS extensivo.
- **Servicios separados (Vercel y Render):** Permite desplegar frontend y backend de manera independiente, optimizando mantenimiento y escalabilidad.
- **TypeScript:** Mejora la seguridad y escalabilidad del código, evitando errores comunes en JavaScript.

## 💡 Posibles Mejoras

- Integrar **pagos reales** mediante Stripe o PayPal.
- Añadir **roles de usuario y permisos** en el panel administrativo.
- Mejorar el **dashboard con gráficas interactivas** de transacciones.
- Implementar **tests unitarios y de integración** completos para frontend y backend.
- Optimizar la **experiencia móvil** y la accesibilidad de la app.
- Agregar **notificaciones por correo o SMS** al registrar nuevas transacciones.
