import Link from "next/link";

interface NavbarProps {
  href: string;
  text: string;
}
const NavLink: React.FC<NavbarProps> = ({ href, text }) => {
  return (
    <Link href={href}>
      <a className="font-bold font-mono hover:text-neutral-500 dark:hover:text-neutral-400 transition-all text-md sm:text-lg fold:text-base items-center justify-center flex">
        {text}
      </a>
    </Link>
  );
};

const Navbar = () => {
  return (
    <nav className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 fold:gap-2 mb-6">
      <NavLink href="/" text="index" />
      <NavLink href="/about" text="about" />
      <NavLink href="/notes" text="notes" />
      <NavLink href="/articles" text="articles" />
    </nav>
  );
};

export default Navbar;
