import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { KeyRound } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="px-10 flex items-center justify-between">
        <Link href="/">
          <KeyRound />
        </Link>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/register"
        >
          Criar conta
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
