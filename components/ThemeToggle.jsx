import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import styles from "../styles/modules/ThemeToggle.module.css";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div>
      <button
        aria-label="Theme Toggle"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className={`${styles.button} ${styles[resolvedTheme]}`}
      >
        {resolvedTheme === "dark" ? (
          <MdOutlineLightMode />
        ) : (
          <MdOutlineDarkMode />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
