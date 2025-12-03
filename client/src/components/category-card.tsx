import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  Palette, 
  Droplets, 
  Wind, 
  Flower2, 
  Heart, 
  Brush,
  Leaf,
  Gift
} from "lucide-react";

const categoryIcons: Record<string, typeof Palette> = {
  makeup: Palette,
  skincare: Droplets,
  haircare: Wind,
  fragrance: Flower2,
  "personal-care": Heart,
  tools: Brush,
  natural: Leaf,
  bundles: Gift,
};

const categoryColors: Record<string, string> = {
  makeup: "from-pink-500/20 to-rose-500/20 text-pink-600 dark:text-pink-400",
  skincare: "from-blue-500/20 to-cyan-500/20 text-blue-600 dark:text-blue-400",
  haircare: "from-purple-500/20 to-violet-500/20 text-purple-600 dark:text-purple-400",
  fragrance: "from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400",
  "personal-care": "from-red-500/20 to-pink-500/20 text-red-600 dark:text-red-400",
  tools: "from-fuchsia-500/20 to-purple-500/20 text-fuchsia-600 dark:text-fuchsia-400",
  natural: "from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400",
  bundles: "from-orange-500/20 to-red-500/20 text-orange-600 dark:text-orange-400",
};

interface CategoryCardProps {
  id: string;
  name: string;
  productCount?: number;
  className?: string;
}

export function CategoryCard({ id, name, productCount = 0, className }: CategoryCardProps) {
  const Icon = categoryIcons[id] || Palette;
  const colorClass = categoryColors[id] || categoryColors.makeup;

  return (
    <Link href={`/category/${id}`}>
      <Card
        className={cn(
          "group cursor-pointer hover-elevate transition-all duration-300 overflow-visible",
          className
        )}
        data-testid={`card-category-${id}`}
      >
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div
            className={cn(
              "w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110",
              colorClass
            )}
          >
            <Icon className="h-8 w-8" />
          </div>
          <h3 className="font-semibold text-foreground mb-1">{name}</h3>
          {productCount > 0 && (
            <p className="text-sm text-muted-foreground">
              {productCount} محصول
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

// Grid of all categories
export function CategoryGrid() {
  const categories = [
    { id: "makeup", name: "آرایشی", count: 45 },
    { id: "skincare", name: "مراقبت پوست", count: 38 },
    { id: "haircare", name: "مراقبت مو", count: 32 },
    { id: "fragrance", name: "عطر و ادکلن", count: 28 },
    { id: "personal-care", name: "بهداشت شخصی", count: 25 },
    { id: "tools", name: "ابزار و لوازم", count: 20 },
    { id: "natural", name: "محصولات طبیعی", count: 18 },
    { id: "bundles", name: "ست‌ها و بسته‌ها", count: 12 },
  ];

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            دسته‌بندی محصولات
          </h2>
          <p className="text-muted-foreground">
            از میان دسته‌بندی‌های متنوع، محصول مورد نظر خود را پیدا کنید
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              productCount={cat.count}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
