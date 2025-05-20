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

export async function fetchData(
  id: string
): Promise<ClaimVerificationData | null> {
  let verificationData: ClaimVerificationData | null = null;
  try {
    const res = await fetch(
      `https://facts-api.johntday.workers.dev/api/facts/${id}`,
      {
        headers: {
          "x-api-key": process.env.FACTS_API_KEY || "",
        },
        // Optionally: cache: 'no-store',
      }
    );
    if (!res.ok) {
      console.error(res);
    } else {
      verificationData = await res.json();
      console.log(verificationData);
    }
  } catch (e) {
    console.error(e);
  }

  return verificationData;
}
