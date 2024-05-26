import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import dbPromise from '../utils/db';

const userRouter = express.Router();

// Rota para criar um novo usuário
userRouter.post('/users', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const db = await dbPromise;
  const result = await db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
  res.status(201).json({ id: result.lastID });
});

// Rota para obter todos os usuários
userRouter.get('/users', async (req: Request, res: Response) => {
  const db = await dbPromise;
  const users = await db.all('SELECT * FROM users');
  res.json(users);
});

// Rota para obter um usuário pelo ID
userRouter.get('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await dbPromise;
  const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);

  if (!user) {
      return res.status(404).send('Usuário não encontrado');
  }

  res.json(user);
});

// Rota para atualizar um usuário pelo ID
userRouter.put('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const db = await dbPromise;
  await db.run('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, hashedPassword, id]);
  res.status(204).send();
});

// Rota para deletar um usuário pelo ID
userRouter.delete('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const db = await dbPromise;
  await db.run('DELETE FROM users WHERE id = ?', [id]);
  res.status(204).send();
});

export default userRouter;