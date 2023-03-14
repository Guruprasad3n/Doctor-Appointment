import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
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
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}

export default App;
