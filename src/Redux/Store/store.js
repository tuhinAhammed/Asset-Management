import { configureStore } from '@reduxjs/toolkit'
import landingPageSlice from "../Slice/landingPageSlice.js"
import authSlice from "../Slice/authSlice.js"
import {
  componentReducer,
  pageLayoutReducer,
  pageReducer,
  sectionLayoutReducer,
  sectionReducer,
  contentReducer,
  categoryReducer,
  contentLayoutReducer,
  menuReducer,
  menuItemReducer,
  productCategoryReducer,
  productReducer,
  productInfoReducer,
  galleryReducer,
  bannerReducer,
  bannerContentReducer,
  socialReducer,
  careerReducer,
  jobApplicationReducer,
} from "../Slice/crudSlices.js"
import { settingsReducer, userProfileReducer } from "../Slice/settingsSlice.js"

export default configureStore({
  reducer: {
    landingPageData: landingPageSlice,
    auth: authSlice,
    component: componentReducer,
    pageLayout: pageLayoutReducer,
    page: pageReducer,
    sectionLayout: sectionLayoutReducer,
    section: sectionReducer,
    content: contentReducer,
    category: categoryReducer,
    contentLayout: contentLayoutReducer,
    menu: menuReducer,
    menuItem: menuItemReducer,
    productCategory: productCategoryReducer,
    product: productReducer,
    productInfo: productInfoReducer,
    gallery: galleryReducer,
    banner: bannerReducer,
    bannerContent: bannerContentReducer,
    social: socialReducer,
    career: careerReducer,
    jobApplication: jobApplicationReducer,
    settings: settingsReducer,
    userProfile: userProfileReducer,
  },
})