"use client";
import { ClientSafeProvider, signIn } from "next-auth/react";
import ColorButton from "./ui/ColorButton";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function Signin({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <ColorButton
          size="big"
          text={`${provider.name}로 로그인하기`}
          key={provider.name}
          onClick={() => signIn(provider.id, {callbackUrl})}
        />
      ))}
    </>
  );
}
