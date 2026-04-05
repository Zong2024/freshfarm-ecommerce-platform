# FreshFarm - 現代農產直銷電商平台

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Redux](https://img.shields.io/badge/Redux-RTK%20Query-764ABC?style=for-the-badge&logo=redux)](https://redux-toolkit.js.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Testing-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)

> **「從產地到餐桌，只有一個點擊的距離。」**
> FreshFarm 是一個基於 **Next.js 16 (App Router)** 與 **React 19** 構建的高效能電商平台。透過現代化的 Web 技術，我們致力於打破傳統農產供應鏈的隔閡，為在地小農提供直銷舞台，也為消費者帶來最新鮮、透明的購物選擇。

---

## 相關連結

- **Live Demo:** [👉 點此前往實作 Demo](https://freshfarm-ecommerce-platform.vercel.app/)
- **GitHub Repository:** [👉 專案原始碼](https://github.com/Zong2024/freshfarm-ecommerce-platform)

---

## 專案展示

<table>
  <tr>
    <td width="50%">
      <p align="center"><b>🏠 品牌首頁 (Responsive)</b></p>
      <img src="https://via.placeholder.com/800x450?text=Home+Page+Showcase" alt="Home Page">
      <p align="center"><i>Mobile-first 響應式設計，提供流暢的時令蔬果瀏覽體驗。</i></p>
    </td>
    <td width="50%">
      <p align="center"><b>🛒 智能購物車系統</b></p>
      <img src="https://via.placeholder.com/800x450?text=Shopping+Cart+Showcase" alt="Shopping Cart">
      <p align="center"><i>基於 Redux 持久化技術，實現跨頁面、即時更新的購物車邏輯。</i></p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <p align="center"><b>👨‍🌾 農民管理後台 (UI Prototype)</b></p>
      <img src="https://via.placeholder.com/800x450?text=Farmer+Dashboard" alt="Farmer Dashboard">
      <p align="center"><i>專為小農設計的產品上架與庫存管理系統 (介面實作中)。</i></p>
    </td>
    <td width="50%">
      <p align="center"><b>💳 結帳流程體驗</b></p>
      <img src="https://via.placeholder.com/800x450?text=Checkout+Flow" alt="Checkout Flow">
      <p align="center"><i>多步驟式 (Stepper) 結帳，確保訂單資訊準確並提升轉換率。</i></p>
    </td>
  </tr>
</table>

---

## 核心功能

### 消費者端 (B2C)

- **動態商品瀏覽：** 採用當季限定分組，結合高效能的商品列表過濾。
- **全方位購物車：** 支援即時數量調整、側邊欄預覽及持久化存儲（即使重新整理也不丟失）。
- **會員中心：** 包含訂單追蹤、個人資料維護及收藏清單管理。
- **流暢結帳流程：** 整合台灣行政區域選單，提供直觀的地址填寫與付款預覽。

### 生產者與管理端 (Admin/Farmer) - 🚧 進行中

- **角色權限系統 (UI)：** 不同權限對應專屬後台介面，目前已完成基礎路由與 UI 配置。
- **商品管理系統 (WIP)：** 串接六角學院 API 實作原型，支援基本的產品資料展示。
- **後台數據儀表板：** 視覺化展示銷售數據與訂單狀態 (設計稿階段)。

---

## 🚀 開發計畫與技術轉型

目前專案正處於從「前端原型」轉向「完整全棧」的過渡階段：

1. **API 現狀：** 暫時採用 **六角學院提供的電商 API** 進行業務邏輯驗證 (如：商品獲取、購物車計算)。
2. **下一步目標 (Next Step)：**
    - **遷移至 Supabase：** 計畫將資料庫與認證系統全面遷移至 Supabase，以獲得更高的資料控制權與自定義欄位能力。
    - **實作 Server Actions：** 配合 Next.js 16 特性，優化後台資料提交與狀態同步體驗。

---

## 技術亮點 (Engineering Deep Dive)

### 1. 尖端技術棧 (Modern Stack)

- **Next.js 16 (App Router):** 充分利用 **React Server Components (RSC)** 減少客戶端 JS 負擔，並透過頁面級別的 `Loading.tsx` 與 `Suspense` 提升 UI 感知效能。
- **React 19:** 採用最新版本的 React 特性，享受更優化的渲染機制與 Hooks 性能。
- **Tailwind CSS 4:** 使用最新的 v4 引擎，大幅提升編譯速度並精簡 CSS 體積。

### 2. 狀態管理與數據獲取

- **Redux Toolkit (RTK) & RTK Query:**
  - 透過 `baseApi` 統一管理 API 端點，實踐單一數據源 (Single Source of Truth)。
  - 利用 **Auto-fetching & Caching** 機制，避免重複的網路請求，降低後端壓力。
  - 實作 **Middleware (Listener)** 機制，在狀態變更時自動與 Cookies/LocalStorage 同步，確保跨頁面狀態一致。

### 3. 程式碼品質與穩定性

- **嚴謹類型檢查：** 全專案使用 TypeScript，確保組件 Props 與 API Response 的類型安全性，降低 Runtime Error。
- **測試驅動開發 (TDD Ready):** 整合 **Vitest** 與 **React Testing Library**，針對關鍵業務邏輯（如購物車計算）編寫單元測試。
- **自動化規格化：** 結合 ESLint、Prettier 與 `prettier-plugin-tailwindcss`，確保團隊開發風格高度統一。

---

## 🛠️ 開發與環境設定

### 前置準備

- Node.js 18.x 以上版本
- npm / pnpm / yarn 封裝管理器

### 安裝步驟

1. **複製專案：**

   ```bash
   git clone https://github.com/your-username/freshfarm.git
   cd freshfarm
   ```

2. **安裝依賴：**

   ```bash
   npm install
   ```

3. **設定環境變數：**
   建立 `.env.local` 並參考 `.env.example`（如果有）填入 API 位置：

   ```env
   NEXT_PUBLIC_API_URL=https://api.example.com
   NEXT_PUBLIC_API_PATH=/v1
   ```

4. **啟動開發伺服器：**

   ```bash
   npm run dev
   ```

### 執行測試

```bash
npm run test
```

---

## 🤝 聯繫我

如果你對此專案有任何興趣、建議，或是正在尋找熱衷於技術挑戰的前端工程師，歡迎透過以下方式聯繫：

- **Email:** [your-email@example.com]

---
