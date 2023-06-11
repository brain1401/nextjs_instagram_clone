import { handler } from "@/app/api/auth/[...nextauth]/route";
import Signin from "@/app/components/Signin";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";


type Props = {
  searchParams : {
    callbackUrl: string;
  }
}


export default async function signPage({searchParams: {callbackUrl}}: Props) {
  
  const session = await getServerSession(handler);

  if(session) {
    redirect('/');
  }

  console.log(session)


  const providers = (await getProviders()) ?? {};
  
  return (
    <section className="flex justify-center mt-24">
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  ); 

}
