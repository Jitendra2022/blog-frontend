import { useState } from "react";
import Hero from "../components/Hero";
import RecentPost from "../components/RecentPost";
import NewsletterSection from "../components/NewsletterSection";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <Hero
        onSearch={(q) => setSearchQuery(q)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />
      <RecentPost
        searchQuery={searchQuery}
        activeCategory={selectedCategory}
      />
      <NewsletterSection />
    </>
  );
};

export default Home;
