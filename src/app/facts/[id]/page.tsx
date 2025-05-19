import Detail from "@/components/Detail";
import { fetchData } from "@/lib/utils";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const verificationData = await fetchData(id);

  if (!verificationData) {
    return <div>Error</div>;
  }

  return <Detail verificationData={verificationData} />;
}
