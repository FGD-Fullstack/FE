import axios from "axios";

const API = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.request.use(async (request) => {
    // const session = await getSession();

    // if (session) {
    //   request.headers["Authorization"] = `Bearer ${session.user.token}`;
    // }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default API();
