import { Home } from "@/components/home/Home";
import { getHomeData } from "@/sanity/lib/data";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getHomeData();
  return <Home data={data} />;
}
