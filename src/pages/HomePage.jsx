import Header from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Wallet } from "lucide-react";
import React from "react";
import ethLogo from "../assets/ethIndia.svg";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  return (
    <>
      <Header />
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
            <Link to={"/dashboard"}>
              <Button className="flex gap-2">
                <Wallet />
                Connect Wallet
              </Button>
            </Link>
            <Button className="flex gap-2" variant="outline">
              <Github />
              View on Github
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full z-[999]  items-center justify-center flex flex-col">
        <span className="text-[4rem] font-bold monster">How it Works?</span>

        <div className="grid w-full max-w-[1280px] gap-4 grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card className="w-full ">
              <Avatar>
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
    </>
  );
}

export default HomePage;
