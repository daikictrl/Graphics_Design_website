import { Router, Request, Response } from 'express';
import { generateToken } from '../middleware/auth';

const router = Router();

const ADMIN_EMAIL = 'kajal00@gmail.com';
const ADMIN_PASSWORD = '11223344';

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' });
    return;
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Invalid email or password.' });
    return;
  }

  const token = generateToken(email);
  res.json({ token, email });
});

export default router;
