import { Github, Wallet } from "lucide-react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

function App() {
  return (
    <>
      <header className="flex z-[999] items-center border-b-2 pb-4 backdrop-blur-xl fixed top-0 left-0 right-0 pl-[4rem] pr-[4rem] p-4 dark justify-between">
        <div className="flex items-center justify-between w-full">
          <span className="text-[1.5rem] tracking-wide font-bold">
            AnonVerify
          </span>
          <Button className="flex gap-2">
            <Wallet />
            Connect Wallet
          </Button>
        </div>
      </header>

      <div className="min-w-screen min-h-screen w-full h-full flex items-center">
        <img
          src="https://wallpaperaccess.com/full/1155017.jpg"
          className="absolute top-0 right-0 left-0 bottom-0 blur-[300px]"
        ></img>
        <div className="justify-center z-10 w-[80%] flex flex-col items-start text-left gap-2">
          <Badge>Eth India 2023</Badge>
          <span className="monster text-[4rem] font-bold">
            Empower Your Identity, Safeguard Your Privacy with AnonVerify
          </span>
          <span className="opacity-80">
            Seamlessly Verify Documents Without Compromising Your
            Confidentiality
          </span>
          <div className="mt-[2rem] flex gap-4">
            <Button className="flex gap-2">
              <Wallet />
              Connect Wallet
            </Button>
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

export default App;
