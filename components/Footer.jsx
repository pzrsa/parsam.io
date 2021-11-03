import { SiGithub, SiLinkedin, SiTwitter } from "react-icons/si";
import styles from "../styles/modules/Footer.module.css";

const FooterItem = ({ href, icon }) => {
  return (
    <a
      className={styles.item}
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
    <footer className={styles.footer}>
      <FooterItem href="https://twitter.com/_parsam" icon={<SiTwitter />} />
      <FooterItem href="https://github.com/pzrsa" icon={<SiGithub />} />
      <FooterItem
        href="https://www.linkedin.com/in/parsamesgarha/"
        icon={<SiLinkedin />}
      />
    </footer>
  );
};

export default Footer;
