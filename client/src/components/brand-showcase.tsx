import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Brand } from "@shared/schema";

interface BrandCardProps {
  brand: Brand;
  className?: string;
}

export function BrandCard({ brand, className }: BrandCardProps) {
  return (
    <Link href={`/brand/${brand.slug}`}>
      <Card
        className={cn(
          "group cursor-pointer hover-elevate transition-all duration-300 overflow-visible",
          className
        )}
        data-testid={`card-brand-${brand.id}`}
      >
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-3 overflow-hidden transition-transform duration-300 group-hover:scale-105">
            {brand.logo ? (
              <img
                src={brand.logo}
                alt={brand.name}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <span className="text-2xl font-bold text-primary">
                {brand.name.charAt(0)}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-foreground text-sm">{brand.nameEn}</h3>
          <p className="text-xs text-muted-foreground">{brand.name}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

interface BrandShowcaseProps {
  brands: Brand[];
  isLoading?: boolean;
}

export function BrandShowcase({ brands, isLoading }: BrandShowcaseProps) {
  // Default brands if none provided
  const defaultBrands: Brand[] = [
    { id: "1", name: "بیوتی اند گلو", nameEn: "Beauty & Glow", slug: "beauty-glow", logo: null, description: "برند فاخر ایرانی" },
    { id: "2", name: "اسکین پیور", nameEn: "Skin Pure", slug: "skin-pure", logo: null, description: "برند طبیعی و ارگانیک" },
    { id: "3", name: "لوکس کوتور", nameEn: "Luxe Couture", slug: "luxe-couture", logo: null, description: "برند بین‌المللی" },
    { id: "4", name: "نیچرز بست", nameEn: "Nature's Best", slug: "natures-best", logo: null, description: "محصولات کره‌ای" },
    { id: "5", name: "رادینس پرو", nameEn: "Radiance Pro", slug: "radiance-pro", logo: null, description: "برند پروفشنال" },
    { id: "6", name: "ارگانیک ادن", nameEn: "Organic Eden", slug: "organic-eden", logo: null, description: "محصولات ۱۰۰٪ طبیعی" },
    { id: "7", name: "مادرن اسنس", nameEn: "Modern Essence", slug: "modern-essence", logo: null, description: "برند جدید و نوآور" },
    { id: "8", name: "کلاسیک بیوتی", nameEn: "Classic Beauty", slug: "classic-beauty", logo: null, description: "برند کلاسیک و معتبر" },
    { id: "9", name: "گلو ساینس", nameEn: "Glow Science", slug: "glow-science", logo: null, description: "محصولات علمی" },
    { id: "10", name: "اکو بیوتی", nameEn: "Eco Beauty", slug: "eco-beauty", logo: null, description: "حساس به محیط‌زیست" },
  ];

  const displayBrands = brands.length > 0 ? brands : defaultBrands;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            برندهای معتبر
          </h2>
          <p className="text-muted-foreground">
            محصولات اصل از بهترین برندهای ایرانی و بین‌المللی
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full shimmer mb-3" />
                  <div className="h-4 w-16 shimmer rounded mb-1" />
                  <div className="h-3 w-12 shimmer rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4">
            {displayBrands.slice(0, 10).map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
