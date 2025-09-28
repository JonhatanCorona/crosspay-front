"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { login } from "@/helpers/login-api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      if (result?.access_token) {
        // Guardar en localStorage
        localStorage.setItem("authToken", result.access_token);
        localStorage.setItem("expiresIn", result.expiresIn.toString());

        toast.success("✅ Bienvenido administrador");
        // Redirigir al dashboard de admin
        router.push("/admin");
      } else {
        toast.error("❌ No se recibió un token válido");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("❌ Autenticacion invalida ");
      } else {
        toast.error("❌ Error desconocido");
      }
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
      <div
        className="w-full max-w-sm p-6 rounded-2xl shadow-xl"
        style={{ backgroundColor: "var(--bg-sec)" }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/crosspay-solutions-logo-color.svg"
            alt="Crosspay Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Bienvenida */}
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "var(--titles)" }}
        >
          Bienvenido Administrador
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
              style={{
                borderColor: "var(--line)",
                backgroundColor: "var(--bg-sec)",
                color: "var(--titles)",
              }}
            />
          </div>

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
              style={{
                borderColor: "var(--line)",
                backgroundColor: "var(--bg-sec)",
                color: "var(--titles)",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!email || !password}
            className={`w-full p-3 text-sm rounded-2xl font-semibold shadow-md transform hover:scale-105 transition-all duration-300
              ${
                email && password
                  ? "bg-[var(--accent1)] hover:shadow-xl text-[var(--bg-sec)]"
                  : "bg-gray-400 cursor-not-allowed shadow-none text-[var(--bg-sec)]"
              }`}
          >
            Ingresar
          </button>
        </form>
      </div>
    </motion.div>
    </motion.div>
  );
}


