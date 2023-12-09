import { Link } from "react-router-dom";
import ethLogo from "../assets/ethIndia.svg";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Github,
  Lock,
  MoreVertical,
  ShieldEllipsis,
  Upload,
  UserRoundCog,
  View,
  Wallet,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function Profile() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };
  const handleFileUpload = () => {};

  return (
    <>
      <header className="flex z-[999] items-center border-b-2 pb-4 backdrop-blur-xl fixed top-0 left-0 right-0 pl-[4rem] pr-[4rem] p-4 dark justify-between">
        <div className="flex items-center justify-between w-full">
          <Link to={"/"}>
            <span className="text-[1.5rem] tracking-wide font-bold">
              AnonVerify
            </span>
          </Link>
          <div className="flex gap-4">
            <Link to={"/profile?action=upload"}>
              {/* <Button className="flex gap-2">
                <Upload />
                Upload Files
              </Button> */}
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

      <div className="w-full h-full flex flex-col mt-[4rem] justify-center items-center">
        <div className="min-w-screen justify-center flex p-[2rem]  w-full max-w-[1280px] h-full items-center">
          <Card className="p-6 items-center flex flex-col gap-4 justify-center w-full">
            <Label htmlFor="picture" className="text-[1.25rem]">
              Choose the file
            </Label>
            <Input
              className="text-center"
              id="picture"
              type="file"
              onChange={handleFileChange}
            />
            {selectedFile && (
              <div className="flex flex-col gap-4">
                <img src={selectedFile} alt="Selected file" className="mt-4" />
                <Button onClick={() => handleFileUpload()}>Upload File</Button>
              </div>
            )}
          </Card>
        </div>
        <div className="flex w-full max-w-[1280px] gap-4">
          <div className="w-full flex flex-col gap-4 max-w-[1280px]">
            <span className="text-[2rem] font-bold">Your Files</span>
            {Array.from({ length: 10 }).map((_, i) => (
              <>
                <Card
                  key={i}
                  className={cn(
                    "flex gap-4 p-2 pl-6 pr-6 w-full justify-between max-w-[600px] items-center"
                  )}
                >
                  <div className="flex gap-4 items-center">
                    <img
                      className={cn("h-10 w-10 rounded-full")}
                      src="https://i.pravatar.cc/300"
                    ></img>
                    <div className="flex flex-col">
                      <span className={cn("text-[1.5rem] font-bold")}>
                        John Doe {i}
                      </span>
                      <div className="flex gap-8">
                        <span className="text-[0.8rem] opacity-80">
                          0x1234567890
                        </span>
                        <span className="text-[0.8rem] opacity-80">
                          Size :- 123Kb
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Popover>
                      <PopoverTrigger>
                        <MoreVertical />
                      </PopoverTrigger>
                      <PopoverContent className="flex gap-2 flex-col">
                        <Button>Delete</Button>
                        <Button>View</Button>
                        <Button>Share</Button>
                        <Button>Revoke Access</Button>
                      </PopoverContent>
                    </Popover>
                  </div>
                </Card>
              </>
            ))}
          </div>
          <div className="w-full flex flex-col gap-4 max-w-[1280px]">
            <span className="text-[2rem] font-bold">Others Files</span>
            {Array.from({ length: 10 }).map((_, i) => (
              <>
                <Card
                  key={i}
                  className={cn(
                    "flex gap-4 p-2 pl-6 pr-6 w-full justify-between max-w-[600px] items-center"
                  )}
                >
                  <div className="flex gap-4 items-center">
                    <img
                      className={cn("h-10 w-10 rounded-full")}
                      src="https://i.pravatar.cc/300"
                    ></img>
                    <div className="flex flex-col">
                      <span className={cn("text-[1.5rem] font-bold")}>
                        John Doe {i}
                      </span>
                      <div className="flex gap-8">
                        <span className="text-[0.8rem] opacity-80">
                          0x1234567890
                        </span>
                        <span className="text-[0.8rem] opacity-80">
                          Size :- 123Kb
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Popover>
                      <PopoverTrigger>
                        <MoreVertical />
                      </PopoverTrigger>
                      <PopoverContent className="flex gap-2 flex-col">
                        {/* <Button>Delete</Button> */}
                        <Button>View</Button>
                        {/* <Button>Share</Button> */}
                      </PopoverContent>
                    </Popover>
                    {/* <Button variant="outline">Verify</Button> */}
                  </div>
                </Card>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
