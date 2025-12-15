import { heroCards } from "@/data/categories";

export const HeroCards = () => {
  return (
    <div className="container py-4">
      <div className="grid grid-cols-3 gap-3">
        {heroCards.map((card) => (
          <button
            key={card.id}
            className={`${card.color} rounded-xl p-4 text-left transition-transform hover:scale-[1.02] active:scale-[0.98]`}
          >
            <span className="text-2xl mb-2 block">{card.icon}</span>
            <span className="text-sm font-medium text-foreground">{card.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
