export function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    next(); // user sudah login, lanjut
  } else {
    res.status(401).json({ error: 'Anda harus login dulu' });
  }
}


export function isAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden. Admins only.' });
  }
}
