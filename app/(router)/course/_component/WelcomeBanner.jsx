import Image from "next/image";
import React from "react";

function WelcomeBanner() {
  return (
    <div className="flex items-center gap-5 bg-white rounded-lg p-2">
      <Image src="/panda.png" alt="panda" height={100} width={100} />
      <div className="">
        <h2 className="font-semibold text-[29px]">
          Welcome to <span className="text-primary">PandaGuruji</span> Academy
        </h2>
        <h2 className="font-medium text-gray-500">
          Explore, and Learn Diffrent types of Projects.
        </h2>
      </div>
    </div>
  );
}

export default WelcomeBanner;
