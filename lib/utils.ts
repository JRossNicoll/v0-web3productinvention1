import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCompactNumber(number: number): string {
  if (number < 1000) {
    return number.toFixed(0)
  } else if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + "K"
  } else if (number >= 1000000 && number < 1000000000) {
    return (number / 1000000).toFixed(1) + "M"
  } else if (number >= 1000000000) {
    return (number / 1000000000).toFixed(1) + "B"
  }
  return number.toString()
}
