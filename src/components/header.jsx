import React from "react";
import { Button } from "./ui/button";
import { Upload, UserRoundCog, Wallet, Wallet2 } from "lucide-react";
import { Link, redirect, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const isUserLoggedIn = false;

  React.useEffect(() => {
    console.log(location.pathname, "we are at this url");

    if (location.pathname != "/" && isUserLoggedIn == false) {
      // redirect the user to login page to login or open wallet login popup
    } // prints the current path
  }, [location]);

  // also for to checking the authorization to where to redirect the user we can
  // declare that function here in header, this component is used in all the pages so it will bydefault check everytime it get renders
  return (
    <header className="flex border-white z-[999]  items-center border-b-2 pb-4 backdrop-blur-xl fixed top-0 left-0 right-0 pl-[4rem] pr-[4rem] p-4 dark justify-between">
      <div className="flex items-center justify-between w-full">
        <Link to={"/"}>
          <span className="text-[1.5rem] tracking-wide font-bold">
            AnonVerify
          </span>
        </Link>

        <div className="flex gap-4">
          {location.pathname === "/profile" ? (
            <>
              <Link to={"/profile?action=upload"}>
                <Button className="flex gap-2">
                  <Upload />
                  Upload Files
                </Button>
              </Link>
            </>
          ) : (
            ""
          )}

          {isUserLoggedIn ? (
            <>
              {" "}
              <Link to="/profile">
                <Button variant="outline" className="flex gap-2">
                  <UserRoundCog />
                  Your Profile
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  // handle login here
                }}
                className="flex gap-2"
              >
                <Wallet2 />
                Connect Wallet
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
