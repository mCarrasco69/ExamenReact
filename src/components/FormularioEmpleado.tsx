import { useState, FormEvent } from 'react';
import { EmpleadoFormData } from '../types/empleado';
import { useEmpleadosContext } from '../context/EmpleadosContext';
import toast from 'react-hot-toast';

const FormularioEmpleado = () => {
  const { createEmpleado } = useEmpleadosContext();
  const [formData, setFormData] = useState<EmpleadoFormData>({
    nombre: '',
    dni: '',
    direccion: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<EmpleadoFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EmpleadoFormData> = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    // Validar DNI
    if (!formData.dni.trim()) {
      newErrors.dni = 'El DNI es obligatorio';
    } else if (formData.dni.trim().length < 8) {
      newErrors.dni = 'El DNI debe tener al menos 8 caracteres';
    }

    // Validar dirección
    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es obligatoria';
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'El formato del email no es válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof EmpleadoFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, complete todos los campos correctamente');
      return;
    }

    setIsSubmitting(true);
    const success = await createEmpleado(formData);

    if (success) {
      // Limpiar formulario
      setFormData({
        nombre: '',
        dni: '',
        direccion: '',
        email: '',
      });
      setErrors({});
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-8 mb-8 border border-purple-500/30 backdrop-blur">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">Agregar Nuevo Empleado</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-semibold text-purple-300 mb-2">
            Nombre Completo <span className="text-pink-400 text-lg">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-slate-700 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.nombre
                ? 'border-red-500 focus:ring-red-500 text-red-100'
                : 'border-purple-500/50 focus:ring-pink-500 text-white placeholder-slate-400'
            }`}
            placeholder="Ingrese el nombre completo"
          />
          {errors.nombre && (
            <p className="mt-1 text-sm text-red-400 font-medium">{errors.nombre}</p>
          )}
        </div>

        <div>
          <label htmlFor="dni" className="block text-sm font-semibold text-purple-300 mb-2">
            DNI <span className="text-pink-400 text-lg">*</span>
          </label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-slate-700 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.dni
                ? 'border-red-500 focus:ring-red-500 text-red-100'
                : 'border-purple-500/50 focus:ring-pink-500 text-white placeholder-slate-400'
            }`}
            placeholder="Ingrese el DNI"
          />
          {errors.dni && (
            <p className="mt-1 text-sm text-red-400 font-medium">{errors.dni}</p>
          )}
        </div>

        <div>
          <label htmlFor="direccion" className="block text-sm font-semibold text-purple-300 mb-2">
            Dirección <span className="text-pink-400 text-lg">*</span>
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-slate-700 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.direccion
                ? 'border-red-500 focus:ring-red-500 text-red-100'
                : 'border-purple-500/50 focus:ring-pink-500 text-white placeholder-slate-400'
            }`}
            placeholder="Ingrese la dirección"
          />
          {errors.direccion && (
            <p className="mt-1 text-sm text-red-400 font-medium">{errors.direccion}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-purple-300 mb-2">
            Email <span className="text-pink-400 text-lg">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-slate-700 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.email
                ? 'border-red-500 focus:ring-red-500 text-red-100'
                : 'border-purple-500/50 focus:ring-pink-500 text-white placeholder-slate-400'
            }`}
            placeholder="ejemplo@correo.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400 font-medium">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all transform hover:scale-105 ${
            isSubmitting
              ? 'bg-slate-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg'
          }`}
        >
          {isSubmitting ? 'Agregando...' : 'Agregar Empleado'}
        </button>
      </form>
    </div>
  );
};

export default FormularioEmpleado;

