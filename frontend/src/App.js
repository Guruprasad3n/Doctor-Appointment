import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectRoute from "./Components/ProtectRoute";
import PublicRoute from "./Components/PublicRoute";
import Spinner from "./Components/Spinner";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ApplyDoctor from "./Pages/ApplyDoctor";
import Notification from "./Pages/Notification";
import Users from "./Pages/Admin/Users";
import Doctors from "./Pages/Admin/Doctors";
import Profile from "./Pages/Doctor/Profile";
import BookingPage from "./Pages/BookingPage";

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
            path="/apply-doctor"
            element={
              <ProtectRoute>
                <ApplyDoctor />
              </ProtectRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectRoute>
                <Notification />
              </ProtectRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectRoute>
                <Users />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectRoute>
                <Doctors />
              </ProtectRoute>
            }
          />
          <Route
            path="/doctor/profile/:id"
            element={
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
            }
          />
          <Route
            path="/doctor/book-appointment/:doctorId"
            element={
              <ProtectRoute>
                <BookingPage />
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
