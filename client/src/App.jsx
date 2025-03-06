import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { OverlayProvider } from "@react-aria/overlays";
import Home from "./pages/Home";
import CollectForm from "./pages/CollectForm";
import Donate from "./pages/Donate";
import Login from "./pages/Login"; // Add Login page
import Signup from "./pages/Signup"; // Add Signup page
import AdminDashboard from "./pages/AdminDashboard"; // Add Admin Dashboard page
import "./styles.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if the user is authenticated
  return token ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

// Admin Route Component (only accessible to admins)
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user"); // Assuming user data is stored in localStorage  
  return token && user === "admin" ? children : <Navigate to="/" />; // Redirect to home if not an admin
};

function App() {
  return (
    <Router>
      <OverlayProvider>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/collect"
              element={
                <ProtectedRoute>
                  <CollectForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/donate"
              element={
                <ProtectedRoute>
                  <Donate />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* 404 Page (Optional) */}
            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </OverlayProvider>
    </Router>
  );
}

export default App;