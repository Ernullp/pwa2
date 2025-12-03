import { randomUUID } from "crypto";
import type {
  User,
  InsertUser,
  Category,
  InsertCategory,
  Brand,
  InsertBrand,
  Product,
  InsertProduct,
  CartItem,
  InsertCartItem,
  WishlistItem,
  InsertWishlistItem,
  Review,
  InsertReview,
  Order,
  InsertOrder,
  DiscountCode,
  InsertDiscountCode,
  ProductWithDetails,
  CartItemWithProduct,
  WishlistItemWithProduct,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;

  // Brands
  getBrands(): Promise<Brand[]>;
  getBrand(id: string): Promise<Brand | undefined>;
  getBrandBySlug(slug: string): Promise<Brand | undefined>;

  // Products
  getProducts(filters?: ProductFilters): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  searchProducts(query: string): Promise<Product[]>;

  // Cart
  getCartItems(sessionId: string): Promise<CartItemWithProduct[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;

  // Wishlist
  getWishlistItems(sessionId: string): Promise<WishlistItemWithProduct[]>;
  addToWishlist(item: InsertWishlistItem): Promise<WishlistItem>;
  removeFromWishlist(id: string): Promise<void>;
  isInWishlist(sessionId: string, productId: string): Promise<boolean>;

  // Reviews
  getProductReviews(productId: string): Promise<Review[]>;
  addReview(review: InsertReview): Promise<Review>;

  // Discount codes
  getDiscountCode(code: string): Promise<DiscountCode | undefined>;
  validateDiscountCode(code: string): Promise<{ valid: boolean; percent?: number }>;
}

export interface ProductFilters {
  category?: string;
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  sort?: "popular" | "newest" | "price-low" | "price-high" | "rating";
  limit?: number;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, Category>;
  private brands: Map<string, Brand>;
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private wishlistItems: Map<string, WishlistItem>;
  private reviews: Map<string, Review>;
  private discountCodes: Map<string, DiscountCode>;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.brands = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.wishlistItems = new Map();
    this.reviews = new Map();
    this.discountCodes = new Map();

    this.initializeData();
  }

  private initializeData() {
    // Initialize Categories
    const categoriesData: Category[] = [
      { id: "cat-1", name: "آرایشی", nameEn: "Makeup", slug: "makeup", icon: "palette", image: null, productCount: 5 },
      { id: "cat-2", name: "مراقبت پوست", nameEn: "Skincare", slug: "skincare", icon: "droplets", image: null, productCount: 4 },
      { id: "cat-3", name: "مراقبت مو", nameEn: "Haircare", slug: "haircare", icon: "wind", image: null, productCount: 2 },
      { id: "cat-4", name: "عطر و ادکلن", nameEn: "Fragrance", slug: "fragrance", icon: "flower2", image: null, productCount: 2 },
      { id: "cat-5", name: "بهداشت شخصی", nameEn: "Personal Care", slug: "personal-care", icon: "heart", image: null, productCount: 1 },
      { id: "cat-6", name: "ابزار و لوازم", nameEn: "Tools & Accessories", slug: "tools", icon: "wrench", image: null, productCount: 1 },
      { id: "cat-7", name: "محصولات طبیعی", nameEn: "Natural & Organic", slug: "natural", icon: "leaf", image: null, productCount: 0 },
      { id: "cat-8", name: "ست‌ها و بسته‌ها", nameEn: "Bundles & Sets", slug: "bundles", icon: "gift", image: null, productCount: 0 },
    ];
    categoriesData.forEach((cat) => this.categories.set(cat.id, cat));

    // Initialize Brands
    const brandsData: Brand[] = [
      { id: "brand-1", name: "بیوتی اند گلو", nameEn: "Beauty & Glow", slug: "beauty-glow", logo: null, description: "برند فاخر ایرانی - محصولات پریمیوم" },
      { id: "brand-2", name: "اسکین پیور", nameEn: "Skin Pure", slug: "skin-pure", logo: null, description: "برند طبیعی و ارگانیک" },
      { id: "brand-3", name: "لوکس کوتور", nameEn: "Luxe Couture", slug: "luxe-couture", logo: null, description: "برند بین‌المللی معروف" },
      { id: "brand-4", name: "نیچرز بست", nameEn: "Nature's Best", slug: "natures-best", logo: null, description: "محصولات کره‌ای K-Beauty" },
      { id: "brand-5", name: "رادینس پرو", nameEn: "Radiance Pro", slug: "radiance-pro", logo: null, description: "برند پروفشنال" },
      { id: "brand-6", name: "ارگانیک ادن", nameEn: "Organic Eden", slug: "organic-eden", logo: null, description: "محصولات ۱۰۰٪ طبیعی" },
      { id: "brand-7", name: "مادرن اسنس", nameEn: "Modern Essence", slug: "modern-essence", logo: null, description: "برند جدید و نوآور" },
      { id: "brand-8", name: "کلاسیک بیوتی", nameEn: "Classic Beauty", slug: "classic-beauty", logo: null, description: "برند کلاسیک و معتبر" },
      { id: "brand-9", name: "گلو ساینس", nameEn: "Glow Science", slug: "glow-science", logo: null, description: "برند محصولات علمی" },
      { id: "brand-10", name: "اکو بیوتی", nameEn: "Eco Beauty", slug: "eco-beauty", logo: null, description: "حساس به محیط‌زیست" },
    ];
    brandsData.forEach((brand) => this.brands.set(brand.id, brand));

    // Initialize Products (15 products)
    const productsData: Product[] = [
      {
        id: "prod-1",
        name: "پنکیک فاوندیشن مخملی",
        nameEn: "Velvet Foundation Pancake",
        slug: "velvet-foundation-pancake",
        description: "پنکیک فاوندیشن با پوشش متوسط تا کامل، مناسب برای انواع پوست. این محصول با فرمول بی‌نظیر خود، پوست شما را صاف و یکدست می‌کند و تا ۱۲ ساعت ماندگاری دارد.",
        shortDescription: "پوشش متوسط تا کامل، ماندگاری ۱۲ ساعته",
        price: 450000,
        originalPrice: 550000,
        discountPercent: 18,
        categoryId: "makeup",
        brandId: "Beauty & Glow",
        images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600"],
        ingredients: "تالک، اکسید آهن، دی‌متیکون، ویتامین E",
        howToUse: "با اسفنج یا براش روی پوست بزنید",
        benefits: "پوشش کامل، ماندگاری بالا، مناسب همه نوع پوست",
        skinType: "همه انواع پوست",
        rating: 4.8,
        reviewCount: 124,
        stock: 50,
        isNew: false,
        isBestSeller: true,
        isFeatured: true,
      },
      {
        id: "prod-2",
        name: "سایه‌چشم پالت رنگی ۱۲ رنگ",
        nameEn: "12-Color Eyeshadow Palette",
        slug: "12-color-eyeshadow-palette",
        description: "پالت سایه‌چشم با ۱۲ رنگ متنوع از مات تا شیمری. رنگدانه‌های بسیار قوی و بدون ریزش. مناسب برای آرایش روزانه و مجالس.",
        shortDescription: "۱۲ رنگ متنوع، رنگدانه قوی",
        price: 680000,
        originalPrice: 850000,
        discountPercent: 20,
        categoryId: "makeup",
        brandId: "Luxe Couture",
        images: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600"],
        ingredients: "میکا، اکسید آهن، سیلیکا",
        howToUse: "با براش سایه روی پلک بزنید",
        benefits: "ماندگاری بالا، رنگدانه قوی، بدون ریزش",
        skinType: null,
        rating: 4.6,
        reviewCount: 89,
        stock: 30,
        isNew: true,
        isBestSeller: true,
        isFeatured: false,
      },
      {
        id: "prod-3",
        name: "رژلب مات ابریشمی",
        nameEn: "Silky Matte Lipstick",
        slug: "silky-matte-lipstick",
        description: "رژلب مات با فرمول ابریشمی که لب‌ها را نرم نگه می‌دارد. رنگدانه فوق‌العاده و ماندگاری تا ۸ ساعت بدون خشکی.",
        shortDescription: "مات ابریشمی، بدون خشکی",
        price: 320000,
        originalPrice: null,
        discountPercent: 0,
        categoryId: "makeup",
        brandId: "Radiance Pro",
        images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600"],
        ingredients: "روغن جوجوبا، ویتامین E، موم زنبور عسل",
        howToUse: "مستقیماً روی لب بمالید",
        benefits: "مات بدون خشکی، مرطوب‌کننده، ماندگار",
        skinType: null,
        rating: 4.9,
        reviewCount: 256,
        stock: 100,
        isNew: false,
        isBestSeller: true,
        isFeatured: true,
      },
      {
        id: "prod-4",
        name: "ماسک صورت ورقه‌ای هیالورونیک",
        nameEn: "Hyaluronic Sheet Mask",
        slug: "hyaluronic-sheet-mask",
        description: "ماسک ورقه‌ای با عصاره هیالورونیک اسید برای آبرسانی عمیق پوست. پوست شما را در عرض ۱۵ دقیقه شاداب و درخشان می‌کند.",
        shortDescription: "آبرسانی عمیق، نتیجه فوری",
        price: 85000,
        originalPrice: 100000,
        discountPercent: 15,
        categoryId: "skincare",
        brandId: "Nature's Best",
        images: ["https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600"],
        ingredients: "هیالورونیک اسید، عصاره آلوئه‌ورا، نیاسینامید",
        howToUse: "روی صورت تمیز قرار دهید و ۱۵-۲۰ دقیقه صبر کنید",
        benefits: "آبرسانی، روشن‌کنندگی، ضدچروک",
        skinType: "همه انواع پوست",
        rating: 4.7,
        reviewCount: 312,
        stock: 200,
        isNew: true,
        isBestSeller: true,
        isFeatured: false,
      },
      {
        id: "prod-5",
        name: "شامپو کراتین ترمیم‌کننده",
        nameEn: "Keratin Repair Shampoo",
        slug: "keratin-repair-shampoo",
        description: "شامپو کراتین برای موهای آسیب‌دیده و خشک. با فرمول منحصر به فرد، موهای شما را از ریشه تا نوک تقویت و ترمیم می‌کند.",
        shortDescription: "ترمیم و تقویت موهای آسیب‌دیده",
        price: 280000,
        originalPrice: 350000,
        discountPercent: 20,
        categoryId: "haircare",
        brandId: "Skin Pure",
        images: ["https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600"],
        ingredients: "کراتین، پروتئین گندم، پانتنول",
        howToUse: "روی موی خیس ماساژ دهید و آبکشی کنید",
        benefits: "ترمیم، تقویت، درخشندگی",
        skinType: null,
        rating: 4.5,
        reviewCount: 178,
        stock: 80,
        isNew: false,
        isBestSeller: true,
        isFeatured: false,
      },
      {
        id: "prod-6",
        name: "سرم ویتامین C روشن‌کننده",
        nameEn: "Vitamin C Brightening Serum",
        slug: "vitamin-c-brightening-serum",
        description: "سرم ویتامین C با غلظت ۲۰٪ برای روشن کردن پوست و کاهش لک‌های تیره. با فرمول پایدار و جذب سریع.",
        shortDescription: "روشن‌کنندگی و ضدلک",
        price: 520000,
        originalPrice: 650000,
        discountPercent: 20,
        categoryId: "skincare",
        brandId: "Glow Science",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600"],
        ingredients: "ویتامین C ۲۰٪، فرولیک اسید، ویتامین E",
        howToUse: "صبح‌ها بعد از تونر روی پوست بزنید",
        benefits: "روشن‌کنندگی، ضدلک، آنتی‌اکسیدان",
        skinType: "همه انواع پوست",
        rating: 4.9,
        reviewCount: 445,
        stock: 45,
        isNew: false,
        isBestSeller: true,
        isFeatured: true,
      },
      {
        id: "prod-7",
        name: "عطر زنانه فلورال لوکس",
        nameEn: "Floral Luxe Women's Perfume",
        slug: "floral-luxe-womens-perfume",
        description: "عطر زنانه با رایحه گل‌های بهاری و نت‌های چوبی. ماندگاری بالا و پخش بوی عالی. مناسب برای استفاده روزانه و مجالس.",
        shortDescription: "رایحه گلی-چوبی، ماندگاری بالا",
        price: 1200000,
        originalPrice: 1500000,
        discountPercent: 20,
        categoryId: "fragrance",
        brandId: "Luxe Couture",
        images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=600"],
        ingredients: "اسانس گل رز، یاسمن، صندل",
        howToUse: "روی نقاط تپش قلب اسپری کنید",
        benefits: "ماندگاری بالا، رایحه منحصر به فرد",
        skinType: null,
        rating: 4.8,
        reviewCount: 167,
        stock: 25,
        isNew: true,
        isBestSeller: false,
        isFeatured: true,
      },
      {
        id: "prod-8",
        name: "دئودورانت طبیعی آلوئه‌ورا",
        nameEn: "Natural Aloe Vera Deodorant",
        slug: "natural-aloe-vera-deodorant",
        description: "دئودورانت طبیعی با عصاره آلوئه‌ورا و بدون آلومینیوم. ۲۴ ساعت محافظت با رایحه ملایم و طبیعی.",
        shortDescription: "بدون آلومینیوم، ۲۴ ساعت محافظت",
        price: 180000,
        originalPrice: null,
        discountPercent: 0,
        categoryId: "personal-care",
        brandId: "Organic Eden",
        images: ["https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600"],
        ingredients: "عصاره آلوئه‌ورا، روغن نارگیل، بی‌کینگ سودا",
        howToUse: "روی پوست تمیز زیر بغل بزنید",
        benefits: "ضدتعریق طبیعی، مناسب پوست حساس",
        skinType: "حساس",
        rating: 4.4,
        reviewCount: 98,
        stock: 120,
        isNew: false,
        isBestSeller: false,
        isFeatured: false,
      },
      {
        id: "prod-9",
        name: "کرم شب ضدچروک و جوان‌کننده",
        nameEn: "Anti-Aging Night Cream",
        slug: "anti-aging-night-cream",
        description: "کرم شب با فرمول پیشرفته حاوی رتینول و پپتیدها برای کاهش چروک و افزایش کلاژن پوست. نتایج قابل مشاهده در ۴ هفته.",
        shortDescription: "ضدچروک، جوان‌کننده",
        price: 780000,
        originalPrice: 950000,
        discountPercent: 18,
        categoryId: "skincare",
        brandId: "Beauty & Glow",
        images: ["https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=600"],
        ingredients: "رتینول، پپتید، هیالورونیک اسید",
        howToUse: "شب‌ها روی پوست تمیز بزنید",
        benefits: "کاهش چروک، افزایش کلاژن، سفتی پوست",
        skinType: "بالغ",
        rating: 4.7,
        reviewCount: 234,
        stock: 35,
        isNew: false,
        isBestSeller: true,
        isFeatured: true,
      },
      {
        id: "prod-10",
        name: "ست براش آرایشی ۷ عددی",
        nameEn: "7-Piece Makeup Brush Set",
        slug: "7-piece-makeup-brush-set",
        description: "ست کامل براش آرایشی شامل ۷ قلم‌مو حرفه‌ای با موی نرم و دسته ارگونومیک. مناسب برای آرایش کامل صورت.",
        shortDescription: "۷ براش حرفه‌ای، موی نرم",
        price: 420000,
        originalPrice: 520000,
        discountPercent: 19,
        categoryId: "tools",
        brandId: "Modern Essence",
        images: ["https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600"],
        ingredients: null,
        howToUse: "هر براش را برای ناحیه مشخص شده استفاده کنید",
        benefits: "موی نرم، دسته راحت، کیفیت بالا",
        skinType: null,
        rating: 4.6,
        reviewCount: 145,
        stock: 60,
        isNew: true,
        isBestSeller: false,
        isFeatured: false,
      },
      {
        id: "prod-11",
        name: "روغن نارگیل خالص ارگانیک",
        nameEn: "Pure Organic Coconut Oil",
        slug: "pure-organic-coconut-oil",
        description: "روغن نارگیل ۱۰۰٪ خالص و ارگانیک. مناسب برای مراقبت از پوست، مو و ناخن. بدون افزودنی و مواد شیمیایی.",
        shortDescription: "۱۰۰٪ خالص و ارگانیک",
        price: 250000,
        originalPrice: null,
        discountPercent: 0,
        categoryId: "natural",
        brandId: "Eco Beauty",
        images: ["https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600"],
        ingredients: "روغن نارگیل فرابکر ۱۰۰٪",
        howToUse: "به صورت موضعی روی پوست یا مو بمالید",
        benefits: "مرطوب‌کننده، تقویت‌کننده، چندمنظوره",
        skinType: "همه انواع پوست",
        rating: 4.8,
        reviewCount: 289,
        stock: 150,
        isNew: false,
        isBestSeller: true,
        isFeatured: false,
      },
      {
        id: "prod-12",
        name: "تونر ملایم بدون الکل",
        nameEn: "Alcohol-Free Gentle Toner",
        slug: "alcohol-free-gentle-toner",
        description: "تونر ملایم و بدون الکل برای تنظیم pH پوست و آماده‌سازی برای مراقبت. مناسب برای پوست‌های حساس.",
        shortDescription: "بدون الکل، مناسب پوست حساس",
        price: 195000,
        originalPrice: 230000,
        discountPercent: 15,
        categoryId: "skincare",
        brandId: "Skin Pure",
        images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600"],
        ingredients: "آب گل رز، هیالورونیک اسید، نیاسینامید",
        howToUse: "بعد از شستشو روی پوست بزنید",
        benefits: "تنظیم pH، آبرسانی، آرامش‌بخش",
        skinType: "حساس",
        rating: 4.5,
        reviewCount: 156,
        stock: 90,
        isNew: false,
        isBestSeller: false,
        isFeatured: false,
      },
      {
        id: "prod-13",
        name: "لاک ناخن سریع‌خشک ۳۶ رنگ",
        nameEn: "Quick-Dry Nail Polish",
        slug: "quick-dry-nail-polish",
        description: "لاک ناخن با فرمول سریع‌خشک در ۳۶ رنگ متنوع. بدون تولوئن و فرمالدئید. ماندگاری تا ۷ روز بدون ترک‌خوردگی.",
        shortDescription: "سریع‌خشک، ۷ روز ماندگاری",
        price: 120000,
        originalPrice: null,
        discountPercent: 0,
        categoryId: "makeup",
        brandId: "Classic Beauty",
        images: ["https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600"],
        ingredients: "رزین، نیتروسلولز",
        howToUse: "دو لایه روی ناخن تمیز بزنید",
        benefits: "سریع‌خشک، بدون مواد مضر، ماندگار",
        skinType: null,
        rating: 4.3,
        reviewCount: 89,
        stock: 300,
        isNew: true,
        isBestSeller: false,
        isFeatured: false,
      },
      {
        id: "prod-14",
        name: "کرم دست و ناخن تقویتی",
        nameEn: "Strengthening Hand & Nail Cream",
        slug: "strengthening-hand-nail-cream",
        description: "کرم دست و ناخن با فرمول تقویتی حاوی کراتین و ویتامین E. دست‌های نرم و ناخن‌های محکم.",
        shortDescription: "تقویت ناخن، نرمی دست",
        price: 165000,
        originalPrice: 200000,
        discountPercent: 18,
        categoryId: "personal-care",
        brandId: "Radiance Pro",
        images: ["https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600"],
        ingredients: "کراتین، ویتامین E، شی‌باتر",
        howToUse: "روی دست‌ها و ناخن‌ها ماساژ دهید",
        benefits: "تقویت ناخن، نرم‌کنندگی، محافظت",
        skinType: "همه انواع پوست",
        rating: 4.4,
        reviewCount: 112,
        stock: 85,
        isNew: false,
        isBestSeller: false,
        isFeatured: false,
      },
      {
        id: "prod-15",
        name: "سرم مو حرارتی محافظ",
        nameEn: "Heat Protection Hair Serum",
        slug: "heat-protection-hair-serum",
        description: "سرم محافظ مو در برابر حرارت سشوار و اتو. درخشندگی و نرمی مو را حفظ می‌کند و از آسیب‌های حرارتی جلوگیری می‌کند.",
        shortDescription: "محافظ حرارتی، درخشان‌کننده",
        price: 295000,
        originalPrice: 350000,
        discountPercent: 16,
        categoryId: "haircare",
        brandId: "Modern Essence",
        images: ["https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600"],
        ingredients: "سیلیکون، آرگان اویل، ویتامین E",
        howToUse: "قبل از استفاده از ابزار حرارتی روی مو بزنید",
        benefits: "محافظت حرارتی، درخشندگی، ضدوز",
        skinType: null,
        rating: 4.6,
        reviewCount: 178,
        stock: 70,
        isNew: true,
        isBestSeller: false,
        isFeatured: true,
      },
    ];
    productsData.forEach((prod) => this.products.set(prod.id, prod));

    // Initialize Discount Codes
    const discountCodesData: DiscountCode[] = [
      { id: "dc-1", code: "DERMA10", discountPercent: 10, maxUses: 100, usedCount: 23, isActive: true },
      { id: "dc-2", code: "DERMA20", discountPercent: 20, maxUses: 50, usedCount: 12, isActive: true },
      { id: "dc-3", code: "WELCOME", discountPercent: 15, maxUses: 200, usedCount: 45, isActive: true },
    ];
    discountCodesData.forEach((dc) => this.discountCodes.set(dc.code, dc));

    // Initialize Sample Reviews
    const reviewsData: Review[] = [
      { id: "rev-1", productId: "prod-1", userName: "سارا م.", rating: 5, comment: "بهترین پنکیکی که تا حالا استفاده کردم. پوشش عالی داره!", date: "2024-01-15" },
      { id: "rev-2", productId: "prod-1", userName: "مریم ک.", rating: 4, comment: "خوبه ولی یکم سنگینه روی پوست", date: "2024-01-10" },
      { id: "rev-3", productId: "prod-6", userName: "زهرا ن.", rating: 5, comment: "سرم ویتامین C فوق‌العاده‌ست! لک‌هام کمتر شدن", date: "2024-01-12" },
      { id: "rev-4", productId: "prod-3", userName: "نازنین ع.", rating: 5, comment: "رنگش خیلی قشنگه و اصلاً خشک نمیشه", date: "2024-01-08" },
    ];
    reviewsData.forEach((rev) => this.reviews.set(rev.id, rev));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find((cat) => cat.slug === slug);
  }

  // Brand methods
  async getBrands(): Promise<Brand[]> {
    return Array.from(this.brands.values());
  }

  async getBrand(id: string): Promise<Brand | undefined> {
    return this.brands.get(id);
  }

  async getBrandBySlug(slug: string): Promise<Brand | undefined> {
    return Array.from(this.brands.values()).find((brand) => brand.slug === slug);
  }

  // Product methods
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    let products = Array.from(this.products.values());

    if (filters) {
      if (filters.category) {
        products = products.filter((p) => p.categoryId === filters.category);
      }
      if (filters.brands && filters.brands.length > 0) {
        products = products.filter((p) => filters.brands!.includes(p.brandId));
      }
      if (filters.minPrice !== undefined) {
        products = products.filter((p) => p.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        products = products.filter((p) => p.price <= filters.maxPrice!);
      }
      if (filters.minRating !== undefined) {
        products = products.filter((p) => (p.rating || 0) >= filters.minRating!);
      }
      if (filters.isNew !== undefined) {
        products = products.filter((p) => p.isNew === filters.isNew);
      }
      if (filters.isBestSeller !== undefined) {
        products = products.filter((p) => p.isBestSeller === filters.isBestSeller);
      }
      if (filters.isFeatured !== undefined) {
        products = products.filter((p) => p.isFeatured === filters.isFeatured);
      }

      // Sorting
      switch (filters.sort) {
        case "newest":
          products = products.filter((p) => p.isNew).concat(products.filter((p) => !p.isNew));
          break;
        case "price-low":
          products.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          products.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case "popular":
        default:
          products.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
          break;
      }

      if (filters.limit) {
        products = products.slice(0, filters.limit);
      }
    }

    return products;
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find((p) => p.slug === slug);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.nameEn.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.brandId.toLowerCase().includes(lowerQuery)
    );
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
    return items.map((item) => ({
      ...item,
      product: this.products.get(item.productId)!,
    })).filter((item) => item.product);
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    const existing = Array.from(this.cartItems.values()).find(
      (i) => i.sessionId === item.sessionId && i.productId === item.productId
    );

    if (existing) {
      existing.quantity += item.quantity || 1;
      return existing;
    }

    const id = randomUUID();
    const cartItem: CartItem = { ...item, id, quantity: item.quantity || 1 };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
    }
    return item;
  }

  async removeFromCart(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    for (const [id, item] of this.cartItems.entries()) {
      if (item.sessionId === sessionId) {
        this.cartItems.delete(id);
      }
    }
  }

  // Wishlist methods
  async getWishlistItems(sessionId: string): Promise<WishlistItemWithProduct[]> {
    const items = Array.from(this.wishlistItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
    return items.map((item) => ({
      ...item,
      product: this.products.get(item.productId)!,
    })).filter((item) => item.product);
  }

  async addToWishlist(item: InsertWishlistItem): Promise<WishlistItem> {
    const existing = Array.from(this.wishlistItems.values()).find(
      (i) => i.sessionId === item.sessionId && i.productId === item.productId
    );

    if (existing) return existing;

    const id = randomUUID();
    const wishlistItem: WishlistItem = { ...item, id };
    this.wishlistItems.set(id, wishlistItem);
    return wishlistItem;
  }

  async removeFromWishlist(id: string): Promise<void> {
    this.wishlistItems.delete(id);
  }

  async isInWishlist(sessionId: string, productId: string): Promise<boolean> {
    return Array.from(this.wishlistItems.values()).some(
      (item) => item.sessionId === sessionId && item.productId === productId
    );
  }

  // Review methods
  async getProductReviews(productId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter((r) => r.productId === productId);
  }

  async addReview(review: InsertReview): Promise<Review> {
    const id = randomUUID();
    const newReview: Review = { ...review, id };
    this.reviews.set(id, newReview);
    return newReview;
  }

  // Discount code methods
  async getDiscountCode(code: string): Promise<DiscountCode | undefined> {
    return this.discountCodes.get(code.toUpperCase());
  }

  async validateDiscountCode(code: string): Promise<{ valid: boolean; percent?: number }> {
    const dc = await this.getDiscountCode(code);
    if (!dc || !dc.isActive || (dc.maxUses && dc.usedCount >= dc.maxUses)) {
      return { valid: false };
    }
    return { valid: true, percent: dc.discountPercent };
  }
}

export const storage = new MemStorage();
