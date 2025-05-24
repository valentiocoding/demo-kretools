import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Administrator() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/admin', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Anda bukan admin atau belum login');
        return res.json();
      })
      .then(data => setMessage(data.message))
      .catch(err => {
        setError(err.message);
        setTimeout(() => navigate('/'), 2000); // Redirect ke home jika gagal
      });
  }, [navigate]);

  // Fungsi logout
  async function handleLogout() {
    const res = await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (res.ok) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
      navigate('/login');
    } else {
      alert('Logout gagal');
    }
  }

  if (error) return <p>{error}</p>;
  if (!message) return <p>Loading...</p>;

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
