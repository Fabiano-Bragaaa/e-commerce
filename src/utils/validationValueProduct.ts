export function cleanCurrency(value: string): string {
  try {
    return value.replace(/\D/g, ""); // Mantém como string para compatibilidade
  } catch {
    return "";
  }
}

export function formatCurrency(value: string): string {
  const cleanValue = cleanCurrency(value);

  if (cleanValue === "") return "";

  // Converte o valor para número corretamente
  const numberValue = Number(cleanValue) || 0;

  return (numberValue / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
