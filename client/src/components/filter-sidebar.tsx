import { X, ChevronDown, ChevronUp, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useFilterStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const categories = [
  { id: "makeup", name: "آرایشی" },
  { id: "skincare", name: "مراقبت پوست" },
  { id: "haircare", name: "مراقبت مو" },
  { id: "fragrance", name: "عطر و ادکلن" },
  { id: "personal-care", name: "بهداشت شخصی" },
  { id: "tools", name: "ابزار و لوازم" },
  { id: "natural", name: "محصولات طبیعی" },
  { id: "bundles", name: "ست‌ها و بسته‌ها" },
];

const brands = [
  { id: "beauty-glow", name: "Beauty & Glow" },
  { id: "skin-pure", name: "Skin Pure" },
  { id: "luxe-couture", name: "Luxe Couture" },
  { id: "natures-best", name: "Nature's Best" },
  { id: "radiance-pro", name: "Radiance Pro" },
  { id: "organic-eden", name: "Organic Eden" },
  { id: "modern-essence", name: "Modern Essence" },
  { id: "classic-beauty", name: "Classic Beauty" },
  { id: "glow-science", name: "Glow Science" },
  { id: "eco-beauty", name: "Eco Beauty" },
];

const skinTypes = [
  { id: "normal", name: "معمولی" },
  { id: "dry", name: "خشک" },
  { id: "oily", name: "چرب" },
  { id: "combination", name: "مختلط" },
  { id: "sensitive", name: "حساس" },
];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-3">
        <span className="font-medium text-foreground">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

function FilterContent() {
  const {
    selectedCategories,
    selectedBrands,
    priceRange,
    minRating,
    isNew,
    toggleCategory,
    toggleBrand,
    setPriceRange,
    setMinRating,
    setIsNew,
    clearFilters,
  } = useFilterStore();

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 10000000 ||
    minRating > 0 ||
    isNew !== null;

  return (
    <div className="space-y-2">
      {/* Clear filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-destructive"
          onClick={clearFilters}
          data-testid="button-clear-filters"
        >
          <X className="h-4 w-4 ml-2" />
          پاک کردن فیلترها
        </Button>
      )}

      <Separator />

      {/* Categories */}
      <FilterSection title="دسته‌بندی">
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
                data-testid={`checkbox-category-${category.id}`}
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="text-sm cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Brands */}
      <FilterSection title="برند">
        <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={() => toggleBrand(brand.id)}
                data-testid={`checkbox-brand-${brand.id}`}
              />
              <Label
                htmlFor={`brand-${brand.id}`}
                className="text-sm cursor-pointer"
              >
                {brand.name}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Price Range */}
      <FilterSection title="محدوده قیمت">
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={10000000}
            min={0}
            step={100000}
            className="mb-4"
            data-testid="slider-price-range"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0])} تومان</span>
            <span>{formatPrice(priceRange[1])} تومان</span>
          </div>
        </div>
      </FilterSection>

      <Separator />

      {/* Rating */}
      <FilterSection title="امتیاز">
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(minRating === rating ? 0 : rating)}
              className={cn(
                "flex items-center gap-2 w-full p-2 rounded-md text-sm transition-colors",
                minRating === rating ? "bg-primary/10" : "hover:bg-muted"
              )}
              data-testid={`button-rating-${rating}`}
            >
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-4 w-4",
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
              <span className="text-muted-foreground">و بالاتر</span>
            </button>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Skin Type */}
      <FilterSection title="نوع پوست" defaultOpen={false}>
        <div className="space-y-2">
          {skinTypes.map((type) => (
            <div key={type.id} className="flex items-center gap-2">
              <Checkbox
                id={`skin-${type.id}`}
                data-testid={`checkbox-skin-${type.id}`}
              />
              <Label
                htmlFor={`skin-${type.id}`}
                className="text-sm cursor-pointer"
              >
                {type.name}
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* New Products */}
      <FilterSection title="سایر" defaultOpen={false}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="filter-new"
              checked={isNew === true}
              onCheckedChange={(checked) => setIsNew(checked ? true : null)}
              data-testid="checkbox-new-products"
            />
            <Label htmlFor="filter-new" className="text-sm cursor-pointer">
              فقط محصولات جدید
            </Label>
          </div>
        </div>
      </FilterSection>
    </div>
  );
}

// Desktop sidebar
export function FilterSidebar() {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 bg-card rounded-lg border border-border p-4">
        <h3 className="font-bold text-lg text-foreground mb-4">فیلترها</h3>
        <FilterContent />
      </div>
    </aside>
  );
}

// Mobile filter sheet
export function MobileFilterSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden" data-testid="button-mobile-filters">
          فیلترها
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>فیلترها</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <FilterContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}
