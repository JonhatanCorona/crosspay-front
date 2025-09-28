"use client";

import React, { useState } from "react";
import CardPreview from "./CardPreview";
import { formatCardNumber, formatExpiry } from "../../utils/card-utils";
import { sendPayment } from "@/app/helpers/paymentHelper-api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";


type FormData = {
  currency: string;
  amount: string;
  description: string;
  name: string;
  documentType: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

export default function PaymentForm() {
  const [formData, setFormData] = useState<FormData>({
    currency: "",
    amount: "",
    description: "",
    name: "",
    documentType: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [showCardBack, setShowCardBack] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "cardNumber") return setFormData((s) => ({ ...s, cardNumber: formatCardNumber(value) }));
    if (name === "expiry") return setFormData((s) => ({ ...s, expiry: formatExpiry(value) }));
    if (name === "cvc") return setFormData((s) => ({ ...s, cvc: value.replace(/\D/g, "").slice(0, 4) }));
    if (name === "amount") return setFormData((s) => ({ ...s, amount: value.replace(/^-/, "") }));
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const amountNumber = parseFloat(formData.amount);

  const isFormValid =
  formData.currency &&
  formData.documentType && 
  formData.amount &&
  !isNaN(amountNumber) &&
  amountNumber > 0 &&
  formData.name &&
  formData.cardNumber.replace(/\s/g, "").length === 16 &&
  formData.expiry.length === 5 && 
  formData.cvc.length >= 3; 

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const result = await sendPayment(formData);
    toast.success("✅ Pago registrado con éxito!");

    setFormData({
      currency: "",
      amount: "",
      description: "",
      name: "",
      documentType: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    });
  } catch (error: any) {
    alert("Error al procesar el pago: " + error.message);
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col lg:flex-row items-start lg:items-center justify-center p- bg-[var(--bg-ppal)] gap-4 lg:gap-8 min-h-screen"
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center p-4 bg-[var(--bg-ppal)] gap-4 lg:gap-8 min-h-screen">
        <div className="w-full max-w-6xl grid gap-8 grid-cols-1 lg:grid-cols-2 items-center max-h-screen">
        {/* Tarjeta */}
        <div className="flex items-center justify-center">
          <CardPreview
            cardNumber={formData.cardNumber}
            cardHolder={formData.name}
            expiry={formData.expiry}
            cvc={formData.cvc}
            isFlipped={showCardBack}
          />
        </div>

        {/* Formulario */}
        <div className="w-full max-w-lg p-8 rounded-3xl shadow-xl" style={{ backgroundColor: "var(--bg-sec)" }}>
          <h2  className="text-3xl font-bold mb-6 border-b pb-4 text-center" style={{ color: "var(--titles)" }}>
            Detalles de Pago 💳
          </h2>

          <form onSubmit={handleSubmit} className="space-y-1">
            {/* Divisa */}
            <div>
              <label className="block mb-1 text-sm font-medium" style={{ color: "var(--titles)" }}>
                Divisa
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent1)] transition"
                style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-sec)", color: "var(--titles)" }}
                required
              >
                <option value="">Seleccione Divisa</option>
                <option value="COP">COP</option>
                <option value="USD">USD</option>
              </select>
            </div>

            {/* Monto */}
            <div>
              <label className="block mb-1 text-sm font-medium" style={{ color: "var(--titles)" }}>
                Monto
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Ej: 100000.00"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent1)] transition"
                style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-sec)", color: "var(--titles)" }}
                required
                min={0}
                step="0.01"
              />
            </div>

            {/* Nombre */}
            <div>
              <label className="block mb-1 text-sm font-medium" style={{ color: "var(--titles)" }}>
                Nombre
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => {
                const value = e.target.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, ""); // solo letras y espacios
                setFormData((s) => ({ ...s, name: value }));
              }}
                placeholder="Ej: JUAN PÉREZ"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent1)] transition"
                style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-sec)", color: "var(--titles)" }}
                required
              />
            </div>

            {/* Tipo de documento */}
            <div>
              <label className="block mb-1 text-sm font-medium" style={{ color: "var(--titles)" }}>
                Tipo de documento
              </label>
              <select
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent1)] transition"
                style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-sec)", color: "var(--titles)" }}
                required
             >
                <option value="">Seleccione documento</option>
                <option value="Cédula">Cédula</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>

            {/* Número de tarjeta */}
            <div>
              <label className="block mb-1 text-sm font-medium" style={{ color: "var(--titles)" }}>
                Número de tarjeta
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={19}
                autoComplete="cc-number"
                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent1)] transition"
                style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-sec)", color: "var(--titles)" }}
                required
              />
            </div>

            {/* Fecha + CVV */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block mb-1 text-sm font-medium" style={{ color: "var(--titles)" }}>
                  Fecha de vencimiento (MM/AA)
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  placeholder="MM/AA"
                  maxLength={5}
                  autoComplete="cc-exp"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent1)] transition"
                  style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-sec)", color: "var(--titles)" }}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium" style={{ color: "var(--titles)" }}>
                  CVV
                </label>
                <input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  onFocus={() => setShowCardBack(true)}
                  onBlur={() => setShowCardBack(false)}
                  placeholder="123"
                  maxLength={4}
                  autoComplete="cc-csc"
                  className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent1)] transition"
                  style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-sec)", color: "var(--titles)" }}
                  required
                />
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block mb-1 text-sm font-medium" style={{ color: "var(--titles)" }}>
                Descripción
              </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ej: Pago de servicios"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent1)] transition"
              style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-sec)", color: "var(--titles)" }}
            />
          </div>

            {/* Botón */}
           <button
              type="submit"
              disabled={!isFormValid} // <-- aquí
              className={`w-full p-4 rounded-2xl text-[var(--bg-sec)] font-semibold text-lg shadow-md transform hover:scale-105 transition-all duration-300
          ${isFormValid
            ? "bg-[var(--accent1)] hover:shadow-xl"
            : "bg-gray-400 cursor-not-allowed shadow-none"
    }`}
>
  Pagar
</button>
          </form>
        </div>
      </div>
    </div>
    </motion.div>
  );
}
