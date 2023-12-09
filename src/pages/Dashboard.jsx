import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, Search, Upload, UserRoundCog, Wallet } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWallet } from "./WalletAddressContext";

function Dashboard() {
  const [showDetails, setShowDetails] = useState(false);

  const { walletAddress, setWalletAddress } = useWallet();
  const handleShowDetails = (id) => {
    setShowDetails(true);
  };

  const disconnectWalletHandler = () => {
    setWalletAddress(null); // Clear the wallet address from the context
  };

  return (
    <>
      <img src=""></img>
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
              {walletAddress ? (
                <>
                  <span>Connected Wallet: {walletAddress}</span>
                  <Button
                    onClick={disconnectWalletHandler}
                    variant="outline"
                    className="flex gap-2"
                  >
                    <UserRoundCog />
                    Disconnect Wallet
                  </Button>
                </>
              ) : (
                <Link to="/">
                  <Button variant="outline" className="flex gap-2">
                    Connect Wallet
                  </Button>
                </Link>
              )}
            </Link>
          </div>
        </div>
      </header>
      <div className="min-h-screen  h-screen w-screen overflow-x-hidden flex items-center gap-[4rem]  justify-center min-w-screen">
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
              <>
                <Card
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
                      <span className="text-[0.8rem] opacity-80">
                        0x1234567890
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleShowDetails(i)}
                      variant="outline"
                      className="flex gap-2 items-center "
                    >
                      <Eye />
                      View Files
                    </Button>
                    {/* <Button variant="outline">Verify</Button> */}
                  </div>
                </Card>
              </>
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
    </>
  );
}

export default Dashboard;
