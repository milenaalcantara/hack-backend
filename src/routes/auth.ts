import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dbPromise from '../utils/db';
import jwt from 'jsonwebtoken';

const authRouter = express.Router();

// Rota de registro de usuário
authRouter.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const db = await dbPromise;
  const result = await db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
  res.status(201).json({ id: result.lastID });
});

// Rota de login de usuário
authRouter.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const db = await dbPromise;
  const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

  if (!user) {
      return res.status(404).send('Usuário não encontrado');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
      return res.status(401).send('Credenciais inválidas');
  }

  // Gere um token JWT e envie-o para o cliente
  const token = jwt.sign({ userId: user.id }, 'seu_segredo_jwt', { expiresIn: '1h' });
  res.json({ token });
});
