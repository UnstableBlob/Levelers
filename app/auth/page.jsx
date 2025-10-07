"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient.js";
import BackgroundStatic from "@/components/BackgroundStatic.jsx";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else {
        setMessage("Login successful!");
        setTimeout(() => router.push("/"), 800);
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMessage(error.message);
      else {
        setMessage("Signup successful! Please check your email to confirm.");
        setTimeout(() => setMode("login"), 1200);
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <BackgroundStatic />

      <div className="relative shadow-[inset_-4px_-4px_16px_rgba(255,255,255,0.1)] bg-white/2 border border-white/10 border-1 rounded-3xl p-9 min-w-[340px] max-w-[380px] w-full flex flex-col items-center">
        <div className="w-full mb-4 flex items-center">
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="bg-transparent border-none text-white text-2xl mr-2 cursor-pointer hover:text-gray-300 transition-colors"
            aria-label="Back"
          >
            ←
          </button>
          <div className="flex-1 text-center">
            <h2 className="text-white font-bold text-2xl m-0">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <div className="text-gray-400 text-sm mt-1">
              {mode === "login" ? (
                <>
                  Don't have an account?{' '}
                  <span 
                    className="text-white font-semibold cursor-pointer hover:text-gray-300 transition-colors" 
                    onClick={() => setMode("signup")}
                  >
                    Sign up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <span 
                    className="text-white font-semibold cursor-pointer hover:text-gray-300 transition-colors" 
                    onClick={() => setMode("login")}
                  >
                    Log in
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleAuth} className="w-full">
          <div className="relative mb-4">
            <span className="absolute left-3 top-3 text-gray-400 text-lg">✉️</span>
            <input
              type="email"
              placeholder="Enter your mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full py-3 pl-10 pr-3 rounded-lg border-none bg-white/10 text-white text-base outline-none focus:bg-white/20 transition-colors placeholder-gray-400"
            />
          </div>

          <div className="relative mb-5">
            <span className="absolute left-3 top-3 text-gray-400 text-lg">🔒</span>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full py-3 pl-10 pr-3 rounded-lg border-none bg-white/10 text-white text-base outline-none focus:bg-white/20 transition-colors placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-3 rounded-lg bg-gray-200 text-gray-800 font-bold border-none text-lg mb-3 mt-1 cursor-pointer hover:bg-white transition-colors"
          >
            {mode === "login" ? "Log in" : "Sign up"}
          </button>

          <div className="flex items-center my-3">
            <div className="flex-1 h-px bg-gray-600" />
            <span className="text-gray-400 mx-3 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-600" />
          </div>

          <div className="flex gap-3">
            <button 
              type="button" 
              className="flex-1 bg-white/10 text-white border-none rounded-lg py-3 font-semibold text-base cursor-pointer hover:bg-white/20 transition-colors"
            >
              <span className="mr-2">G</span>
            </button>
            <button 
              type="button" 
              className="flex-1 bg-white/10 text-white border-none rounded-lg py-3 font-semibold text-base cursor-pointer hover:bg-white/20 transition-colors"
            >
              <span className="mr-2">in</span>
            </button>
          </div>

          {message && (
            <div className="text-blue-200 mt-4 text-center text-sm">
              {message}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
