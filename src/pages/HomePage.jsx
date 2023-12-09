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
function HomePage() {
  // return (
  //   <>
  //     <Header />
  //     <div className="min-w-screen min-h-screen w-full h-full flex items-center">
  //       <img
  //         src="https://wallpaperaccess.com/full/1155017.jpg"
  //         className="absolute top-0 right-0 left-0 bottom-0 blur-[300px]"
  //       ></img>
  //       <div className="justify-center z-10 w-[80%] flex flex-col items-start text-left gap-2">
  //         <Badge>
  //           <img className="h-6 pl-2 pr-2" src={ethLogo}></img>
  //         </Badge>
  //         <span className="monster text-[4rem] font-bold">
  //           Empower Your Identity, Safeguard Your Privacy with AnonVerify
  //         </span>
  //         <span className="opacity-80">
  //           Seamlessly Verify Documents Without Compromising Your
  //           Confidentiality
  //         </span>
  //         <div className="mt-[2rem] flex gap-4">
  //           <Button className="flex gap-2">
  //             <Wallet />
  //             Connect Wallet
  //           </Button>
  //           <Button className="flex gap-2" variant="outline">
  //             <Github />
  //             View on Github
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
  const [provider, setProvider] = useState();
  const { walletAddress, setWalletAddress } = useWallet();

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setWalletAddress(account); // Set the wallet address in the global state

        // Get provider from Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        // Set signer
        const signer = provider.getSigner();
        window.location.href = `/dashboard`; // Redirect to dashboard without the address in URL
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnectWalletHandler = async () => {
    window.location.reload();
  }

  return (
    <>
      <Header />
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
              <Button className="flex gap-2" onClick={connectWalletHandler}>
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
        </div>
      </div>
    </>
  );
}

export default HomePage;
