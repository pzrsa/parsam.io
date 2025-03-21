"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const name = "PARSA MESGARHA";

  return (
    <nav className="flex mb-6 items-center">
      <span className="flex-1">
        {pathname === "/" ? (
          <h1 className="font-bold text-lg sm:text-xl cursor-default">
            {name}
          </h1>
        ) : (
          <Link href={"/"} className="font-bold text-lg sm:text-xl">
            {name}
          </Link>
        )}
      </span>
      {pathname === "/blog" ? (
        <h1 className="font-bold text-lg sm:text-xl cursor-default">BLOG</h1>
      ) : (
        <Link href={"/blog"} className="font-bold text-lg sm:text-xl underline">
          BLOG
        </Link>
      )}
    </nav>
  );
}
