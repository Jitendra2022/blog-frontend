import React, { useState } from "react";
import { FaSearch, FaArrowRight, FaBookOpen, FaUsers } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const Hero = ({ onSearch, selectedCategory, onSelectCategory }) => {
  const [query, setQuery] = useState("");

  const categories = [
    "All Topics",
    "Web Dev",
    "Artificial Intelligence",
    "UI/UX Architecture",
    "Cloud & DevOps",
    "Career & Culture",
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
    const feedElement = document.getElementById("recent-posts");
    if (feedElement) {
      feedElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoryClick = (cat) => {
    if (onSelectCategory) {
      onSelectCategory(cat === "All Topics" ? "" : cat);
    }
    const feedElement = document.getElementById("recent-posts");
    if (feedElement) {
      feedElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Ambient background glows */}
      <div className="ambient-glow-indigo -top-24 -left-20 opacity-70" />
      <div className="ambient-glow-purple top-1/3 -right-20 opacity-60" />
      <div className="ambient-glow-cyan -bottom-20 left-1/3 opacity-40" />

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Trending pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-indigo-500/30 text-indigo-300 text-xs font-medium mb-8 hover:border-indigo-400/60 transition shadow-lg shadow-indigo-500/10 cursor-pointer">
          <HiSparkles className="text-amber-400 animate-pulse text-sm" />
          <span className="font-semibold text-white">New Edition:</span>
          <span>Next-Gen Engineering & Interactive Web Design</span>
          <FaArrowRight className="text-[10px] text-indigo-400" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
          Where <span className="shimmer-text">Ideas</span> Spark <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Transformative
          </span> Stories.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          A publication exploring high-performance web systems, intuitive interfaces, and software craft. Written for creators, architects, and thinkers.
        </p>

        {/* Interactive Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex items-center p-2 rounded-2xl glass-panel border border-slate-700/80 shadow-2xl shadow-indigo-950/50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all duration-300"
          >
            <div className="pl-4 text-slate-400">
              <FaSearch size={16} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (onSearch) onSearch(e.target.value);
              }}
              placeholder="Search articles by title, topic, or keyword..."
              className="w-full bg-transparent px-4 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Explore</span>
              <FaArrowRight size={10} />
            </button>
          </form>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 max-w-3xl mx-auto mb-16">
          <span className="text-xs text-slate-300 mr-1 hidden sm:inline font-medium">
            Popular:
          </span>
          {categories.map((category) => {
            const isSelected =
              (category === "All Topics" && !selectedCategory) ||
              selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-105"
                    : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Interactive Highlight Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-2xl glass-card text-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              1,200+
            </div>
            <p className="text-xs text-slate-400 mt-1">Articles Published</p>
          </div>
          <div className="p-4 rounded-2xl glass-card text-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              48,000+
            </div>
            <p className="text-xs text-slate-400 mt-1">Monthly Readers</p>
          </div>
          <div className="p-4 rounded-2xl glass-card text-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              99.8%
            </div>
            <p className="text-xs text-slate-400 mt-1">Positive Feedback</p>
          </div>
          <div className="p-4 rounded-2xl glass-card text-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              100%
            </div>
            <p className="text-xs text-slate-400 mt-1">Free Knowledge</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
