import { useState } from "react";
import Image from "next/image";
import { tint } from "../utils/color";

interface CompanyLogoProps {
  company: string;
  logo?: string;
  accent: string;
  /** Rendered size in px. */
  size: number;
  /** Puts the logo on a bordered tile, used for the card header. */
  framed?: boolean;
}

const CompanyLogo = ({
  company,
  logo,
  accent,
  size,
  framed = false,
}: CompanyLogoProps) => {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(logo) && !failed;
  const radius = Math.round(size * 0.27);

  if (!showImage) {
    return (
      <span
        aria-hidden="true"
        className="grid shrink-0 place-items-center font-b leading-none select-none"
        style={{
          width: size,
          height: size,
          borderRadius: radius,
          fontSize: Math.round(size * 0.46),
          color: accent,
          backgroundColor: tint(accent, framed ? 12 : 22),
          border: framed ? `1px solid ${tint(accent, 30)}` : undefined,
        }}
      >
        {company.charAt(0).toUpperCase()}
      </span>
    );
  }

  const image = (
    <Image
      src={logo!}
      alt={`${company} logo`}
      width={framed ? Math.round(size * 0.62) : size}
      height={framed ? Math.round(size * 0.62) : size}
      onError={() => setFailed(true)}
      className="shrink-0 object-contain"
      style={framed ? undefined : { borderRadius: Math.round(size * 0.2) }}
    />
  );

  if (!framed) return image;

  return (
    <span
      className="grid shrink-0 place-items-center border border-[#333] bg-[#232323]"
      style={{ width: size, height: size, borderRadius: radius }}
    >
      {image}
    </span>
  );
};

export default CompanyLogo;
