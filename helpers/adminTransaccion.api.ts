const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type Transaction = {
  id: number;
  currency: string;
  amount: number; 
  description: string;
  name: string;
  documentType: string;
  createdAt: string;
};

export async function fetchTransactions(token: string): Promise<Transaction[]> {
  const res = await fetch(`${API_URL}/admin/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("No se pudo obtener las transacciones");
  }

  return await res.json();

}