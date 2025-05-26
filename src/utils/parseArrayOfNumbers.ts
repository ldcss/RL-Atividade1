export function parseArrayOfNumbers(data: string | null): number[] {
  //  Função utilitária para validar se é mesmo um array de ids (números)
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.every(n => typeof n === 'number') ? parsed : [];
  } catch {
    return [];
  }
}
