import axios from "axios";

const API_URL = "http://localhost:4000/api/";

const register = (username, password) => {
  return axios
    .post(API_URL + "auth/register", {
      username,
      password,
    })
    .then((response) => {
      localStorage.setItem("username", response.data.username);
      window.location.href = "/";
    });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "auth/login", {
      username,
      password,
    })
    .then((response) => {
      localStorage.setItem("username", response.data.username);
      window.location.href = "/";
    });
};

const logout = () => {
  localStorage.removeItem("username");
  window.location.href = "/login";
};

const getUsername = () => {
  return localStorage.getItem("username");
};

const AuthService = {
  register,
  login,
  logout,
  getUsername,
};

export default AuthService;
