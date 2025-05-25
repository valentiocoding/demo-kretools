import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      if (res.status === 200) {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('user');
        navigate('/login');
      }
    } catch (err) {
      alert('Logout gagal');
    }
  }

  useEffect(() => {
    axios.get('http://localhost:5000/api/profile', { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
      })
      .catch(err => {
        setError('Anda harus login dulu');
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
