import { supabase } from '../config/supabaseClient.js';
import argon2 from 'argon2';

export async function register(req, res) {
  const { username, password } = req.body;

  // Cek jika user sudah ada
  const { data: existingUser, error: checkError } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (checkError && checkError.code !== 'PGRST116') { // kode error kalau data gak ada (PostgREST)
    return res.status(500).json({ error: checkError.message });
  }

  if (existingUser) {
    return res.status(400).json({ error: 'Username already taken' });
  }

  try {
    const hashedPassword = await argon2.hash(password);

    const { error } = await supabase.from('users').insert([
      { username, password: hashedPassword }
    ]);

    if (error) throw error;

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Simpan user ke session
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    res.json({ message: 'Login successful', user: req.session.user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
