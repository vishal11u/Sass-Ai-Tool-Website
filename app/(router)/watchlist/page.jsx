"use client";
import React, { useState, useEffect } from "react";
import { FaBookmark, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Watchlist = () => {
  const router = useRouter();
  const [watchlist, setWatchlist] = useState([]);

  // Fetch watchlist from localStorage on component mount
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  // Remove a tool from the watchlist
  const handleRemoveFromWatchlist = (toolId) => {
    const updatedWatchlist = watchlist.filter((tool) => tool._id !== toolId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    alert("Tool removed from Watchlist.");
  };

  return (
    <div className="px-8 py-16">
      <h2 className="text-white mb-6 text-5xl font-semibold">Your Watchlist</h2>
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlist.map((tool) => (
            <div
              key={tool._id}
              className="bg-[#1D1B30] rounded-lg p-4 relative"
            >
              <div
                className="relative cursor-pointer"
                onClick={() => router.push(`/tool-details/${tool._id}`)}
              >
                <div className="overflow-hidden h-44 rounded-md">
                  <img
                    src={tool.imageUrl}
                    alt={tool.productName}
                    className="w-full object-cover transition-all ease-in-out duration-200 hover:scale-[1.05] rounded-md mb-4"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mt-4">
                  {tool.productName}
                </h3>
                <p className="text-sm text-[#a0a0a0] mb-2">{tool.category}</p>
                <p className="text-[#fff] text-[15px] bg-indigo-600 px-4 py-0.5 rounded font-medium mt-2 absolute top-0.5 left-2">
                  {tool.pricing}
                </p>
              </div>
              <div className="float-right -mt-8">
                <FaTrash
                  className="text-red-500 text-xl cursor-pointer hover:text-red-400"
                  onClick={() => handleRemoveFromWatchlist(tool._id)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white text-center">
          Your watchlist is currently empty.
        </p>
      )}
    </div>
  );
};

export default Watchlist;
