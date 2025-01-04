import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeData(data: Record<string, any> | undefined): Record<string, any> {
  if (!data) {
    return {}; // Return an empty object if `data` is undefined
  }
  
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === null ? undefined : value, // Convert null to undefined
    ])
  ) as Record<string, string | undefined>;
}


export const getExtension = (fileName: string) => fileName.includes(".") ? `.${fileName.split(".").pop()}` : null;


