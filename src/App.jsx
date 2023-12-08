import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="min-w-screen min-h-screen">
        <header className="flex p-2 pl-8 pr-8">
          <span className="text-[1.25rem] font-bold tracking-wide">
            AnonVerify
          </span>

          <Button>Get Started</Button>
        </header>
      </div>
    </>
  );
}

export default App;
