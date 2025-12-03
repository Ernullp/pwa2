# DermaRokh Design Guidelines

## Brand Identity
**Name:** DermaRokh (درمارُخ)  
**Tagline:** "زیبایی طبیعی، فناوری پیشرفته" (Natural Beauty, Advanced Technology)  
**Market:** Iranian users (18-45, focus on women)

## Color System
- **Primary:** #D4A5B8 (Soft pink - beauty and care)
- **Secondary:** #5FB9B9 (Light turquoise - nature and freshness)
- **Accent:** #F39C12 (Warm orange - CTAs and discounts)
- **Dark Neutral:** #2C3E50 (Dark gray for text)
- **Light Neutral:** #ECF0F1 (Light gray for backgrounds)
- **Success:** #27AE60 (Green - in stock)
- **Warning:** #E74C3C (Red - out of stock/limited)

## Typography & Spacing
- **Fonts:** Modern, clean fonts (Segoe UI, Tahoma for Persian/Farsi text)
- **Tailwind Spacing:** Use units 2, 4, 8, 12, 16, 20 for consistent rhythm
- **Border Radius:** 4-8px for modern, soft corners
- **Icons:** Minimal, meaningful icons (use Heroicons via CDN)

## Layout System
- **Grid:** 12-column responsive grid
- **Desktop:** 3 product columns, full-width navigation
- **Tablet:** 2 product columns, collapsible menu
- **Mobile:** 1 product column, hamburger menu

## Core Pages Structure

### Homepage
1. **Header:** Logo, search bar, cart icon, account, navigation menu
2. **Hero Banner:** Featured product/special offer with prominent CTA
3. **Category Showcase:** 8 category cards in grid (آرایشی، مراقبت پوست، مراقبت مو، عطر، بهداشت شخصی، ابزار، محصولات طبیعی، ست‌ها)
4. **Best Sellers:** Horizontal scrollable product grid
5. **Latest Products:** Grid display of newest items
6. **Brand Showcase:** Featured brands with logos
7. **Customer Reviews:** Testimonials section
8. **Footer:** Contact info, site map, social media links

### Category Pages
- Breadcrumb navigation
- Sidebar filters (brand, price, rating, skin type, new products)
- Product grid display (3-4 per row desktop)
- Sort options (popularity, sales, price low-high/high-low)
- Pagination

### Product Page
- **Left:** Image gallery with zoom capability
- **Right:** Product details panel including:
  - Product name and star rating
  - Price (with discount badge if applicable)
  - Short description
  - Quantity selector
  - "Add to Cart" + "Add to Wishlist" buttons
  - Specifications (brand, category, stock status)
  - Delivery information
- **Below:** Related products grid, detailed customer reviews with photos

### Shopping Cart
- Product list with thumbnails, quantities, prices
- Discount code input
- Shipping cost calculator
- Total price breakdown
- Checkout button

### User Account
- Profile management
- Order history with status tracking
- Saved addresses
- Wishlist/favorites collection

## Component Design

### Product Cards
- Square/portrait image
- Brand name tag
- Product title (2 lines max)
- Star rating + review count
- Price with discount badge (if applicable)
- Quick "Add to Cart" icon on hover
- Wishlist heart icon (top right corner)

### Navigation
- Sticky header on scroll
- Mega-menu dropdown for categories
- Smart search with autocomplete suggestions
- Cart icon with item count badge

### Buttons
- Primary: Orange (#F39C12) for main CTAs
- Secondary: Outlined style using primary color
- Ghost: Text-only for tertiary actions
- All buttons: 8px border-radius, appropriate padding (px-6 py-3)

### Forms
- Clean, minimal design
- Label above input fields
- Validation states (success green, error red)
- Placeholder text in light gray

## Special Features UI

### Dark/Light Mode Toggle
- Icon-based switcher in header
- Smooth theme transition
- Preserve user preference in localStorage

### Filter Sidebar
- Collapsible sections
- Checkbox selections
- Price range slider
- "Clear all" option

### Quick View Modal
- Product image, title, price
- Brief description
- Add to cart functionality
- Link to full product page

### Wishlist Badge
- Heart icon (outline when empty, filled when added)
- Animation on add/remove
- Counter badge in header

## Images
Use high-quality product photography throughout:
- **Hero Banner:** Large lifestyle image showcasing featured product in use (1920x800px)
- **Category Cards:** Square images representing each category (400x400px)
- **Product Images:** Clean white background shots, multiple angles (800x800px)
- **Brand Logos:** Transparent background PNG (200x80px)
- **Customer Reviews:** User-uploaded photos of products

## Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Accessibility
- Maintain RTL (Right-to-Left) support for Persian text
- Sufficient color contrast (WCAG AA compliant)
- Keyboard navigation support
- Screen reader friendly labels

## Performance Goals
- Page load time < 2 seconds
- Smooth animations (60fps)
- Lazy loading for images
- Optimized asset delivery