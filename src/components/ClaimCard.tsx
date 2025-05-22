import { ClaimVerificationData } from "@/lib/types";
import { factualityPercentage, factualityStatusClass } from '@/lib/utils'

interface ClaimCardProps {
  claim: ClaimVerificationData;
}

export default function ClaimCard({ claim }: ClaimCardProps) {
  const factuality_percentage = factualityPercentage(claim);
  const statusClass = factualityStatusClass(claim);

  return (
    // <Link href={`/claims/${claim.id}`}>
      <div className="bg-card shadow-sm rounded-lg overflow-hidden mb-6 border card-hover-outline">
        <div className="px-4 py-5 sm:px-6 bg-muted/50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium leading-6 text-card-foreground truncate">
              {claim.content.claim_detail.length > 0
                ? claim.content.claim_detail[0].claim
                : "Untitled Claim"}
            </h3>
            <div className="ml-2 flex-shrink-0 flex gap-2">
              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary/10 text-primary">
                Claims {claim.content.claim_detail.length}
              </p>
              <p
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}
              >
                Factuality {factuality_percentage}%
              </p>
            </div>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground line-clamp-2">
            {claim.content.raw_text}
          </p>
        </div>
      </div>
    // </Link>
  );
}
