import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combina clases de Tailwind evitando conflictos (usado por todos los componentes ui/*)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
