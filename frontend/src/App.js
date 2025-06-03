import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import Login from "./components/auth/login/Login.jsx";
import Register from "./components/auth/register/Register.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Coinflip from "./components/coinflip/Coinflip.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { set } from "./state/balanceSlice.js";
import UserService from "./service/userService.js";
import Mines from "./components/mines/mines.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);

  const getBalance = () => {
    return async (dispatch) => {
      try {
        const balance = await UserService.getBalance();
        dispatch(set(balance));
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    };
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />

          <Route path="coinflip" element={<Coinflip />} />
          <Route path="mines" element={<Mines />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
