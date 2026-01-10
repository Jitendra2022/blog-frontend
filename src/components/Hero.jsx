import React from "react";

const Hero = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
          Discover articles, tutorials, and insights about web development,
          technology, and programming.
        </p>
      </div>
    </section>
  );
};

export default Hero;
