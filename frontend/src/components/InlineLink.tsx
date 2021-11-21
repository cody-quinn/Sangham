import Link from "next/link";
import React, { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

const targetProps = {
  self: {},
  blank: {
    target: "_blank",
    rel: "noopener noreferrer",
  },
};

export type InlineLinkProps = DetailedHTMLProps<
  HTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  href: string;
  target?: keyof typeof targetProps;
  children: ReactNode;
};

export const InlineLink: React.FC<InlineLinkProps> = ({
  href,
  target = "self",
  className = "",
  children,
}) => (
  <Link href={href}>
    <a className={`underline cursor-pointer ${className}`} {...targetProps[target]}>
      {children}
    </a>
  </Link>
);
