import {
  getLikedPostByDisplayname,
  getPostByDisplayname,
  getSavedPostByDisplayname,
} from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    slug: string[]; //slug/slug/slug
  };
};
export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const [displayname, query] = slug;

  let request = getPostByDisplayname;
  if (query === "saved") {
    request = getSavedPostByDisplayname;
  } else if (query === "liked") {
    request = getLikedPostByDisplayname;
  }

  const result = await request(displayname);

  return NextResponse.json(result);
}
