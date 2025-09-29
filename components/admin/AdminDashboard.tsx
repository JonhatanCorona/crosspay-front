"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; 
import { Transaction, fetchTransactions } from "@/helpers/adminTransaccion.api";

export default function AdminDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const router = useRouter();

  const loadTransactions = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No se encontró token de autenticación");

      const data = await fetchTransactions(token, pageNumber);
      setTransactions(data);
      setPage(pageNumber);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("authToken");
    toast.success("¡Sesión cerrada con éxito!");
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex-1 p-6 bg-[var(--bg-ppal)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <img 
            src="/crosspay-solutions-logo-color.svg" 
            alt="Crosspay Logo" 
            className="h-16 w-auto cursor-pointer" 
            onClick={() => router.push("/")} 
          />
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold shadow-md text-[var(--bg-sec)] bg-[var(--accent2)] hover:bg-[var(--accent3)] transition-all duration-300"
          >
            Cerrar Sesión
          </motion.button>
        </div>
        <h1 className="text-3xl font-bold text-center mb-6" style={{ color: "var(--titles)" }}>
          Panel de Administrador
        </h1>

        {/* Tabla */}
        {loading ? (
          <p className="text-center text-3xl font-semibold mt-20 animate-pulse" style={{ color: "var(--accent1)" }}>
            Cargando transacciones...
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse shadow-lg rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[var(--accent1)] text-[var(--bg-sec)]">
                    <th className="px-3 py-2 text-left text-xs">#ID</th>
                    <th className="px-3 py-2 text-left text-xs">Divisa</th>
                    <th className="px-3 py-2 text-left text-xs">Monto</th>
                    <th className="px-3 py-2 text-left text-xs">Descripción</th>
                    <th className="px-3 py-2 text-left text-xs">Nombre</th>
                    <th className="px-3 py-2 text-left text-xs">Tipo Documento</th>
                    <th className="px-3 py-2 text-left text-xs">Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-sm" style={{ color: "var(--titles)" }}>
                        No hay transacciones
                      </td>
                    </tr>
                  ) : (
                    transactions.map((t, index) => (
                      <motion.tr
                        key={t.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-b hover:bg-[var(--bg-sec)] transition-colors"
                      >
                        <td className="px-3 py-2 text-sm font-medium" style={{ color: "var(--titles)" }}>{t.id}</td>
                        <td className="px-3 py-2 text-sm" style={{ color: "var(--titles)" }}>{t.currency}</td>
                        <td className="px-3 py-2 text-sm" style={{ color: "var(--titles)" }}>{t.amount}</td>
                        <td className="px-3 py-2 text-sm" style={{ color: "var(--titles)" }}>{t.description}</td>
                        <td className="px-3 py-2 text-sm" style={{ color: "var(--titles)" }}>{t.name}</td>
                        <td className="px-3 py-2 text-sm" style={{ color: "var(--titles)" }}>{t.documentType}</td>
                        <td className="px-3 py-2 text-sm" style={{ color: "var(--titles)" }}>
                          {new Date(t.createdAt).toLocaleString()}
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => loadTransactions(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg bg-[var(--accent2)] text-[var(--bg-sec)] hover:bg-[var(--accent3)] disabled:opacity-50"
              >
                Anterior
              </button>

              <button
                onClick={() => loadTransactions(page + 1)}
                disabled={transactions.length < 10} 
                className="px-4 py-2 rounded-lg bg-[var(--accent2)] text-[var(--bg-sec)] hover:bg-[var(--accent3)] disabled:opacity-50"
              >
                Siguiente →
              </button>
            </div>
          </>
        )}
      </motion.div>

      {/* Footer siempre abajo */}
      <footer className="py-4 border-t flex flex-col items-center gap-2 text-xs mt-auto"
              style={{ borderColor: "var(--line)", color: "var(--titles)" }}>
        <div className="flex items-center gap-2">
          <img 
            src="/crosspay-solutions-logo-color.svg" 
            alt="Crosspay Solutions" 
            className="h-6 w-auto"
          />
          <span>© {new Date().getFullYear()} Todos los derechos reservados</span>
        </div>
      </footer>
    </div>
  );
}
