import CustomButton from "@/components/custombutton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Eye,
  Lock,
  Search,
  ShieldEllipsis,
  Upload,
  UserRoundCog,
  View,
  Wallet,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = (id) => {
    setShowDetails(true);
  };
  return (
    <Dialog>
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 z-[0]">
        <img
          className="blur-[300px]"
          src="https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        ></img>
      </div> */}
      <div className="min-h-screen z-[1] relative h-screen w-screen overflow-x-hidden flex items-center gap-[4rem]  justify-center min-w-screen">
        <div
          className={cn(
            "w-full max-w-[1280px] gap-4 items-center  justify-center flex flex-col p-2 min-h-[600px] mt-[8rem] border",
            showDetails == true ? "w-[20%] mt-[6rem]" : ""
          )}
        >
          <div
            className={cn(
              "flex sticky top-0 justify-center min-h-[200px] backdrop-blur-lg items-center gap-6 w-full",
              showDetails == true ? "min-h-[80px] sticky top-[4rem]" : ""
            )}
          >
            <Input
              className="max-w-[600px] w-full"
              placeholder="Enter User Id"
            />{" "}
            <Button variant="outline" className="">
              <Search />
            </Button>
          </div>

          <div className="flex flex-col mt-[6rem] items-center gap-6 overflow-hidden overflow-y-scroll hide-scrollbar w-full h-screen ">
            {Array.from({ length: 20 }).map((_, i) => (
              <Card
                key={i}
                className={cn(
                  "flex gap-4 p-2 pl-6 pr-6 w-full justify-between max-w-[600px] items-center"
                )}
              >
                <div className="flex gap-4 items-center">
                  <img
                    className={cn(
                      "h-10 w-10 rounded-full",
                      showDetails == true ? "hidden" : ""
                    )}
                    src="https://i.pravatar.cc/300"
                  ></img>
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-[1.5rem] font-bold",
                        showDetails == true ? "text-[1rem]" : ""
                      )}
                    >
                      John Doe {i}
                    </span>
                    <div className="flex flex-col gap-2">
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
                  {i % 2 == 0 ? (
                    <>
                      <DialogTrigger asChild>
                        <Button
                          // onClick={() => onClickVersion(data)}
                          variant="outline"
                          className="flex gap-2 items-center "
                        >
                          {/* <Eye /> */}
                          <Lock />
                          Request Access
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Ask for Access</DialogTitle>
                          <DialogDescription>
                            You are about to request access to this user's info.
                          </DialogDescription>
                        </DialogHeader>
                        {/* <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              defaultValue="Pedro Duarte"
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Username
                            </Label>
                            <Input
                              id="username"
                              defaultValue="@peduarte"
                              className="col-span-3"
                            />
                          </div>
                        </div> */}
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              onClick={() => console.log("handling access")}
                              type="submit"
                            >
                              Request Access
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </>
                  ) : i % 3 == 0 ? (
                    <>
                      {" "}
                      <Button
                        onClick={() => onClick(data)}
                        variant="outline"
                        className="flex gap-2 items-center "
                      >
                        {/* <Eye /> */}
                        <ShieldEllipsis />
                        Pending Access
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => handleShowDetails(i)}
                      variant="outline"
                      className="flex gap-2 items-center "
                    >
                      {/* <Eye /> */}
                      {/* <ShieldEllipsis /> */}
                      <View color="#262e9c" />
                      Already Viewed
                    </Button>
                  )}
                  {/* <Button variant="outline">Verify</Button> */}
                </div>
              </Card>
            ))}
          </div>
        </div>
        {showDetails && (
          <>
            <div className="w-full pl-8 pr-8 h-full mt-[10rem] p-[4rem] border">
              <img
                className="h-[4rem] w-[4rem] rounded-full"
                src="https://i.pravatar.cc/300"
              ></img>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}

export default Dashboard;
