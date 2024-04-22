import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.login);
  if (!user.isLoggedIn) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
