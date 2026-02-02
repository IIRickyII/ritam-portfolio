import React, { useState, useEffect } from 'react';
import { 
  Microscope, 
  Cpu, 
  Database, 
  Code, 
  Linkedin, 
  Mail, 
  FileText, 
  MapPin, 
  ExternalLink, 
  ChevronDown, 
  Terminal,
  Dna,
  Zap,
  Menu,
  X,
  Bot,       // Added for Robotics
  Activity,  // Added for IoT
  Monitor,   // Added for Dashboard
  Instagram, // Added for Instagram
  Phone      // Added for Phone display
} from 'lucide-react';

// --- Data Constants ---

const PERSONAL_INFO = {
  name: "Ritam Biswas",
  title: "Nanotechnology Researcher & Data Scientist",
  tagline: "Bridging the gap between Nanoscale Physics and Machine Intelligence.",
  email: "ritam.biswas.10@gmail.com",
  phone: "+91 727-802-4495 | +46 76-444-3846",
  location: "Stockholm, Sweden",
  linkedin: "https://www.linkedin.com/in/ritam-biswas-56b5b715b",
  instagram: "https://www.instagram.com/ritam.biswas.10/",
  summary: "I operate at the intersection of nanotechnology, semiconductor physics, and machine intelligence. Currently an MS student at KTH Royal Institute of Technology, my journey spans from transforming legacy tech as a Product Developer to diving deep into the science of nanoscale materials. I thrive on collaborating with bright minds to turn complex problems into sustainable, human-centered technologies."
};

const PROJECTS = [
  {
    id: 1,
    title: "Automated Laboratory Robotic System",
    category: "Robotics & Automation",
    icon: Bot,
    type: "lab", // Purple theme
    description: "An open-source 3D gantry automation platform designed for precision biological experiments.",
    details: [
      "Integrated mechanical design, electronics, and software control.",
      "Developed serial/USB protocols for precision fluid handling using peristaltic pumps.",
      "Created Python-based control software for automated cell culture workflows."
    ]
  },
  {
    id: 2,
    title: "ML-Powered Predictive System",
    category: "Industrial R&D",
    icon: Monitor,
    type: "tech", // Cyan theme
    description: "A real-time monitoring solution for mainframe systems achieving 98% anomaly detection confidence.",
    details: [
      "Built full-stack dashboard using Java, Spring Boot, and Angular.",
      "Integrated AI/ML models with hardware systems for intelligent automation.",
      "Designed for high-scale industrial data visualization and analytics."
    ]
  },
  {
    id: 3,
    title: "IoT-Based Vital Signs Monitoring",
    category: "Biomedical Embedded Systems",
    icon: Activity,
    type: "lab", // Purple theme (Hardware/Bio focus)
    description: "Real-time physiological data acquisition system with integrated machine learning analysis.",
    details: [
      "Designed embedded systems for acquiring real-time patient data.",
      "Implemented ML pattern analysis for early warning detection.",
      "Integrated sensor platforms with computational analytics."
    ]
  }
];

const EXPERIENCE = [
  {
    id: 1,
    role: "Student Researcher",
    company: "KTH Division of Micro and Nanosystems",
    location: "Stockholm, Sweden",
    period: "Nov 2025 - Present",
    type: "research",
    description: "Working at the interface of nanotechnology, microfluidics, and neurobiology to advance organ-on-chip systems.",
    achievements: [
      "Developing an open-source 3D gantry system for automated metabolic assessment and drug delivery.",
      "Fabricating and testing microfluidic and lab-on-chip devices for biological experiments.",
      "Managing cell culture preparation and experimental setups for complex bio-assays.",
      "Conducting data collection and analysis to optimize experimental protocols."
    ]
  },
  {
    id: 2,
    role: "Product Developer 1",
    company: "BMC Software",
    location: "Pune, India",
    period: "May 2025 - July 2025",
    type: "industry",
    description: "Core R&D team member modernizing mainframe development environments using Java and AI.",
    achievements: [
      "Reduced syntax errors by 80% via improved grammars and semantic analysis.",
      "Increased parsing performance by 3-4x, enhancing UI responsiveness.",
      "Integrated GenAI-powered features to bring AI into traditional dev flows."
    ]
  },
  {
    id: 3,
    role: "Associate Product Developer",
    company: "BMC Software",
    location: "Pune, India",
    period: "July 2022 - May 2025",
    type: "industry",
    description: "Contributed to the evolution of BMC AMI DevX Workbench.",
    achievements: [
      "Migrated legacy automation scripts from REXX to Python.",
      "Improved grammar accuracy for COBOL editors.",
      "Resolved 150+ issues across releases, strengthening product reliability."
    ]
  },
  {
    id: 4,
    role: "Project Intern",
    company: "BMC Software",
    location: "Pune, India",
    period: "Jan 2022 - July 2022",
    type: "industry",
    description: "Developed predictive monitoring dashboards and automation tools for mainframe systems.",
    achievements: [
      "Developed a log analyzer dashboard using Java, Spring Boot, and Angular.",
      "Created CPU usage prediction models achieving 97% confidence using Python/ML.",
      "Integrated mainframe APIs to enable chatbot interactions directly from the dashboard."
    ]
  }
];

const EDUCATION = [
  {
    id: 1,
    degree: "MS in Nanotechnology",
    school: "KTH Royal Institute of Technology",
    period: "Aug 2025 - June 2027",
    focus: "Nanofabrication, Semiconductor Physics, MEMS"
  },
  {
    id: 2,
    degree: "MS in Data Science",
    school: "Manipal Academy of Higher Education",
    period: "Apr 2023 - Mar 2025",
    focus: "Machine Learning, Big Data, AI Foundations"
  },
  {
    id: 3,
    degree: "B.Tech in Electronics & Comm. Engineering",
    school: "RCC Institute of Information Technology",
    period: "July 2018 - July 2022",
    focus: "Electronics, Embedded Systems"
  }
];

const SKILLS = {
  lab: [
    "Nanotech & Lab",
    "Microfluidics",
    "Lab-on-a-Chip",
    "Laboratory Robotics",
    "Nanofabrication",
    "Semiconductors",
    "Photonics",
    "Spectroscopy",
    "Microscopy",
    "Device Testing"
  ],
  tech: [
    "Python (Data Science)",
    "Machine Learning",
    "Java",
    "AI/LLM Integration",
    "HTML/Web Dev",
    "Data Analysis",
    "Automation Scripts"
  ]
};

// --- Components ---

const Badge = ({ children, type }) => {
  const colors = type === 'lab' 
    ? "bg-purple-500/10 text-purple-300 border-purple-500/20" 
    : "bg-cyan-500/10 text-cyan-300 border-cyan-500/20";
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${colors} backdrop-blur-sm`}>
      {children}
    </span>
  );
};

const SectionHeading = ({ title, subtitle, icon: Icon }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-2">
      {Icon && <Icon className="w-6 h-6 text-cyan-400" />}
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{title}</h2>
    </div>
    <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full mb-4"></div>
    {subtitle && <p className="text-slate-400 max-w-2xl">{subtitle}</p>}
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Buffer for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-xl tracking-tighter text-white">
            Ritam<span className="text-cyan-400"> Biswas</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-slate-300 hover:text-cyan-400 transition-colors px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, '#contact')}
                className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 px-4 py-2 rounded-md text-sm font-bold transition-all cursor-pointer"
              >
                Contact Me
              </a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Buffer for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-16">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[20%] w-[200px] h-[200px] bg-blue-600/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Open to Research Opportunities
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Designing the Future <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Atom by Atom
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            {PERSONAL_INFO.tagline} A unique blend of <span className="text-cyan-300">Software Engineering</span> expertise and advanced <span className="text-purple-300">Nanotechnology</span> research.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="#experience" 
              onClick={(e) => scrollToSection(e, '#experience')}
              className="px-8 py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 cursor-pointer"
            >
              View Work <ChevronDown size={18} />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="px-8 py-3.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-all flex items-center justify-center gap-2">
              <Linkedin size={18} /> LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Abstract Visualization */}
        <div className="flex-1 w-full max-w-md md:max-w-full relative">
            <div className="relative aspect-square rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 shadow-2xl overflow-hidden group">
                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
                
                {/* Central Concept */}
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-6">
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] transform transition-transform group-hover:scale-105 duration-500">
                        <Dna size={48} className="text-purple-400" />
                    </div>
                    <div className="h-16 w-0.5 bg-gradient-to-b from-purple-500/50 to-cyan-500/50"></div>
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] transform transition-transform group-hover:scale-105 duration-500">
                        <Cpu size={48} className="text-cyan-400" />
                    </div>
                </div>

                {/* Floating Tags */}
                <div className="absolute top-8 left-8 bg-slate-800/80 px-3 py-1 rounded text-xs font-mono text-purple-300 border border-purple-500/30">Nanotechnology</div>
                <div className="absolute bottom-8 right-8 bg-slate-800/80 px-3 py-1 rounded text-xs font-mono text-cyan-300 border border-cyan-500/30">Data Science</div>
            </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceCard = ({ item, isLast }) => {
  return (
    <div className="relative pl-8 md:pl-0">
      {/* Timeline Line (Desktop) */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>
      
      {/* Mobile Line */}
      <div className="md:hidden absolute left-[11px] top-2 bottom-0 w-px bg-white/10"></div>
      
      {/* Timeline Dot */}
      <div className={`absolute left-0 md:left-1/2 w-6 h-6 rounded-full border-4 border-slate-950 shadow-[0_0_0_4px_rgba(30,41,59,0.5)] transform md:-translate-x-1/2 mt-1.5 z-10
        ${item.type === 'research' ? 'bg-purple-500' : 'bg-cyan-500'}`}></div>

      <div className={`flex flex-col md:flex-row gap-8 mb-12 ${isLast ? 'mb-0' : ''}`}>
        
        {/* Date Side */}
        <div className={`flex-1 md:text-right md:pr-12 ${item.id % 2 === 0 ? 'md:order-1' : 'md:order-1'}`}>
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-slate-400 mb-2">
            {item.period}
          </div>
          <h3 className="text-xl font-bold text-white">{item.role}</h3>
          <p className="text-cyan-400 font-medium mb-1">{item.company}</p>
          <div className="flex items-center md:justify-end gap-1 text-slate-500 text-sm">
            <MapPin size={14} /> {item.location}
          </div>
        </div>

        {/* Content Side - Swap order on desktop for visual balance if desired, keeping simple here */}
        <div className="flex-1 md:pl-12 md:order-1">
          <div className="bg-slate-900/50 border border-white/5 rounded-xl p-6 hover:border-white/10 transition-colors shadow-lg">
             <p className="text-slate-300 mb-4 italic">
                "{item.description}"
             </p>
             <ul className="space-y-2">
                {item.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.type === 'research' ? 'bg-purple-500' : 'bg-cyan-500'}`}></span>
                        <span>{ach}</span>
                    </li>
                ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
      <Navbar />
      
      <Hero />

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-slate-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* CORRECTED SUBTITLE BELOW */}
            <SectionHeading title="About Me" subtitle="A journey from binary code to nanotechnology." icon={FileText} />
            <p className="text-lg leading-relaxed text-slate-300 mb-8">
                {PERSONAL_INFO.summary}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="p-6 rounded-xl bg-slate-900 border border-white/5">
                    <Microscope className="w-8 h-8 text-purple-400 mb-4" />
                    <h3 className="font-bold text-white mb-2">Researcher</h3>
                    <p className="text-sm text-slate-400">Deeply involved in microfluidics and organ-on-chip technology at KTH.</p>
                </div>
                <div className="p-6 rounded-xl bg-slate-900 border border-white/5">
                    <Database className="w-8 h-8 text-cyan-400 mb-4" />
                    <h3 className="font-bold text-white mb-2">Data Scientist</h3>
                    <p className="text-sm text-slate-400">Master's degree holder capable of applying ML/AI to complex scientific datasets.</p>
                </div>
                <div className="p-6 rounded-xl bg-slate-900 border border-white/5">
                    <Terminal className="w-8 h-8 text-blue-400 mb-4" />
                    <h3 className="font-bold text-white mb-2">Engineer</h3>
                    <p className="text-sm text-slate-400">Ex-Product Developer with 3+ years experience in enterprise software & automation.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 md:py-32 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Professional Journey" subtitle="From enterprise software development to cutting-edge nanoscience research." icon={Terminal} />
          
          <div className="mt-16">
            {EXPERIENCE.map((item, index) => (
              <ExperienceCard key={item.id} item={item} isLast={index === EXPERIENCE.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Key Projects" subtitle="Technical achievements bridging software, automation, and biology." icon={Cpu} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group bg-slate-950 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/10 flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${project.type === 'lab' ? 'bg-purple-500/10 text-purple-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                      <project.icon size={24} />
                    </div>
                    <span className={`text-xs font-mono px-2 py-1 rounded border ${project.type === 'lab' ? 'border-purple-500/20 text-purple-300' : 'border-cyan-500/20 text-cyan-300'}`}>
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="space-y-3">
                    {project.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-500">
                        <span className={`mt-1 w-1 h-1 rounded-full flex-shrink-0 ${project.type === 'lab' ? 'bg-purple-500' : 'bg-cyan-500'}`}></span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Technical Arsenal" subtitle="The unique combination of wet-lab proficiency and software engineering." icon={Code} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                {/* Wet Lab */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Dna size={24} className="text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Nanotech & Lab</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {SKILLS.lab.map((skill) => (
                            <Badge key={skill} type="lab">{skill}</Badge>
                        ))}
                    </div>
                </div>

                {/* Computational */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                         <div className="p-2 bg-cyan-500/20 rounded-lg">
                            <Zap size={24} className="text-cyan-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Computation & Data</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {SKILLS.tech.map((skill) => (
                            <Badge key={skill} type="tech">{skill}</Badge>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 md:py-32 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Education" icon={ExternalLink} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {EDUCATION.map((edu) => (
                    <div key={edu.id} className="group p-6 rounded-xl bg-slate-950 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:-translate-y-1">
                        <div className="text-sm font-mono text-cyan-500 mb-2">{edu.period}</div>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{edu.school}</h3>
                        <div className="text-slate-300 font-medium mb-4">{edu.degree}</div>
                        <p className="text-sm text-slate-500 border-t border-white/5 pt-4">
                            Focus: {edu.focus}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-t from-slate-900 to-slate-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
            <p className="text-slate-400 mb-12 max-w-xl mx-auto">
                I am currently open to research collaborations, internships, and opportunities in the field of Nanotechnology, MEMS, and Microfluidics.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Email Block */}
                <a href={`mailto:${PERSONAL_INFO.email}`} className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all">
                    <div className="p-3 rounded-full bg-slate-900 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                        <Mail size={24} />
                    </div>
                    <div className="text-left">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Email</div>
                        <div className="text-white font-medium truncate w-full max-w-[200px]">{PERSONAL_INFO.email}</div>
                    </div>
                </a>

                 {/* Phone Block */}
                 <div className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/50 hover:bg-white/10 transition-all">
                    <div className="p-3 rounded-full bg-slate-900 group-hover:bg-green-600 group-hover:text-white transition-colors">
                        <Phone size={24} />
                    </div>
                    <div className="text-left">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Phone</div>
                        <div className="text-white font-medium text-sm flex flex-col">
                            <span>+91 727-802-4495</span>
                            <span>+46 76-444-3846</span>
                        </div>
                    </div>
                </div>

                {/* Location Block */}
                <div className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all">
                    <div className="p-3 rounded-full bg-slate-900 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <MapPin size={24} />
                    </div>
                    <div className="text-left">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Location</div>
                        <div className="text-white font-medium">{PERSONAL_INFO.location}</div>
                    </div>
                </div>

                {/* LinkedIn Block */}
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all">
                    <div className="p-3 rounded-full bg-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Linkedin size={24} />
                    </div>
                    <div className="text-left">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">LinkedIn</div>
                        <div className="text-white font-medium">Ritam Biswas</div>
                    </div>
                </a>

                {/* Instagram Block */}
                <a href={PERSONAL_INFO.instagram} target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/50 hover:bg-white/10 transition-all">
                    <div className="p-3 rounded-full bg-slate-900 group-hover:bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 group-hover:text-white transition-colors">
                        <Instagram size={24} />
                    </div>
                    <div className="text-left">
                        <div className="text-xs text-slate-500 uppercase tracking-wider">Instagram</div>
                        <div className="text-white font-medium">@ritam.biswas.10</div>
                    </div>
                </a>
            </div>

            <footer className="mt-20 pt-8 border-t border-white/5 text-slate-600 text-sm">
                <p>&copy; {new Date().getFullYear()} Ritam Biswas. Stockholm, Sweden.</p>
                <p className="mt-2">Built with React & Tailwind CSS.</p>
            </footer>
        </div>
      </section>
    </div>
  );
};

export default App;