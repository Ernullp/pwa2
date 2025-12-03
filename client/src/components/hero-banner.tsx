import { Link } from "wouter";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-bl from-primary/20 via-background to-accent/20 py-12 lg:py-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-derma-teal/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-60 h-60 bg-derma-orange/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="text-center lg:text-right order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm mb-6 animate-fade-up">
              <Sparkles className="h-4 w-4" />
              <span>تا ۵۰٪ تخفیف ویژه</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="text-primary">زیبایی طبیعی</span>
              <br />
              با فناوری پیشرفته
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              بهترین محصولات آرایشی و بهداشتی از معتبرترین برندهای دنیا با
              تضمین اصالت و کیفیت
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link href="/products">
                <Button size="lg" className="bg-derma-orange hover:bg-derma-orange/90 text-white" data-testid="button-hero-shop">
                  مشاهده محصولات
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/offers">
                <Button size="lg" variant="outline" data-testid="button-hero-offers">
                  تخفیف‌های ویژه
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-border/50 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="text-center lg:text-right">
                <div className="text-2xl md:text-3xl font-bold text-primary">۱۰+</div>
                <div className="text-sm text-muted-foreground">برند معتبر</div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-2xl md:text-3xl font-bold text-derma-teal">۱۵۰۰+</div>
                <div className="text-sm text-muted-foreground">محصول متنوع</div>
              </div>
              <div className="text-center lg:text-right">
                <div className="text-2xl md:text-3xl font-bold text-derma-orange">۵۰K+</div>
                <div className="text-sm text-muted-foreground">مشتری راضی</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2 animate-fade-up">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background circles */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-derma-teal/20 rounded-full animate-pulse" style={{ animationDuration: "3s" }} />
              <div className="absolute inset-4 bg-gradient-to-tr from-derma-teal/10 to-primary/10 rounded-full" />
              
              {/* Main image container */}
              <div className="absolute inset-8 rounded-full overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🌸</div>
                  <div className="text-xl font-bold text-primary">درمارُخ</div>
                  <div className="text-sm text-muted-foreground">DermaRokh</div>
                </div>
              </div>

              {/* Floating product badges */}
              <div className="absolute top-4 right-4 bg-card p-3 rounded-lg shadow-lg animate-bounce" style={{ animationDuration: "2s" }}>
                <div className="text-xs text-muted-foreground">محبوب‌ترین</div>
                <div className="text-sm font-bold text-foreground">سرم ویتامین C</div>
              </div>

              <div className="absolute bottom-8 left-0 bg-card p-3 rounded-lg shadow-lg animate-bounce" style={{ animationDuration: "2.5s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-derma-success/20 rounded-full flex items-center justify-center">
                    <span className="text-derma-success text-sm">✓</span>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">ضمانت اصالت</div>
                    <div className="text-sm font-bold text-foreground">۱۰۰٪</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
