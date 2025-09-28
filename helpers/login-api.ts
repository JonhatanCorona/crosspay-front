const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(data: { email: string; password: string }) {
  const body = {
    email: data.email,
    password: data.password,
  };

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message?.[0] || "Error al iniciar sesión");
  }

  return response.json();
}


