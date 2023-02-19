import Link from "next/link";

interface FooterProps {
  href: string;
  name: string;
}

const FooterItem: React.FC<FooterProps> = ({ href, name }) => {
  return (
    <a
      className="font-mono font-bold text-md sm:text-lg  hover:text-neutral-500 dark:hover:text-neutral-400 transition-all"
      href={href}
      rel="prefetch noreferrer"
      target="_blank"
    >
      {name}
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="grid grid-cols-3 sm:flex-row sm:flex gap-4 mt-10">
      <Link
        href={"/feeds"}
        className="font-mono font-bold text-md sm:text-lg hover:text-neutral-500 dark:hover:text-neutral-400 transition-all"
      >
        feeds
      </Link>
      <FooterItem href="https://github.com/pzrsa" name="github" />
      <FooterItem href="https://twitter.com/pzrsaa" name="twitter" />
      <FooterItem
        href="https://www.linkedin.com/in/parsamesgarha/"
        name="linkedin"
      />
      <FooterItem href="https://www.youtube.com/@pzrsa" name="youtube" />
      <FooterItem href="https://github.com/pzrsa/parsam.io" name="source" />
    </footer>
  );
};

export default Footer;
