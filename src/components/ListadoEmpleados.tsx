import { useEmpleadosContext } from '../context/EmpleadosContext';
import { Empleado } from '../types/empleado';

const ListadoEmpleados = () => {
  const { empleados, loading, error } = useEmpleadosContext();

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-8 text-center border border-blue-500/30">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        <p className="mt-4 text-blue-300">Cargando empleados...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 border border-red-500/50 rounded-xl p-4">
        <p className="text-red-300 font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (empleados.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-8 text-center border border-blue-500/30">
        <p className="text-blue-300 text-lg">No hay empleados registrados</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-4 border border-blue-500/30">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent mb-4">Listado de Empleados</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-blue-500/20 text-xs">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-3 py-2 text-left font-bold text-blue-300 uppercase tracking-wide">
                Nombre
              </th>
              <th className="px-3 py-2 text-left font-bold text-blue-300 uppercase tracking-wide">
                DNI
              </th>
              <th className="px-3 py-2 text-left font-bold text-blue-300 uppercase tracking-wide">
                Dirección
              </th>
              <th className="px-3 py-2 text-left font-bold text-blue-300 uppercase tracking-wide">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-800/50 divide-y divide-blue-500/20">
            {empleados.map((empleado: Empleado) => (
              <tr key={empleado.id} className="hover:bg-blue-500/10 transition-colors duration-200">
                <td className="px-3 py-2 whitespace-nowrap font-semibold text-blue-100">
                  {empleado.nombre}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-blue-300">
                  {empleado.dni}
                </td>
                <td className="px-3 py-2 text-blue-300">
                  {empleado.direccion}
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-blue-300">
                  {empleado.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-xs text-blue-400">
        Total de empleados: <span className="font-bold text-orange-400">{empleados.length}</span>
      </div>
    </div>
  );
};

export default ListadoEmpleados;

