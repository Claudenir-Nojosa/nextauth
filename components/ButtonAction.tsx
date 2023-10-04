import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Pencil, Trash } from "lucide-react";

const ButtonAction = () => {
  return (
    <div className="flex gap-2 justify-center items-center mt-4">
      <Button variant="ghost" className="bg-slate-800">
        <Link href="/edit/id">
          <Pencil />
        </Link>
      </Button>
      <Button className="bg-red-700" variant="ghost">
        <Trash />
      </Button>
    </div>
  );
};

export default ButtonAction;
