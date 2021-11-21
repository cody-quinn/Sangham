import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { accessabilityStyles } from "../lib/constants";

const colorClassnames = {
  primary: "bg-red-500 bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-200 hover:bg-gray-300",
};

const sizeClassnames = {
  normal: "px-3 py-1 rounded-md",
  large: "px-8 py-2 rounded-lg",
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: keyof typeof colorClassnames;
  size?: keyof typeof sizeClassnames;
  children: ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  color = "secondary",
  size = "normal",
  className = "",
  children,
  ...props
}) => (
  <button
    className={`cursor-pointer ${accessabilityStyles} ${colorClassnames[color]} ${sizeClassnames[size]} ${className}`}
    {...props}
  >
    {children}
  </button>
);
