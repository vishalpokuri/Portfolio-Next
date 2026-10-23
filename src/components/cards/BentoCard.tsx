import React from "react";
import Link from "next/link";

interface BentoCardProps {
  children: React.ReactNode;
  classes: string;
  hoverable?: boolean;
  /** Renders the card as a link to this route. */
  href?: string;
  padding?: "none" | "sm" | "md" | "lg";
  "data-redirect"?: string;
  "data-cursor-scale"?: string;
  "aria-label"?: string;
}

function BentoCard({
  children,
  classes,
  hoverable = false,
  href,
  padding = "md",
  ...props
}: BentoCardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const className = `${classes} bg-[#1c1c1d] rounded-2xl border-[2px] border-[#303030] transition-all duration-300 select-none ${
    hoverable
      ? "hover:bg-[#232324] hover:border-[#404040] hover:scale-[1.02] cursor-pointer"
      : ""
  } ${paddingClasses[padding]}`;

  if (href) {
    return (
      <Link
        href={href}
        className={`block outline-none focus-visible:border-[#5a5a5a] focus-visible:ring-2 focus-visible:ring-white/30 ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export default BentoCard;
