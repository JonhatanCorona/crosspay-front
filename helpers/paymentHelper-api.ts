const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function sendPayment(data: {
  currency: string;
  amount: string;
  description: string;
  name: string;
  documentType: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}) {
  const body = {
    currency: data.currency,
    amount: Number(data.amount),
    description: data.description,
    name: data.name,
    documentType: data.documentType,
    cardNumber: data.cardNumber.replace(/\s/g, ""),
    cardExpiration: data.expiry,
    cardCVC: data.cvc,
  };

  const response = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message?.[0] || "Error al procesar el pago");
  }

  return response.json();
}
