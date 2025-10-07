"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient.js";

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
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse 80% 40% at 50% 60%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.9) 100%), radial-gradient(ellipse 80% 40% at 50% 40%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.9) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "rgba(30,30,30,0.7)",
          borderRadius: 32,
          boxShadow: "0 8px 40px #000a",
          padding: 36,
          minWidth: 340,
          maxWidth: 380,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1.5px solid #222a",
          backdropFilter: "blur(2px)",
        }}
      >
        <div style={{ width: "100%", marginBottom: 18, display: "flex", alignItems: "center" }}>
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            style={{ background: "none", border: "none", color: "#fff", fontSize: 22, marginRight: 8, cursor: "pointer" }}
            aria-label="Back"
          >
            ←
          </button>
          <div style={{ flex: 1, textAlign: "center" }}>
            <h2 style={{ color: "#fff", fontWeight: 700, fontSize: 26, margin: 0 }}>
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <div style={{ color: "#ccc", fontSize: 14, marginTop: 2 }}>
              {mode === "login" ? (
                <>Don't have an account?{' '}
                  <span style={{ color: "#fff", fontWeight: 600, cursor: "pointer" }} onClick={() => setMode("signup")}>Sign up</span>
                </>
              ) : (
                <>Already have an account?{' '}
                  <span style={{ color: "#fff", fontWeight: 600, cursor: "pointer" }} onClick={() => setMode("login")}>Log in</span>
                </>
              )}
            </div>
          </div>
        </div>
        <form onSubmit={handleAuth} style={{ width: "100%" }}>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <span style={{ position: "absolute", left: 14, top: 13, color: "#aaa", fontSize: 18 }}>✉️</span>
            <input
              type="email"
              placeholder="Enter your mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                borderRadius: 10,
                border: "none",
                background: "#222c",
                color: "#fff",
                fontSize: 16,
                marginBottom: 0,
                outline: "none",
              }}
            />
          </div>
          <div style={{ position: "relative", marginBottom: 18 }}>
            <span style={{ position: "absolute", left: 14, top: 13, color: "#aaa", fontSize: 18 }}>🔒</span>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 12px 12px 40px",
                borderRadius: 10,
                border: "none",
                background: "#222c",
                color: "#fff",
                fontSize: 16,
                outline: "none",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              background: "#e0e0e0",
              color: "#222",
              fontWeight: 700,
              border: "none",
              fontSize: 18,
              marginBottom: 10,
              marginTop: 2,
              cursor: "pointer",
            }}
          >
            {mode === "login" ? "Log in" : "Sign up"}
          </button>
          <div style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#444" }} />
            <span style={{ color: "#aaa", margin: "0 10px", fontSize: 13 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: "#444" }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" style={{ flex: 1, background: "#222c", color: "#fff", border: "none", borderRadius: 8, padding: 10, fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
              <span style={{ marginRight: 6 }}>G</span>
            </button>
            <button type="button" style={{ flex: 1, background: "#222c", color: "#fff", border: "none", borderRadius: 8, padding: 10, fontWeight: 600, fontSize: 16, cursor: "pointer" }}>
              <span style={{ marginRight: 6 }}>in</span>
            </button>
          </div>
          {message && <div style={{ color: "#b3e5fc", marginTop: 16, textAlign: "center" }}>{message}</div>}
        </form>
      </div>
    </main>
  );
}
