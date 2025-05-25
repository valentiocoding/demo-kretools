import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Administrator() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin', { withCredentials: true })
      .then(res => {
        // Pastikan res.data.message ada dan langsung set ke state
        if(res.data && res.data.message){
          setMessage(res.data.message);
        } else {
          setError('Response API tidak mengandung pesan');
        }
      })
      .catch(err => {
        setError('Anda bukan admin atau belum login');
        setTimeout(() => navigate('/login'), 2000);
      });
  }, [navigate]);

  async function handleLogout() {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      if (res.status === 200) {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('user');
        navigate('/login');
      }
    } catch (error) {
      alert('Logout gagal');
    }
  }

  if (error) return <p style={{color:'red'}}>{error}</p>;
  if (!message) return <p>Loading...</p>;

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
