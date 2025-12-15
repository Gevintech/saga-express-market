import { Check } from "lucide-react";
import { formatPrice } from "@/data/listings";

export interface PromotionOption {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  isPopular?: boolean;
}

const promotionOptions: PromotionOption[] = [
  {
    id: "none",
    name: "No promo",
    description: "Standard listing",
    price: 0,
    duration: "free",
  },
  {
    id: "top-7",
    name: "TOP promo",
    description: "7 days on top",
    price: 10000,
    duration: "7 days",
    isPopular: true,
  },
  {
    id: "top-30",
    name: "TOP promo",
    description: "30 days on top",
    price: 35000,
    duration: "30 days",
  },
  {
    id: "boost",
    name: "Boost Premium promo",
    description: "Maximum visibility for 28 days",
    price: 140799,
    duration: "1 month (28 days)",
  },
];

interface PromotionSelectorProps {
  selectedPromotion: string;
  onSelect: (promotionId: string) => void;
}

export const PromotionSelector = ({ selectedPromotion, onSelect }: PromotionSelectorProps) => {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="font-medium">Promote your ad</h3>
        <p className="text-sm text-primary">Choose a promotion type for your ad to post it</p>
      </div>

      <div className="space-y-3">
        {promotionOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              selectedPromotion === option.id
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{option.name}</span>
                  {option.isPopular && (
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                {option.id !== "none" && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {option.duration}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${option.price === 0 ? "text-muted-foreground" : "text-foreground"}`}>
                  {option.price === 0 ? "free" : formatPrice(option.price, "USh")}
                </span>
                {selectedPromotion === option.id && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export { promotionOptions };
