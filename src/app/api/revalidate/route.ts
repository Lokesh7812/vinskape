import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret =
    req.nextUrl.searchParams.get("secret") ||
    req.headers.get("x-sanity-secret") ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    revalidatePath("/gallery/ongoing");
    revalidatePath("/gallery/completed");
    revalidatePath("/gallery");
    return NextResponse.json({
      revalidated: true,
      message: "Gallery pages revalidated successfully",
      now: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Revalidation failed";
    return NextResponse.json({ message }, { status: 500 });
  }
}
