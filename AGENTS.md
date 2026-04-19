# PROJECT KNOWLEDGE BASE

**Generated:** 2026-04-19
**Commit:** 44fa189
**Branch:** refactor/monorepo

## OVERVIEW

FreshFarm — 現代農產直銷電商平台。Next.js 16 (App Router) + React 19 + Redux Toolkit/RTK Query + Tailwind CSS 4 + TypeScript。外部 API 接 hexschool。

## STRUCTURE

```
freshfarm/
├── app/                    # Next.js App Router — 路由群組 + 頁面
│   ├── (frontend)/         # 公開頁面 (Navbar/Footer)
│   ├── (auth)/             # 登入頁
│   ├── admin/              # 管理後台
│   └── farmer/             # 農民後台
├── components/              # 共用 UI 元件
│   ├── layout/             # Navbar, Footer, DashboardSidebar/Topbar
│   ├── shared/             # 跨路由元件 (ProductCard, SearchBar, etc.)
│   └── ui/                 # shadcn/ui primitives (19 files)
├── hooks/                   # useCart, useHasHydrated, useLogout
├── lib/                     # State, API, utilities
│   ├── store/              # Redux store + RTK Query (features/, services/, middleware/)
│   ├── filters/            # product.ts filter utility
│   ├── utils.ts            # cn() + helpers
│   └── taiwan-regions.ts   # 台灣行政區資料
├── types/                   # TypeScript types (api, auth, cart, checkout, order, product)
└── public/                  # Static assets
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| 新增頁面 | `app/(frontend)/<route>/page.tsx` | 用 route group 區分前台/後台 |
| 頁面專用元件 | `app/<route>/_components/` |Colocation pattern — 元件與頁面同目錄 |
| 共用元件 | `components/shared/<ComponentName>/` | 四檔結構 |
| UI primitives | `components/ui/` | shadcn/ui — 不要手動修改 |
| Redux slice | `lib/store/features/` | auth/, cart/ |
| RTK Query API | `lib/store/services/` | baseApi.ts → 各資源 endpoint |
| 狀態持久化 | `lib/store/middleware/` | cookie/localStorage sync |
| 型別定義 | `types/` | API response, domain models |
| 自訂 hooks | `hooks/` | useCart, useHasHydrated, useLogout |
| 測試 | `*.test.tsx` or `*.test.ts` | 與原始檔同目錄 (colocated) |

## CONVENTIONS

- **四檔結構** (元件): `ComponentName.tsx` + `ComponentName.types.ts` + `index.ts` + `ComponentName.test.tsx`
- **Import 順序** (Prettier): React → Next.js → Third-party → `@/components` → `@/lib` → `@/types` → relative
- **Path alias**: `@/` → 專案根目錄 (`tsconfig.paths`)
- **Route groups**: `(frontend)` 公開頁、`(auth)` 登入、`admin`/`farmer` 為實際 URL segment
- **_components/**: 頁面私有元件放同目錄下 `_components/`，共用放 `components/shared/`
- **RTK Query**: 所有 API 請求走 `baseApi.ts`，不自 fetch
- **型別分離**: Props 型別獨立 `.types.ts` 檔，不 inline
- **測試語言**: 描述用繁體中文

## ANTI-PATTERNS (THIS PROJECT)

- ❌ 不要在 `components/ui/` 手動修改 shadcn 元件 — 用 `npx shadcn` 更新
- ❌ 不要直接 fetch — 走 RTK Query (`baseApi.ts`)
- ❌ 不要在 `page.tsx` 寫業務邏輯 — 抽到 `hooks/` 或 `lib/`
- ❌ `proxy.ts` 在 root 但不是正式 middleware — 不要依賴它做 auth guard
- ❌ `.env` 不應 commit — 用 `.env.local` (已被 gitignore)

## UNIQUE STYLES

- `lib/store/middleware/` — Redux listener middleware 做 cookie/localStorage 持久化同步
- `lib/filters/product.ts` — 商品過濾邏輯獨立檔案
- `types/` — 全域型別集中管理，非各模块散落
- `lib/taiwan-regions.ts` — 台灣行政區 JSON 資料（結帳表單用）
- `components/AuthWrapper.tsx` / `components/CartInitializer.tsx` — root 層級客戶端初始化元件

## COMMANDS

```bash
npm run dev       # Next.js dev server
npm run build     # Production build
npm run start     # Production server
npm run lint      # ESLint
npm run test      # Vitest
```

## NOTES

- 外部 API: `vue3-course-api.hexschool.io/v2` (HexSchool)，路徑 `/freshfarm01`
- 圖片 CDN: Unsplash, Pixabay, iStock (next.config.ts 允許清單)
- 無自建 API routes — 全走外部 API
- 無 CI/CD pipeline — 純 Vercel 部署
- 無 Docker 配置
- `next.config.ts` 有 TODO: 統一圖片位置