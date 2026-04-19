# APP KNOWLEDGE BASE

## OVERVIEW
Next.js 16 App Router with 4 route groups and hierarchical layout management.

## STRUCTURE
```
app/
├── (auth)/             # Sign-in flow
├── (frontend)/         # Public storefront (Navbar/Footer)
├── admin/              # Admin dashboard (Sidebar/Topbar)
├── farmer/             # Farmer dashboard (Sidebar/Topbar)
├── layout.tsx          # Root: StoreProvider + Toaster
└── globals.css         # Tailwind 4 entry
```

## WHERE TO LOOK
- **Storefront**: `(frontend)/` contains Home, Products, Cart, and Checkout.
- **User Profile**: `(frontend)/user/` handles orders and settings.
- **Admin Panel**: `admin/` manages products and orders via dashboard shell.
- **Farmer Panel**: `farmer/` focuses on product management for sellers.
- **Auth Entry**: `(auth)/signin/` is the primary entry point for users.
- **Global Config**: `layout.tsx` (Root) and `globals.css` (Styles).

## CONVENTIONS
- **Layout Hierarchy**: Root (State/Toast) > Group (Shell) > Page (Content).
- **Private Components**: Keep route-specific UI in `_components/` subdirectories.
- **Loading States**: Use `loading.tsx` at group level for skeleton consistency.
- **Dynamic Routes**: `products/[id]/` uses `_components/` for detail-specific logic.
- **Client Components**: Mark with 'use client' only when hooks or events are needed.

## ANTI-PATTERNS
- ❌ Don't nest `_components/` deeper than 2 levels.
- ❌ Avoid putting business logic in `layout.tsx`.
- ❌ Never use `<a>` tags for internal navigation. Use `Link` instead.
- ❌ Don't create new route groups without a dedicated `layout.tsx`.
- ❌ Skip manual 404 logic. Use `not-found.tsx` for all missing routes.
