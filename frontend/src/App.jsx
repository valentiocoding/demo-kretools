import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Administrator from './pages/Administrator';
import Home from './pages/Home';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/administrator"
          element={
            <AdminRoute>
              <Administrator />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
