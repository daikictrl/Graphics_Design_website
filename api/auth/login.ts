import jwt from 'jsonwebtoken';

const ADMIN_EMAIL = 'kajal00@gmail.com';
const ADMIN_PASSWORD = '11223344';
const JWT_SECRET = 'impact-graphics-admin-secret-2024';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '24h' });
  return res.status(200).json({ token, email });
}
