"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex mb-6 gap-1 items-center">
      <span className="flex-1">
        {pathname === "/" ? (
          <span className="font-bold text-lg sm:text-xl cursor-default">
            Parsa Mesgarha
          </span>
        ) : (
          <Link href={"/"} className="font-bold text-lg sm:text-xl">
            Parsa Mesgarha
          </Link>
        )}
      </span>
      {pathname === "/blog" ? (
        <span className="font-bold underline cursor-default">blog</span>
      ) : (
        <Link href={"/blog"} className="font-bold underline">
          blog
        </Link>
      )}
    </nav>
  );
}
