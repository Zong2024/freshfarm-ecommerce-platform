import os

def create_component(name: str, category: str = "common"):
    """
    建立標準組件資料夾 (Folder-per-component)。
    包含: .tsx, .types.ts, index.ts, .test.tsx
    """
    # 路徑定位於 components
    target_dir = f"components/{category}/{name}"
    os.makedirs(target_dir, exist_ok=True)

    # 1. Component.tsx (使用 shadcn/ui 規範與 Tailwind v4)
    tsx = f"""import {{ {name}Props }} from './{name}.types';
import {{ cn }} from '@/lib/utils';

export const {name} = ({{ className, children }}: {name}Props) => {{
  return (
    <div className={{cn("flex flex-col", className)}}>
      {{children}}
    </div>
  );
}};
"""

    # 2. Component.types.ts
    types = f"""import {{ ReactNode }} from 'react';

export interface {name}Props {{
  children?: ReactNode;
  className?: string;
}}
"""

    # 3. index.ts
    index = f"""export * from './{name}';
export * from './{name}.types';
"""

    # 4. Component.test.tsx (基於 Vitest)
    test = f"""import {{ render, screen }} from '@testing-library/react';
import {{ describe, it, expect }} from 'vitest';
import {{ {name} }} from './{name}';

describe('{name} Component', () => {{
  it('should render children correctly', () => {{
    render(<{name}>Test Content</{name}>);
    expect(screen.getByText(/Test Content/i)).toBeDefined();
  }});
}});
"""

    # 檔案寫入
    files = {
        f"{name}.tsx": tsx,
        f"{name}.types.ts": types,
        "index.ts": index,
        f"{name}.test.tsx": test
    }

    for filename, content in files.items():
        with open(os.path.join(target_dir, filename), "w", encoding="utf-8") as f:
            f.write(content)

    return f"Successfully created {name} in {target_dir}"

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        name = sys.argv[1]
        category = sys.argv[2] if len(sys.argv) > 2 else "shared"
        print(create_component(name, category))
    else:
        print("Usage: python3 component_wizard.py <name> [category]")
