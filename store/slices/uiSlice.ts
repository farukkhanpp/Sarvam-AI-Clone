import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ConsentPreferences, UiState } from "@/types/ui";

const initialState: UiState = {
  online: true,
  consent: null, // set once the visitor chooses
  copyCount: 0,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setOnline(state, action: PayloadAction<boolean>) {
      state.online = action.payload;
    },
    setConsent(state, action: PayloadAction<ConsentPreferences | null>) {
      state.consent = action.payload;
    },
    codeCopied(state) {
      state.copyCount += 1;
    },
  },
});

export const { setOnline, setConsent, codeCopied } = uiSlice.actions;
export default uiSlice.reducer;
