import API from "./api";

export const UserService = {
  getAll: async () => {
    const response = await API.get("/users");
    return response.data;
  },
  getOne: async (id) => {
    const response = await API.get(`/users/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await API.post("/users", data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await API.put(`/users/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await API.delete(`/users/${id}`);
    return response.data;
  },
};
