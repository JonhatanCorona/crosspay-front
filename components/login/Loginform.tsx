"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { login } from "@/helpers/login-api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login({ email, password });

      if (result?.access_token) {
        localStorage.setItem("authToken", result.access_token);
        localStorage.setItem("expiresIn", result.expiresIn.toString());
        Cookies.set("authToken", result.access_token, { 
          expires: 1,
          secure: true,
          sameSite: "strict",
        });
        toast.success("✅ Bienvenido administrador");
        router.push("/admin");
      } else {
        toast.error("❌ No se recibió un token válido");
      }
    } catch (error: unknown) {
      if (error instanceof Error) toast.error("❌ Autenticación inválida");
      else toast.error("❌ Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 50 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="flex items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: "var(--bg-ppal)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm p-6 rounded-2xl shadow-xl"
        style={{ backgroundColor: "var(--bg-sec)" }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img 
            src="/crosspay-solutions-logo-color.svg" 
            alt="Crosspay Logo" 
            className="h-12 w-auto" 
          />
        </div>

        {/* Título */}
        <h2 
          className="text-2xl font-bold mb-6 text-center" 
          style={{ color: "var(--titles)" }}
        >
          Bienvenido Administrador
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label 
              className="block mb-1 text-xs font-medium" 
              style={{ color: "var(--titles)" }}
            >
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@correo.com"
              required
              className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent1)] transition"
              style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-sec)", color: "var(--titles)" }}
            />
          </div>

          {/* Password */}
          <div>
            <label 
              className="block mb-1 text-xs font-medium" 
              style={{ color: "var(--titles)" }}
            >
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent1)] transition"
              style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-sec)", color: "var(--titles)" }}
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={!email || !password || loading}
            className={`w-full p-3 text-sm rounded-2xl font-semibold shadow-md transform hover:scale-105 transition-all duration-300
              ${email && password && !loading
                ? "bg-[var(--accent2)] hover:shadow-xl text-[var(--bg-sec)]"
                : "bg-gray-400 cursor-not-allowed shadow-none text-[var(--bg-sec)]"
              }`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-1">
                <span>Cargando</span>
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="text-xl"
                    animate={{ y: ["0%", "-50%", "0%"] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    .
                  </motion.span>
                ))}
              </div>
            ) : (
              "Ingresar"
            )}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
