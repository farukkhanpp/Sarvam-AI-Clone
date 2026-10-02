# Sarvam AI homepage – Next.js + TypeScript

Stack: **Next.js 14 (App Router)** · **TypeScript (strict)** · **Redux Toolkit** · **React-Toastify**

## Run
```bash
npm install
npm run dev          # http://localhost:3000
npm run type-check   # tsc --noEmit
npm run build && npm start
```

## Structure
```
app/
  layout.tsx          metadata (typed), fonts/CSS links, providers
  page.tsx            renders the homepage markup
  globals.css
components/
  Providers.tsx       Redux <Provider> + <ToastContainer>
  AppBridge.tsx       listens to site events -> Redux + toasts
  OfflineBanner.tsx   banner shown while the visitor is offline
store/
  index.ts            makeStore()
  hooks.ts            useAppDispatch / useAppSelector / useAppStore (typed)
  slices/uiSlice.ts   online status, cookie consent, copy count
types/
  ui.ts               ConsentPreferences, UiState
  store.ts            AppStore, RootState, AppDispatch
  global.d.ts         typed window events (sarvam:consent-updated)
  index.ts            re-exports
lib/bodyHtml.ts       homepage markup (unchanged)
public/               static assets (incl. prebuilt _astro bundles)
```

## Notes
- `public/_astro/*.js` are prebuilt, minified third-party bundles (static assets, not source),
  so they stay as `.js`.
- `next.config.mjs` stays `.mjs` because Next 14 does not support `next.config.ts`
  (that arrived in Next 15).
