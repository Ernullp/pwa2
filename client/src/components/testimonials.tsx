import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: string;
  product?: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "سارا محمدی",
    rating: 5,
    comment: "کیفیت محصولات فوق‌العاده است! سرم ویتامین C که خریدم واقعاً روی پوستم تأثیر گذاشت. ارسال هم خیلی سریع بود.",
    product: "سرم ویتامین C",
    date: "۲ هفته پیش",
  },
  {
    id: "2",
    name: "مریم احمدی",
    rating: 5,
    comment: "خیلی راضی هستم از خرید. بسته‌بندی عالی و محصولات اصل. قطعاً بازم خرید می‌کنم.",
    product: "ماسک صورت ورقه‌ای",
    date: "۱ ماه پیش",
  },
  {
    id: "3",
    name: "زهرا رضایی",
    rating: 4,
    comment: "قیمت‌ها مناسب و محصولات با کیفیت هستند. پشتیبانی هم خیلی خوب پاسخگو بود.",
    product: "شامپو کراتین",
    date: "۳ هفته پیش",
  },
  {
    id: "4",
    name: "نازنین کریمی",
    rating: 5,
    comment: "عطری که خریدم دقیقاً همون چیزی بود که می‌خواستم. ماندگاری عالی داره!",
    product: "عطر زنانه لوکس",
    date: "۱ هفته پیش",
  },
];

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full hover-elevate overflow-visible">
      <CardContent className="p-6">
        {/* Quote icon */}
        <Quote className="h-8 w-8 text-primary/20 mb-4" />

        {/* Rating */}
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={cn(
                "h-4 w-4",
                star <= testimonial.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground/30"
              )}
            />
          ))}
        </div>

        {/* Comment */}
        <p className="text-foreground mb-4 leading-relaxed">
          {testimonial.comment}
        </p>

        {/* Product tag */}
        {testimonial.product && (
          <p className="text-sm text-primary mb-4">
            محصول: {testimonial.product}
          </p>
        )}

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">
              {testimonial.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{testimonial.name}</p>
            <p className="text-xs text-muted-foreground">{testimonial.date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            نظرات مشتریان
          </h2>
          <p className="text-muted-foreground">
            تجربه خرید مشتریان راضی درمارُخ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
