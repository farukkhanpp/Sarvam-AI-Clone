import type { makeStore } from "@/store";

/** Store instance type, inferred from the store factory. */
export type AppStore = ReturnType<typeof makeStore>;
/** Root state type, inferred from the store. */
export type RootState = ReturnType<AppStore["getState"]>;
/** Typed dispatch (includes thunk support). */
export type AppDispatch = AppStore["dispatch"];
