import type { Metadata } from "next";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import Container from "../../components/cards/Container";
import BackLink from "../../components/BackLink";
import ResumeViewerLazy from "../../components/ResumeViewerLazy";
import { RESUME_DOWNLOAD_NAME, RESUME_URL } from "../../data/resume";

export const metadata: Metadata = {
  title: "Resume",
  description: "View or download Vishal Pokuri's resume.",
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="min-h-screen py-8">
      <Container>
        <div className="page-enter">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-deb text-white">Resume</h1>
              <BackLink />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-gray-400 font-reg">
                View or download my latest resume
              </p>
              <div className="flex gap-2">
                <a
                  href={RESUME_URL}
                  download={RESUME_DOWNLOAD_NAME}
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-sb text-black transition-colors hover:bg-gray-200"
                >
                  <FiDownload className="h-4 w-4" />
                  Download
                </a>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-[#404040] px-4 py-2 text-sm font-sb text-gray-300 transition-colors hover:border-[#5a5a5a] hover:text-white"
                >
                  <FiExternalLink className="h-4 w-4" />
                  Open
                </a>
              </div>
            </div>
          </div>

          <ResumeViewerLazy file={RESUME_URL} />
        </div>
      </Container>
    </div>
  );
}
