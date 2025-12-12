# ExamenReact - Sistema de Gestión de Empleados

Aplicación React JS para gestionar empleados con funcionalidades de listado y creación de registros.

## 🚀 Características

- ✅ Listado de empleados obtenidos desde API
- ✅ Formulario para agregar nuevos empleados
- ✅ Validaciones completas de formulario
- ✅ Diseño moderno con Tailwind CSS
- ✅ Alertas con react-hot-toast
- ✅ Estructura organizada (components, types, hooks)

## 📋 Requisitos

- Node.js 18+ 
- npm o yarn

## 🛠️ Instalación

1. Clonar o descargar el repositorio
2. Instalar dependencias:

```bash
npm install
```

## ▶️ Ejecutar la aplicación

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
ExamenReact/
├── src/
│   ├── components/
│   │   ├── FormularioEmpleado.tsx
│   │   └── ListadoEmpleados.tsx
│   ├── context/
│   │   └── EmpleadosContext.jsx
│   ├── hooks/
│   │   └── useEmpleados.ts
│   ├── types/
│   │   └── empleado.ts
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🔌 API Utilizada

- **Endpoint GET/POST:** `https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado`

## ✅ Validaciones Implementadas

- Campos obligatorios (nombre, dni, direccion, email)
- Validación de formato de email
- Validación de longitud mínima de DNI
- Mensajes de error específicos por campo
- Alertas usando react-hot-toast (no alert del navegador)

## 🎨 Tecnologías Utilizadas

- React 18
- Vite
- Tailwind CSS
- Axios
- react-hot-toast
- TypeScript (para types)

## 📝 Notas

- Todos los campos son obligatorios
- El formulario se limpia automáticamente después de agregar un empleado exitosamente
- Las alertas se muestran usando react-hot-toast
- El diseño es completamente responsive

## 👤 Autor

[Tu nombre completo]

---

**Nota:** Asegúrate de que el repositorio sea público en GitHub para que pueda ser revisado.

