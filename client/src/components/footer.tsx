import { Link } from "wouter";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  MessageCircle,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* Newsletter */}
      <div className="bg-primary/5 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-right">
              <h3 className="text-lg font-bold text-foreground">
                عضویت در خبرنامه
              </h3>
              <p className="text-sm text-muted-foreground">
                از جدیدترین محصولات و تخفیف‌ها باخبر شوید
              </p>
            </div>
            <form className="flex gap-2 w-full max-w-md">
              <Input
                type="email"
                placeholder="ایمیل شما"
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" data-testid="button-newsletter-submit">
                <Send className="h-4 w-4 ml-2" />
                عضویت
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-foreground">
              <span className="text-primary">درمارُخ</span>
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              درمارُخ، فروشگاه آنلاین لوازم آرایشی و بهداشتی با بهترین برندها و
              قیمت‌های مناسب. زیبایی طبیعی، فناوری پیشرفته.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" data-testid="link-instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" data-testid="link-telegram">
                <Send className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" data-testid="link-whatsapp">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-foreground">
              دسترسی سریع
            </h4>
            <ul className="space-y-2">
              {[
                { label: "صفحه اصلی", href: "/" },
                { label: "محصولات", href: "/products" },
                { label: "برندها", href: "/brands" },
                { label: "تخفیف‌ها", href: "/offers" },
                { label: "وبلاگ", href: "/blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      data-testid={`link-footer-${link.label}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-foreground">
              خدمات مشتریان
            </h4>
            <ul className="space-y-2">
              {[
                { label: "سوالات متداول", href: "/faq" },
                { label: "راهنمای خرید", href: "/guide" },
                { label: "شرایط بازگشت کالا", href: "/returns" },
                { label: "حریم خصوصی", href: "/privacy" },
                { label: "درباره ما", href: "/about" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      data-testid={`link-footer-${link.label}`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-foreground">
              تماس با ما
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span dir="ltr">021-1234-5678</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@dermarokh.ir</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>تهران، خیابان ولیعصر، پلاک ۱۲۳</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      {/* Copyright */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© ۱۴۰۳ درمارُخ. تمامی حقوق محفوظ است.</p>
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/80x30?text=Shaparak"
              alt="نماد اعتماد"
              className="h-8 opacity-70"
            />
            <img
              src="https://via.placeholder.com/80x30?text=Enamad"
              alt="اینماد"
              className="h-8 opacity-70"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
