import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearch } from "wouter";
import { Search } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { FilterSidebar, MobileFilterSheet } from "@/components/filter-sidebar";
import { SortDropdown } from "@/components/sort-dropdown";
import { ProductGrid } from "@/components/product-grid";
import { Input } from "@/components/ui/input";
import { useSearchStore, useFilterStore } from "@/lib/store";
import type { Product } from "@shared/schema";

export default function SearchPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const queryParam = searchParams.get("q") || "";
  const { query, setQuery, addRecentSearch } = useSearchStore();
  const { sortBy } = useFilterStore();
  const [, setLocation] = useLocation();

  // Use URL query if available, otherwise use store query
  const searchQuery = queryParam || query;

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: [`/api/products/search?q=${encodeURIComponent(searchQuery)}`],
    enabled: searchQuery.length > 0,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      addRecentSearch(query);
      setLocation(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav
            items={[
              { label: "جستجو" },
              ...(searchQuery ? [{ label: `"${searchQuery}"` }] : []),
            ]}
          />

          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {searchQuery ? (
                <>
                  نتایج جستجو برای{" "}
                  <span className="text-primary">"{searchQuery}"</span>
                </>
              ) : (
                "جستجوی محصولات"
              )}
            </h1>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-xl">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="نام محصول، برند یا دسته‌بندی را جستجو کنید..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pr-12 h-12 text-lg"
                  data-testid="input-search-page"
                />
              </div>
            </form>
          </div>

          {searchQuery ? (
            <>
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <p className="text-muted-foreground">
                  {products?.length || 0} محصول یافت شد
                </p>

                <div className="flex items-center gap-3">
                  <MobileFilterSheet />
                  <SortDropdown />
                </div>
              </div>

              {/* Content */}
              <div className="flex gap-8">
                <FilterSidebar />
                <div className="flex-1">
                  <ProductGrid
                    products={products || []}
                    isLoading={isLoading}
                    emptyMessage={`محصولی با عبارت "${searchQuery}" یافت نشد`}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Search className="h-20 w-20 mx-auto text-muted-foreground/30 mb-6" />
              <h2 className="text-xl font-bold text-foreground mb-2">
                محصول مورد نظر خود را جستجو کنید
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                نام محصول، برند یا دسته‌بندی را در کادر بالا وارد کنید تا نتایج
                مرتبط را مشاهده کنید
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
