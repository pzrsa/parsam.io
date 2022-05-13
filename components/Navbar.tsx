import Link from "next/link";
import styles from "../styles/modules/Navbar.module.css";

interface NavbarProps {
  href: string;
  text: string;
}
const NavLink: React.FC<NavbarProps> = ({ href, text }) => {
  return (
    <Link href={href}>
      <a className={styles.navLink}>{text}</a>
    </Link>
  );
};

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink href="/" text="Home" />
      <NavLink href="/about" text="About" />
      <NavLink href="/notes" text="Notes" />
      <NavLink href="/articles" text="Articles" />
    </nav>
  );
};

export default Navbar;
