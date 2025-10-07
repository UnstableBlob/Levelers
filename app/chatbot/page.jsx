"use client";

import React, { useState, useRef, useEffect } from "react";

const BG_GRADIENT =
	"radial-gradient(ellipse 80% 40% at 50% 60%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.9) 100%), radial-gradient(ellipse 80% 40% at 50% 40%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.9) 100%)";

export default function ChatbotPage() {
	const [messages, setMessages] = useState([
		{ role: "assistant", content: "👋 Hi! How can I help you today?" },
	]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const chatEndRef = useRef(null);

	useEffect(() => {
		chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const sendMessage = async (e) => {
		e.preventDefault();
		if (!input.trim()) return;
		const userMsg = { role: "user", content: input };
		setMessages((msgs) => [...msgs, userMsg]);
		setInput("");
		setLoading(true);
		try {
			const res = await fetch("/api/chatbot", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ messages: [...messages, userMsg] }),
			});
			const data = await res.json();
			setMessages((msgs) => [...msgs, { role: "assistant", content: data.content }]);
		} catch (err) {
			setMessages((msgs) => [...msgs, { role: "assistant", content: "❌ Sorry, something went wrong." }]);
		}
		setLoading(false);
	};

	return (
		<main
			style={{
				minHeight: "100vh",
				background: BG_GRADIENT,
				color: "#fff",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				fontFamily: "Inter, sans-serif",
				padding: 0,
			}}
		>
			<div
				style={{
					width: "100%",
					   maxWidth: 700,
					background: "rgba(20,20,20,0.92)",
					borderRadius: 28,
					boxShadow: "0 6px 32px 0 rgba(0,0,0,0.8)",
					padding: 28,
					margin: 18,
					display: "flex",
					flexDirection: "column",
					   minHeight: 520,
					   maxHeight: "75vh",
					overflow: "auto",
					border: "1.5px solid #222a",
					backdropFilter: "blur(2px)",
				}}
			>
				<h2 style={{ textAlign: "center", marginBottom: 18, fontWeight: 700, letterSpacing: 1.2, fontSize: 26, color: "#b3e5fc", textShadow: "0 2px 8px #0006" }}>
					<span role="img" aria-label="chat">💬</span> Levelers Chatbot
				</h2>
				<div style={{ flex: 1, overflowY: "auto", marginBottom: 14 }}>
					{messages.map((msg, i) => (
						<div
							key={i}
							style={{
								margin: "14px 0",
								textAlign: msg.role === "user" ? "right" : "left",
								display: "flex",
								flexDirection: msg.role === "user" ? "row-reverse" : "row",
								alignItems: "flex-end",
							}}
						>
							{msg.role === "assistant" && (
								<span style={{ fontSize: 22, marginRight: 8, marginLeft: 2 }}>🤖</span>
							)}
							<span
								style={{
									display: "inline-block",
									background: msg.role === "user" ? "#222c" : "#333a",
									color: msg.role === "user" ? "#fff" : "#b3e5fc",
									borderRadius: 18,
									padding: "12px 20px",
									   maxWidth: "90%",
									fontSize: 17,
									boxShadow: msg.role === "user" ? "0 2px 8px #0004" : "0 1px 4px #0002",
									border: msg.role === "user" ? "1px solid #444a" : "1px solid #2a3a",
									wordBreak: "break-word",
									transition: "background 0.2s",
								}}
							>
								{msg.content}
							</span>
						</div>
					))}
					<div ref={chatEndRef} />
				</div>
				<form onSubmit={sendMessage} style={{ display: "flex", gap: 10, marginTop: 6 }}>
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder={loading ? "Waiting for response..." : "Type your message..."}
						disabled={loading}
						style={{
							flex: 1,
							padding: "14px 18px",
							borderRadius: 18,
							border: "none",
							background: "#18181b",
							color: "#fff",
							fontSize: 17,
							outline: "none",
							boxShadow: "0 1px 4px #0002",
							borderTop: "1.5px solid #222a",
						}}
					/>
					<button
						type="submit"
						disabled={loading || !input.trim()}
						style={{
							background: loading ? "#2226" : "#222c",
							color: "#b3e5fc",
							border: "none",
							borderRadius: 18,
							padding: "0 24px",
							fontSize: 17,
							fontWeight: 700,
							cursor: loading ? "not-allowed" : "pointer",
							boxShadow: "0 1px 4px #0002",
							transition: "background 0.2s",
						}}
					>
						{loading ? "..." : "Send"}
					</button>
				</form>
			</div>
			<footer style={{ color: "#888", fontSize: 13, marginTop: 18, letterSpacing: 0.5, textShadow: "0 1px 2px #0008" }}>
				© {new Date().getFullYear()} Levelers
			</footer>
		</main>
	);
}
