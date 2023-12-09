import { Link } from "react-router-dom";
import ethLogo from "../assets/ethIndia.svg";
import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Upload, UserRoundCog, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

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
          <span className="text-[1.5rem] tracking-wide font-bold">
            AnonVerify
          </span>
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
        <div className="min-w-screen justify-center flex p-[2rem] min-h-screen w-full max-w-[1280px] h-full items-center">
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
        <div className="w-full max-w-[1280px]">
          {Array.from({ length: 10 }).map((_, index) => (
            <>
              <Card className="flex gap-4 p-2 pl-6 pr-6 w-full justify-between max-w-[600px] items-center"></Card>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
