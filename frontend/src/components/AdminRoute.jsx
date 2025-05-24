import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const user = JSON.parse(localStorage.getItem('user'));

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" />; // redirect ke home jika bukan admin
  }

  return children;
}
