import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signin from "@/app/components/Signin";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "로그인",
  description: "인스타그램에 로그인 하세요!",
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};
  
export default async function signPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className="flex justify-center mt-24">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </section>
  );
}
