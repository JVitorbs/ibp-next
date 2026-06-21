export function getInitials(name: string) {
  const parts = name.trim().split(" ").filter(Boolean);
  if (!parts.length) return "";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function getLinhaHorizontalWidth(count: number, min: number, max: number, step: number) {
  const width = min + Math.max(0, count - 1) * step;
  return `${Math.min(max, width)}px`;
}

export function getMemberKey(pessoa: { role: string; name: string }) {
  return `${pessoa.role}-${pessoa.name}`;
}
