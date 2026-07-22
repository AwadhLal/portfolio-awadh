import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Projects from '../components/Projects.jsx';
import Experience from '../components/Experience.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';
import Loader from '../components/Loader.jsx';
import {
  getProfile, getProjects, getSkills, getExperience, getEducation, getTestimonials,
} from '../services/api';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const results = await Promise.allSettled([
        getProfile(), getProjects(), getSkills(), getExperience(), getEducation(), getTestimonials(),
      ]);
      const [profile, projects, skills, experience, education, testimonials] = results.map((r) =>
        r.status === 'fulfilled' ? r.value.data.data : null
      );
      setData({ profile, projects: projects || [], skills: skills || [], experience: experience || [], education: education || [], testimonials: testimonials || [] });
    }
    load();
  }, []);

  if (!data) return <Loader label="Loading portfolio" />;

  return (
    <div>
      <Navbar name={data.profile?.full_name} />
      <Hero profile={data.profile} projectCount={data.projects.length} skillCount={data.skills.length} />
      <About profile={data.profile} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Experience experience={data.experience} education={data.education} />
      <Testimonials testimonials={data.testimonials} />
      <Contact profile={data.profile} />
      <Footer profile={data.profile} />
    </div>
  );
}
