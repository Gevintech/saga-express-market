import { categories } from "@/data/categories";
import { Link } from "react-router-dom";

export const CategoryGrid = () => {
  return (
    <div className="container py-4">
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const isPostAd = category.id === "post-ad";
          
          return (
            <Link
              key={category.id}
              to={isPostAd ? "/post-ad" : `/category/${category.id}`}
              className="flex flex-col items-center text-center group"
            >
              <div className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center mb-2 transition-transform group-hover:scale-105`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs text-foreground leading-tight line-clamp-2">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
