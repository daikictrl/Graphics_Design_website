import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { LogIn } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_email", data.email);
      navigate("/admin/dashboard", { replace: true });
    } catch {
      setError("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-heading font-bold tracking-[-0.5px] uppercase mb-2">
            Admin<span className="text-accent">.</span>
          </h1>
          <p className="text-muted-foreground text-[11px] uppercase tracking-[1px]">
            Impact Graphics Admin Panel
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-muted border border-border p-8 rounded-none"
        >
          <h2 className="text-[10px] uppercase tracking-[2px] font-bold text-accent mb-6">
            Sign In
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-[12px] px-4 py-3 mb-6 rounded-none">
              {error}
            </div>
          )}

          <div className="space-y-2 mb-6">
            <label className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-background border border-border rounded-none px-4 py-3 text-[12px] text-foreground focus:outline-none focus:border-accent transition-colors"
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-[10px] uppercase tracking-[1px] font-bold text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-background border border-border rounded-none px-4 py-3 text-[12px] text-foreground focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-accent-foreground font-bold text-[12px] uppercase tracking-[1px] px-8 py-4 rounded-none hover:bg-accent/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
            <LogIn size={18} />
          </button>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-[11px] text-muted-foreground hover:text-accent transition-colors uppercase tracking-[1px]"
            >
              ← Back to site
            </a>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
