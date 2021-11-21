import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { accessabilityStyles } from "../lib/constants";

const sizeClassnames = {
  normal: "px-2 py-1 rounded-md",
  large: "px-3 py-2 rounded-lg",
};

export type TextInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  inputSize?: keyof typeof sizeClassnames;
};

export const TextInput: React.FC<TextInputProps> = ({
  inputSize = "large",
  className = "",
  ...props
}: TextInputProps) => (
  <input
    className={`cursor-text bg-gray-200 ${accessabilityStyles} ${sizeClassnames[inputSize]} ${className}`}
    {...props}
  />
);
