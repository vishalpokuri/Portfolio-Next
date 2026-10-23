"use client";

import dynamic from "next/dynamic";

// PDF.js touches browser-only APIs at import time, so it can't be server-rendered.
const ResumeViewerLazy = dynamic(() => import("./ResumeViewer"), {
  ssr: false,
});

export default ResumeViewerLazy;
