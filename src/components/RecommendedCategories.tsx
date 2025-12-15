import { listings } from "@/data/listings";
import { useRef } from "react";

const recommendedCategories = [
  { id: "phones", name: "Mobile Phones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop" },
  { id: "trucks", name: "Trucks & Trailers", image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=200&h=200&fit=crop" },
  { id: "cars", name: "Cars", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200&h=200&fit=crop" },
  { id: "motorcycles", name: "Motorcycles & Scooters", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop" },
];

export const RecommendedCategories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="py-4 bg-foreground">
      <div className="container">
        <h2 className="text-base font-semibold text-card mb-3">Recommended for you</h2>
        <div 
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4"
        >
          {recommendedCategories.map((category) => (
            <button
              key={category.id}
              className="flex-shrink-0 group"
            >
              <div className="w-28 h-28 rounded-xl overflow-hidden mb-2">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="text-xs text-card font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
