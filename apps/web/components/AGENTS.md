# COMPONENTS KNOWLEDGE BASE

## OVERVIEW
Shared component library using the four-file pattern for modularity and testability.

## STRUCTURE
```
components/
├── layout/             # Global layout (Navbar, Footer, Sidebars)
├── shared/             # Business components (ProductCard, SearchBar, etc.)
│   └── <Component>/    # Four-file subdir: .tsx, .types.ts, index.ts, .test.tsx
├── ui/                 # shadcn/ui primitives (19 files)
├── AuthWrapper.tsx     # Auth state initialization
└── CartInitializer.tsx # Cart state initialization
```

## WHERE TO LOOK
| Component Type | Location | Pattern |
|----------------|----------|---------|
| Global Layout | `layout/` | Single file or simple structure |
| Business Logic | `shared/` | Four-file pattern (mandatory) |
| UI Primitives | `ui/` | shadcn/ui (do not edit manually) |
| App Wrappers | Root | Client-side initialization |

## CONVENTIONS
- **Four-file Pattern**: Every shared component must have:
  - `ComponentName.tsx`: Component logic and JSX.
  - `ComponentName.types.ts`: TypeScript interfaces and types.
  - `index.ts`: Barrel export (e.g., `export * from './ComponentName'`).
  - `ComponentName.test.tsx`: Vitest/React Testing Library tests.
- **Imports**: Use barrel exports. Import from `@/components/shared/ProductCard`, not the deep path.
- **Naming**: PascalCase for directories and component files.
- **Colocation**: Keep styles (Tailwind) and tests with the component.

## ANTI-PATTERNS
- ❌ **Manual UI Edits**: Do not modify `components/ui/` files. Use `npx shadcn` for updates.
- ❌ **Deep Imports**: Avoid importing from `.tsx` files directly. Use `index.ts`.
- ❌ **Inline Types**: Do not define props inside `.tsx`. Use `.types.ts`.
- ❌ **Missing Tests**: New shared components must include a `.test.tsx` file.
- ❌ **Business Logic in UI**: Keep `ui/` components purely presentational.
