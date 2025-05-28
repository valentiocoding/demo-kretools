import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Administrator from './pages/Administrator';
import Demo from './pages/Demo';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Route untuk user yang sudah login */}
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
        {/* Route untuk user yang sudah login */}
        <Route path="/demo" element={
          <PrivateRoute>
            <Demo />
          </PrivateRoute>
        } />

        {/* Route khusus admin */}
        <Route path="/administrator" element={
          <AdminRoute>
            <Administrator />
          </AdminRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
