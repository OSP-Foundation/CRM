import { configureStore } from "@reduxjs/toolkit";
import user from "./user";

const store = configureStore({
    reducer: {
        user
    }
})

export default store