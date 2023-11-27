import { create } from "zustand";
import { persist } from "zustand/middleware";
let BearStore = (set) => ({
    dopen: true,
    updateOpen: (dopen) => set({ dopen }),
});
BearStore = persist(BearStore, { name: "my_app_store" });

export const useBearStore = create(BearStore);


