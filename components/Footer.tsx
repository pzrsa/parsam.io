import { ReactElement } from "react";
import { SiGithub, SiLinkedin, SiTwitter, SiYoutube } from "react-icons/si";
import { VscSourceControl } from "react-icons/vsc";

interface FooterProps {
  href: string;
  icon: ReactElement;
}

const FooterItem: React.FC<FooterProps> = ({ href, icon }) => {
  return (
    <a
      className="text-2xl fold:text-xl hover:text-neutral-500 dark:hover:text-neutral-400 transition-all"
      href={href}
      rel="prefetch noreferrer"
      target="_blank"
    >
      {icon}
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="mt-10 flex gap-4 items-center">
      <FooterItem
        href="https://twitter.com/_parsam"
        icon={<SiTwitter title="Twitter" />}
      />
      <FooterItem
        href="https://github.com/pzrsa"
        icon={<SiGithub title="GitHub" />}
      />
      <FooterItem
        href="https://www.youtube.com/channel/UCIIXFxDwjdQtIlf5or_DcwQ"
        icon={<SiYoutube title="YouTube" />}
      />
      <FooterItem
        href="https://github.com/pzrsa/parsam.io"
        icon={<VscSourceControl title="Source Code" />}
      />
      <FooterItem
        href="https://www.linkedin.com/in/parsamesgarha/"
        icon={<SiLinkedin title="LinkedIn" />}
      />
    </footer>
  );
};

export default Footer;
