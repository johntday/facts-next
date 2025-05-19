/*
TODO:
- get param 'id'.  For example, '1919395973802897676'
- Use param 'id' to fetch data from API.  For example, https://facts-api.johntday.workers.dev/api/facts/1919395973802897676
- add header to above get fetch:  'x-api-key':'bRPAwdJiFlMXKMpXasxwK7vC0vXsjGGR'
- change return below to display fetch response json
*/
import { AlertCircle, Clock, FileText, ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import OriginalText from '@/components/OriginalText'
import ClaimAnalysis from '@/components/ClaimAnalysis'
import { ClaimVerificationData } from '@/lib/types'
import { formatDate } from '@/lib/utils'

export async function DetailPage({ id }: { id: string }) {

  // Get verificationData as ClaimVerificationData from fetch from "https://facts-api.johntday.workers.dev/api/facts/1919395973802897676"
  const claimDate = formatDate(new Date())

  if (isLoading) {
    return (
       <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="mb-6">
           <Skeleton className="h-10 w-3/4 mb-2" />
           <Skeleton className="h-6 w-1/2" />
         </div>
         <Skeleton className="h-36 w-full mb-6" />
         <Skeleton className="h-64 w-full mb-6" />
         <Skeleton className="h-96 w-full" />
       </main>
    )
  }

  if (error || !verificationData) {
    return (
       <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <Card className="mx-auto max-w-2xl">
           <CardContent className="pt-6">
             <div className="flex items-center mb-4">
               <AlertCircle className="h-8 w-8 text-red-500 mr-2" />
               <h1 className="text-2xl font-bold text-gray-900">Claim Not Found</h1>
             </div>
             <p className="mb-4 text-gray-600">
               The claim you&#39;re looking for couldn&#39;t be found. It may have been removed or you may have entered an incorrect URL.
             </p>
             <Link href="/">
               <Button>
                 Return to Claims List
               </Button>
             </Link>
           </CardContent>
         </Card>
       </main>
    )
  }


  return (
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
                 <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-muted-foreground" />
                 <span>Verified on {claimDate}</span>
               </div>
               <div className="mt-2 flex items-center text-sm text-muted-foreground">
                 <FileText className="flex-shrink-0 mr-1.5 h-5 w-5 text-muted-foreground" />
                 <span>ID: {id}</span>
               </div>
             </div>
           </div>
           <div className="mt-4 flex md:mt-0 md:ml-4">
             {/*<Button variant="outline" className="mr-2">*/}
             {/*  <ArrowLeft className="h-5 w-5 mr-2" />*/}
             {/*  Back to Claim List*/}
             {/*</Button>*/}
             <Link href="/">
               <Button className="mb-4">
                 Return to Claims List
               </Button>
             </Link>

             {/*<Button>*/}
             {/*  <Share className="h-5 w-5 mr-2" />*/}
             {/*  Share*/}
             {/*</Button>*/}
           </div>
         </div>
       </div>

       {/* Content */}
           {/* Original Text */}
           <OriginalText
              rawText={verificationData.raw_text}
              tokenCount={verificationData.token_count}
              analysisDate={claimDate}
           />

           {/* Usage Metrics */}
           {/*<UsageMetrics usage={verificationData.usage} />*/}

           {/* Claim Analysis */}
           {verificationData.claim_detail.map((claim, index) => (
              <ClaimAnalysis key={index} claim={claim} claimNumber={index + 1} />
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
  )
}
