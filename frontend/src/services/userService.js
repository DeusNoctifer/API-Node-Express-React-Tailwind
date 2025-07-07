import axios from 'axios'; 

const API_URL = "http://localhost:3000/users"

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type':'application/json',
    },
    timeout:5000,
})

const userService = {
    getUsers: async () =>{
        try{
          const response = await apiClient.get('/')
          return response.data
        } catch(error){
           console.error("Error fetching users: ", error);
           throw error.response?.data?.message || error.message || "Error desconocido al obtener usuarios";
        }
    },

    getUserById: async (id) => {
    try {
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error.response?.data?.message || error.message || `Error desconocido al obtener usuario con ID ${id}`;
    }
  },

  // Create a new user
  createUser: async (userData) => {
    try {
      const response = await apiClient.post('/', userData); // Axios serializa automáticamente a JSON
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error.response?.data?.message || error.message || "Error desconocido al crear usuario";
    }
  },

  // Update an existing user
  updateUser: async (id, userData) => {
    try {
      const response = await apiClient.put(`/${id}`, userData);
      return response.data; // Backend devuelve un mensaje
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      throw error.response?.data?.message || error.message || `Error desconocido al actualizar usuario con ID ${id}`;
    }
  },

  // Delete a user
  deleteUser: async (id) => {
    try {
      const response = await apiClient.delete(`/${id}`);
      return response.data; // Backend devuelve un mensaje
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error.response?.data?.message || error.message || `Error desconocido al eliminar usuario con ID ${id}`;
    }
  },
}

export default userService
