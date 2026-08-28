import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar.jsx';
import Footer from '../components/layout/Footer.jsx';
import Hero from '../sections/Hero/Hero.jsx';
import About from '../sections/About/About.jsx';
import Skills from '../sections/Skills/Skills.jsx';
import Projects from '../sections/Projects/Projects.jsx';
import Experience from '../sections/Experience/Experience.jsx';
import Achievements from '../sections/Achievements/Achievements.jsx';
import Contact from '../sections/Contact/Contact.jsx';
import { setPageMeta } from '../utils/seo.js';

export default function Home() {
  useEffect(() => {
    setPageMeta(
      'Nitin Gupta | Software Developer',
      'Portfolio of Nitin Gupta — Software Developer and Full-Stack Developer.'
    );
  }, []);
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-blue-600 selection:text-white font-sans">
      {/* Global Sticky Navigation */}
      <Navbar />
      
      {/* Page Sections Composed */}
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
