"use client";
import React from "react";

type CardPreviewProps = {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvc: string;
  isFlipped: boolean;
};

// Logos disponibles
const cardLogos: Record<string, string> = {
  visa: "/visa.svg",
  mastercard: "/mastercard.svg",
  amex: "/american-express-svgrepo-com.svg",
  default: "/crosspay-solutions-logo-blanco.svg",
};

// Función para detectar tipo de tarjeta
function detectCardType(number: string): "visa" | "mastercard" | "amex" | "default" {
  const cleaned = number.replace(/\D/g, "");
  if (/^4\d{0,15}$/.test(cleaned)) return "visa";
  if (/^5[1-5]\d{0,14}$/.test(cleaned)) return "mastercard";
  if (/^3[47]\d{0,13}$/.test(cleaned)) return "amex";
  return "default";
}

export default function CardPreview({
  cardNumber,
  cardHolder,
  expiry,
  cvc,
  isFlipped,
}: CardPreviewProps) {
  const numberDisplay = cardNumber.padEnd(19, "•");
  const holderDisplay = cardHolder.trim() ? cardHolder.toUpperCase() : "NOMBRE APELLIDO";
  const expiryDisplay = expiry || "MM/AA";

  const detectedType = detectCardType(cardNumber);
  const typeLogoSrc = detectedType !== "default" ? cardLogos[detectedType] : null;
  const crosspayLogoSrc = cardLogos["default"];

  return (
    <div className="w-full max-w-[400px] aspect-[16/10] perspective">
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-in-out transform-style preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl p-5 flex flex-col justify-between text-white shadow-2xl hover:shadow-[0_20px_50px_rgba(80,54,246,0.5)]"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg, var(--accent1), var(--accent3))",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <div className="flex justify-between items-center">
            <img src={crosspayLogoSrc} alt="Crosspay logo" className="h-6 w-auto" />
            {typeLogoSrc && (
              <img
                src={typeLogoSrc}
                alt={`${detectedType} logo`}
                className="h-10 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            )}
          </div>

          <div className="mt-8 text-2xl tracking-widest select-none font-medium">{numberDisplay}</div>

          <div className="mt-8 flex justify-between items-center text-sm">
            <div>
              <div className="uppercase text-white/80">Titular</div>
              <div className="font-semibold">{holderDisplay}</div>
            </div>
            <div>
              <div className="uppercase text-white/80">Vence</div>
              <div className="font-semibold">{expiryDisplay}</div>
            </div>
          </div>
        </div>

        {/* Back */}
         <div
          className="absolute inset-0 rounded-2xl p-5 text-white rotate-y-180 flex flex-col justify-between shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, var(--accent1) 0%, var(--accent3) 80%)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <div className="h-10 bg-black/80 rounded-sm mb-4" />
          <div>
            <div className="bg-white p-3 rounded flex justify-between items-center">
              <div className="text-sm text-gray-800 font-semibold">Signature</div>
              <div className="ml-2 font-mono text-sm tracking-wider text-black">{cvc || "•••"}</div>
          </div>
            <div className="mt-6 text-xs text-gray-800">
              Esta es una vista previa de la tarjeta. No uses datos reales en entornos de testing.
            </div>
          </div>
          <div className="self-end">
          <img
            src="/crosspay-solutions-logo-blanco.svg" // ruta de tu logo
            alt="Crosspay Logo"
            className="h-6 w-auto"
            style={{ filter: "brightness(1)" }} // asegura que se vea bien sobre el fondo
          />
        </div>
        </div>
      </div>

      <style jsx>{`
        .perspective {
          perspective: 1200px;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .transform-style {
          transform-style: preserve-3d;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
