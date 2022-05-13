import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import styles from "../styles/modules/ThemeToggle.module.css";

const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      aria-label="Theme Toggle"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={`${styles.button} ${styles[resolvedTheme!]}`}
    >
      {resolvedTheme === "dark" ? (
        <MdOutlineLightMode className={styles.icon} />
      ) : (
        <MdOutlineDarkMode className={styles.icon} />
      )}
    </button>
  );
};

export default ThemeToggle;
