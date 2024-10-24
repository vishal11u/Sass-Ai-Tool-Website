import { Button } from "@/components/ui/button";
import { BellDot, Search } from "lucide-react";
import React from "react";

function Header() {
  return (
    <div className="p-4 bg-white flex items-center justify-between">
      <div className="flex items-center border p-2 w-[30%] rounded-lg bg-[#f0f0f0] gap-2 overflow-hidden">
        <Search className="h-5 w-5"/>
        <input type="text" placeholder="Serch..." className="bg-transparent outline-none w-full" />
      </div>

      <div className="flex items-center gap-6">
        <BellDot/>
        <Button className="hover:bg-gray-700">Get Started</Button>
      </div>
    </div>
  );
}

export default Header;
