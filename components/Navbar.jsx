import Link from "next/link";
import styles from "../styles/modules/Navbar.module.css";
import ThemeToggle from "./ThemeToggle";

const NavLink = ({ href, text }) => {
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
      <NavLink href="/notes" text="Notes" />
      <NavLink href="/articles" text="Articles" />
      <span style={{ flexGrow: 1 }}></span>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
