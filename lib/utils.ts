import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind class names safely: clsx handles conditionals/arrays, twMerge resolves conflicts
 * (e.g. "p-2 p-4" => "p-4"). Use for component className props throughout the app.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
