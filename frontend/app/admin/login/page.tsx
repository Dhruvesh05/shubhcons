"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);
    
    if (success) {
      router.push("/admin");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">

      <form 
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >

        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
          Admin Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded text-sm sm:text-base">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 sm:p-3 rounded text-gray-900 text-sm sm:text-base"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 sm:p-3 rounded text-gray-900 text-sm sm:text-base"
          required
        />

        <button 
          type="submit"
          className="bg-red-600 text-white w-full p-2 sm:p-3 rounded hover:bg-red-700 text-sm sm:text-base font-medium"
        >
          Login
        </button>

        <div className="text-xs sm:text-sm text-gray-600 text-center mt-4">
          <p>Demo credentials:</p>
          <p>Email: admin@shubhconstruction.com</p>
          <p>Password: admin123</p>
        </div>

      </form>

    </div>
  );
}