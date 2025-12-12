import { Toaster } from 'react-hot-toast';
import { EmpleadosProvider } from './context/EmpleadosContext';
import FormularioEmpleado from './components/FormularioEmpleado';
import ListadoEmpleados from './components/ListadoEmpleados';

function App() {
  return (
    <EmpleadosProvider>
      <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-900 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-5xl font-black bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-300 bg-clip-text text-transparent mb-2">
              Sistema de Gestión de Empleados
            </h1>
            <p className="text-purple-200 text-lg">
              Administra y gestiona la información de tus empleados
            </p>
          </header>

          <div className="space-y-8">
            <FormularioEmpleado />
            <ListadoEmpleados />
          </div>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </EmpleadosProvider>
  );
}

export default App;

