"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center gap-6"
      style={{ backgroundColor: "var(--bg-ppal)", color: "var(--titles)" }}
    >
      {/* Logo */}
      <motion.img
        src="/crosspay-solutions-logo-color.svg"
        alt="Crosspay Logo"
        className="h-16 w-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Título */}
      <motion.h1
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Prueba Técnica – Desarrollador Fullstack
      </motion.h1>

      {/* Descripción */}
      <motion.p
        className="max-w-xl text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Esta es una mini-pasarela de pagos desarrollada para Crosspay Solutions. 
        Puedes realizar pagos de prueba o iniciar sesión como administrador para ver todas 
        las transacciones registradas.
      </motion.p>

      {/* Botones */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/payment")}
          className="px-6 py-3 rounded-xl font-semibold text-[var(--bg-sec)] bg-[var(--accent1)] shadow-lg transition"
        >
          Realizar Pago
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/login")}
          className="px-6 py-3 rounded-xl font-semibold text-[var(--bg-sec)] bg-[var(--accent2)] shadow-lg transition"
        >
          Login Administrador
        </motion.button>
      </motion.div>
    </div>
  );
}
