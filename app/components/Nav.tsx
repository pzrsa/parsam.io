"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex mb-6 gap-1 px-4 items-center">
      <span className="flex-1">
        {pathname === "/" ? (
          <span className="font-bold text-xl sm:text-2xl cursor-default p-2">
            Parsa Mesgarha
          </span>
        ) : (
          <Link
            href={"/"}
            className="font-bold text-xl sm:text-2xl hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2"
          >
            Parsa Mesgarha
          </Link>
        )}
      </span>
      {pathname === "/blog" ? (
        <span className="font-bold sm:text-lg cursor-default p-2">blog</span>
      ) : (
        <Link
          href={"/blog"}
          className="font-bold sm:text-lg hover:bg-gray-100 dark:hover:bg-blackHover transition-all rounded-sm p-2"
        >
          blog
        </Link>
      )}
    </nav>
  );
}
