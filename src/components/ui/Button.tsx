import type { ButtonProps } from "@app/types/uiSchema.ts";
import React, { type FC } from "react";

const Button: FC<ButtonProps> = ({
  buttonText,
  children,
  onClick,
  className = "",
  variant = "default",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`glassify-button ${variant} ${className}`}
    >
      {buttonText}
      {children}
    </button>
  );
};

export default Button;
