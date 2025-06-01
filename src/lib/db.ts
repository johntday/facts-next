import { ClaimVerificationData } from '@/lib/types'


export async function fetchDataHono(
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
    }
  } catch (e) {
    console.error(e);
  }

  return verificationData;
}
