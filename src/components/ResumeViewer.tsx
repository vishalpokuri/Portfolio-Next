"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { FiDownload } from "react-icons/fi";
import { RESUME_DOWNLOAD_NAME } from "../data/resume";

// Must live in the same module that renders <Document>, or react-pdf's default overrides it.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const MAX_PAGE_WIDTH = 850;
/** US Letter; only used for the placeholder before the real page size is known. */
const PAGE_ASPECT = "612 / 792";

const PagePlaceholder = ({ width }: { width: number }) => (
  <div
    className="animate-pulse rounded-xl bg-[#232323] p-[7%]"
    style={{ width, aspectRatio: PAGE_ASPECT }}
  >
    <div className="mx-auto h-[3%] w-2/5 rounded bg-[#2e2e2e]" />
    <div className="mx-auto mt-[2%] h-[1.5%] w-3/5 rounded bg-[#2a2a2a]" />
    {Array.from({ length: 4 }).map((_, section) => (
      <div key={section} className="mt-[7%] space-y-[1.6%]">
        <div className="h-[1.8%] w-1/4 rounded bg-[#2e2e2e]" />
        <div className="h-px w-full bg-[#2e2e2e]" />
        {Array.from({ length: 4 }).map((_, line) => (
          <div
            key={line}
            className="h-[1.2%] rounded bg-[#2a2a2a]"
            style={{ width: `${92 - ((section + line) % 3) * 9}%` }}
          />
        ))}
      </div>
    ))}
  </div>
);

interface ResumeViewerProps {
  file: string;
}

const ResumeViewer = ({ file }: ResumeViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();
  const [numPages, setNumPages] = useState(0);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.min(Math.floor(entry.contentRect.width), MAX_PAGE_WIDTH));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {width && (
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<PagePlaceholder width={width} />}
          error={
            <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-[#303030] bg-[#1c1c1d] px-6 py-16 text-center">
              <p className="font-reg text-gray-400">
                The resume couldn&apos;t be displayed here.
              </p>
              <a
                href={file}
                download={RESUME_DOWNLOAD_NAME}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-sb text-black transition-colors hover:bg-gray-200"
              >
                <FiDownload className="h-4 w-4" />
                Download PDF
              </a>
            </div>
          }
          className="mx-auto flex flex-col items-center gap-6"
        >
          {Array.from({ length: numPages }, (_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10"
            >
              <Page
                pageNumber={i + 1}
                width={width}
                loading={<PagePlaceholder width={width} />}
              />
            </div>
          ))}
        </Document>
      )}
    </div>
  );
};

export default ResumeViewer;
