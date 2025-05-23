"use client";

import { ClaimDetail } from "@/lib/types";
import { checkworthinessFactualityRating } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import EvidenceItem from "./EvidenceItem";
import FactualityBadge from "./FactualityBadge";
import NotCheckworthyBadge from "./NotCheckworthyBadge";
interface ClaimAnalysisProps {
  claim: ClaimDetail;
  claimNumber: number;
}

export default function ClaimAnalysis({
  claim,
  claimNumber,
}: ClaimAnalysisProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Show all evidence
  const displayEvidence = claim.evidences;

  // Group evidence by relationship
  const supportsEvidence = claim.evidences.filter(
    (e) => e.relationship === "SUPPORTS"
  ).length;
  const refutesEvidence = claim.evidences.filter(
    (e) => e.relationship === "REFUTES"
  ).length;
  const irrelevantEvidence = claim.evidences.filter(
    (e) => e.relationship === "IRRELEVANT"
  ).length;

  // Format factuality percentage
  const factualityPercentage = Math.round(claim.factuality * 100);

  return (
    <div className="bg-card shadow-sm rounded-lg overflow-hidden mb-6 border card-hover-outline">
      <div
        className={`px-4 py-5 sm:px-6 bg-muted/50 ${
          isExpanded ? "border-b border-border" : ""
        } cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-card-foreground">
            CLAIM #{claimNumber}: {claim.claim}
          </h3>
          <div className="ml-2 flex-shrink-0 flex items-center">
            {claim.checkworthy ? (
              isNaN(factualityPercentage) ? (
                <NotCheckworthyBadge text="Undetermined" />
              ) : (
                <FactualityBadge factuality={claim.factuality} />
              )
            ) : (
              <NotCheckworthyBadge />
            )}
            <ChevronDown
              className={`ml-2 h-5 w-5 text-muted-foreground transition-transform ${
                isExpanded ? "rotate-180 transform" : ""
              }`}
            />
          </div>
        </div>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground italic">
          &quot;{claim.origin_text}&quot;
        </p>
      </div>

      {isExpanded && (
        <>
          <div className="border-b border-border px-4 py-5 sm:px-6">
            <div className="sm:flex sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Checkworthiness
                </h4>
                <p className="mt-1 text-sm text-card-foreground">
                  {claim.checkworthy_reason}
                </p>
              </div>
              {claim.checkworthy && !isNaN(factualityPercentage) && (
                <div className="sm:ml-6 sm:w-40">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Factuality Rating
                  </h4>
                  <div className="mt-1">
                    <div className="flex items-center">
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className={`${checkworthinessFactualityRating(
                            factualityPercentage
                          )} h-2.5 rounded-full`}
                          style={{ width: `${factualityPercentage}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-card-foreground">
                        {factualityPercentage}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {claim.checkworthy && (
            <div className="px-4 py-5 sm:px-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-base font-medium text-card-foreground">
                  Evidence Analysis
                </h4>
                <div className="text-xs text-muted-foreground flex gap-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                    Supports: {supportsEvidence}
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-full">
                    Refutes: {refutesEvidence}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400 rounded-full">
                    Irrelevant: {irrelevantEvidence}
                  </span>
                </div>
              </div>

              {/* Evidence Items */}
              {displayEvidence.map((evidence, index) => (
                <EvidenceItem key={index} evidence={evidence} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
