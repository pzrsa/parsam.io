import Link from "next/link";

interface NavbarProps {
  href: string;
  text: string;
}
const NavLink: React.FC<NavbarProps> = ({ href, text }) => {
  return (
    <Link
      href={href}
      className="font-bold font-mono hover:text-neutral-500 dark:hover:text-neutral-400 transition-all text-md sm:text-lg items-center justify-center flex"
    >
      {text}
    </Link>
  );
};

const Navbar = () => {
  return (
    <nav className="flex flex-wrap gap-4 mb-6">
      <NavLink href="/" text="index" />
      <NavLink href="/about" text="about" />
      <NavLink href="/notes" text="notes" />
      <NavLink href="/articles" text="articles" />
      <NavLink href="/feeds" text="feeds" />
    </nav>
  );
};

export default Navbar;
