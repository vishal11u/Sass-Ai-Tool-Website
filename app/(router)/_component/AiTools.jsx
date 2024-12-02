"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const categoriesImg = [
  "https://saasaitools.com/images/icons/iconimg01.png",
  "https://saasaitools.com/images/icons/iconimg02.png",
  "https://saasaitools.com/images/icons/iconimg03.png",
  "https://saasaitools.com/images/icons/iconimg04.png",
  "https://saasaitools.com/images/icons/iconimg05.png",
];

const AiTools = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [aidata, setAidata] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAiData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/aitools");
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
    } catch (err) {
      console.error("Error fetching AI tools:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredTools = async (category) => {
    setLoading(true);
    try {
      const endpoint =
        category === "All"
          ? "http://localhost:5000/aitools"
          : `http://localhost:5000/aitools/filter?category=${encodeURIComponent(
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

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    fetchFilteredTools(category);
  };

  useEffect(() => {
    fetchAiData();
  }, []);

  return (
    <div className="px-8 py-16">
      <h2 className="text-white mb-6 text-5xl font-semibold">Explore</h2>
      <div className="flex flex-col md:flex-row justify-between w-full gap-5">
        {/* Sidebar with categories */}
        <div className="w-full md:w-[25%] mb-6 md:mb-0 space-y-5">
          <div className="flex flex-col items-center bg-[#1D1B30] rounded-lg p-6">
            <div className="flex items-center justify-start gap-3 w-full">
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQGIa7MwsqqZJQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728983298104?e=1738195200&v=beta&t=txPDE27cc-UQDl7SWqwVpcbec-Ln9rEb0TLlp9McEr4"
                alt="Creator"
                className="w-11 h-11 rounded-full"
              />
              <h3 className="text-lg font-bold text-white">Hey, I'm Vishal</h3>
            </div>
            <p className="text-[#fff] text-[17px] pt-3">
              I'm the founder of Best AI Tools, the directory for AI & SaaS
              tools – helping you stay ahead in SaaS & AI. Follow my journey and
              get notified when I release new resources and updates.
            </p>
            <button className="text-center py-2 w-full rounded-2xl text-[.9em] bg-indigo-500 text-white font-medium mt-3">
              Follow me on X
            </button>
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

        {/* Main content - Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full md:w-[80%]">
          {loading ? (
            <p className="text-white text-center flex items-center justify-center">
              Loading...
            </p>
          ) : aidata.length > 0 ? (
            aidata.map((tool) => (
              <div
                key={tool._id}
                onClick={() => router.push(`/tool-details/${tool._id}`)}
                className="bg-[#1D1B30] cursor-pointer rounded-lg p-4 relative"
              >
                <div className="overflow-hidden h-44 rounded-md">
                  <img
                    src={tool.imageUrl}
                    alt={tool.productName}
                    className="w-full  object-cover transition-all ease-in-out duration-200 hover:scale-[1.05] rounded-md mb-4"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mt-4">
                  {tool.productName}
                </h3>
                <p className="text-sm text-[#a0a0a0] mb-2">{tool.category}</p>
                {/* <p className="text-[#a0a0a0] text-sm">{tool.description}</p> */}
                <p className="text-[#fff] text-[15px] bg-indigo-600 px-4 py-0.5 rounded font-medium mt-2 absolute top-4 left-6">
                  {tool.pricing}
                </p>
              </div>
            ))
          ) : (
            <p className="text-white text-center">
              No tools available in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiTools;
