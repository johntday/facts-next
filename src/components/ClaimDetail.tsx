import ClaimAnalysis from "@/components/ClaimAnalysis";
import Navbar from "@/components/Navbar";
import OriginalText from "@/components/OriginalText";
import { Button } from "@/components/ui/button";
import { ClaimVerificationData } from "@/lib/types";
import { factualityPercentage, formatUnixDate } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Clock,
  FileText,
  MessageCircle,
  User,
} from "lucide-react";
import { notFound } from "next/navigation";
import FactualityBadge from "./FactualityBadge";

export default async function ClaimDetail({
  claim,
}: {
  claim: ClaimVerificationData;
}) {
  if (!claim) {
    notFound();
  }

  const claimDate = formatUnixDate(claim.metadata.created_at);

  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
                Claim Verification Report
              </h1>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Bot className="flex-shrink-0 mr-1.5 h-5 w-5 text-muted-foreground" />
                  <span>
                    <FactualityBadge
                      factuality={claim.summary.factuality}
                    />
                    [ {factualityPercentage(claim)} / 100 ]
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-muted-foreground" />
                  <span>{claimDate}</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <FileText className="flex-shrink-0 mr-1.5 h-5 w-5 text-muted-foreground" />
                  <span>
                    ID:{" "}
                    <a
                      href={`https://x.com/${claim.metadata.user_screen_name}/status/${claim.metadata.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {claim.metadata.id}
                    </a>
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <MessageCircle className="flex-shrink-0 mr-1.5 h-5 w-5 text-muted-foreground" />
                  <span>SOURCE: X (Twitter)</span>
                </div>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <User className="flex-shrink-0 mr-1.5 h-5 w-5 text-muted-foreground" />
                  <span>{claim.metadata.user_screen_name}</span>
                </div>
              </div>
            </div>
            {/*<div className="mt-4 flex md:mt-0 md:ml-4">*/}
            {/*  <Link href="/">*/}
            {/*    <Button className="mb-4">Return to Claims List</Button>*/}
            {/*  </Link>*/}
            {/*</div>*/}
          </div>
        </div>

        {/* Content */}
        {/* Original Text */}
        <OriginalText
          rawText={claim.raw_text}
          tokenCount={claim.token_count}
          analysisDate={claimDate}
        />

        {/* Claim Analysis */}
        {claim.claim_detail.map((claimDetail, index) => (
          <ClaimAnalysis
            key={index}
            claim={claimDetail}
            claimNumber={index + 1}
          />
        ))}

        {/* Navigation Buttons */}
        <div className="flex justify-between mb-8">
          <Button variant="outline" disabled={true}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            Previous Claim
          </Button>
          <Button variant="outline" disabled={true}>
            Next Claim
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>
    </>
  );
}
