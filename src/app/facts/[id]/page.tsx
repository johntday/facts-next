import ClaimDetail from "@/components/ClaimDetail";
import { fetchData } from "@/lib/utils";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const verificationData = await fetchData(id);

  if (!verificationData) {
    return <div>Error</div>;
  }

  return <ClaimDetail claim={verificationData} />;
}
