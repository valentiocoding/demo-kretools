import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password dan konfirmasi password tidak cocok');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (res.status === 200) {
        setMessage('Registrasi berhasil! Mengarahkan ke login...');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      setMessage('Registrasi gagal: ' + (error.response?.data?.error || error.message));
    }
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-white'>
      <div className='p-5 shadow-2xl rounded-2xl font-montserrat text-blue'>
        <div>
          <img src={logo} height={300} width={300} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit} className="w-80 flex flex-col gap-3 mt-5">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          <input
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full px-4 py-2 rounded-md border border-blue focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded-md border border-blue focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Konfirmasi Password"
            required
            className="w-full px-4 py-2 rounded-md border border-blue focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
          />
          <button type="submit" className="bg-blue text-white py-2 rounded hover:bg-blue-950">
            Register
          </button>

          {message && <p className="text-center mt-2">{message}</p>}
          <p className="text-center mt-4">
            Sudah punya akun? <a href="/login" className="text-blue-600 underline">Login di sini</a>
          </p>
        </form>
      </div>
    </div>
  );
}
