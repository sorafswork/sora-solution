export const CONTACT = {
  email: "sorafs.work@gmail.com",
  phone: "+91 77087 04523",
  whatsapp: "917708704523",
  instagram: "sora_official_id",
  github: "sorafswork",
  website: "www.sorainnovativesolution.in",
};

export const JOURNEY = ["IDEA", "DESIGN", "DEVELOPMENT", "MARKETING", "GROWTH"];

export const WORLD_SERVICES = [
  {
    n: "01",
    title: "Website Development",
    copy: "Fast, SEO-ready websites built with modern frameworks.",
    image: "https://sorainnovativesolution.in/assets/web-dev-BwcLbFcd.jpg",
    video: "/brand/services/web-dev-loop.mp4",
  },
  {
    n: "02",
    title: "Graphic Design",
    copy: "Eye-catching visuals for posts, ads, and print.",
    image: "https://sorainnovativesolution.in/assets/graphic-design-KCpEuw0j.jpg",
    video: "/brand/services/graphic-design-loop.mp4",
  },
  {
    n: "03",
    title: "Brand Identity",
    copy: "Logos, typography and guidelines that create a recognizable identity.",
    image: "https://sorainnovativesolution.in/assets/brand-identity-BFC7sMuU.jpg",
    video: "/brand/services/brand-identity-loop.mp4",
  },
  {
    n: "04",
    title: "Content Writing",
    copy: "Copy that communicates, connects and converts.",
    image: "https://sorainnovativesolution.in/assets/content-writing-BhEVuD1n.jpg",
    video: "/brand/services/content-writing-loop.mp4",
  },
  {
    n: "05",
    title: "Digital Marketing",
    copy: "Paid + organic strategy designed to grow reach and revenue.",
    image: "https://sorainnovativesolution.in/assets/digital-marketing-CGaxrXpg.jpg",
    video: "/brand/services/digital-marketing-loop.mp4",
  },
  {
    n: "06",
    title: "Website Maintenance",
    copy: "Updates, security, optimization and ongoing support.",
    image: "https://sorainnovativesolution.in/assets/maintenance-UTDzQqpC.jpg",
    video: "/brand/services/maintenance-loop.mp4",
  },
];

export const EXTRA_SERVICES = [
  { title: "SEO", copy: "Technical + content SEO that compounds over time." },
  { title: "UI/UX Design", copy: "Research-led interfaces people actually enjoy using." },
  { title: "Social Media", copy: "Always-on creative and community growth." },
  { title: "E-commerce Development", copy: "Storefronts engineered to convert and scale." },
];

export type Project = {
  n: string;
  title: string;
  category: string;
  url: string;
  image: string;
  description: string;
  services?: string[];
};

export const PROJECT_CATEGORIES = [
  "ALL",
  "CORPORATE",
  "BUSINESS",
  "PERSONALIZED GIFTS",
  "ART & CREATIVE",
  "PORTFOLIO",
  "PRODUCTIVITY",
];

export const PROJECTS: Project[] = [
  {
    n: "01",
    title: "Skyfly International Pvt Ltd",
    category: "CORPORATE",
    url: "https://www.skyflyintl.com/",
    image: "https://sorainnovativesolution.in/assets/w1-CcJsnAOO.jpg",
    description:
      "A professional corporate website designed to establish a strong international digital presence.",
    services: ["Website Development", "UI/UX Design", "Responsive Design", "SEO Optimization"],
  },
  {
    n: "02",
    title: "VY Enterprises",
    category: "BUSINESS",
    url: "https://www.vyenterprises.in/",
    image: "https://sorainnovativesolution.in/assets/w2-qU3Ld9cR.jpg",
    description:
      "A modern business website designed to present services professionally and build customer trust.",
  },
  {
    n: "03",
    title: "Blush Theory Art",
    category: "PERSONALIZED GIFTS",
    url: "https://blush-theory-art-studio.lovable.app",
    image: "https://sorainnovativesolution.in/assets/w3-rN_oXSUm.jpg",
    description:
      "A personalized digital surprise experience created for couples, featuring personal photos, videos, messages and interactive experiences.",
  },
  {
    n: "04",
    title: "Artika Gallery",
    category: "ART & CREATIVE",
    url: "https://artika-creations.vercel.app/",
    image: "https://sorainnovativesolution.in/assets/w4-Cjtb2K3X.jpg",
    description: "An elegant visual-first gallery built to make artwork the hero.",
  },
  {
    n: "05",
    title: "Habit Flow",
    category: "PRODUCTIVITY",
    url: "https://habit-track-w.netlify.app/",
    image: "https://sorainnovativesolution.in/assets/w5-DBGA6sjw.jpg",
    description:
      "A clean productivity experience designed to help users build and maintain better habits.",
  },
  {
    n: "06",
    title: "Client Portfolio — Ratthi",
    category: "PORTFOLIO",
    url: "https://ratthi-portfolio.lovable.app",
    image: "https://sorainnovativesolution.in/assets/w6-CTQbfG86.jpg",
    description: "A personal portfolio built to present work with clarity and confidence.",
  },
  {
    n: "07",
    title: "Skyfly India",
    category: "CORPORATE",
    url: "https://india-skyfly.lovable.app",
    image: "https://sorainnovativesolution.in/assets/w7-B-7ChUCH.jpg",
    description: "A corporate presence for the Indian arm, focused on trust and reach.",
  },
];

export const BADGES = [
  "Professional Quality",
  "Affordable Pricing",
  "Fast Delivery",
  "Unlimited Revisions",
  "SEO Ready",
  "Responsive Design",
  "Modern UI",
  "Client First",
  "Ongoing Support",
];

export const STATS = [
  { value: 120, suffix: "+", label: "Projects Completed" },
  { value: 80, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 250, suffix: "+", label: "Positive Reviews" },
  { value: 65, suffix: "%", label: "Repeat Clients" },
];

export const PROCESS = [
  { n: "01", title: "Discovery", copy: "Understanding goals, users and constraints." },
  { n: "02", title: "Research", copy: "Competitor, market and audience analysis." },
  { n: "03", title: "Planning", copy: "Scope, milestones and success metrics." },
  { n: "04", title: "Wireframing", copy: "Structure and flow before pixels." },
  { n: "05", title: "UI Design", copy: "Premium visuals aligned with the brand." },
  { n: "06", title: "Development", copy: "Clean, scalable, production-grade code." },
  { n: "07", title: "Testing", copy: "QA across devices, speed and accessibility." },
  { n: "08", title: "Launch", copy: "Smooth deployment and handoff." },
  { n: "09", title: "Support", copy: "Ongoing care and improvement." },
];

export const TECHNOLOGIES = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "PHP",
  "Python",
  "MySQL",
  "MongoDB",
  "Git",
  "GitHub",
  "Figma",
  "Canva",
  "Photoshop",
  "Illustrator",
  "WordPress",
  "VS Code",
];

export const TESTIMONIALS = [
  {
    quote:
      "SoRa turned our brand around in weeks. The site feels premium and our leads doubled.",
    name: "Aarav Mehta",
    role: "Founder, Kairo Studio",
  },
  {
    quote: "Design, copy, execution — everything was top-tier. Best agency experience I've had.",
    name: "Priya Sharma",
    role: "Marketing Lead, BrewNest",
  },
  {
    quote: "They understood our vision instantly and delivered above expectations.",
    name: "Rahul Verma",
    role: "CEO, LumenTech",
  },
];

export const FAQS = [
  {
    q: "How long does a typical website take?",
    a: "Most marketing sites ship in 2–4 weeks. Larger platforms and e-commerce builds usually run 4–8 weeks depending on scope and content readiness.",
  },
  {
    q: "Do you offer revisions?",
    a: "Yes — unlimited revisions within the agreed scope, at every stage from wireframe to launch.",
  },
  {
    q: "Which technologies do you build with?",
    a: "React, Next.js, TypeScript, Tailwind CSS, Node.js and WordPress, plus Figma for design and modern analytics tooling.",
  },
  {
    q: "Will my site be SEO-friendly?",
    a: "Every build ships with semantic markup, metadata, structured data, fast Core Web Vitals and an indexable content structure.",
  },
  {
    q: "Do you support post-launch?",
    a: "Yes. Maintenance plans cover updates, security, backups, performance monitoring and content changes.",
  },
  {
    q: "What are your payment terms?",
    a: "Typically 40% to start, 40% at design approval and 20% before launch. Retainers are billed monthly.",
  },
];

export const SERVICE_OPTIONS = [
  "Website Development",
  "Graphic Design",
  "Brand Identity",
  "Content Writing",
  "Digital Marketing",
  "SEO",
  "UI/UX Design",
  "Social Media",
  "E-commerce",
  "Website Maintenance",
];
