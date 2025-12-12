import { useState, useEffect } from 'react';
import axios from 'axios';
import { Empleado } from '../types/empleado';
import toast from 'react-hot-toast';

const API_URL = 'https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado';

export const useEmpleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmpleados = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Empleado[]>(API_URL);
      setEmpleados(response.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar empleados';
      setError(errorMessage);
      toast.error('Error al cargar la lista de empleados');
    } finally {
      setLoading(false);
    }
  };

  const createEmpleado = async (empleado: Omit<Empleado, 'id'>): Promise<boolean> => {
    try {
      setError(null);
      const response = await axios.post<Empleado>(API_URL, empleado);
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

  return {
    empleados,
    loading,
    error,
    fetchEmpleados,
    createEmpleado,
  };
};

