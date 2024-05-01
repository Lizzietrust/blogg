'use client'

import { configureStore } from "@reduxjs/toolkit";
import profilePictureReducer from '../slices/profilePictureSlice'

const store = configureStore({
    reducer: {
        profilePicture: profilePictureReducer,
    },
});

export default store;