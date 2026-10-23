import { motion } from "framer-motion";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";
import CompanyLogo from "./CompanyLogo";
import {
  Experience,
  formatDuration,
  formatRange,
  getRange,
} from "../data/experiences";
import { tint } from "../utils/color";

interface ExperienceCardProps {
  experience: Experience;
  accent: string;
  index: number;
  isActive: boolean;
  onHoverChange: (hovered: boolean) => void;
}

const renderEmphasis = (text: string) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-sb text-gray-100">
        {part}
      </strong>
    ) : (
      part
    )
  );

const ExperienceCard = ({
  experience,
  accent,
  index,
  isActive,
  onHoverChange,
}: ExperienceCardProps) => {
  const {
    id,
    position,
    company,
    companyUrl,
    employmentType,
    location,
    logo,
    summary,
    points,
    skills,
  } = experience;
  const { isCurrent } = getRange(experience);

  return (
    <motion.article
      id={`experience-${id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      className="relative w-full overflow-hidden rounded-2xl border-2 bg-[#1c1c1d] p-4 sm:p-5 md:p-6 transition-colors duration-300 scroll-mt-24"
      style={{ borderColor: isActive ? tint(accent, 55) : "#303030" }}
    >
      <div
        className="pointer-events-none absolute -top-28 -left-28 h-56 w-56 rounded-full blur-3xl transition-opacity duration-500"
        style={{ backgroundColor: accent, opacity: isActive ? 0.1 : 0 }}
      />

      <header className="relative flex gap-3 sm:gap-4">
        <CompanyLogo
          company={company}
          logo={logo}
          accent={accent}
          size={44}
          framed
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <h2 className="text-base sm:text-lg md:text-xl font-deb text-white leading-snug">
              {position}
            </h2>
            <p className="shrink-0 text-xs sm:text-sm font-reg text-gray-400 sm:text-right sm:pt-0.5">
              {formatRange(experience)}
              <span className="text-gray-600"> · </span>
              <span className="text-gray-500">{formatDuration(experience)}</span>
            </p>
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
            {companyUrl ? (
              <a
                href={companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-0.5 text-[15px] sm:text-base font-sb text-blue-400 transition-colors hover:text-blue-300"
              >
                {company}
                <FiArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            ) : (
              <span className="text-[15px] sm:text-base font-sb text-gray-300">
                {company}
              </span>
            )}
            {employmentType && (
              <span className="rounded-full bg-[#2a2a2a] px-2.5 py-0.5 text-[11px] sm:text-xs font-med text-gray-400">
                {employmentType}
              </span>
            )}
            {isCurrent && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-[11px] sm:text-xs font-med text-green-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                Current
              </span>
            )}
          </div>

          {location && (
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-reg text-gray-500">
              <FiMapPin className="h-3.5 w-3.5 shrink-0" />
              {location}
            </p>
          )}
        </div>
      </header>

      <div className="relative md:pl-15">
        {summary && (
          <p className="mt-4 text-sm font-reg leading-relaxed text-gray-300">
            {summary}
          </p>
        )}

        {points.length > 0 && (
          <ul className="mt-4 space-y-2.5">
            {points.map((point, i) => (
              <li
                key={i}
                className="flex gap-3 text-[13px] sm:text-sm font-reg leading-relaxed text-gray-400"
              >
                <span
                  className="mt-[9px] h-[3px] w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <span>{renderEmphasis(point)}</span>
              </li>
            ))}
          </ul>
        )}

        {skills && skills.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-[#2a2a2a] pt-4">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-[#303030] bg-[#232323] px-2.5 py-1 text-xs font-med text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ExperienceCard;
