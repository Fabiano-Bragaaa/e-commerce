import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.86.5:3333",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      console.log(error.response.data.code);
      console.log(error.response.data.message);
      console.log(error.response.data.status);

      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(new AppError(error));
    }
  }
);

export { api };
