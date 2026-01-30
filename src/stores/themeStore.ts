import { create } from "zustand";
import { COLORS } from "../lib/theme";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  colors: typeof COLORS.light;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  colors: COLORS.light,
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      return { theme: newTheme, colors: COLORS[newTheme] };
    }),
  setTheme: (theme) => set({ theme, colors: COLORS[theme] }),
}));
