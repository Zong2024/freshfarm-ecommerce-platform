# FreshFarm 開發環境設定指南

## 前置需求

- Node.js 18+
- pnpm 10+
- Docker（用於 PostgreSQL）
- NestJS CLI（可選）: `npm i -g @nestjs/cli`

## 快速啟動

### 1. 安裝依賴

```bash
pnpm install
```

### 2. 啟動 PostgreSQL

```bash
pnpm docker:up
```

這會啟動一個 PostgreSQL 16 容器：
- 主機：localhost
- 埠號：5432
- 帳號：postgres
- 密碼：password
- 資料庫：freshfarm

### 3. 設定環境變數

```bash
cp .env.example .env
```

編輯 `.env`，確認以下設定：

```env
# 資料庫（Docker Compose 預設值）
DATABASE_URL=postgresql://postgres:password@localhost:5432/freshfarm

# JWT（開發用，請替換為安全金鑰）
JWT_SECRET=dev-jwt-secret-change-in-production

# NestJS API URL
NEXT_PUBLIC_NEST_API_URL=http://localhost:3001

# 功能開關：是否使用 NestJS API
NEXT_PUBLIC_USE_NEST_API=false

# 外部 API（HexSchool，過渡期使用）
NEXT_PUBLIC_API_URL=https://vue3-course-api.hexschool.io/v2
NEXT_PUBLIC_API_PATH=/freshfarm01
```

### 4. 植入種子資料

```bash
pnpm seed
```

這會建立 8 筆範例商品資料。

### 5. 啟動開發伺服器

```bash
# 同時啟動前後端
pnpm dev

# 或分別啟動
pnpm --filter @freshfarm/api dev    # 後端 (port 3001)
pnpm --filter @freshfarm/web dev    # 前端 (port 3000)
```

### 6. 切換到 NestJS API

在 `.env` 中設定：

```env
NEXT_PUBLIC_USE_NEST_API=true
```

重啟前端開發伺服器即可。

## API 端點

### NestJS 後端 (port 3001)

| 端點 | 方法 | 說明 |
|------|------|------|
| `/health` | GET | 健康檢查 |
| `/api/docs` | GET | Swagger 文件 |
| `/products` | GET | 商品列表（分頁） |
| `/products/all` | GET | 所有商品（不分頁） |
| `/products/:id` | GET | 單一商品 |
| `/auth/login` | POST | 登入 |
| `/auth/profile` | GET | 使用者資料（需 JWT） |

### HexSchool API（過渡期使用）

前端預設使用 HexSchool API，透過 `NEXT_PUBLIC_USE_NEST_API` 切換。

## 常用指令

```bash
# 型別檢查
pnpm typecheck

# 建置
pnpm build

# 測試
pnpm test

# 停止 PostgreSQL
pnpm docker:down

# 清除快取
pnpm clean
```

## Supabase 設定（未來）

當 Supabase 專案建立後，在 `.env` 中加入：

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

然後安裝 Supabase 套件：

```bash
pnpm --filter @freshfarm/web add @supabase/supabase-js
```

## 架構概覽

```
freshfarm/
├── apps/
│   ├── web/          # Next.js 16 前端 (port 3000)
│   └── api/          # NestJS 後端 (port 3001)
├── packages/
│   ├── types/        # 共享型別 (@freshfarm/types)
│   ├── utils/        # 共享工具 (@freshfarm/utils)
│   └── ui/           # 共享 UI (@freshfarm/ui)
├── docker-compose.yml # PostgreSQL 開發環境
├── turbo.json         # Turborepo 設定
└── pnpm-workspace.yaml
```