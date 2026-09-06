const CREDS_KEY = "athens-hadar-passkeys";
const SESSION_KEY = "athens-hadar-unlocked";

function b64(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64(s: string) {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}

export function passkeySupported() {
  return (
    typeof window !== "undefined" &&
    !!window.PublicKeyCredential &&
    window.isSecureContext
  );
}

export function hasPasskey() {
  try {
    return loadIds().length > 0;
  } catch {
    return false;
  }
}

export function isUnlocked() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function lockSession() {
  sessionStorage.removeItem(SESSION_KEY);
}

function loadIds(): string[] {
  const raw = localStorage.getItem(CREDS_KEY);
  if (!raw) return [];
  const parsed = JSON.parse(raw) as unknown;
  return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
}

function saveIds(ids: string[]) {
  localStorage.setItem(CREDS_KEY, JSON.stringify(ids));
}

function challenge() {
  const buf = new Uint8Array(32);
  crypto.getRandomValues(buf);
  return buf.buffer;
}

export async function registerPasskey() {
  const cred = (await navigator.credentials.create({
    publicKey: {
      challenge: challenge(),
      rp: { name: "אתונה הדר", id: window.location.hostname },
      user: {
        id: crypto.getRandomValues(new Uint8Array(16)),
        name: "hadar",
        displayName: "ישראל ושרית הדר",
      },
      pubKeyCredParams: [
        { type: "public-key", alg: -7 },
        { type: "public-key", alg: -257 },
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
        residentKey: "preferred",
      },
      timeout: 60_000,
      attestation: "none",
    },
  })) as PublicKeyCredential | null;

  if (!cred) throw new Error("ההרשמה בוטלה");
  const ids = loadIds();
  const id = b64(cred.rawId);
  if (!ids.includes(id)) saveIds([...ids, id]);
  sessionStorage.setItem(SESSION_KEY, "1");
}

export async function unlockWithPasskey() {
  const ids = loadIds();
  const allow =
    ids.length > 0
      ? ids.map((id) => ({
          type: "public-key" as const,
          id: fromB64(id),
          transports: ["internal"] as AuthenticatorTransport[],
        }))
      : undefined;

  const cred = await navigator.credentials.get({
    publicKey: {
      challenge: challenge(),
      rpId: window.location.hostname,
      allowCredentials: allow,
      userVerification: "required",
      timeout: 60_000,
    },
  });
  if (!cred) throw new Error("הכניסה בוטלה");
  sessionStorage.setItem(SESSION_KEY, "1");
}
