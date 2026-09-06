export const APT = "Didotou 30, Athens 10680";
export const HOME = "קרית אתא";
export const BGN_LOT15 = "חניון 15 נתב\"ג טרמינל 3";
export const ATH_AIRPORT = "Athens International Airport Eleftherios Venizelos";
export const SYN = "Syntagma Square Athens";

export function mapsSearch(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsDir(
  destination: string,
  mode: "walking" | "transit" | "driving" = "walking",
  origin: string = APT,
) {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=${mode}`;
}

export function mapsLink(label: string, query: string) {
  return { label, url: mapsSearch(query) };
}

export function dirLink(
  label: string,
  destination: string,
  mode: "walking" | "transit" | "driving" = "walking",
  origin?: string,
) {
  return { label, url: mapsDir(destination, mode, origin) };
}
