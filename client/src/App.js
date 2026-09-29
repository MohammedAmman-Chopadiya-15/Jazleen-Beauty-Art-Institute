import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';
import Gallery from './pages/Gallery/Gallery';
import AdminLogin from './Administration/AdminLogin/AdminLogin';
import AdminGallery from './Administration/AdminGallery/AdminGallery';
import AddVideo from './Administration/AddVideo/AddVideo';
import Courses from './pages/Courses/Courses';
import AdminDashboard from './Administration/AdminDashboard/AdminDashboard';
import AdminCourses from './Administration/AdminCourses/AdminCourses';
import AddCarousel from './Administration/AddCarousel/AddCarousel';
// import Dancing from './pages/Courses/Dancing/Dancing';

function App() {
    return (
    <HelmetProvider>

        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about-us" element={<AboutUs />} />
                {/* <Route path="/courses/dancing" element={<Dancing />} /> */}
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/gallery" element={<Gallery/>} />
                <Route path="/courses/:category" element={<Courses/>} />

                {/* Admin side */}
                <Route path="/admin-dashboard" element={<AdminDashboard/>} />
                <Route path="/admin-gallery" element={<AdminGallery/>} />
                <Route path="/admin-login" element={<AdminLogin/>} />
                <Route path="/admin/add-video" element={<AddVideo/>} />
                <Route path="/admin-courses" element={<AdminCourses/>} />
                <Route path="/admin-add-carousel" element={<AddCarousel/>} />
            </Routes>
        </Router>
    </HelmetProvider>

    );
}

export default App;
