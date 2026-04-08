---
name: component-wizard
description: 自動化建立符合 Next.js 16 規範的「四檔結構」組件（邏輯、型別、入口、測試）
---

# Component Wizard - 規範文件

本技能用於確保專案中所有 React 組件皆遵循嚴格的架構規範與檔案目錄結構，避免手動建立檔案造成的遺漏。

## 使用時機

- 當使用者要求「建立組件」、「新增 UI」或「重構組件結構」時。
- 當需要符合 Next.js 16 (App Router) 與 Tailwind CSS v4 規範的樣板 (Boilerplate) 時。

## 輸入參數

1. **name**: 組件名稱（大駝峰拼寫，例如 `ProductCard`）。
2. **category** (選填): 存放於 `components/` 下的分層資料夾（預設為 `shared`）。
3. **custom_path** (選填): 若提供，則忽略 category，直接建立在該路徑下（適用於頁面專用組件）。

## 執行步驟

1. **路徑判定**：
   - 有 `custom_path`：`{custom_path}/{name}/`
   - 無 `custom_path`：`components/{category}/{name}/`
2. **目錄建立**：確保目標目錄及其父目錄存在。
3. **檔案生成**：在目標目錄下生成以下四個檔案，內容需嚴格遵守「檔案範本」。

---

## 檔案範本規範

### 1. `{name}.tsx` (邏輯)

```tsx
import { cn } from '@/lib/utils';
import { {name}Props } from './{name}.types';

export const {name} = ({ className, children }: {name}Props) => {
  return (
    <div className={cn("flex flex-col", className)}>
      {children}
    </div>
  );
};
```

### 2. `{name}.types.ts` (強型別定義)

```typescript
import { ReactNode } from 'react';

export interface {name}Props {
  children?: ReactNode;
  className?: string;
}
```

### 3. `index.ts` (統一入口)

```typescript
export * from "./{name}";
export * from "./{name}.types";
```

### 4. `{name}.test.tsx` (Vitest 測試)

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { {name} } from './{name}';

describe('{name} Component', () => {
  it('should render children correctly', () => {
    render(<{name}>Test Content</{name}>);
    expect(screen.getByText(/Test Content/i)).toBeDefined();
  });
});
```

---

## 限制與約束

- **禁止手動建立**：除非有極特殊需求，否則必須優先使用此規範產出組件。
- **型別安全**：嚴禁使用 `any`，所有 Props 必須在 `.types.ts` 中明確定義。
- **測試要求**：每個產出的組件必須包含基礎的渲染測試。
