import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import CompanyLogo from "./CompanyLogo";
import { tint } from "../utils/color";
import {
  Experience,
  accentOf,
  formatRange,
  getRange,
} from "../data/experiences";
import {
  currentMonthIndex,
  formatMonth,
  formatSpan,
  monthName,
  yearOf,
} from "../utils/dates";

interface CareerTimelineProps {
  experiences: Experience[];
  activeId: string | null;
  onActiveChange: (id: string | null) => void;
  onSelect: (id: string) => void;
}

const LANE_HEIGHT = 32;
const LANE_GAP = 8;
/** Bar widths, as % of the track, needed before showing a logo or a name. */
const LOGO_MIN_WIDTH = 7;
const LABEL_MIN_WIDTH = 16;

const CareerTimeline = ({
  experiences,
  activeId,
  onActiveChange,
  onSelect,
}: CareerTimelineProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoverMonth, setHoverMonth] = useState<number | null>(null);

  const { items, axisStart, total, laneCount, monthsCovered } = useMemo(() => {
    const now = currentMonthIndex();
    const items = experiences
      .map((experience, index) => ({
        experience,
        accent: accentOf(experience, index),
        ...getRange(experience),
        lane: 0,
      }))
      .sort((a, b) => a.start - b.start);

    // Overlapping roles go on separate lanes.
    const laneEnds: number[] = [];
    for (const item of items) {
      let lane = laneEnds.findIndex((end) => end < item.start);
      if (lane === -1) lane = laneEnds.length;
      laneEnds[lane] = item.end;
      item.lane = lane;
    }

    const earliest = Math.min(...items.map((item) => item.start), now);
    const latest = Math.max(...items.map((item) => item.end), now);
    const axisStart = Math.floor(earliest / 12) * 12;

    const covered = new Set<number>();
    items.forEach((item) => {
      for (let m = item.start; m <= item.end; m++) covered.add(m);
    });

    return {
      items,
      axisStart,
      total: latest + 1 - axisStart,
      laneCount: Math.max(laneEnds.length, 1),
      monthsCovered: covered.size,
    };
  }, [experiences]);

  const pct = (month: number) => ((month - axisStart) / total) * 100;
  const months = Array.from({ length: total }, (_, i) => axisStart + i);

  const itemsAt = (month: number) =>
    items.filter((item) => month >= item.start && month <= item.end);

  const handlePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = Math.min(
      Math.max((event.clientX - rect.left) / rect.width, 0),
      0.9999
    );
    const month = axisStart + Math.floor(ratio * total);
    setHoverMonth(month);
    onActiveChange(itemsAt(month)[0]?.experience.id ?? null);
  };

  const handleLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    setHoverMonth(null);
    onActiveChange(null);
  };

  // What the readout panel shows: hovered month, else hovered card, else today.
  const readout = (() => {
    if (hoverMonth !== null) {
      return {
        label: formatMonth(hoverMonth),
        entries: itemsAt(hoverMonth),
        month: hoverMonth,
      };
    }
    const active = items.find((item) => item.experience.id === activeId);
    if (active) {
      return {
        label: formatRange(active.experience),
        entries: [active],
        month: null,
      };
    }
    const current = items.filter((item) => item.isCurrent);
    return {
      label: current.length ? "Right now" : "Most recent",
      entries: current.length ? current : items.slice(-1),
      month: null,
    };
  })();

  // Only replay the reveal when the roles shown change, not on every month.
  const readoutKey =
    readout.entries.map((entry) => entry.experience.id).join("|") || "none";

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between mb-5">
        <div>
          <h3 className="text-lg font-deb text-white">Career Timeline</h3>
          <p className="text-xs text-gray-500 font-reg mt-1">
            Hover or tap along the timeline to see what I was working on
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-med text-gray-400">
          <span>
            <span className="text-white font-sb">
              {formatSpan(monthsCovered)}
            </span>{" "}
            experience
          </span>
          <span className="h-3 w-px bg-[#404040]" />
          <span>
            <span className="text-white font-sb">{items.length}</span>{" "}
            {items.length === 1 ? "role" : "roles"}
          </span>
        </div>
      </div>

      {/* Readout */}
      <div className="mb-5 min-h-[76px] rounded-xl border border-[#2a2a2a] bg-[#171717] px-4 py-3">
        <motion.div
          key={readoutKey}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500 font-sb mb-1.5">
            {readout.label}
          </p>
          {readout.entries.length === 0 ? (
            <p className="text-sm text-gray-500 font-reg">
              No role listed for this month
            </p>
          ) : (
            <div className="space-y-1.5">
              {readout.entries.map((entry) => (
                <div
                  key={entry.experience.id}
                  className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm"
                >
                  <CompanyLogo
                    company={entry.experience.company}
                    logo={entry.experience.logo}
                    accent={entry.accent}
                    size={18}
                  />
                  <span className="text-white font-sb">
                    {entry.experience.position}
                  </span>
                  <span className="text-gray-500 font-reg">at</span>
                  <span className="font-sb" style={{ color: entry.accent }}>
                    {entry.experience.company}
                  </span>
                  <span className="text-gray-500 font-reg text-xs sm:ml-auto">
                    {readout.month !== null && entry.months > 1
                      ? `Month ${readout.month - entry.start + 1} of ${entry.months}`
                      : entry.isCurrent
                      ? `${formatSpan(entry.months)} so far`
                      : formatSpan(entry.months)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative select-none touch-pan-y"
        style={{ height: laneCount * LANE_HEIGHT + (laneCount - 1) * LANE_GAP }}
        onPointerMove={handlePointer}
        onPointerDown={handlePointer}
        onPointerLeave={handleLeave}
      >
        {months.map((month) => (
          <div
            key={month}
            className={`absolute -top-2 -bottom-2 w-px ${
              month % 12 === 0 ? "bg-white/10" : "bg-white/[0.03]"
            }`}
            style={{ left: `${pct(month)}%` }}
          />
        ))}

        {hoverMonth !== null && (
          <div
            className="absolute -top-2 -bottom-2 rounded-md bg-white/[0.06] transition-[left] duration-100 ease-out pointer-events-none"
            style={{ left: `${pct(hoverMonth)}%`, width: `${100 / total}%` }}
          />
        )}

        {items.map((item, index) => {
          const isActive = activeId === item.experience.id;
          const isDimmed = activeId !== null && !isActive;
          const width = pct(item.end + 1) - pct(item.start);
          return (
            <motion.button
              key={item.experience.id}
              type="button"
              aria-label={`${item.experience.position} at ${
                item.experience.company
              }, ${formatRange(item.experience)}`}
              onClick={() => onSelect(item.experience.id)}
              onFocus={() => onActiveChange(item.experience.id)}
              onBlur={() => onActiveChange(null)}
              initial={{ clipPath: "inset(0 100% 0 0 round 8px)" }}
              animate={{
                clipPath: "inset(0 0% 0 0 round 8px)",
                opacity: isDimmed ? 0.45 : 1,
              }}
              transition={{
                clipPath: { duration: 0.7, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.2 },
              }}
              className={`absolute flex items-center gap-1.5 overflow-hidden rounded-lg border px-1.5 sm:px-2 text-left outline-none transition-[background-color,border-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-white/40 ${
                width >= LABEL_MIN_WIDTH ? "" : "justify-center"
              } ${item.isCurrent ? "pr-5 sm:pr-6" : ""}`}
              style={{
                left: `${pct(item.start)}%`,
                width: `${width}%`,
                top: item.lane * (LANE_HEIGHT + LANE_GAP),
                height: LANE_HEIGHT,
                backgroundColor: tint(item.accent, isActive ? 30 : 16),
                borderColor: tint(item.accent, isActive ? 90 : 40),
                boxShadow: isActive
                  ? `0 6px 24px -8px ${tint(item.accent, 70)}`
                  : "none",
              }}
            >
              {width >= LOGO_MIN_WIDTH && (
                <CompanyLogo
                  company={item.experience.company}
                  logo={item.experience.logo}
                  accent={item.accent}
                  size={16}
                />
              )}
              {width >= LABEL_MIN_WIDTH && (
                <span
                  className="truncate text-xs font-sb"
                  style={{ color: item.accent }}
                >
                  {item.experience.company}
                </span>
              )}
              {item.isCurrent && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ backgroundColor: item.accent }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.accent }}
                  />
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Axis */}
      <div className="relative mt-4 h-8 border-t border-[#333]">
        {months.map((month) => {
          const isYear = month % 12 === 0;
          const isQuarter = month % 3 === 0;
          const nearEnd = pct(month) > 88;
          return (
            <div
              key={month}
              className="absolute top-0"
              style={{ left: `${pct(month)}%` }}
            >
              <div
                className={`w-px ${
                  isYear ? "h-2.5 bg-gray-400" : "h-1.5 bg-[#4a4a4a]"
                }`}
              />
              {isYear && (
                <span className="absolute top-3 left-1 text-xs font-sb text-gray-300">
                  {yearOf(month)}
                </span>
              )}
              {!isYear && isQuarter && !nearEnd && (
                <span className="absolute top-3 left-1 hidden sm:block text-[11px] font-reg text-gray-500">
                  {monthName(month)}
                </span>
              )}
            </div>
          );
        })}
        <span className="absolute right-0 top-3 flex items-center gap-1.5 text-xs font-sb text-gray-300">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          Now
        </span>
      </div>
    </div>
  );
};

export default CareerTimeline;
