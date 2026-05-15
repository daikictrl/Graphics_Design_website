import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'impact-graphics-admin-secret-2024';
const SRC_BOOKINGS_FILE = path.join(process.cwd(), 'server', 'data', 'bookings.json');
const TMP_BOOKINGS_FILE = path.join('/tmp', 'bookings.json');

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  description: string;
  budget?: string;
  deadline?: string;
  createdAt: string;
}

function getStorageFilePath(): string {
  if (fs.existsSync(TMP_BOOKINGS_FILE)) {
    return TMP_BOOKINGS_FILE;
  }
  return SRC_BOOKINGS_FILE;
}

function readBookings(): Booking[] {
  const filePath = getStorageFilePath();
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeBookings(bookings: Booking[]): void {
  const filePath = TMP_BOOKINGS_FILE;
  fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));
}

function authenticateToken(req, res) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return null;
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    res.status(403).json({ error: 'Invalid or expired token.' });
    return null;
  }
}

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { name, phone, email, service, description, budget, deadline } = req.body;

    if (!name || !phone || !email || !service || !description) {
      return res.status(400).json({ error: 'Required fields: name, phone, email, service, description' });
    }

    const bookings = readBookings();
    const newBooking: Booking = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      service,
      description,
      budget: budget || undefined,
      deadline: deadline || undefined,
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    writeBookings(bookings);

    return res.status(201).json(newBooking);
  }

  if (req.method === 'GET') {
    const decoded = authenticateToken(req, res);
    if (!decoded) {
      return;
    }

    const bookings = readBookings();
    bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return res.status(200).json(bookings);
  }

  res.setHeader('Allow', 'GET, POST');
  res.status(405).json({ error: 'Method not allowed.' });
}
