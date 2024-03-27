import axios from "axios";

const createAxiosInstance = (baseURL) => {
  let instance = axios.create({
    baseURL,
  });
  instance.interceptors.request.use(
    (config) => {
      return new Promise((resolve) => setTimeout(() => resolve(config), 1000)); //added 1sec delay for demo
      // if (localStorage.getItem("token")) {
      //   config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      //     "token"
      //   )}`;
      // }
      // return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      // if (error.response.status == 401) {
      //   location.replace("/signin");
      //   localStorage.removeItem("isLoggedIn");
      //   localStorage.removeItem("email");
      //   localStorage.removeItem("token");
      // }
      return Promise.reject(error);
    }
  );
  return instance;
};

export default createAxiosInstance;
