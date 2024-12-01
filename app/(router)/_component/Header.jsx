"use client";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../../public/assets/saasaitoolslogo.png";
import { useRouter } from "next/navigation";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?query=${searchQuery.trim()}`);
    }
  };

  return (
    <header className="bg-[#0C0A20] py-5 px-10 sticky z-50 left-0 top-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image
              className="h-10 w-auto"
              src={Logo}
              alt="SaaS AI Tools Logo"
            />
          </Link>
        </div>

        <div className="hidden lg:flex items-center py-2 px-4 w-[30%] bg-[#749cf429] rounded-xl text-black gap-2">
          <Search className="h-5 w-5 text-indigo-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search..."
            className="bg-transparent text-white outline-none w-full"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <a className="font-medium text-white" href="/">
            Explore
          </a>
          <Link className="font-medium text-white" href="/submit">
            + Submit
          </Link>
          <Button className="hover:bg-indigo-600 bg-gray-600 rounded-3xl text-[16px]">
            Login
          </Button>
          <Button className="hover:bg-gray-700 bg-indigo-600 rounded-3xl text-[16px]">
            Sign Up
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white">
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-sm bg-black p-6 z-40 transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="flex flex-col gap-6 mt-12">
          <div className="flex items-center p-2 w-full rounded-xl bg-[#a4a0ee] gap-2">
            <Search className="h-5 w-5 text-indigo-800" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search..."
              className="bg-[#a4a0ee] text-black outline-none w-full"
            />
          </div>
          <Link
            className="font-medium text-white"
            href="/course"
            onClick={toggleMenu}
          >
            Explore
          </Link>
          <Link
            className="font-medium text-white"
            href="/submit"
            onClick={toggleMenu}
          >
            + Submit
          </Link>
          <Link
            className="font-medium text-white"
            href="/contact"
            onClick={toggleMenu}
          >
            Contact Us
          </Link>
          <Button className="hover:bg-indigo-600 bg-gray-600 rounded-3xl text-[16px] w-full">
            Login
          </Button>
          <Button className="hover:bg-gray-700 rounded-3xl text-[16px] w-full">
            Sign Up
          </Button>
        </div>
      </div>

      {/* Overlay for mobile menu when it's open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
}

export default Header;
