import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '2mic50@NOMAD',
    database: 'moovix',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Conectado ao banco com sucesso, pai! TMJ');
        connection.release();
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
})();


app.post('/register', async (req, res) => {
    console.log('Requisição para cadastro recebida com sucesso (vai da certo)');
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: 'Preencha todos os campos, caloteiro safado' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO cliente (nome, email, senha, telefone) VALUES (?, ?, ?, ?)';
        const [result] = await pool.execute(query, [name, email, hashedPassword, phone]);

        console.log('Cliente cadastrado com sucesso, solta os fogos ai');
        res.status(201).json({ message: 'Cadastro realizado com sucesso! Bem-vindo ao Moovix (nos nao somos site pirata 🏴‍☠️)' });
    } catch (err) {
        console.error('Erro ao cadastrar cliente:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'E-mail já cadastrado!' });
        }
        res.status(500).json({ message: 'Erro no servidor: ' + err.message });
    }
});


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'E-mail e senha são obrigatórios!' });
    }

    try {
        const query = 'SELECT * FROM cliente WHERE email = ?';
        const [rows] = await pool.execute(query, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.senha);

        if (!match) {
            return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
        }

        res.json({ 
            message: 'Login realizado com sucesso!', 
            user: { id: user.id, nome: user.nome, email: user.email } 
        });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro no servidor.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server rodando em http://localhost:${PORT}`);
});