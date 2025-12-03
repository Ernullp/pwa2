import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFilterStore } from "@/lib/store";

const sortOptions = [
  { value: "popular", label: "محبوب‌ترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "price-low", label: "ارزان‌ترین" },
  { value: "price-high", label: "گران‌ترین" },
  { value: "rating", label: "بیشترین امتیاز" },
] as const;

export function SortDropdown() {
  const { sortBy, setSortBy } = useFilterStore();
  const currentSort = sortOptions.find((opt) => opt.value === sortBy);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2" data-testid="button-sort">
          <ArrowUpDown className="h-4 w-4" />
          <span className="hidden sm:inline">مرتب‌سازی:</span>
          <span>{currentSort?.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setSortBy(option.value)}
            className={sortBy === option.value ? "bg-primary/10" : ""}
            data-testid={`button-sort-${option.value}`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
