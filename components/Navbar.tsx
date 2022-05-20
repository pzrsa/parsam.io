import Link from "next/link";

interface NavbarProps {
  href: string;
  text: string;
}
const NavLink: React.FC<NavbarProps> = ({ href, text }) => {
  return (
    <Link href={href}>
      <a className="font-semibold hover:text-neutral-500 dark:hover:text-neutral-400 transition-all text-xl fold:text-base">
        {text}
      </a>
    </Link>
  );
};

const Navbar = () => {
  return (
    <nav className="flex flex-wrap gap-3 mb-6">
      <NavLink href="/" text="Home" />
      <NavLink href="/about" text="About" />
      <NavLink href="/notes" text="Notes" />
      <NavLink href="/articles" text="Articles" />
    </nav>
  );
};

export default Navbar;
