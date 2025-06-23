import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import Login from "./components/auth/login/Login.jsx";
import Register from "./components/auth/register/Register.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Coinflip from "./components/coinflip/Coinflip.jsx";
import Mines from "./components/mines/mines.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute roleRequired="user" />}>
          <Route index element={<Dashboard />} />

          <Route path="coinflip" element={<Coinflip />} />
          <Route path="mines" element={<Mines />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        <Route path="/admin/" element={<ProtectedRoute roleRequired="admin" />}>
          <Route index element={<div>ye</div>} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
