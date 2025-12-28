import { configureStore } from '@reduxjs/toolkit'
import landingPageSlice from "../Slice/landingPageSlice.js"
export default configureStore({
  reducer: {
    landingPageData : landingPageSlice,

  },
})