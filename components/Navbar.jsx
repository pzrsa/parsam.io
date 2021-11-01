import Link from "next/link";
import styles from "../styles/modules/Navbar.module.css";

const NavLink = ({ children, href }) => {
  return (
    <Link href={href}>
      <a className={styles.navLink}>{children}</a>
    </Link>
  );
};

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/">Notes</NavLink>
      <NavLink href="/">Writing</NavLink>
    </nav>
  );
};

export default Navbar;
