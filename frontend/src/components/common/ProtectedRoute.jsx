import { Outlet } from "react-router-dom";
import Nav from "../navbar/Nav";
import axios from "axios";

const checkUser = async (roleRequired) => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_URL + "user", {
      withCredentials: true,
    });

    if (!response.status === 200) {
      return false;
    }

    if (roleRequired === "admin" && response.data.role !== "admin") {
      return false
    }

    localStorage.setItem("username", response.data.username);

    return true;
  } catch (error) {
    console.log("e", error);
    return false;
  }
};

const ProtectedRoute = ({ roleRequired = "user"}) => {
  let valid = false;

  checkUser(roleRequired).then((res) => {
    valid = res;

    if (!valid) {
      window.location = "/login";
    }
  });

  console.log("valid", valid);
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
