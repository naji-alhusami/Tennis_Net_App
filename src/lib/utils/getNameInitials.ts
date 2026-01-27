export function getNameInitials(nameOrEmail?: string | null) {
  const s = (nameOrEmail ?? "").trim(); // If nameOrEmail is null or undefined → use ""
  if (!s) return "?"; // Handle empty input

  return s[0].toUpperCase();
}
