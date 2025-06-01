import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClaimVerificationData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUnixDate(unixDate: number): string {
  return new Date(unixDate * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function factualityPercentage(data: ClaimVerificationData): number {
  return Math.round((data.summary.factuality || 0) * 100);
}

export function factualityStatusClass(data: ClaimVerificationData): string {
  const factuality_percentage = factualityPercentage(data);

  if (factuality_percentage < 70) {
    return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    //statusText = "Refuted";
  } else if (factuality_percentage < 90) {
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    //statusText = "Partially Verified";
  }
  return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
}

export function checkworthinessFactualityRating(
  factualityPercentage: number
): string {
  if (factualityPercentage < 80) {
    return "bg-red-500";
  } else if (factualityPercentage < 50) {
    return "bg-yellow-500";
  }
  return "bg-green-500";
}
