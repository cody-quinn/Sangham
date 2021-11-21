import React, { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { accessabilityStyles } from "../lib/constants";

const sizeClassnames = {
  normal: "px-2 py-1 rounded-md",
  large: "px-3 py-2 rounded-lg",
};

export type MultiLineTextInputProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  inputSize?: keyof typeof sizeClassnames;
};

export const MultiLineTextInput: React.FC<MultiLineTextInputProps> = ({
  inputSize = "large",
  className = "",
  ...props
}: MultiLineTextInputProps) => (
  <textarea
    className={`cursor-text bg-gray-200 ${accessabilityStyles} ${sizeClassnames[inputSize]} ${className}`}
    {...props}
  />
);
