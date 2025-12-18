import { create } from 'zustand';

// Type definitions for resume data
export interface SocialLinks {
  github: string;
  linkedin: string;
  portfolio: string;
  twitter: string;
}

export interface Skill {
  id: string;
  name: string;
  proficiency: number; // 1-100
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface ResumeData {
  // Header
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;

  // Profile
  summary: string;

  // Skills
  skills: Skill[];

  // Experience
  experiences: Experience[];

  // Education
  education: Education[];

  // Projects
  projects: Project[];

  // Social Links
  socialLinks: SocialLinks;
}

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Initial state with empty data
const initialState: ResumeData = {
  name: '',
  role: '',
  location: '',
  email: '',
  phone: '',
  summary: '',
  skills: [],
  experiences: [],
  education: [],
  projects: [],
  socialLinks: {
    github: '',
    linkedin: '',
    portfolio: '',
    twitter: '',
  },
};

// Store actions interface
interface ResumeStore extends ResumeData {
  // Header actions
  setName: (name: string) => void;
  setRole: (role: string) => void;
  setLocation: (location: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;

  // Summary actions
  setSummary: (summary: string) => void;

  // Skills actions
  addSkill: (name: string, proficiency?: number) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  // Experience actions
  addExperience: () => void;
  updateExperience: (id: string, updates: Partial<Experience>) => void;
  removeExperience: (id: string) => void;

  // Education actions
  addEducation: () => void;
  updateEducation: (id: string, updates: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Projects actions
  addProject: () => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;

  // Social links actions
  setSocialLink: (key: keyof SocialLinks, value: string) => void;

  // Utility actions
  resetResume: () => void;
  loadSampleData: () => void;
  setResumeData: (data: ResumeData) => void;

  // Get completion percentage
  getCompletionPercentage: () => number;
}

// Sample data for demo purposes
const sampleData: ResumeData = {
  name: 'Alex Johnson',
  role: 'Full Stack Developer',
  location: 'San Francisco, CA',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 123-4567',
  summary: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud technologies. Committed to writing clean, maintainable code and delivering exceptional user experiences.',
  skills: [
    { id: '1', name: 'React', proficiency: 90 },
    { id: '2', name: 'TypeScript', proficiency: 85 },
    { id: '3', name: 'Node.js', proficiency: 80 },
    { id: '4', name: 'Python', proficiency: 75 },
    { id: '5', name: 'AWS', proficiency: 70 },
    { id: '6', name: 'PostgreSQL', proficiency: 75 },
  ],
  experiences: [
    {
      id: '1',
      role: 'Senior Full Stack Developer',
      company: 'TechCorp Inc.',
      duration: 'Jan 2022 - Present',
      description: 'Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored junior developers and conducted code reviews.',
    },
    {
      id: '2',
      role: 'Full Stack Developer',
      company: 'StartupXYZ',
      duration: 'Jun 2019 - Dec 2021',
      description: 'Built and maintained React-based dashboard applications. Developed RESTful APIs using Node.js and Express. Optimized database queries improving performance by 40%.',
    },
  ],
  education: [
    {
      id: '1',
      degree: 'B.S. Computer Science',
      institution: 'University of California, Berkeley',
      year: '2019',
      description: 'GPA: 3.8/4.0. Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems.',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Built a full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.',
      technologies: 'React, Node.js, MongoDB, Stripe',
      link: 'https://github.com/alexj/ecommerce',
    },
    {
      id: '2',
      name: 'Task Management App',
      description: 'Developed a collaborative task management application with real-time updates and team features.',
      technologies: 'Next.js, TypeScript, PostgreSQL, Socket.io',
      link: 'https://github.com/alexj/taskmanager',
    },
  ],
  socialLinks: {
    github: 'https://github.com/alexjohnson',
    linkedin: 'https://linkedin.com/in/alexjohnson',
    portfolio: 'https://alexjohnson.dev',
    twitter: 'https://twitter.com/alexjdev',
  },
};

// Create the Zustand store
export const useResumeStore = create<ResumeStore>((set, get) => ({
  ...initialState,

  // Header actions
  setName: (name) => set({ name }),
  setRole: (role) => set({ role }),
  setLocation: (location) => set({ location }),
  setEmail: (email) => set({ email }),
  setPhone: (phone) => set({ phone }),

  // Summary actions
  setSummary: (summary) => set({ summary }),

  // Skills actions
  addSkill: (name, proficiency = 50) =>
    set((state) => ({
      skills: [...state.skills, { id: generateId(), name, proficiency }],
    })),

  updateSkill: (id, updates) =>
    set((state) => ({
      skills: state.skills.map((skill) =>
        skill.id === id ? { ...skill, ...updates } : skill
      ),
    })),

  removeSkill: (id) =>
    set((state) => ({
      skills: state.skills.filter((skill) => skill.id !== id),
    })),

  // Experience actions
  addExperience: () =>
    set((state) => ({
      experiences: [
        ...state.experiences,
        { id: generateId(), role: '', company: '', duration: '', description: '' },
      ],
    })),

  updateExperience: (id, updates) =>
    set((state) => ({
      experiences: state.experiences.map((exp) =>
        exp.id === id ? { ...exp, ...updates } : exp
      ),
    })),

  removeExperience: (id) =>
    set((state) => ({
      experiences: state.experiences.filter((exp) => exp.id !== id),
    })),

  // Education actions
  addEducation: () =>
    set((state) => ({
      education: [
        ...state.education,
        { id: generateId(), degree: '', institution: '', year: '', description: '' },
      ],
    })),

  updateEducation: (id, updates) =>
    set((state) => ({
      education: state.education.map((edu) =>
        edu.id === id ? { ...edu, ...updates } : edu
      ),
    })),

  removeEducation: (id) =>
    set((state) => ({
      education: state.education.filter((edu) => edu.id !== id),
    })),

  // Projects actions
  addProject: () =>
    set((state) => ({
      projects: [
        ...state.projects,
        { id: generateId(), name: '', description: '', technologies: '', link: '' },
      ],
    })),

  updateProject: (id, updates) =>
    set((state) => ({
      projects: state.projects.map((proj) =>
        proj.id === id ? { ...proj, ...updates } : proj
      ),
    })),

  removeProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((proj) => proj.id !== id),
    })),

  // Social links actions
  // Social links actions
  setSocialLink: (key, value) =>
    set((state) => ({
      socialLinks: { ...state.socialLinks, [key]: value },
    })),

  // Utility actions
  resetResume: () => set(initialState),

  loadSampleData: () => set(sampleData),

  setResumeData: (data) => set(data),

  // Calculate completion percentage
  getCompletionPercentage: () => {
    const state = get();
    let completed = 0;
    let total = 0;

    // Header fields (5 points each)
    const headerFields = ['name', 'role', 'email'];
    headerFields.forEach((field) => {
      total += 1;
      if (state[field as keyof ResumeData]) completed += 1;
    });

    // Summary (1 point)
    total += 1;
    if (state.summary.length > 50) completed += 1;

    // Skills (1 point if at least 3 skills)
    total += 1;
    if (state.skills.length >= 3) completed += 1;

    // Experience (1 point if at least 1 complete experience)
    total += 1;
    const hasCompleteExp = state.experiences.some(
      (exp) => exp.role && exp.company && exp.description
    );
    if (hasCompleteExp) completed += 1;

    // Education (1 point if at least 1 education entry)
    total += 1;
    const hasEducation = state.education.some(
      (edu) => edu.degree && edu.institution
    );
    if (hasEducation) completed += 1;

    // Social links (1 point if at least 1 link)
    total += 1;
    const hasSocialLink = Object.values(state.socialLinks).some((link) => link);
    if (hasSocialLink) completed += 1;

    return Math.round((completed / total) * 100);
  },
}));
