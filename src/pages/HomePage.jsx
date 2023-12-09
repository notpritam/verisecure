import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Wallet } from "lucide-react";
import React, { useState } from "react";
import ethLogo from "../assets/ethIndia.svg";
import { Link } from "react-router-dom";
import Web3 from 'web3';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useWallet } from '../pages/WalletAddressContext';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand'

function HomePage({ web3Handler, walletAddress, provider, contract }) {
  // const { walletAddress, setWalletAddress } = useWallet();
  console.log(walletAddress);
  // const navigate=useNavigate();
  const disconnectWalletHandler = async () => {
    window.location.reload();
  };

  return (
    <>
      <Header web3Handler={web3Handler} walletAddress={walletAddress} />
      {/* <div></div> */}
      <div className="min-w-screen justify-center p-[2rem] min-h-screen w-full max-w-[1280px] h-full flex items-center">
        <img
          src="https://www.getsims.com/wp-content/uploads/2020/12/gradient-background-02.jpg"
          className="absolute z-0 top-0 right-0 left-0 bottom-0 blur-[300px]"
        ></img>
        <div className="justify-center z-10 w-[80%] flex flex-col items-start text-left gap-2">
          <Badge>
            <img className="h-6 pl-2 pr-2" src={ethLogo}></img>
          </Badge>
          <span className="monster text-[4rem] font-bold">
            Empower Your Identity, Safeguard Your Privacy with AnonVerify
          </span>
          <span className="opacity-80">
            Seamlessly Verify Documents Without Compromising Your
            Confidentiality
          </span>
          <div className="mt-[2rem] flex gap-4">
            {/* <Link to={"/dashboard"}> */}
            {walletAddress ? (
              <>
                <span>Connected Wallet: {walletAddress}</span>
                <Button
                  className="flex gap-2"
                  onClick={disconnectWalletHandler}
                >
                  Disconnect Wallet
                </Button>
              </>
            ) : (
              <Button className="flex gap-2" onClick={web3Handler}>
                <Wallet />
                Connect Wallet
              </Button>
            )}
            {/* </Link> */}
            <Button className="flex gap-2" variant="outline">
              <Github />
              View on Github
            </Button>
          </div>
          <Link
            to={{
              pathname: "/dashboard",
            }}
          >
            Dashboard
          </Link>

          <Link
            to={{
              pathname: "/profile",
            }}
          >
            Profile
          </Link>
          {/* <button
            onClick={navigate('/dashboard', {
              state: {
                walletAddress,
                contract
              },
            })}
          >
            Dashboard
          </button> */}
        </div>
      </div>

      <div className="w-full z-[1] gap-4 lg:gap-[4rem]   relative items-center justify-center flex flex-col">
        <span className="lg:text-[3rem] font-bold monster">How it Works?</span>

        <div className="grid w-full max-w-[1280px] gap-4 grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card className="w-full flex flex-col items-start p-4 pt-12 pb-12 gap-4 ">
              <Avatar className="h-[4rem] w-[4rem]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-bold monster text-[1.25rem]">
                Ttile Goes Here
              </span>{" "}
              <span className="monster text-[1.25rem]">
                Descriptopn Goes Here
              </span>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-full z-[1] gap-4 lg:gap-[4rem] lg:mt-[4rem]   relative items-center justify-center flex flex-col">
        <span className="lg:text-[3rem] font-bold monster">
          Tech Stack Used
        </span>

        <div className="grid w-full max-w-[1280px]  lg:gap-8 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card className="w-full bg-transparent flex h-[100px] flex-col items-start rounded-lg overflow-clip gap-4 ">
              <img
                className="w-full h-full object-cover"
                src="https://d33wubrfki0l68.cloudfront.net/5cfdb87c57bf1f7799a3c2e509b8feacb1616467/dba9e/static/fb8aa1bb70c9925ce1ae22dc2711b343/31987/nextjs-logo.png"
              ></img>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-full z-[1] gap-4 lg:gap-[4rem]   relative items-center justify-center flex flex-col">
        <span className="lg:text-[3rem] font-bold monster">How it Works?</span>

        <div className="grid w-full max-w-[1280px] gap-4 grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card className="w-full flex flex-col items-start p-4 pt-12 pb-12 gap-4 ">
              <Avatar className="h-[4rem] w-[4rem]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-bold monster text-[1.25rem]">
                Ttile Goes Here
              </span>{" "}
              <span className="monster text-[1.25rem]">
                Descriptopn Goes Here
              </span>
            </Card>
          ))}
        </div>
      </div>

      <div className="w-full z-[1] gap-4 lg:gap-[4rem] lg:mt-[4rem]   relative items-center justify-center flex flex-col">
        <span className="lg:text-[3rem] font-bold monster">
          Tech Stack Used
        </span>

        <div className="grid w-full max-w-[1280px]  lg:gap-8 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card className="w-full bg-transparent flex h-[100px] flex-col items-start rounded-lg overflow-clip gap-4 ">
              <img
                className="w-full h-full object-cover"
                src="https://d33wubrfki0l68.cloudfront.net/5cfdb87c57bf1f7799a3c2e509b8feacb1616467/dba9e/static/fb8aa1bb70c9925ce1ae22dc2711b343/31987/nextjs-logo.png"
              ></img>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
