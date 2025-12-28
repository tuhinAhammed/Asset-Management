import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import Home from './Pages/Home.jsx';
import Contact from './Pages/Contact.jsx';
// import UserContact from "./Pages/UserContact.jsx";
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


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
<Provider store={store}>

  <BrowserRouter>
    <Routes>
      <Route  element={<RootLayout />} >
      <Route path="/" element={<Home />} />
      <Route path="contact" element={<Contact />} />
      {/* <Route path="contact/user-contact" element={<UserContact />} /> */}
      <Route path="services" element={<Services />} />
      <Route path="service/:slug" element={<SingleService />} />
      <Route path="team" element={<Team />} />
      <Route path="testimonials" element={<Testimonials />} />
      <Route path="faqs" element={<Faqs />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="blog/:id" element={<SingleBlogPage />} />
      <Route path="projects" element={<Projects />} />
      <Route path="project/:id" element={<SingleProject />} />
      <Route path="about-us" element={<About />} />
      <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </BrowserRouter>,
</Provider>
  
);
