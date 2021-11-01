import Link from "next/link";
import styles from "../styles/modules/Navbar.module.css";

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
      <NavLink href="/writing" text="Writing" />
    </nav>
  );
};

export default Navbar;
