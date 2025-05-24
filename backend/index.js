import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import adminRoutes from './routes/admin.js';


dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173', // ganti jika frontend port beda
    credentials: true,
}));

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,  // disarankan false untuk login session
    cookie: {
        secure: false,    // aktifkan secure cookie di https
        httpOnly: true,    // supaya cookie gak bisa diakses JS di client (aman)
        maxAge: 1000 * 60 * 60 * 24, // 1 hari
    }
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api', adminRoutes);

app.listen(port, () => {
    console.log('Server up and running at http://localhost:' + port);
});
