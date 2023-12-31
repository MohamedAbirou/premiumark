"use client";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  variant?: string;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  variant,
  small,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative disabled:opacity-85 disabled:cursor-not-allowed rounded-lg hover:opacity-95 transition w-full",
        variant === "outline" && "bg-white border-black text-black",
        variant === "primary" && "bg-[#76a3cd] border-[#76a3cd] text-white",
        variant === "destructive" && "bg-rose-500 border-rose-500 text-white",
        small ? "text-sm" : "text-md",
        small ? "py-1" : "py-3",
        small ? "font-light" : "font-semibold",
        small ? "border-[1px]" : "border-2"
      )}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
      {disabled && small && (
        <Loader className="absolute right-2 top-1.5 w-4 h-4 animate-spin" />
      )}
      {disabled && !small && (
        <Loader className="absolute right-2 top-3 w-6 h-6 animate-spin" />
      )}
    </button>
  );
};

export default Button;
