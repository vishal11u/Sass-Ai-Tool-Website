"use client";
import React, { useState } from "react";
import Robot from "../../../public/robot.png";
import Mask from "../../../public/japan.png";
import Bag from "../../../public/case.png";
import bell from "../../../public/reception-bell.png";
import Music from "../../../public/love-songs.png";

const AiTools = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    {
      id: "All",
      label: "All",
      icon: "https://saasaitools.com/images/icons/iconimg01.png",
    },
    {
      id: "AI-Detectors",
      label: "AI Detectors",
      icon: "https://saasaitools.com/images/icons/iconimg02.png",
    },
    {
      id: "Audio-Voice",
      label: "Audio & Voice",
      icon: "https://saasaitools.com/images/icons/iconimg03.png",
    },
    {
      id: "Avatars-Profile-Pics",
      label: "Avatars & Profile Pics",
      icon: "https://saasaitools.com/images/icons/iconimg04.png",
    },
    {
      id: "Business",
      label: "Business",
      icon: "https://saasaitools.com/images/icons/iconimg05.png",
    },
  ];

  const tools = [
    {
      id: "Dashworks",
      title: "Dashworks",
      description: "AI that answers all your team's questions",
      likes: 2,
    },
    {
      id: "QA.tech",
      title: "QA.tech",
      description: "AI-powered E2E testing for faster bug detection",
      likes: 3,
    },
    {
      id: "Syntetica",
      title: "Syntetica",
      description:
        "Streamline your workflow with intelligent content generation",
      likes: 4,
    },
    {
      id: "Girlfriendly.ai",
      title: "Girlfriendly.ai",
      description: "Unfiltered AI roleplay with 38,000+ unique characters",
      likes: 3,
    },
  ];

  const filteredTools =
    activeCategory === "All"
      ? tools
      : tools.filter((tool) =>
          categories.find((cat) => cat.id === activeCategory)
        );

  return (
    <div className="px-8 py-16">
      <h2 className="text-white mb-6 text-5xl font-semibold">Explore</h2>
      <div className="flex flex-col md:flex-row justify-between w-full  gap-5">
        <div className=" w-full md:w-[25%] mb-6 md:mb-0">
          <div className="flex flex-col items-center bg-[#1D1B30] rounded-lg p-6">
            <div className="flex items-center justify-start gap-3 w-full">
              <img
                src="https://saasaitools.com/wp-content/uploads/2024/11/facebook_profile_2024.webp"
                alt="Creator"
                className="w-11 h-11 rounded-full"
              />
              <h3 className="text-lg font-bold text-white">
                Hey, I'm Bren Kinfa
              </h3>
            </div>
            <p className="text-[#fff] text-[17px] pt-3">
              I'm the founder of SaaS AI Tools, the directory for AI & SaaS
              tools – helping YOU stay ahead in SaaS & AI. Follow my journey and
              get notified when I release new resources and updates.
            </p>
            <button className="text-center py-2 w-full rounded-2xl text-[.9em] bg-indigo-500 text-white font-medium mt-3">
              Follow me on X
            </button>
          </div>
          <nav className="mt-6 bg-[#1D1B30] rounded-lg p-6">
            <ul className="space-y-2">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className={`flex items-center px-2 py-2 rounded-3xl gap-3 hover:bg-[#242730] cursor-pointer ${
                    activeCategory === category.id ? "bg-[#242730] " : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <img
                    src={category.icon}
                    alt={category.label}
                    className="h-8 w-8"
                  />
                  <span className="text-white">{category.label}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full md:w-[80%]">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="bg-[#1D1B30] rounded-lg p-6">
              <h3 className="text-lg font-bold text-white">{tool.title}</h3>
              <p className="text-[#a0a0a0] text-sm">{tool.description}</p>
              <div className="flex items-center mt-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 text-[#a0a0a0]"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="#A0A0A0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V16"
                    stroke="#A0A0A0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12H16"
                    stroke="#A0A0A0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-white">{tool.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AiTools;
