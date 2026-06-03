import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandStorage } from "@/lib/stores/storage";

type PreferencesState = {
  onboardingCompleted: boolean;
  notificationsEnabled: boolean;
  completeOnboarding: () => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  reset: () => void;
};

const defaults = {
  onboardingCompleted: false,
  notificationsEnabled: true,
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      ...defaults,
      completeOnboarding: () => set({ onboardingCompleted: true }),
      setNotificationsEnabled: (enabled) =>
        set({ notificationsEnabled: enabled }),
      reset: () => set(defaults),
    }),
    {
      name: "preferences",
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
