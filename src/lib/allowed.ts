const ALLOWED = new Set(
  [
    "h.israel2008@gmail.com",
    "hisrael2008@gmail.com",
  ].map((e) => e.toLowerCase()),
);

export function isAllowedEmail(email: string | null | undefined) {
  if (!email) return false;
  return ALLOWED.has(email.trim().toLowerCase());
}
