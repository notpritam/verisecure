import "./App.css";
import { Button } from "./components/ui/button";
import { Badge } from "@/components/ui/badge";

function App() {
  return (
    <div className="dark">
      <div className="dark min-w-screen items-center flex flex-col w-full min-h-screen">
        <header className="flex p-2 pl-8 pr-8 justify-between w-full items-center">
          <span className="text-[1.25rem] font-bold tracking-wide">
            AnonVerify
          </span>

          <Button>Get Started</Button>
        </header>

        <main className="flex min-h-[500px] w-[80%] items-center gap-[4rem]">
          <div className="flex flex-col gap-4">
            <Badge>Eth India 2023</Badge>
            <span className="text-[4rem] font-bold monster">
              Empower Your Identity, Safeguard Your Privacy with AnonVerify
            </span>
            <span className="opacity-80">
              Seamlessly Verify Documents Without Compromising Your
              Confidentiality
            </span>
          </div>
          <div>
            <img src=""></img>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
