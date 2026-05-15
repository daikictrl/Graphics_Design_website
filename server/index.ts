import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import bookingsRouter from './routes/bookings';

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingsRouter);

app.listen(PORT, () => {
  console.log(`Admin API server running on port ${PORT}`);
});
