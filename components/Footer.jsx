"use client";
import React, { useState } from "react";
import Logo from "../public/favicon.png";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

const footerData = {
  categories: [
    "Best AI Writing Tools",
    "Best AI Social Media Tools",
    "Best AI Research Tools",
    "Best AI Logo Design Tools",
    "Best AI Music Tools",
    "Best AI Studying Tools",
    "Best AI Image Editing Tools",
    "Best AI Image Generating Tools",
    "Best AI Design Tools",
    "Best AI Development Tools",
    "Best AI Chatbot Tools",
    "Best AI Email Tools",
    "Best AI Avatar Tools",
  ],
  resources: [
    "AI SaaS Blog",
    "AI Tool Directories",
    "AI Tips & Use Cases",
    "AI Forums",
  ],
  contact: ["Contact us"],
};

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/contact/submit",
        {
          name,
          email,
          mobile,
          country,
        }
      );

      if (response.status === 200) {
        router.refresh("/");
      }
    } catch (err) {
      setError("Error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0C0A20] text-white py-8 px-14">
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between pb-5">
        <Link href="/" className="flex items-center text-white gap-x-2">
          <Image className="h-10 w-auto" src={Logo} alt="SaaS AI Tools Logo" />
          <h3 className="text-[22px] font-semibold">
            Best <span className="text-indigo-500">AI</span> Tools
          </h3>
        </Link>
        <div className="bg-[#e7ab6b21] backdrop-blur-sm px-6 py-2 rounded-xl flex items-center space-x-2">
          <span className="text-yellow-400 text-3xl">🏆</span>
          <span className="font-medium flex flex-col">
            <span className="text-[9px]">PRODUCT HUNT</span>
            #1 Product of the Day
          </span>
        </div>
      </div>
      <div className="grid grid-cols-0 md:grid-cols-2 gap-8 border-t-2 border-[#282369] pt-8">
        <div className="grid grid-cols-3">
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center space-x-2">
              <span>Categories</span>
            </h3>
            <ul className="space-y-4">
              {footerData.categories.map((category, index) => (
                <li
                  key={index}
                  className="text-gray-400 hover:text-white text-[13px] cursor-default"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-4">
              {footerData.resources.map((resource, index) => (
                <li
                  key={index}
                  className="text-gray-400 hover:text-white text-[13px] cursor-default"
                >
                  {resource}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-4">
              {footerData.contact.map((contactItem, index) => (
                <li
                  key={index}
                  className="text-gray-400 hover:text-white text-[13px] cursor-pointer"
                >
                  {contactItem}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-[#749cf429] md:h-[93%] w-[93%] p-10 rounded-2xl">
          <h4 className="font-bold text-xl mb-4">Join 15,000+ solopreneurs</h4>
          <p className="text-gray-400 text-xl mb-4">
            Hey, I’m <strong className="text-white">Vishal 👋</strong>. I’m the
            founder of Best AI Tools, the directory for AI & SaaS tools –
            helping YOU stay ahead in SaaS & AI. Follow my journey and get
            notified when I release new resources and updates.
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex gap-4 md:gap-0 flex-col md:flex-row md:space-x-2">
              <input
                type="text"
                placeholder="Enter your first name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-4 py-4 bg-gray-800 text-white rounded-md focus:outline-none"
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-4 bg-gray-800 text-white rounded-md focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:space-x-2">
              <input
                type="tel"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="flex-1 px-4 py-4 bg-gray-800 text-white rounded-md focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Enter your Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="flex-1 px-4 py-4 bg-gray-800 text-white rounded-md focus:outline-none"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 py-4 text-white rounded-3xl font-medium"
            >
              {loading ? "Submitting..." : "Get Exclusive Insights & Resources"}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-sm flex justify-center items-center">
        <p className="text-gray-400">
          Copyright © 2024 Best AI Tools. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
