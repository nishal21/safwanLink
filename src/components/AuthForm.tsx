"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";



export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push("/admin/dashboard");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="bg-[#121212] p-8 rounded-lg shadow-lg w-full max-w-sm mx-auto flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="p-3 rounded bg-[#2C2C2C] text-white focus:outline-none"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="p-3 rounded bg-[#2C2C2C] text-white focus:outline-none"
        required
      />
      <button
        type="submit"
        className="bg-[#1DB954] text-white font-bold py-2 rounded-full hover:shadow-[0_0_10px_#1DB954] transition"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
