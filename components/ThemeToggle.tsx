import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      aria-label="Theme Toggle"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 w-8 h-8 items-center justify-center transition-all rounded-lg"
    >
      {resolvedTheme === "dark" ? (
        <MdOutlineLightMode />
      ) : (
        <MdOutlineDarkMode />
      )}
    </button>
  );
};

export default ThemeToggle;
