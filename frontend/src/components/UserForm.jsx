// src/components/UserForm.jsx
import React, { useState, useEffect } from "react";
import BotonPrimario from "./BotonPrimario";
import userService from "../services/userService";
import Swal from "sweetalert2";

const UserForm = ({ currentUser, onSave, onCancel }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    celphone: "",
  });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser({ name: "", email: "", celphone: "" });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.celphone) {
      Swal.fire("Error", "Todos los campos son obligatorios.", "error");
      return;
    }

    try {
      if (currentUser) {
        await userService.updateUser(user.id, user);
        Swal.fire("¡Actualizado!", "Usuario actualizado exitosamente.", "success");
      } else {
        // Create new user
        await userService.createUser(user);
        Swal.fire("¡Creado!", "Usuario creado exitosamente.", "success");
      }
      onSave(); 
    } catch (error) {
      console.error("Error saving user:", error);
      Swal.fire("Error", error.message || "Hubo un error al guardar el usuario.", "error");
    }
  };

  return (
    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {currentUser ? "Editar Usuario" : "Crear Nuevo Usuario"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label htmlFor="celphone" className="block text-gray-700 text-sm font-bold mb-2">
            Teléfono:
          </label>
          <input
            type="text"
            id="celphone"
            name="celphone"
            value={user.celphone}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <BotonPrimario
            texto={currentUser ? "Actualizar Usuario" : "Crear Usuario"}
            type="submit"
          />
          {currentUser && (
            <BotonPrimario
              texto="Cancelar"
              onClick={onCancel}
              className="bg-gray-500 hover:bg-gray-700"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
