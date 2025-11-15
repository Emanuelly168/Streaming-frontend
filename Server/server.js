import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import bcryptjs from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../Front')));
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/imagens', express.static(path.join(__dirname, '../imagens')));
app.use('/Script', express.static(path.join(__dirname, '../Script')));

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '2mic50@NOMAD',
    database: 'moovix',
    waitForConnections: true,
    connectionLimit: 10
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado ao banco com sucesso');
        connection.release();
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
})();

function onlyDigits(value) {
    return (value || '').toString().replace(/\D/g, '');
}

app.post('/register', async (req, res) => {
    const { name, email, password, phone } = req.body || {};

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ success: false, message: 'Preencha nome, email, senha e telefone.' });
    }

    const nameTrim = name.trim();
    if (nameTrim.length < 10) {
        return res.status(400).json({ success: false, message: 'Nome deve ter ao menos 10 caracteres.' });
    }

    if (password.length < 8) {
        return res.status(400).json({ success: false, message: 'Senha deve ter ao menos 8 caracteres.' });
    }

    const phoneDigits = onlyDigits(phone);
    if (phoneDigits.length < 11) {
        return res.status(400).json({ success: false, message: 'Telefone inválido. Use pelo menos 11 dígitos.' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ success: false, message: 'E-mail inválido.' });
    }

    try {
        const [exists] = await pool.execute('SELECT IDcliente FROM cliente WHERE email = ? OR nome = ?', [email.trim(), nameTrim]);
        if (exists.length) {
            return res.status(409).json({ success: false, message: 'E-mail ou nome já cadastrado.' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const telefoneNum = Number(phoneDigits);

        const query = 'INSERT INTO cliente (nome, email, senha, telefone) VALUES (?, ?, ?, ?)';
        await pool.execute(query, [nameTrim, email.trim(), hashedPassword, telefoneNum]);

        return res.status(201).json({ success: true, message: 'Cadastro realizado com sucesso.' });
    } catch (err) {
        console.error('Erro ao cadastrar cliente:', err);
        if (err && err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'E-mail ou nome já cadastrado.' });
        }
        return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ success: false, message: 'E-mail e senha são obrigatórios.' });

    try {
        const query = 'SELECT * FROM cliente WHERE email = ?';
        const [rows] = await pool.execute(query, [email.trim()]);

        if (!rows.length) return res.status(401).json({ success: false, message: 'E-mail ou senha incorretos.' });

        const user = rows[0];
        const match = await bcryptjs.compare(password, user.senha);

        if (!match) return res.status(401).json({ success: false, message: 'E-mail ou senha incorretos.' });

        return res.json({
            success: true,
            message: 'Login realizado com sucesso.',
            user: { id: user.IDcliente, nome: user.nome, email: user.email }
        });
    } catch (err) {
        console.error('Erro no login:', err);
        return res.status(500).json({ success: false, message: 'Erro no servidor.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});