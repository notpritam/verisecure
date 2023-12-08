import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div>
      <Header />
      <div className="min-h-screen min-w-screen flex items-center justify-center">
        <Card className="flex flex-col gap-4 p-4 min-w-[300px] min-h-[200px] items-center justify-center ">
          <span className="text-[2rem] quest">Page404</span>
          <Link to="/">
            <Button>Go to Home</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}

export default Page404;
