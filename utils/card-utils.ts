export function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

export function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function isExpiryValid(expiry: string): boolean {
  if (!expiry || expiry.length !== 5) return false;

  const [monthStr, yearStr] = expiry.split("/");
  const month = parseInt(monthStr, 10);
  const year = parseInt("20" + yearStr, 10); // convertir YY -> YYYY

  if (isNaN(month) || isNaN(year)) return false;
  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentMonth = now.getMonth() + 1; // getMonth() va de 0-11
  const currentYear = now.getFullYear();

  // Si el año es menor al actual, inválido
  if (year < currentYear) return false;
  // Si el año es igual y el mes es menor al actual, inválido
  if (year === currentYear && month < currentMonth) return false;

  return true; // válido
}