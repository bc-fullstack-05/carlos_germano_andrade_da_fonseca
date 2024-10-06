import { Routes, Route, Navigate } from "react-router-dom";
import Inicial from "./pages/Inicial";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./hooks/useAuth";
import MeusDiscos from "./pages/MeusDiscos";
import Carteira from "./pages/Carteira";

const Rotas = () => {
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading } = useAuth();
    console.log("Private Route:" + isAuthenticated);
    return isLoading ? (
      <h1>Loading...</h1>
    ) : isAuthenticated ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Inicial />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/meusDiscos"
        element={
          <PrivateRoute>
            <MeusDiscos/>
          </PrivateRoute>
        }
      />
      <Route
        path="/carteira"
        element={
          <PrivateRoute>
            <Carteira />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Rotas;
