import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, UserRoundCog, Wallet } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <header className="flex z-[999] items-center border-b-2 pb-4 backdrop-blur-xl fixed top-0 left-0 right-0 pl-[4rem] pr-[4rem] p-4 dark justify-between">
        <div className="flex items-center justify-between w-full">
          <span className="text-[1.5rem] tracking-wide font-bold">
            AnonVerify
          </span>
          <div className="flex gap-4">
            <Link to={"/profile?action=upload"}>
              <Button className="flex gap-2">
                <Upload />
                Upload Files
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="flex gap-2">
                <UserRoundCog />
                Your Profile
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="min-h-screen flex items-center  justify-center min-w-screen">
        <div className="w-full max-w-[1280px] gap-4 items-center justify-center flex p-2  mt-[4rem] border">
          <Input className="max-w-[600px]" placeholder="Enter User Id" />{" "}
          <Button variant="outline" className="">
            <Search />
          </Button>
        </div>
        {showDetails && (
          <>
            <div className="w-full border"></div>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
