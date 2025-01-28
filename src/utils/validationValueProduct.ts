// Remove tudo que não é número
export function cleanCurrency(value: string): string {
  try {
    return value.replace(/\D/g, "");
  } catch {
    return "";
  }
}

export function formatCurrency(value: string): string {
  const cleanValue = cleanCurrency(value);

  if (cleanValue === "") return "";

  const numberValue = parseInt(cleanValue, 10) || 0;

  return (numberValue / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
