"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchResult() {
  const [aidata, setAidata] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const router = useRouter();

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://best-aitool-backend.vercel.app/aitools/search?query=${query}`
          );
          const data = await response.json();
          setAidata(data.results);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [query]);

  return (
    <div className="px-10 py-16">
      <h2 className="text-white text-[38px] font-bold pb-5">
        Search results for "{query}"
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full w-full">
        {loading ? (
          <p className="text-white text-center flex items-center justify-center">
            Loading...
          </p>
        ) : aidata.length > 0 ? (
          aidata.map((tool) => (
            <div
              key={tool._id}
              onClick={() => router.push(`/tool-details/${tool._id}`)}
              className="bg-[#1D1B30] rounded-lg p-4 relative"
            >
              <div className="overflow-hidden h-44 rounded-md mb-4">
                <img
                  src={tool.imageUrl}
                  alt={tool.productName}
                  className="w-full object-cover transition-all ease-in-out duration-200 hover:scale-[1.05] rounded-md mb-4"
                />
              </div>
              <h3 className="text-lg font-bold text-white">
                {tool.productName}
              </h3>
              <p className="text-sm text-[#a0a0a0] mb-2">{tool.category}</p>
              <p className="text-[#fff] text-[15px] bg-indigo-600 px-4 py-0.5 rounded font-medium mt-2 absolute top-4 left-6">
                {tool.pricing}
              </p>
            </div>
          ))
        ) : (
          <p className="text-white text-center">
            No tools found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
