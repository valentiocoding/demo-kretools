import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogout() {
    const res = await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (res.ok) {
      localStorage.removeItem('isLoggedIn');  // hapus flag login lokal
      localStorage.removeItem('user');  // hapus flag login lokal
      navigate('/login'); // redirect ke login
    } else {
      alert('Logout gagal');
    }
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/profile', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Anda harus login dulu');
        return res.json();
      })
      .then(data => setUser(data.user))
      .catch(err => setError(err.message));
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
