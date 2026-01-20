import { createCRUDSlice } from './crudSliceFactory';
import * as endpoints from '../../Api/endpoints';

// Component
export const componentModule = createCRUDSlice('component', endpoints.componentAPI);
export const componentReducer = componentModule.reducer;
export const {
  fetchList: fetchComponents,
  fetchSingle: fetchComponent,
  createItem: createComponent,
  updateItem: updateComponent,
  deleteItem: deleteComponent,
  clearError: clearComponentError,
  clearSuccess: clearComponentSuccess,
  setCurrentItem: setCurrentComponent,
  clearCurrentItem: clearCurrentComponent,
} = componentModule.actions;

// Page Layout
export const pageLayoutModule = createCRUDSlice('pageLayout', endpoints.pageLayoutAPI);
export const pageLayoutReducer = pageLayoutModule.reducer;
export const {
  fetchList: fetchPageLayouts,
  fetchSingle: fetchPageLayout,
  createItem: createPageLayout,
  updateItem: updatePageLayout,
  deleteItem: deletePageLayout,
  clearError: clearPageLayoutError,
  clearSuccess: clearPageLayoutSuccess,
  setCurrentItem: setCurrentPageLayout,
  clearCurrentItem: clearCurrentPageLayout,
} = pageLayoutModule.actions;

// Page
export const pageModule = createCRUDSlice('page', endpoints.pageAPI);
export const pageReducer = pageModule.reducer;
export const {
  fetchList: fetchPages,
  fetchSingle: fetchPage,
  createItem: createPage,
  updateItem: updatePage,
  deleteItem: deletePage,
  clearError: clearPageError,
  clearSuccess: clearPageSuccess,
  setCurrentItem: setCurrentPage,
  clearCurrentItem: clearCurrentPage,
} = pageModule.actions;

// Section Layout
export const sectionLayoutModule = createCRUDSlice('sectionLayout', endpoints.sectionLayoutAPI);
export const sectionLayoutReducer = sectionLayoutModule.reducer;
export const {
  fetchList: fetchSectionLayouts,
  fetchSingle: fetchSectionLayout,
  createItem: createSectionLayout,
  updateItem: updateSectionLayout,
  deleteItem: deleteSectionLayout,
  clearError: clearSectionLayoutError,
  clearSuccess: clearSectionLayoutSuccess,
  setCurrentItem: setCurrentSectionLayout,
  clearCurrentItem: clearCurrentSectionLayout,
} = sectionLayoutModule.actions;

// Section
export const sectionModule = createCRUDSlice('section', endpoints.sectionAPI);
export const sectionReducer = sectionModule.reducer;
export const {
  fetchList: fetchSections,
  fetchSingle: fetchSection,
  createItem: createSection,
  updateItem: updateSection,
  deleteItem: deleteSection,
  clearError: clearSectionError,
  clearSuccess: clearSectionSuccess,
  setCurrentItem: setCurrentSection,
  clearCurrentItem: clearCurrentSection,
} = sectionModule.actions;

// Content
export const contentModule = createCRUDSlice('content', endpoints.contentAPI);
export const contentReducer = contentModule.reducer;
export const {
  fetchList: fetchContents,
  fetchSingle: fetchContent,
  createItem: createContent,
  updateItem: updateContent,
  deleteItem: deleteContent,
  clearError: clearContentError,
  clearSuccess: clearContentSuccess,
  setCurrentItem: setCurrentContent,
  clearCurrentItem: clearCurrentContent,
} = contentModule.actions;

// Category
export const categoryModule = createCRUDSlice('category', endpoints.categoryAPI);
export const categoryReducer = categoryModule.reducer;
export const {
  fetchList: fetchCategories,
  fetchSingle: fetchCategory,
  createItem: createCategory,
  updateItem: updateCategory,
  deleteItem: deleteCategory,
  clearError: clearCategoryError,
  clearSuccess: clearCategorySuccess,
  setCurrentItem: setCurrentCategory,
  clearCurrentItem: clearCurrentCategory,
} = categoryModule.actions;

// Content Layout
export const contentLayoutModule = createCRUDSlice('contentLayout', endpoints.contentLayoutAPI);
export const contentLayoutReducer = contentLayoutModule.reducer;
export const {
  fetchList: fetchContentLayouts,
  fetchSingle: fetchContentLayout,
  createItem: createContentLayout,
  updateItem: updateContentLayout,
  deleteItem: deleteContentLayout,
  clearError: clearContentLayoutError,
  clearSuccess: clearContentLayoutSuccess,
  setCurrentItem: setCurrentContentLayout,
  clearCurrentItem: clearCurrentContentLayout,
} = contentLayoutModule.actions;

// Menu
export const menuModule = createCRUDSlice('menu', endpoints.menuAPI);
export const menuReducer = menuModule.reducer;
export const {
  fetchList: fetchMenus,
  fetchSingle: fetchMenu,
  createItem: createMenu,
  updateItem: updateMenu,
  deleteItem: deleteMenu,
  clearError: clearMenuError,
  clearSuccess: clearMenuSuccess,
  setCurrentItem: setCurrentMenu,
  clearCurrentItem: clearCurrentMenu,
} = menuModule.actions;

// Menu Item
export const menuItemModule = createCRUDSlice('menuItem', endpoints.menuItemAPI);
export const menuItemReducer = menuItemModule.reducer;
export const {
  fetchList: fetchMenuItems,
  fetchSingle: fetchMenuItem,
  createItem: createMenuItem,
  updateItem: updateMenuItem,
  deleteItem: deleteMenuItem,
  clearError: clearMenuItemError,
  clearSuccess: clearMenuItemSuccess,
  setCurrentItem: setCurrentMenuItem,
  clearCurrentItem: clearCurrentMenuItem,
} = menuItemModule.actions;

// Product Category
export const productCategoryModule = createCRUDSlice('productCategory', endpoints.productCategoryAPI);
export const productCategoryReducer = productCategoryModule.reducer;
export const {
  fetchList: fetchProductCategories,
  fetchSingle: fetchProductCategory,
  createItem: createProductCategory,
  updateItem: updateProductCategory,
  deleteItem: deleteProductCategory,
  clearError: clearProductCategoryError,
  clearSuccess: clearProductCategorySuccess,
  setCurrentItem: setCurrentProductCategory,
  clearCurrentItem: clearCurrentProductCategory,
} = productCategoryModule.actions;

// Product
export const productModule = createCRUDSlice('product', endpoints.productAPI);
export const productReducer = productModule.reducer;
export const {
  fetchList: fetchProducts,
  fetchSingle: fetchProduct,
  createItem: createProduct,
  updateItem: updateProduct,
  deleteItem: deleteProduct,
  clearError: clearProductError,
  clearSuccess: clearProductSuccess,
  setCurrentItem: setCurrentProduct,
  clearCurrentItem: clearCurrentProduct,
} = productModule.actions;

// Product Info
export const productInfoModule = createCRUDSlice('productInfo', endpoints.productInfoAPI);
export const productInfoReducer = productInfoModule.reducer;
export const {
  fetchList: fetchProductInfos,
  fetchSingle: fetchProductInfo,
  createItem: createProductInfo,
  updateItem: updateProductInfo,
  deleteItem: deleteProductInfo,
  clearError: clearProductInfoError,
  clearSuccess: clearProductInfoSuccess,
  setCurrentItem: setCurrentProductInfo,
  clearCurrentItem: clearCurrentProductInfo,
} = productInfoModule.actions;

// Gallery
export const galleryModule = createCRUDSlice('gallery', endpoints.galleryAPI);
export const galleryReducer = galleryModule.reducer;
export const {
  fetchList: fetchGalleries,
  fetchSingle: fetchGallery,
  createItem: createGallery,
  updateItem: updateGallery,
  deleteItem: deleteGallery,
  clearError: clearGalleryError,
  clearSuccess: clearGallerySuccess,
  setCurrentItem: setCurrentGallery,
  clearCurrentItem: clearCurrentGallery,
} = galleryModule.actions;

// Banner
export const bannerModule = createCRUDSlice('banner', endpoints.bannerAPI);
export const bannerReducer = bannerModule.reducer;
export const {
  fetchList: fetchBanners,
  fetchSingle: fetchBanner,
  createItem: createBanner,
  updateItem: updateBanner,
  deleteItem: deleteBanner,
  clearError: clearBannerError,
  clearSuccess: clearBannerSuccess,
  setCurrentItem: setCurrentBanner,
  clearCurrentItem: clearCurrentBanner,
} = bannerModule.actions;

// Banner Content
export const bannerContentModule = createCRUDSlice('bannerContent', endpoints.bannerContentAPI);
export const bannerContentReducer = bannerContentModule.reducer;
export const {
  fetchList: fetchBannerContents,
  fetchSingle: fetchBannerContent,
  createItem: createBannerContent,
  updateItem: updateBannerContent,
  deleteItem: deleteBannerContent,
  clearError: clearBannerContentError,
  clearSuccess: clearBannerContentSuccess,
  setCurrentItem: setCurrentBannerContent,
  clearCurrentItem: clearCurrentBannerContent,
} = bannerContentModule.actions;

// Social
export const socialModule = createCRUDSlice('social', endpoints.socialAPI);
export const socialReducer = socialModule.reducer;
export const {
  fetchList: fetchSocials,
  fetchSingle: fetchSocial,
  createItem: createSocial,
  updateItem: updateSocial,
  deleteItem: deleteSocial,
  clearError: clearSocialError,
  clearSuccess: clearSocialSuccess,
  setCurrentItem: setCurrentSocial,
  clearCurrentItem: clearCurrentSocial,
} = socialModule.actions;

// Career
export const careerModule = createCRUDSlice('career', endpoints.careerAPI);
export const careerReducer = careerModule.reducer;
export const {
  fetchList: fetchCareers,
  fetchSingle: fetchCareer,
  createItem: createCareer,
  updateItem: updateCareer,
  deleteItem: deleteCareer,
  clearError: clearCareerError,
  clearSuccess: clearCareerSuccess,
  setCurrentItem: setCurrentCareer,
  clearCurrentItem: clearCurrentCareer,
} = careerModule.actions;

// Job Application
export const jobApplicationModule = createCRUDSlice('jobApplication', endpoints.jobApplicationAPI);
export const jobApplicationReducer = jobApplicationModule.reducer;
export const {
  fetchList: fetchJobApplications,
  fetchSingle: fetchJobApplication,
  createItem: createJobApplication,
  updateItem: updateJobApplication,
  deleteItem: deleteJobApplication,
  clearError: clearJobApplicationError,
  clearSuccess: clearJobApplicationSuccess,
  setCurrentItem: setCurrentJobApplication,
  clearCurrentItem: clearCurrentJobApplication,
} = jobApplicationModule.actions;
