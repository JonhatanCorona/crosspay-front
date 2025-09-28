"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { fetchTransactions, Transaction } from "@/helpers/adminTransaccion.api";
import Cookies from "js-cookie"; 

export default function AdminDashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currencyFilter, setCurrencyFilter] = useState<string>("All");
  const [docTypeFilter, setDocTypeFilter] = useState<string>("All");

  const router = useRouter();

  const loadTransactions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No se encontró token de autenticación");

      const data = await fetchTransactions(token);
      setTransactions(data);
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

  // Filtrado dinámico
  const filteredTransactions = transactions.filter((t) => {
    return (
      (currencyFilter === "All" || t.currency === currencyFilter) &&
      (docTypeFilter === "All" || t.documentType === docTypeFilter)
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen p-6 bg-[var(--bg-ppal)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <img 
          src="/crosspay-solutions-logo-color.svg" 
          alt="Crosspay Logo" 
          className="h-16 w-auto" 
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

      {/* Título */}
      <h1 className="text-3xl font-bold text-center mb-6" style={{ color: "var(--titles)" }}>
        Panel de Administrador
      </h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
        <select
          value={currencyFilter}
          onChange={(e) => setCurrencyFilter(e.target.value)}
          className="p-2 rounded-lg border border-gray-300"
        >
          <option value="All">Todas las Divisas</option>
          <option value="USD">USD</option>
          <option value="COP">COP</option>
        </select>

        <select
          value={docTypeFilter}
          onChange={(e) => setDocTypeFilter(e.target.value)}
          className="p-2 rounded-lg border border-gray-300"
        >
          <option value="All">Todos los Tipos de Documento</option>
          <option value="Cédula">Cédula</option>
          <option value="Pasaporte">Pasaporte</option>
        </select>
      </div>

      {/* Tabla */}
      {loading ? (
        <p 
          className="text-center text-3xl font-semibold mt-20 animate-pulse"
          style={{ color: "var(--accent1)" }}
        >
          Cargando transacciones...
        </p>
      ) : (
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
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-sm" style={{ color: "var(--titles)" }}>
                    No hay transacciones
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((t, index) => (
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
      )}
    </motion.div>
  );
}
