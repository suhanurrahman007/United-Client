import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const instance = axios.create({
  baseURL: "https://united-server.vercel.app",
}); 
const usePrivetAxios = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access-token");
    // console.log("request ", token);
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }),
    (error) => {
      return Promise.reject(error);
    };

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      // console.log("Status is "), status;
      if (status === 401 || status === 403) {
        await logout();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return instance;
};


export default usePrivetAxios;
