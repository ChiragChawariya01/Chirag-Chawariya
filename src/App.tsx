/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Terminal, 
  Layout, 
  Video, 
  Smartphone, 
  Moon, 
  Sun, 
  ChevronRight,
  Send,
  MapPin,
  GraduationCap,
  Award
} from 'lucide-react';

const TypingEffect = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
      {`${texts[index].substring(0, subIndex)}`}
      <span className="animate-pulse">|</span>
    </span>
  );
};

interface SkillBarProps {
  name: string;
  level: number;
  icon: any;
  key?: string;
}

const SkillBar = ({ name, level, icon: Icon }: SkillBarProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-blue-500" />
          <span className="font-medium text-gray-700 dark:text-gray-300">{name}</span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">{level}%</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </div>
    </div>
  );
};

const ProjectCard = ({ title, description, link, tags }: { title: string, description: string, link: string, tags: string[] }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          View Project <ExternalLink size={14} />
        </a>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const skills = [
    { name: "Web Development", level: 90, icon: Code2 },
    { name: "Python Programming", level: 85, icon: Terminal },
    { name: "App Development", level: 75, icon: Smartphone },
    { name: "UI/UX Design", level: 80, icon: Layout },
    { name: "Content Creation", level: 85, icon: Video },
  ];

  const projects = [
    {
      title: "Granth.in",
      description: "My personal project and website built with modern web technologies focusing on knowledge sharing.",
      link: "https://granth.in",
      tags: ["Web Design", "SEO", "Content"]
    },
    {
      title: "Python Automation Tool",
      description: "A suite of scripts designed to automate repetitive tasks and improve workflow efficiency.",
      link: "#",
      tags: ["Python", "Automation", "CLI"]
    },
    {
      title: "Modern Portfolio",
      description: "A futuristic AI-inspired portfolio showcasing clean UI/UX and smooth animations.",
      link: "#",
      tags: ["React", "Tailwind", "Motion"]
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50 origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-black tracking-tighter"
          >
            CHIRAG<span className="text-blue-500">.</span>
          </motion.div>
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
              <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
              <a href="#skills" className="hover:text-blue-500 transition-colors">Skills</a>
              <a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a>
              <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-all"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
          {/* Background Elements */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-widest text-sm uppercase mb-4">Welcome to my universe</h2>
              <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-none">
                I'm Chirag, a <br />
                <TypingEffect texts={["Developer", "Student", "Creator", "Designer"]} />
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                Building modern websites and apps with a focus on UI/UX and clean code. 
                Currently pursuing BCA at Om Sterling Global University.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a 
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 group"
                >
                  View My Work <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-gray-200 dark:border-gray-800 rounded-full font-bold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  Get in Touch
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 bg-gray-50/50 dark:bg-gray-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tight">About Me</h2>
                <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                  <p>
                    I am a passionate web developer and content creator based in Hisar, Haryana. 
                    Currently, I'm in my 1st year (2nd Semester) of BCA at Om Sterling Global University.
                  </p>
                  <p>
                    My journey in tech is driven by a love for building modern websites and apps. 
                    With strong skills in Python and web design, I enjoy the process of turning 
                    complex problems into simple, beautiful, and intuitive designs.
                  </p>
                  <p>
                    Beyond coding, I am an active content creator, sharing my knowledge and 
                    experiences online to help others grow in their tech journey.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mt-10">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Education</h4>
                      <p className="text-sm">BCA, OSGU</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Location</h4>
                      <p className="text-sm">Hisar, Haryana</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Certified</h4>
                      <p className="text-sm">Website Design</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-[calc(1.5rem-4px)] bg-white dark:bg-black overflow-hidden flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Code2 size={48} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-black mb-2">Student & Dev</h3>
                      <p className="text-gray-500">Om Sterling Global University</p>
                    </div>
                  </div>
                </div>
                {/* Floating Stats */}
                <div className="absolute -bottom-6 -right-6 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
                  <div className="text-3xl font-black text-blue-600">1st</div>
                  <div className="text-xs uppercase tracking-widest font-bold text-gray-500">Year BCA</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">My Expertise</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                I've spent years honing my skills in various technologies to build 
                high-quality digital products.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                {skills.slice(0, 3).map(skill => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} icon={skill.icon} />
                ))}
              </div>
              <div>
                {skills.slice(3).map(skill => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} icon={skill.icon} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 bg-gray-50/50 dark:bg-gray-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Featured Projects</h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                  A selection of my recent work, ranging from personal projects to 
                  professional certifications.
                </p>
              </div>
              <a href="#" className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-2 hover:underline">
                View all projects <ChevronRight size={18} />
              </a>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LinkedIn Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-16 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Linkedin size={200} />
              </div>
              
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-bold mb-6">
                    <Linkedin size={16} /> message/contact me at linkedIn username chirag chawariya(prompt engineer in bio)
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Let's Network on LinkedIn</h2>
                  <p className="text-blue-50 mb-8 text-lg opacity-90">
                    I'm actively sharing my journey as a developer and insights into prompt engineering. 
                    Let's connect and grow our professional network together!
                  </p>
                  <motion.a 
                    href="https://www.linkedin.com/in/chirag-chawariya"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-700 rounded-full font-bold shadow-xl"
                  >
                    <Linkedin size={20} /> Connect Now
                  </motion.a>
                </div>
                
                <div className="aspect-video rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group cursor-pointer overflow-hidden p-8">
                  <div className="w-full h-full rounded-xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-2xl font-bold">C</div>
                      <div>
                        <div className="font-bold text-xl">Chirag Chawariya</div>
                        <div className="text-sm text-blue-200">Prompt Engineer | Web Developer</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-white/10 rounded" />
                      <div className="h-2 w-3/4 bg-white/10 rounded" />
                      <div className="h-2 w-1/2 bg-white/10 rounded" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-blue-200">500+ connections</div>
                      <div className="px-4 py-1 rounded-full bg-blue-500 text-xs font-bold">Follow</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 bg-gray-50/50 dark:bg-gray-900/20">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Let's Connect</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Have a project in mind or just want to say hi? Feel free to reach out!
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Mail size={24} />
                  </div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p className="text-sm text-gray-500">chawariyachirag12@gmail.com</p>
                </div>
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Linkedin size={24} />
                  </div>
                  <h4 className="font-bold mb-1">LinkedIn</h4>
                  <p className="text-sm text-gray-500">Chirag</p>
                </div>
                <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Github size={24} />
                  </div>
                  <h4 className="font-bold mb-1">GitHub</h4>
                  <p className="text-sm text-gray-500">ChiragDev</p>
                </div>
              </div>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Name</label>
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      className="w-full px-6 py-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email</label>
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      className="w-full px-6 py-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Tell me about your project..."
                    className="w-full px-6 py-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-blue-500 outline-none transition-colors resize-none"
                  />
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                >
                  Send Message <Send size={18} />
                </motion.button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="text-xl font-black tracking-tighter mb-2">
              CHIRAG<span className="text-blue-500">.</span>
            </div>
            <p className="text-sm text-gray-500">© 2026 Chirag. All rights reserved.</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="p-2 text-gray-500 hover:text-blue-500 transition-colors"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/chirag-chawariya" className="p-2 text-gray-500 hover:text-blue-500 transition-colors"><Linkedin size={20} /></a>
            <a href="mailto:chawariyachirag12@gmail.com" className="p-2 text-gray-500 hover:text-blue-500 transition-colors"><Mail size={20} /></a>
          </div>
          
          <div className="text-sm font-medium text-gray-500">
            Built with React & Tailwind
          </div>
        </div>
      </footer>
    </div>
  );
}
