import Link from "next/link";

const BackLink = () => (
  <Link
    href="/"
    className="flex items-center gap-2 px-4 py-2 border border-[#aaaaaa] rounded-lg text-[#aaaaaa] hover:text-white hover:border-[#404040] transition-all duration-200 font-deb text-sm tracking-[0.2em]"
  >
    ← BACK
  </Link>
);

export default BackLink;
