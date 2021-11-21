import { useRouter } from "next/dist/client/router";
import React, { ReactNode } from "react";
import { Button, ButtonProps } from "./Button";

export type ButtonLinkProps = ButtonProps & {
  href: string;
  children: ReactNode;
};

export const ButtonLink: React.FC<ButtonLinkProps> = ({ href, children, ...props }) => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(href)} {...props}>
      {children}
    </Button>
  );
};
