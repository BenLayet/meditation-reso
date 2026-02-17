import { defaultSettings } from "../../../domain/settings";
type Error = "LOAD_FAILED" | "SAVE_FAILED";

// Initial state definition
export const initialState = {
  isLoading: false,
  isSaving: false,
  settings: defaultSettings,
  errors: {} as Partial<Record<Error, true>>,
};
export type State = typeof initialState;
