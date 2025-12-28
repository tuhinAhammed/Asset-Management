const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DOMAIN_NAME = import.meta.env.VITE_API_DOMAIN_NAME;
export const api = DOMAIN_NAME
const baseApi = BASE_URL
export const bannerApi = `${baseApi}/banner`;
export const serviceListApi = `${baseApi}/services`;
export const singleServiceApi = `${baseApi}/service/`;
export const productListApi = `${baseApi}/products`;
export const faqDataApi = `${baseApi}/faqs`;
export const testimonialsApi = `${baseApi}/testimonials `;
export const contactSubmitApi = `${baseApi}/contact `;
export const blogsApi = `${baseApi}/blogs  `;
export const singleBlogApi = `${baseApi}/blog/`; //id
export const teammembers = `${baseApi}/team-members  `;
export const subscriptionPost = `${baseApi}/subscribe`;
export const langingPageApi = `${baseApi}/settings`;
export const projectsList = `${baseApi}/products `;
export const singleProject = `${baseApi}/product/`;
export const categoryListApi = `${baseApi}/active-categories`;



export const toastr_position = "top-right"