import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/categories";

interface SearchFiltersProps {
  filters: {
    category: string;
    minPrice: string;
    maxPrice: string;
    location: string;
    condition: string;
  };
  onFiltersChange: (filters: SearchFiltersProps['filters']) => void;
  onClear: () => void;
}

const conditions = [
  "Brand New",
  "Foreign Used",
  "Local Used",
  "Ugandan Used",
  "Refurbished",
];

const locations = [
  "Kampala",
  "Mukono",
  "Wakiso",
  "Entebbe",
  "Jinja",
  "Mbarara",
  "Gulu",
];

export const SearchFilters = ({ filters, onFiltersChange, onClear }: SearchFiltersProps) => {
  const [open, setOpen] = useState(false);

  const hasFilters = Object.values(filters).some(v => v !== "");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {hasFilters && (
            <span className="w-2 h-2 bg-primary rounded-full" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Filter Results</SheetTitle>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={onClear} className="text-destructive">
              <X className="w-4 h-4 mr-1" />
              Clear all
            </Button>
          )}
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Category */}
          <div>
            <Label>Category</Label>
            <Select
              value={filters.category}
              onValueChange={(value) => onFiltersChange({ ...filters, category: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <Label>Price Range (USh)</Label>
            <div className="flex gap-2 mt-1">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => onFiltersChange({ ...filters, minPrice: e.target.value })}
              />
              <span className="flex items-center text-muted-foreground">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => onFiltersChange({ ...filters, maxPrice: e.target.value })}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <Label>Location</Label>
            <Select
              value={filters.location}
              onValueChange={(value) => onFiltersChange({ ...filters, location: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Condition */}
          <div>
            <Label>Condition</Label>
            <Select
              value={filters.condition}
              onValueChange={(value) => onFiltersChange({ ...filters, condition: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All conditions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All conditions</SelectItem>
                {conditions.map((cond) => (
                  <SelectItem key={cond} value={cond}>
                    {cond}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full" 
            size="lg"
            onClick={() => setOpen(false)}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
