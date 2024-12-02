"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const ToolDetails = () => {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchToolDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/aitools/getbyId/${id}`
        );
        setTool(res.data);
      } catch (err) {
        console.error("Error fetching tool details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchToolDetails();
    }
  }, [id]);

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  if (!tool) {
    return <p className="text-white text-center">Tool not found.</p>;
  }

  return (
    <div className="px-[10%] py-16 text-white">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6 gap-x-2">
        <span className="text-gray-100 mr-2">Home</span> /{" "}
        <span className="text-gray-100 mr-2">Listing</span> /{" "}
        <span className="font-semibold">{tool.productName}</span>
      </nav>

      {/* Title and Tagline */}
      <div className="bg-[#1D1B30] p-5 rounded-lg">
        <h1 className="text-4xl font-bold mb-2">{tool.productName}</h1>
        <p className="text-lg italic text-gray-300">{tool.tagline}</p>

        {/* Pricing and Created Date */}
        <div className="flex items-center justify-between text-lg font-semibold text-indigo-500 mb-6">
          <span>{tool.pricing}</span>
          <span className="text-gray-400 text-[14px]">
            Publish on: {new Date(tool.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Full-width Image */}
        <img
          src={tool.imageUrl}
          alt={tool.productName}
          className="w-full object-cover rounded-lg mb-8"
        />

        {/* Description */}
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="text-gray-300 mb-8">{tool.description}</p>

        {/* Video Section */}
        {tool.videoUrl && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Video</h2>
            <iframe
              width="100%"
              height="400"
              src={tool.videoUrl.replace("watch?v=", "embed/")}
              title={tool.productName}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-4">How to Use :</h2>
        <p className="text-gray-300 mb-8">{tool.howToUse}</p>

        {/* Checkout Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Checkout</h2>
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium"
            onClick={() => window.open(tool.url, "_blank")}
          >
            {tool.productName}
          </button>
        </div>

        {/* Tags Section */}
        {tool.keyFeatures?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Tags</h2>
            <div className="flex gap-3 flex-wrap">
              {tool.keyFeatures.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-700 rounded-full text-sm font-medium text-gray-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolDetails;
