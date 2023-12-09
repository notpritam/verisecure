import React from "react";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";

function Header() {
  return (
    <header className="flex border-white z-[999] items-center border-b-2 pb-4 backdrop-blur-xl fixed top-0 left-0 right-0 pl-[4rem] pr-[4rem] p-4 dark justify-between">
      <div className="flex items-center justify-between w-full">
        <span className="text-[1.5rem] tracking-wide font-bold">
          AnonVerify
        </span>
        <Button className="flex gap-2">
          <Wallet />
          Connect Wallet
        </Button>
      </div>
    </header>
  );
}

export default Header;
