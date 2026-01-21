import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import Home from './Pages/Home.jsx';
import Contact from './Pages/Contact.jsx';
import RootLayout from "./RootLayout.jsx";
import Services from "./Pages/Services.jsx";
import Team from "./Pages/Team.jsx";
import Testimonials from "./Pages/Testimonials.jsx";
import Faqs from "./Pages/Faqs.jsx";
import SingleBlogPage from "./Pages/SingleBlogPage.jsx";
import Blogs from "./Pages/Blogs.jsx";
import { Provider } from "react-redux";
import store from "./Redux/Store/store.js";
import Projects from "./Pages/Projects.jsx";
import SingleProject from "./Pages/SingleProject.jsx";
import About from "./Pages/About.jsx";
import Error from "./Pages/Error.jsx";
import SingleService from "./Pages/SingleService.jsx";
import OurStory from "./Pages/OurStory.jsx";
import WhyUs from "./Pages/WhyUs.jsx";
import OurBusiness from "./Pages/OurBusiness.jsx";
import Career from "./Pages/Career.jsx";

// Admin Pages
import AdminLayout from './Components/Admin/AdminLayout.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import Login from './Pages/Admin/Login.jsx';
import Dashboard from './Pages/Admin/Dashboard.jsx';
import Products from './Pages/Admin/Products.jsx';
import Categories from './Pages/Admin/Categories.jsx';
import Pages from './Pages/Admin/Pages.jsx';
import Banners from './Pages/Admin/Banners.jsx';
import Careers from './Pages/Admin/Careers.jsx';
import Components from './Pages/Admin/Components.jsx';
import Menu from './Pages/Admin/Menu.jsx';
import Content from './Pages/Admin/Content.jsx';
import Profile from './Pages/Admin/Profile.jsx';
import ChangePassword from './Pages/Admin/ChangePassword.jsx';
import Settings from './Pages/Admin/Settings.jsx';

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
<Provider store={store}>

  <BrowserRouter>
    <Routes>
      {/* Website Routes */}
      <Route  element={<RootLayout />} >
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="services" element={<Services />} />
        <Route path="service/:slug" element={<SingleService />} />
        <Route path="our-team" element={<Team />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blog/:id" element={<SingleBlogPage />} />
        <Route path="projects" element={<Projects />} />
        <Route path="project/:id" element={<SingleProject />} />
        <Route path="about-us" element={<About />} />
        <Route path="why-us" element={<WhyUs />} />
        <Route path="our-business" element={<OurBusiness />} />
        <Route path="career" element={<Career />} />
        <Route path="our-story" element={<OurStory />} />
        <Route path="*" element={<Error />} />
      </Route>

      {/* Admin Routes */}
      <Route path="admin/login" element={<Login />} />
      <Route 
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        } 
      >
        <Route path="admin/dashboard" element={<Dashboard />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/categories" element={<Categories />} />
        <Route path="admin/pages" element={<Pages />} />
        <Route path="admin/banners" element={<Banners />} />
        <Route path="admin/careers" element={<Careers />} />
        <Route path="admin/components" element={<Components />} />
        <Route path="admin/menu" element={<Menu />} />
        <Route path="admin/content" element={<Content />} />
        <Route path="admin/profile" element={<Profile />} />
        <Route path="admin/change-password" element={<ChangePassword />} />
        <Route path="admin/settings" element={<Settings />} />
      </Route>
    </Routes>
  </BrowserRouter>
</Provider>
  
);
