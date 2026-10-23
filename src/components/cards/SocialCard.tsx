import BentoCard from "./BentoCard";

interface SocialCardProps {
  Icon: React.ComponentType<{ size?: number }>;
  label: string;
  spanText: string;
  href: string;
  size?: number;
}

const SocialCard = ({
  Icon,
  label,
  spanText,
  href,
  size = 20,
}: SocialCardProps) => {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={label}
      {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      className="group block h-full w-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-white/30"
    >
      <BentoCard classes="h-full w-full aspect-square flex flex-col justify-center items-center relative overflow-hidden">
        <div className="transition-all duration-300 ease-in-out group-hover:-translate-y-3 group-hover:opacity-0 group-focus-visible:-translate-y-3 group-focus-visible:opacity-0">
          <Icon size={size} />
        </div>
        <span
          className="absolute left-0 right-0 top-1/2 translate-y-8 opacity-0 group-hover:-translate-y-1/2 group-hover:opacity-100 group-focus-visible:-translate-y-1/2 group-focus-visible:opacity-100 transition-all duration-300 ease-in-out font-sb text-[#797978] text-center"
          style={{ fontSize: "10px" }}
        >
          {spanText}
        </span>
      </BentoCard>
    </a>
  );
};

export default SocialCard;
