import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Wallet } from "lucide-react";
import React, { useState } from "react";
import ethLogo from "../assets/ethIndia.svg";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { useWallet } from "../pages/WalletAddressContext";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";

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
          src="https://wallpaperaccess.com/full/1155017.jpg"
          className="absolute top-0 right-0 left-0 bottom-0 blur-[300px]"
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
    </>
  );
}

export default HomePage;
