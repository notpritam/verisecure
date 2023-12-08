import { Button } from "@/components/ui/button";
import { Upload, UserRoundCog, Wallet } from "lucide-react";
import React from "react";

function Dashboard() {
  return (
    <>
      <header className="flex z-[999] items-center border-b-2 pb-4 backdrop-blur-xl fixed top-0 left-0 right-0 pl-[4rem] pr-[4rem] p-4 dark justify-between">
        <div className="flex items-center justify-between w-full">
          <span className="text-[1.5rem] tracking-wide font-bold">
            AnonVerify
          </span>
          <div className="flex gap-4">
            <Button className="flex gap-2">
              <Upload />
              Upload Files
            </Button>
            <Button variant="outline" className="flex gap-2">
              <UserRoundCog />
              Your Profile
            </Button>
          </div>
        </div>
      </header>
      <div className=" min-h-screen min-w-screen">
        <div className=""></div>
      </div>
    </>
  );
}

export default Dashboard;
