import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BOOKINGS_FILE = path.join(__dirname, '../data/bookings.json');

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

function readBookings(): Booking[] {
  try {
    const data = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeBookings(bookings: Booking[]): void {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

router.post('/', (req: Request, res: Response) => {
  const { name, phone, email, service, description, budget, deadline } = req.body;

  if (!name || !phone || !email || !service || !description) {
    res.status(400).json({ error: 'Required fields: name, phone, email, service, description' });
    return;
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

  res.status(201).json(newBooking);
});

router.get('/', authenticateToken, (req: AuthRequest, res: Response) => {
  const bookings = readBookings();
  bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  res.json(bookings);
});

export default router;
