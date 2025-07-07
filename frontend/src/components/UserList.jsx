import React, { useEffect, useState } from "react";
import userService from "../services/userService";
import BotonPrimario from "./BotonPrimario";
import Swal from "sweetalert2";
 
const UserList = ({ onEditUser, onUserCreatedOrUpdated }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError("Error al cargar los usuarios. Inténtalo de nuevo más tarde.");
      console.error("Failed to fetch users:", err);
      Swal.fire(
        "Error",
        "No se pudieron cargar los usuarios. Verifica que el backend esté funcionando.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [onUserCreatedOrUpdated]); 

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await userService.deleteUser(id);
          Swal.fire("¡Eliminado!", "El usuario ha sido eliminado.", "success");
          fetchUsers(); // Refresh the list
        } catch (err) {
          console.error("Error deleting user:", err);
          Swal.fire("Error", err.message || "No se pudo eliminar el usuario.", "error");
        }
      }
    });
  };

  if (loading) return <p className="text-gray-600">Cargando usuarios...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (users.length === 0) return <p className="text-gray-600">No hay usuarios registrados.</p>;

  return (
    <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Lista de Usuarios</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                Teléfono
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider border-b-2 border-gray-200">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.celphone}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <BotonPrimario
                    texto="Editar"
                    onClick={() => onEditUser(user)}
                  />
                  <BotonPrimario
                    texto="Eliminar"
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 hover:bg-red-700" // Example of adding a red style
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;