import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem('isLoggedIn'); // contoh cek status login, bisa kamu sesuaikan

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
