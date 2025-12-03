import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { FilterSidebar, MobileFilterSheet } from "@/components/filter-sidebar";
import { SortDropdown } from "@/components/sort-dropdown";
import { ProductGrid } from "@/components/product-grid";
import { useFilterStore } from "@/lib/store";
import type { Product } from "@shared/schema";

interface ProductsPageProps {
  categorySlug?: string;
  categoryName?: string;
}

export default function ProductsPage({ categorySlug, categoryName }: ProductsPageProps) {
  const [location] = useLocation();
  const { sortBy, selectedBrands, priceRange, minRating, isNew } = useFilterStore();

  // Build query params
  const queryParams = new URLSearchParams();
  if (categorySlug) queryParams.set("category", categorySlug);
  if (selectedBrands.length > 0) queryParams.set("brands", selectedBrands.join(","));
  if (priceRange[0] > 0) queryParams.set("minPrice", priceRange[0].toString());
  if (priceRange[1] < 10000000) queryParams.set("maxPrice", priceRange[1].toString());
  if (minRating > 0) queryParams.set("minRating", minRating.toString());
  if (isNew) queryParams.set("new", "true");
  queryParams.set("sort", sortBy);

  const queryString = queryParams.toString();
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: [queryString ? `/api/products?${queryString}` : "/api/products"],
  });

  const breadcrumbItems = categoryName
    ? [
        { label: "محصولات", href: "/products" },
        { label: categoryName },
      ]
    : [{ label: "محصولات" }];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <BreadcrumbNav items={breadcrumbItems} />

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {categoryName || "همه محصولات"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {products?.length || 0} محصول یافت شد
              </p>
            </div>

            <div className="flex items-center gap-3">
              <MobileFilterSheet />
              <SortDropdown />
            </div>
          </div>

          {/* Content */}
          <div className="flex gap-8">
            {/* Desktop Filters */}
            <FilterSidebar />

            {/* Products */}
            <div className="flex-1">
              <ProductGrid
                products={products || []}
                isLoading={isLoading}
                emptyMessage="محصولی با این فیلترها یافت نشد"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Category page wrapper
export function CategoryPage() {
  const [location] = useLocation();
  const categorySlug = location.split("/category/")[1];

  const categoryNames: Record<string, string> = {
    makeup: "آرایشی",
    skincare: "مراقبت پوست",
    haircare: "مراقبت مو",
    fragrance: "عطر و ادکلن",
    "personal-care": "بهداشت شخصی",
    tools: "ابزار و لوازم",
    natural: "محصولات طبیعی",
    bundles: "ست‌ها و بسته‌ها",
  };

  return (
    <ProductsPage
      categorySlug={categorySlug}
      categoryName={categoryNames[categorySlug] || categorySlug}
    />
  );
}
