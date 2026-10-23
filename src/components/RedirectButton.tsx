import { TopRightArrowIcon } from "./icons/SocialIcons";

interface RedirectButtonProps {
  size?: number;
  className?: string;
}

/** Decorative arrow badge; the card around it is the actual link. */
function RedirectButton({ size = 16, className = "" }: RedirectButtonProps) {
  return (
    <span
      aria-hidden="true"
      className={`group inline-flex items-center justify-center p-2 rounded-full  transition-all border border-[#303030] duration-200  active:scale-95 ${className}`}
    >
      <TopRightArrowIcon size={size} />
    </span>
  );
}

export default RedirectButton;
