"use client";
import { FaBookmark } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const categoriesImg = [
  "https://saasaitools.com/images/icons/iconimg01.png",
  "https://saasaitools.com/images/icons/iconimg21.png",
  "https://saasaitools.com/images/icons/iconimg10.png",
  "https://saasaitools.com/images/icons/iconimg30.png",
  "https://saasaitools.com/images/icons/iconimg07.png",
  "https://saasaitools.com/images/icons/iconimg26.png",
  "https://saasaitools.com/images/icons/iconimg22.png",
  "https://saasaitools.com/images/icons/iconimg09.png",
];

const AiTools = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [aidata, setAidata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const fetchAiData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://best-aitool-backend.vercel.app/aitools"
      );
      const tools = res.data;

      const uniqueCategories = [
        { id: "All", label: "All" },
        ...Array.from(new Set(tools.map((tool) => tool.category))).map(
          (category) => ({
            id: category,
            label: category,
          })
        ),
      ];

      setCategories(uniqueCategories);
      setAidata(tools);

      // Load watchlist from localStorage
      const existingWatchlist =
        JSON.parse(localStorage.getItem("watchlist")) || [];
      setWatchlist(existingWatchlist.map((item) => item._id));
    } catch (err) {
      console.error("Error fetching AI tools:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    fetchFilteredTools(category);
  };

  const fetchFilteredTools = async (category) => {
    setLoading(true);
    try {
      const endpoint =
        category === "All"
          ? "https://best-aitool-backend.vercel.app/aitools"
          : `https://best-aitool-backend.vercel.app/aitools/filter?category=${encodeURIComponent(
              category
            )}`;
      const res = await axios.get(endpoint);
      setAidata(res.data);
    } catch (err) {
      console.error("Error fetching filtered tools:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = (tool) => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const isAlreadyAdded = watchlist.includes(tool._id);
    const updatedWatchlist = isAlreadyAdded
      ? watchlist.filter((id) => id !== tool._id)
      : [...watchlist, tool._id];

    setWatchlist(updatedWatchlist);

    const watchlistItems = aidata.filter((item) =>
      updatedWatchlist.includes(item._id)
    );
    localStorage.setItem("watchlist", JSON.stringify(watchlistItems));

    alert(
      isAlreadyAdded
        ? `${tool.productName} removed from Watchlist.`
        : `${tool.productName} added to Watchlist!`
    );
  };

  useEffect(() => {
    fetchAiData();
  }, []);

  return (
    <div className="px-8 py-16">
      <h2 className="text-white mb-6 text-5xl font-semibold">Explore</h2>
      <div className="flex flex-col md:flex-row justify-between w-full gap-5">
        {/* Sidebar */}
        <div className="w-full md:w-[25%] mb-6 md:mb-0 space-y-5">
          <div className="flex flex-col items-center bg-[#1D1B30] rounded-lg p-6">
            <div className="flex items-center justify-start gap-3 w-full">
              <img
                src="https://media.licdn.com/dms/image/D4D03AQGIa7MwsqqZJQ"
                alt="Creator"
                className="w-11 h-11 rounded-full"
              />
              <h3 className="text-lg font-bold text-white">Hey, I'm Vishal</h3>
            </div>
            <p className="text-[#fff] text-[17px] pt-3">
              I'm the founder of Best AI Tools, the directory for AI & SaaS
              tools – helping you stay ahead in SaaS & AI.
            </p>
            <a
              href="https://github.com/vishal11u"
              className="text-center py-2 w-full rounded-2xl text-[.9em] bg-indigo-500 text-white font-medium mt-3"
            >
              Follow me on Github
            </a>
          </div>
          <div className="flex flex-col items-cente bg-[#1D1B30] rounded-lg p-6">
            <h3 className="text-sm font-bold text-white">Categories</h3>
            <nav className="mt-0 bg-[#1D1B30] rounded-lg pt-2">
              <ul className="space-y-2">
                {categories.map((category, i) => (
                  <li
                    key={category.id}
                    className={`flex items-center px-2 py-2 w-full rounded-3xl gap-3 hover:bg-[#242730] cursor-pointer ${
                      activeCategory === category.id ? "bg-[#242730]" : ""
                    }`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    <img src={categoriesImg[i]} alt={i} className="h-8 w-8" />
                    <span className="text-white">{category.label}</span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full md:w-[80%]">
          {loading ? (
            <p className="text-white text-center flex items-center justify-center">
              Loading...
            </p>
          ) : aidata.length > 0 ? (
            aidata.map((tool) => (
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
                <div className="float-right">
                  <FaBookmark
                    className={`text-xl cursor-pointer ${
                      watchlist.includes(tool._id)
                        ? "text-indigo-400"
                        : "text-white"
                    }`}
                    onClick={() => handleAddToWatchlist(tool)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center">
              No tools available in this category.
            </p>
          )}
        </div>
      </div>
      <div className="text-white text-center pt-20">
        <h2 className="text-[60px] font-semibold">Best AI Tools in 2024</h2>
        <h3 className="text-[20px]">It helps to you make works to esier</h3>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <iframe
          width="90%"
          height="80%"
          src="https://www.youtube.com/embed/-Aw37UyTK7w"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default AiTools;
