import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      credentials: 'include',  // penting untuk cookie session
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Simpan status login dan data user
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(data.user));  // simpan { id, username, role }

      setMessage('Login berhasil!');
      
      // Redirect berdasarkan role
      if (data.user.role === 'admin') {
        navigate('/administrator');
      } else {
        navigate('/profile');
      }
    } else {
      setMessage('Login gagal: ' + data.error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <p>{message}</p>
      <p>
        Belum punya akun? <a href="/register">Register di sini</a>
      </p>
    </form>
  );
}
