import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogOut, Loader2 } from 'lucide-react';

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

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        navigate('/admin/login', { replace: true });
        return;
      }

      try {
        const res = await fetch('/api/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('admin_token');
            localStorage.removeItem('admin_email');
            navigate('/admin/login', { replace: true });
            return;
          }
          throw new Error('Failed to fetch bookings');
        }

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        setError('Failed to load bookings. Is the server running?');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_email');
    navigate('/admin/login', { replace: true });
  };

  const adminEmail = localStorage.getItem('admin_email') || 'Admin';

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 text-muted-foreground"
        >
          <Loader2 size={20} className="animate-spin" />
          <span className="text-[11px] uppercase tracking-[1px]">Loading bookings...</span>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-red-500 text-[12px] mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-accent text-accent-foreground px-6 py-3 text-[11px] uppercase tracking-[1px] font-bold rounded-none hover:bg-accent/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-[1.2rem] font-heading font-extrabold tracking-[-0.5px]">
              Admin<span className="text-accent">.</span>
            </h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[1px] mt-1">
              {adminEmail}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-[11px] text-muted-foreground hover:text-accent transition-colors uppercase tracking-[1px]"
            >
              Back to Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 text-[11px] uppercase tracking-[1px] font-bold rounded-none hover:bg-accent/90 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-accent font-semibold tracking-[2px] uppercase text-[10px] mb-2">Booking Records</h2>
          <p className="text-muted-foreground text-[11px] uppercase tracking-[1px] mb-8">
            {bookings.length} booking{bookings.length !== 1 ? 's' : ''} found
          </p>

          {bookings.length === 0 ? (
            <div className="bg-muted border border-border p-12 text-center">
              <p className="text-muted-foreground text-[12px] uppercase tracking-[1px]">
                No bookings yet
              </p>
              <p className="text-muted-foreground text-[10px] mt-2">
                Bookings from the main site will appear here.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto border border-border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted border-b border-border">
                      <th className="text-left text-[10px] uppercase tracking-[1px] font-bold text-accent px-4 py-3">#</th>
                      <th className="text-left text-[10px] uppercase tracking-[1px] font-bold text-accent px-4 py-3">Name</th>
                      <th className="text-left text-[10px] uppercase tracking-[1px] font-bold text-accent px-4 py-3">Phone</th>
                      <th className="text-left text-[10px] uppercase tracking-[1px] font-bold text-accent px-4 py-3">Email</th>
                      <th className="text-left text-[10px] uppercase tracking-[1px] font-bold text-accent px-4 py-3">Service</th>
                      <th className="text-left text-[10px] uppercase tracking-[1px] font-bold text-accent px-4 py-3">Description</th>
                      <th className="text-left text-[10px] uppercase tracking-[1px] font-bold text-accent px-4 py-3">Budget</th>
                      <th className="text-left text-[10px] uppercase tracking-[1px] font-bold text-accent px-4 py-3">Deadline</th>
                      <th className="text-left text-[10px] uppercase tracking-[1px] font-bold text-accent px-4 py-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <motion.tr
                        key={booking.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-4 py-4 text-[11px] text-muted-foreground">{index + 1}</td>
                        <td className="px-4 py-4 text-[11px] text-foreground font-medium">{booking.name}</td>
                        <td className="px-4 py-4 text-[11px] text-muted-foreground">{booking.phone}</td>
                        <td className="px-4 py-4 text-[11px] text-muted-foreground">{booking.email}</td>
                        <td className="px-4 py-4 text-[11px] text-muted-foreground">{booking.service}</td>
                        <td className="px-4 py-4 text-[11px] text-muted-foreground max-w-[200px] truncate" title={booking.description}>
                          {booking.description}
                        </td>
                        <td className="px-4 py-4 text-[11px] text-muted-foreground">{booking.budget || '—'}</td>
                        <td className="px-4 py-4 text-[11px] text-muted-foreground">{booking.deadline || '—'}</td>
                        <td className="px-4 py-4 text-[11px] text-muted-foreground whitespace-nowrap">
                          {new Date(booking.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {bookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="bg-muted border border-border p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-[12px] font-heading font-bold text-foreground">{booking.name}</h3>
                      <span className="text-[10px] text-muted-foreground">#{index + 1}</span>
                    </div>
                    <div className="space-y-1 text-[11px]">
                      <p><span className="text-accent font-medium">Phone:</span> <span className="text-muted-foreground">{booking.phone}</span></p>
                      <p><span className="text-accent font-medium">Email:</span> <span className="text-muted-foreground">{booking.email}</span></p>
                      <p><span className="text-accent font-medium">Service:</span> <span className="text-muted-foreground">{booking.service}</span></p>
                      <p><span className="text-accent font-medium">Description:</span> <span className="text-muted-foreground">{booking.description}</span></p>
                      <p><span className="text-accent font-medium">Budget:</span> <span className="text-muted-foreground">{booking.budget || '—'}</span></p>
                      <p><span className="text-accent font-medium">Deadline:</span> <span className="text-muted-foreground">{booking.deadline || '—'}</span></p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border text-[10px] text-muted-foreground">
                      {new Date(booking.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
