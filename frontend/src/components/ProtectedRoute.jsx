import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Firebase auth state

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  // Firebase auth check hone tak wait karo
  if (loading) return <p className="text-center mt-20">Loading...</p>;

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}
