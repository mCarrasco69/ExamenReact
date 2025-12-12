import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado';

const EmpleadosContext = createContext();

export const useEmpleadosContext = () => {
  const context = useContext(EmpleadosContext);
  if (!context) {
    throw new Error('useEmpleadosContext debe usarse dentro de EmpleadosProvider');
  }
  return context;
};

export const EmpleadosProvider = ({ children }) => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmpleados = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      setEmpleados(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar empleados';
      setError(errorMessage);
      toast.error('Error al cargar la lista de empleados');
    } finally {
      setLoading(false);
    }
  };

  const createEmpleado = async (empleadoData) => {
    try {
      setError(null);
      const response = await axios.post(API_URL, empleadoData);
      setEmpleados([...empleados, response.data]);
      toast.success('Empleado agregado exitosamente');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al crear empleado';
      setError(errorMessage);
      toast.error('Error al agregar el empleado');
      return false;
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const value = {
    empleados,
    loading,
    error,
    fetchEmpleados,
    createEmpleado,
  };

  return (
    <EmpleadosContext.Provider value={value}>
      {children}
    </EmpleadosContext.Provider>
  );
};

