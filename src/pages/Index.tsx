import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroCards } from "@/components/HeroCards";
import { CategoryGrid } from "@/components/CategoryGrid";
import { RecommendedCategories } from "@/components/RecommendedCategories";
import { TrendingAds } from "@/components/TrendingAds";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} />
      <main>
        <HeroCards />
        <CategoryGrid />
        <RecommendedCategories />
        <TrendingAds searchQuery={searchQuery} />
      </main>
      <BottomNav />
    </div>
  );
};

export default Index;
