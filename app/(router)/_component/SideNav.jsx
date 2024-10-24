import { BadgeIcon, BookOpen, GraduationCap } from "lucide-react";
import Image from "next/image";
import React from "react";

function SideNav() {
  const menu = [
    {
      id: 1,
      label: "All Courses",
      icon: BookOpen,
    },
    {
      id: 2,
      label: "Membership",
      icon: BadgeIcon,
    },
    {
      id: 3,
      label: "Be Instructor",
      icon: GraduationCap,
    },
  ];

  return (
    <div className="p-5 bg-white shadow-sm border h-screen">
      <div className="py-2 mb-4">
        <Image
          className="dark:invert mx-auto"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={110}
          height={38}
          priority
        />
      </div>
      <hr className="my-4 border"></hr>
      {menu.map((item, index) => (
        <div className="group flex items-center gap-x-3 mt-2 p-3 text-[20px] cursor-pointer text-gray-600 transition-all ease-in-out duration-200 hover:bg-primary hover:text-white hover:rounded-xl">
          <item.icon className="group-hover:animate-bounce" />
          <h1>{item.label}</h1>
        </div>
      ))}
    </div>
  );
}

export default SideNav;
