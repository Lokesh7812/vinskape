import { Home } from "@/components/home/Home";
import { getHomeData } from "@/sanity/lib/data";
export default async function Page() { const data = await getHomeData(); return <Home data={data} />; }
