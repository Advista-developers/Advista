// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  
  return token ? <Navigate to="/" replace /> : children; // Redirect if token exists
};

export default ProtectedRoute;
