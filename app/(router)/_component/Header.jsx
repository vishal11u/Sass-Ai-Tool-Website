"use client";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Logo from "../../../public/favicon.png";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/reduxAuth/slice/AuthSlice";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsClient(true);
  }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSearch = useCallback(
    (e) => {
      if (e.key === "Enter" && searchQuery.trim()) {
        router.push(`/search?query=${searchQuery.trim()}`);
      }
    },
    [searchQuery]
  );

  return (
    <header className="bg-[#0C0A20] py-5 px-10 sticky z-50 left-0 top-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center text-white gap-x-2">
            <Image
              className="h-10 w-auto"
              src={Logo}
              alt="SaaS AI Tools Logo"
            />
            <h3 className="text-[22px] font-semibold">
              Best <span className="text-indigo-500">AI</span> Tools
            </h3>
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
          <a className="font-medium text-[15px] text-white" href="/">
            Explore
          </a>
          <a
            className="font-medium text-[15px] text-white"
            href={isLoggedIn && isClient ? "/listing" : "/login"}
          >
            + Submit
          </a>
          {isClient && !isLoggedIn ? (
            <div className="flex items-center gap-x-3">
              <a
                href="/login"
                className="hover:bg-indigo-600 bg-gray-600 text-white rounded-3xl py-1.5 px-5 text-[16px]"
              >
                Login
              </a>
              <a
                href="/signup"
                className="hover:bg-gray-700 bg-indigo-600 text-white rounded-3xl py-1.5 px-5 text-[16px]"
              >
                Sign Up
              </a>
            </div>
          ) : null}
          {isClient && isLoggedIn && (
            <div className="relative border px-3 py-0.5 rounded-md">
              <button
                className="text-white font-medium text-[14px]"
                onClick={toggleDropdown}
              >
                {user.role} ▼
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                  {user.role === "superAdmin" && isLoggedIn && (
                    <a
                      href="https://bestaitools-dashboard.vercel.app/"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
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
            href={isLoggedIn && isClient ? "/listing" : "/login"}
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
          {isClient && !isLoggedIn ? (
            <>
              <a
                href="/login"
                className="hover:bg-indigo-600 bg-gray-600 text-white rounded-3xl py-1.5 px-5 text-[16px]"
              >
                Login
              </a>
              <a
                href="/signup"
                className="hover:bg-gray-700 bg-indigo-600 text-white rounded-3xl py-1.5 px-5 text-[16px]"
              >
                Sign Up
              </a>
            </>
          ) : null}
        </div>
      </div>

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
