import { Navigate } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { useContext } from "react";

export function ProtectedRoute({ children, anonymous = false }) {
  const { isLoggedIn } = useContext(AppContext);
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" />;
  }
  if (anonymous && isLoggedIn) {
    return;
  }
  return children;
}
