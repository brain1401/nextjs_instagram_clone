import { getLikedPostOf, getPostOf, getSavedPostOf } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";


type Context = {
  params: {
    slug: string[]; //slug/slug/slug
  }
}
export async function GET(_: NextRequest, context: Context) {
  const {slug} = context.params;

  if(!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse('Bad Request', {status: 400})
  }

  const [displayname, query] = slug;

  let request = getPostOf;
  if(query === 'saved'){
    request = getSavedPostOf;

  }else if(query === 'liked'){
    request = getLikedPostOf;
  }
  
  const result = await request(displayname);

  return NextResponse.json(result)

}