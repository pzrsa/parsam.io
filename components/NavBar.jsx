import Link from "next/link";

const NavLink = ({ children, href }) => {
  return (
    <li>
      <Link href={href}>
        <a>{children}</a>
      </Link>
    </li>
  );
};

const Navbar = () => {
  return (
    <nav>
      <ul>
        <NavLink href="/">
          <h1>parsa.</h1>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
