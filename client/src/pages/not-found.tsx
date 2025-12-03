import { Link } from "wouter";
import { Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center bg-muted/30 px-4">
        <div className="text-center max-w-md">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            <div className="text-9xl font-bold text-primary/10">۴۰۴</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl">🔍</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            صفحه مورد نظر یافت نشد
          </h1>

          <p className="text-muted-foreground mb-8">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری
            منتقل شده است.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" data-testid="button-go-home">
                <Home className="h-4 w-4 ml-2" />
                بازگشت به صفحه اصلی
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="lg" data-testid="button-browse-products">
                مشاهده محصولات
                <ArrowRight className="h-4 w-4 mr-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
