import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ClaimVerificationData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function fetchData(
  id: string
): Promise<ClaimVerificationData | null> {
  let o = null;
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
    if (!res.ok) console.log(res);
    else o = await res.json();
  } catch (e) {
    console.error(e);
  }
  if (o) {
    o.content = JSON.parse(o.content);
    verificationData = o;
  }
  console.log(o);
  return verificationData;
}
