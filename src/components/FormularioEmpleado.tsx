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
    <div className="bg-gradient-to-br from-slate-800 to-gray-900 rounded-xl shadow-2xl p-4 mb-6 border border-blue-500/30 backdrop-blur">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent mb-4">Agregar Nuevo Empleado</h2>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="nombre" className="block text-xs font-semibold text-blue-300 mb-1">
            Nombre Completo <span className="text-orange-400">*</span>
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={`w-full px-3 py-1.5 bg-slate-700 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm ${
              errors.nombre
                ? 'border-red-500 focus:ring-red-500 text-red-100'
                : 'border-blue-500/50 focus:ring-orange-400 text-white placeholder-slate-400'
            }`}
            placeholder="Ingrese el nombre completo"
          />
          {errors.nombre && (
            <p className="mt-0.5 text-xs text-red-400 font-medium">{errors.nombre}</p>
          )}
        </div>

        <div>
          <label htmlFor="dni" className="block text-xs font-semibold text-blue-300 mb-1">
            DNI <span className="text-orange-400">*</span>
          </label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            className={`w-full px-3 py-1.5 bg-slate-700 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm ${
              errors.dni
                ? 'border-red-500 focus:ring-red-500 text-red-100'
                : 'border-blue-500/50 focus:ring-orange-400 text-white placeholder-slate-400'
            }`}
            placeholder="Ingrese el DNI"
          />
          {errors.dni && (
            <p className="mt-0.5 text-xs text-red-400 font-medium">{errors.dni}</p>
          )}
        </div>

        <div>
          <label htmlFor="direccion" className="block text-xs font-semibold text-blue-300 mb-1">
            Dirección <span className="text-orange-400">*</span>
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className={`w-full px-3 py-1.5 bg-slate-700 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm ${
              errors.direccion
                ? 'border-red-500 focus:ring-red-500 text-red-100'
                : 'border-blue-500/50 focus:ring-orange-400 text-white placeholder-slate-400'
            }`}
            placeholder="Ingrese la dirección"
          />
          {errors.direccion && (
            <p className="mt-0.5 text-xs text-red-400 font-medium">{errors.direccion}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-blue-300 mb-1">
            Email <span className="text-orange-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-1.5 bg-slate-700 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors text-sm ${
              errors.email
                ? 'border-red-500 focus:ring-red-500 text-red-100'
                : 'border-blue-500/50 focus:ring-orange-400 text-white placeholder-slate-400'
            }`}
            placeholder="ejemplo@correo.com"
          />
          {errors.email && (
            <p className="mt-0.5 text-xs text-red-400 font-medium">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-lg font-bold text-sm text-white transition-all transform hover:scale-105 ${
            isSubmitting
              ? 'bg-slate-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg'
          }`}
        >
          {isSubmitting ? 'Agregando...' : 'Agregar Empleado'}
        </button>
      </form>
    </div>
  );
};

export default FormularioEmpleado;

