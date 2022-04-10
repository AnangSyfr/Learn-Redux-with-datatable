import { configureStore } from "@reduxjs/toolkit";
import menuSlices from "../features/menuSlices";

export const store = configureStore({
    reducer: {
        menu: menuSlices,
    },
});
