# LIB KNOWLEDGE BASE

## OVERVIEW
Centralized state management, RTK Query services, and domain utilities.

## STRUCTURE
```
lib/
├── filters/          # Product filtering logic
├── store/            # Redux Toolkit + RTK Query
│   ├── features/     # State slices (auth, cart)
│   ├── services/     # API endpoints (baseApi + resource endpoints)
│   ├── middleware/   # Persistence (cookie/localStorage sync)
│   ├── store.ts      # Store config
│   └── hooks.ts      # Typed hooks
├── constants.ts      # Global constants
├── utils.ts          # Shared helpers (cn, formatting)
└── taiwan-regions.ts # Checkout form data
```

## WHERE TO LOOK
- API endpoints: `store/services/` (extends `baseApi.ts`)
- Global state: `store/features/`
- Persistence logic: `store/middleware/`
- Typed hooks: `store/hooks.ts`
- Product filters: `filters/product.ts`
- Provider wrapper: `store/StoreProvider.tsx`

## CONVENTIONS
- Always import `useAppDispatch` and `useAppSelector` from `hooks.ts`.
- Inject endpoints into `baseApi` instead of creating new APIs.
- UI state belongs in slices. API data stays in RTK Query cache.
- Put utility tests in `*.test.ts` files next to code.
- Store magic strings in `constants.ts`.
- Use `lib/utils.ts` for tailwind-merge and clsx logic.

## ANTI-PATTERNS
- Don't use standard `useDispatch` or `useSelector`.
- Avoid `fetch` calls. Stick to RTK Query.
- Keep API response types out of components.
- Manual localStorage syncing is forbidden. Use middleware.
- Skip barrel files at the `lib/` root level.
- Never import from `lib/store/store.ts` directly in components.
