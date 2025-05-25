import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  if (!isLoggedIn || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;  // render komponen anak langsung
}
