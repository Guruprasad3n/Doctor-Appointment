import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectRoute from "./Components/ProtectRoute";
import PublicRoute from "./Components/PublicRoute";
import Spinner from "./Components/Spinner";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
