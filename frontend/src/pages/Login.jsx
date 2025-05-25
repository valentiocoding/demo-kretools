import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../assets/logo.png";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', 
        { username, password },
        { withCredentials: true } // supaya cookie session ikut dikirim
      );

      const data = res.data;

      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('user', JSON.stringify(data.user)); // simpan user {id, username, role}

      setMessage('Login berhasil!');

      if (data.user.role === 'admin') {
        navigate('/administrator');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      setMessage('Login gagal: ' + (error.response?.data?.error || error.message));
    }
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center bg-white'>
      <div className='p-5 shadow-2xl rounded-2xl font-montserrat text-blue'>

      <div className=''>
        <img src={logo} height={300} width={300} alt="Logo" />
      </div>
      <form onSubmit={handleSubmit} className="w-80 flex flex-col gap-3 mt-5">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
          className="w-full px-4 py-2 rounded-md text-blue border border-blue focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 rounded-md text-blue border border-blue focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
        />
        <button type="submit" className="bg-blue text-white py-2 rounded hover:bg-blue-950">
          Login
        </button>
        {message && <p className="text-center mt-2">{message}</p>}
        <p className="text-center mt-4">
          Belum punya akun? <a href="/register" className="text-blue-600 underline">Register di sini</a>
        </p>
      </form>
      </div>
    </div>
  );
}
