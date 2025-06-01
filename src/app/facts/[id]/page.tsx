import ClaimDetail from "@/components/ClaimDetail";
import { getRedisData } from '@/lib/redis'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const verificationData = await getRedisData(id)

  if (!verificationData) {
    return <div>Not Found</div>;
  }

  return <ClaimDetail claim={verificationData} />;
}
