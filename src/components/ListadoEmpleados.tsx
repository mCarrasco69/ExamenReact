import { useEmpleadosContext } from '../context/EmpleadosContext';
import { Empleado } from '../types/empleado';

const ListadoEmpleados = () => {
  const { empleados, loading, error } = useEmpleadosContext();

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-8 text-center border border-purple-500/30">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
        <p className="mt-4 text-purple-300">Cargando empleados...</p>
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
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-8 text-center border border-purple-500/30">
        <p className="text-purple-300 text-lg">No hay empleados registrados</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-2xl p-6 border border-purple-500/30">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">Listado de Empleados</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-purple-500/20">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                DNI
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                Dirección
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-purple-300 uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-slate-800/50 divide-y divide-purple-500/20">
            {empleados.map((empleado: Empleado) => (
              <tr key={empleado.id} className="hover:bg-purple-500/10 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-purple-100">
                  {empleado.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-300">
                  {empleado.dni}
                </td>
                <td className="px-6 py-4 text-sm text-purple-300">
                  {empleado.direccion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-300">
                  {empleado.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-purple-400">
        Total de empleados: <span className="font-bold text-pink-400">{empleados.length}</span>
      </div>
    </div>
  );
};

export default ListadoEmpleados;

