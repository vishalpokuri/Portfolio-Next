import IntroCard from "../cards/IntroCard";
import SocialCard from "../cards/SocialCard";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
} from "../icons/SocialIcons";
import { SOCIAL_LINKS } from "../../data/site";

const SOCIALS = [
  {
    Icon: TwitterIcon,
    label: "X (Twitter)",
    spanText: "vishal_pokuri99",
    href: SOCIAL_LINKS.x,
  },
  {
    Icon: GithubIcon,
    label: "GitHub",
    spanText: "vishalpokuri",
    href: SOCIAL_LINKS.github,
  },
  {
    Icon: LinkedinIcon,
    label: "LinkedIn",
    spanText: "vishalpokuri",
    href: SOCIAL_LINKS.linkedin,
  },
  {
    Icon: MailIcon,
    label: "Email",
    spanText: "vishal.pokuri",
    href: `mailto:${SOCIAL_LINKS.email}`,
  },
];

const HeroSection = () => {
  const cards = SOCIALS.map((social) => (
    <SocialCard key={social.label} {...social} size={24} />
  ));

  return (
    <div className="h-auto md:h-50 grid grid-cols-1 md:grid-cols-4 md:gap-2">
      <IntroCard />
      <div
        className="hidden md:grid md:grid-cols-2 md:grid-rows-2 gap-2 h-full w-full min-h-48 md:min-h-full"
        data-redirect="true"
      >
        {cards}
      </div>
      <div className="grid grid-cols-4 gap-4 my-4 md:hidden">{cards}</div>
    </div>
  );
};

export default HeroSection;
