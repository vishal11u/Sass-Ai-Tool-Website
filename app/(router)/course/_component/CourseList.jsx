"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const LogoItem = ({ src, alt }) => (
  <motion.div
    className="w-28 h-2w-28 rounded-xl bg-gray-800/50 p-2 mx-3 flex items-center justify-center"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <img
      src={src}
      alt={alt}
      className="w-full rounded-md h-full object-contain"
    />
  </motion.div>
);

const MovingLogosRow = ({ direction = "left", className = "" }) => {
  const logos = [
    {
      src: "data:image/png;base64,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",
      alt: "AI Tool 1",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkwguzKZv5vwJ0B79_KQtB9_u0MQt18FHfkQ&s",
      alt: "AI Tool 2",
    },
    {
      src: "https://play-lh.googleusercontent.com/q2QO-v3lVxaAnBPvS0JT9G4zoWFQTW6QQJOCt-EbawQiurq0B2vybZjXcJvJpGHyl0Bh",
      alt: "AI Tool 3",
    },
    {
      src: "https://saasaitools.com/wp-content/uploads/2024/10/637_frame.webp",
      alt: "AI Tool 4",
    },
    {
      src: "https://saasaitools.com/wp-content/uploads/2024/10/607_frame.webp",
      alt: "AI Tool 5",
    },
    {
      src: "https://saasaitools.com/wp-content/uploads/2024/10/603_frame.webp",
      alt: "AI Tool 6",
    },
    {
      src: "https://saasaitools.com/wp-content/uploads/2024/10/705_frame.webp",
      alt: "AI Tool 7",
    },
    {
      src: "https://saasaitools.com/wp-content/uploads/2024/10/642_frame.webp",
      alt: "AI Tool 8",
    },
    {
      src: "https://saasaitools.com/wp-content/uploads/2024/10/710_frame.webp",
      alt: "AI Tool 9",
    },
    {
      src: "https://saasaitools.com/wp-content/uploads/2024/10/407_frame.webp",
      alt: "AI Tool 10",
    },
    {
      src: "https://saasaitools.com/wp-content/uploads/2024/10/445_frame.webp",
      alt: "AI Tool 11",
    },
    {
      src: "https://saasaitools.com/wp-content/uploads/2024/10/663_frame.webp",
      alt: "AI Tool 12",
    },
    {
      src: "https://saasaitools.com/wp-content/uploads/2024/10/620_frame.webp",
      alt: "AI Tool 13",
    },
  ];

  return (
    <div className={`overflow-hidden w-full ${className}`}>
      <motion.div
        className="flex"
        animate={{
          x: direction === "left" ? [-1000, 0] : [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        <div className="flex space-x-7 px-4">
          {[...logos, ...logos].map((logo, index) => (
            <LogoItem key={index} {...logo} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0A20] text-white relative overflow-hidden">
      {/* Background logo rows */}
      <div className="absolute inset-0 flex top-36 bottom-36 w-full flex-col justify-between opacity-50">
        <MovingLogosRow direction="right" className="translate-y-16 w-full" />
        <MovingLogosRow direction="left" className="-translate-y-16 w-full" />
      </div>

      {/* Content overlay with gradient */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b  backdrop-blur-s">
        {/* Product Hunt Badge */}
        <div className="mb-12">
          <div className="bg-[#e7ab6b21] backdrop-blur-sm px-6 py-2 rounded-xl flex items-center space-x-2">
            <span className="text-yellow-400 text-3xl">🏆</span>
            <span className=" font-medium flex flex-col">
              <span className="text-[9px]">PRODUCT HUNT</span>
              #1 Product of the Day
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center px-4 py-">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover your next
            <span className="block text-blue-400">Generative AI tool</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Your source for new AI tools & daily AI news to help supercharge
            your creativity to the next level.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a
              href={isLoggedIn && isClient ? "/listing" : "/login"}
              className="bg-indigo-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium transition-colors text-lg"
            >
              Submit your AI tool
            </a>
            <button className="bg-gray-800/90 backdrop-blur-sm hover:bg-gray-700 text-white px-8 py-4 rounded-full font-medium transition-colors text-lg">
              Join our AI community
            </button>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <div className="flex justify-center mb-2">
            {"★★★★★".split("").map((star, i) => (
              <span key={i} className="text-yellow-400 text-xl">
                {star}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex -space-x-2">
              {[
                "https://saasaitools.com/wp-content/uploads/2024/08/sait_founders.webp",
              ].map((i) => (
                <img
                  key={i}
                  src={`${i}`}
                  alt={`Image ${i}`}
                  className="w-full h-8"
                />
              ))}
            </div>
            <p className="text-gray-300 ml-2">Loved by hundreds of founders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
