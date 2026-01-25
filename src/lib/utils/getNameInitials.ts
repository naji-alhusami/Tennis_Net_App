// Helper that creates short initials text (1–2 letters) from a person’s name or email.
export function getNameInitials(nameOrEmail?: string | null) {
  const s = (nameOrEmail ?? "").trim(); // If nameOrEmail is null or undefined → use ""
  if (!s) return "?"; // Handle empty input
  const parts = s.split(/\s+/); // Split into words, "John Doe" → ["John", "Doe"]
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase(); // Take the first two characters and Convert to uppercase
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase(); // first letter of the first word and first letter of the last word, Combine + uppercase
}
