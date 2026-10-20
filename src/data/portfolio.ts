// ============================================================
// SINGLE SOURCE OF TRUTH — edit this file to personalize the site.
// ============================================================

export const profile = {
  name: 'Anthony Fait',
  firstName: 'Anthony',
  initials: 'AF',
  role: 'AI Software Engineer',
  location: '265 W 2nd Place Cir, Lafayette, OR 97127',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('265 W 2ND PLACE CIR, LAFAYETTE, OR 97127'),
  yearsExperience: '7+',
  avatar: '/avatar.png',
  tagline:
    'I build production-grade AI platforms — LLM apps, RAG pipelines, agentic systems, and secure backends for healthcare, fintech, and enterprise SaaS.',
  bio: [
    'I\'m an AI Software Engineer specializing in Python, LLM application development, LangChain/LangGraph, MCP tooling, and agentic automation systems. I architect production-grade AI platforms, build secure scalable backends, and integrate LLMs, RAG pipelines, vector databases, and cloud-native infrastructure.',
    'I\'ve delivered AI/ML solutions for healthcare, fintech, and enterprise SaaS that improved operational efficiency by up to 70%, supported 50K+ users, and passed HIPAA/SOC 2 audits — with a strong focus on Generative AI, NLP, retrieval systems, model orchestration, and enterprise-grade compliance.',
  ],
  available: true,
  resumeUrl: '/Anthony_Fait.pdf',
};

export type SocialKey = 'github' | 'linkedin' | 'email' | 'phone' | 'whatsapp' | 'telegram' | 'discord';

export interface Social {
  key: SocialKey;
  label: string;
  handle: string;
  url: string;
}

export const socials: Social[] = [
  {
    key: 'github',
    label: 'GitHub',
    handle: 'masonbee09',
    url: 'https://github.com/masonbee09',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/anthony-fait',
    url: 'https://www.linkedin.com/in/anthony-fait-2a80661b4/',
  },
  {
    key: 'email',
    label: 'Email',
    handle: 'anthonyfait.digital@gmail.com',
    url: 'mailto:anthonyfait.digital@gmail.com',
  },
  {
    key: 'phone',
    label: 'Phone',
    handle: '(707) 221-5444',
    url: 'tel:+17072215444',
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    handle: '+1 (369) 210-8511',
    url: 'https://wa.me/13692108511',
  },
];

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
];

export const stats = [
  { value: '7+', label: 'Years experience' },
  { value: '50K+', label: 'Users supported' },
  { value: '70%', label: 'Efficiency gains' },
  { value: 'HIPAA', label: 'SOC 2 ready' },
];

export const skillGroups = [
  {
    title: 'AI / ML',
    items: [
      'LangChain',
      'LangGraph',
      'CrewAI',
      'MCP',
      'RAG',
      'LlamaIndex',
      'OpenAI API',
      'Azure AI',
      'PyTorch',
      'TensorFlow',
    ],
  },
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind CSS', 'Design Systems', 'WCAG 2.1'],
  },
  {
    title: 'Backend',
    items: ['Python', 'FastAPI', 'Django', 'Flask', 'Node.js', 'NestJS', 'C#/.NET', 'gRPC', 'Microservices'],
  },
  {
    title: 'Cloud & Data',
    items: ['AWS', 'GCP', 'Azure AKS', 'Kubernetes', 'Firebase', 'Pinecone', 'SQL/NoSQL', 'CI/CD'],
  },
];

export interface Job {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  achievements: string[];
  stack: string[];
  url?: string;
}

export const experience: Job[] = [
  {
    company: 'SprintiQ Inc.',
    role: 'AI & Backend Engineer',
    period: '01/2025 — 02/2026',
    location: 'Colorado, United States',
    type: 'Full-time',
    summary:
      'Engineered Python-based LLM/NLP microservices and agentic AI solutions for enterprise financial document intelligence and fraud analytics.',
    achievements: [
      'Built LLM/NLP microservices that parsed and classified high-volume financial documents with BERT/RoBERTa, improving categorization accuracy by 28%.',
      'Implemented RAG pipelines with LangChain, LangGraph, and CrewAI to power enterprise AI assistants and automated financial insights.',
      'Designed and optimized a Firebase + Cloud Functions backend handling 50,000+ MAU with consistent sub-200ms response times.',
      'Architected agentic AI solutions on Azure AI Foundry and AKS with enterprise APIs and Microsoft Copilot connectors in secure multi-tenant environments.',
      'Built end-to-end CI/CD with GitHub Actions, Docker, and automated QA, reducing deployment failures by 35%.',
      'Shipped a React fraud detection analytics dashboard that improved analyst review time by 20%.',
    ],
    stack: ['Python', 'LangChain', 'LangGraph', 'CrewAI', 'MCP', 'React', 'Firebase', 'Azure AKS', 'GitHub Actions'],
  },
  {
    company: 'Underguard',
    role: 'AI Solution Engineer',
    period: '09/2022 — 11/2024',
    location: 'Florida, United States',
    type: 'Full-time',
    summary:
      'Led architecture and development of a Generative AI SaaS platform for healthcare clients with HIPAA-compliant microservices and RAG systems.',
    achievements: [
      'Led a Generative AI SaaS platform using Python, LangChain, and custom agent tools, reducing document review speeds by 70% for healthcare clients.',
      'Developed encrypted FastAPI APIs and HIPAA-compliant microservices with Firebase Auth, SQL/NoSQL storage, and PHI-safe data flows.',
      'Owned AI architecture decisions including RAG design, agent workflows, platform selection, security, governance, and production readiness.',
      'Engineered RAG and NLP pipelines with real-time ingestion, embeddings, and vector search to improve extraction accuracy and response quality.',
      'Delivered WCAG 2.1-compliant UIs in React/Next.js, improving accessibility and usability metrics by 40%.',
      'Integrated IoT wearable data into ML systems with Firestore + Cloud Functions for real-time alerts, anomaly detection, and predictive modeling.',
    ],
    stack: ['Python', 'LangChain', 'FastAPI', 'React', 'Next.js', 'Firebase', 'AKS', 'PowerShell'],
  },
  {
    company: 'BigBear Inc.',
    role: 'AI Full-Stack Developer',
    period: '07/2020 — 08/2022',
    location: 'Columbus, United States',
    type: 'Full-time',
    summary:
      'Built a HIPAA-compliant patient engagement and clinical automation platform with secure AI workflows and enterprise compliance controls.',
    achievements: [
      'Built a HIPAA-compliant patient engagement and clinical automation platform using FastAPI, Firebase Auth, React, and secure backend workflows.',
      'Implemented transformer-based clinical note summarization prototypes with Hugging Face models, cutting clinician documentation review times.',
      'Designed and enforced RBAC, audit trails, encryption, session security, and compliance reporting for successful HIPAA + SOC 2 audits.',
      'Automated ingestion of HL7/FHIR healthcare datasets into Pinecone Vector DB for semantic retrieval across patient histories and EHR data.',
      'Developed C#/.NET integration services connecting enterprise systems with Python-based AI orchestration layers.',
      'Produced technical documentation and onboarding workshops for 15+ healthcare partners.',
    ],
    stack: ['FastAPI', 'React', 'Firebase', 'Hugging Face', 'Pinecone', 'C#/.NET', 'HL7/FHIR'],
  },
  {
    company: 'Rakuten',
    role: 'Full-Stack Developer',
    period: '08/2018 — 12/2019',
    location: 'Tokyo, Japan',
    type: 'Full-time',
    summary:
      'Built high-scale full-stack systems with Django and React/Next.js for government and enterprise clients across logistics and education.',
    achievements: [
      'Built high-scale systems with Django APIs and React/Next.js frontends for government and enterprise clients.',
      'Developed a real-time QR-based inventory tracking system with WebSockets and role-based dashboards, cutting warehouse reconciliation time by 60%.',
      'Containerized applications with Docker and implemented GitLab CI workflows to increase deployment reliability.',
      'Designed OAuth2 + MFA authentication flows handling 10,000+ users with high security and low friction.',
      'Led accessibility and performance improvements with a11y testing and WCAG AA standards across client projects.',
    ],
    stack: ['Django', 'React', 'Next.js', 'Docker', 'GitLab CI', 'WebSockets', 'OAuth2'],
  },
  {
    company: 'Staci Lynn Photography',
    role: 'Web Developer',
    period: '2019 — Present',
    location: 'McMinnville, Oregon, United States',
    type: 'Self-employed',
    url: 'https://stacilynnphoto.com/',
    summary:
      'Ongoing self-employed web work for a photography studio, running alongside full-time engineering roles since 2019.',
    achievements: [
      'Designed and built the studio website, giving the business a clear public presence.',
      'Keep the site current as a long-running engagement from McMinnville, Oregon.',
      'Balance this client work with full-time product engineering across healthcare, fintech, and enterprise SaaS.',
    ],
    stack: ['Web', 'Responsive Design', 'UI'],
  },
];

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
  links?: ProjectLink[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'ScribeMD',
    category: 'Healthcare AI',
    year: '',
    description:
      'Built an AI-powered medical scribe that records clinical encounters and generates structured notes (SOAP) in real-time. Enables clinicians to edit and export directly into EHR systems while automating billing, pre-authorization, and claims workflows. Designed with HIPAA-aligned encryption, multilingual support, and scalable cloud infrastructure, reducing documentation time and improving clinical efficiency.',
    image: '/projects/scribemd.jpg',
    tags: ['LLM', 'EHR', 'HIPAA', 'SOAP', 'SaaS'],
    liveUrl: 'https://scribemd.ai/',
    githubUrl: '',
    highlights: [
      'AI Full-Stack Developer · Healthcare AI Systems',
      'Real-time SOAP notes from clinical encounters',
      'EHR export with billing & claims automation',
      'HIPAA-aligned encryption & multilingual support',
    ],
  },
  {
    id: 2,
    title: 'ccMonet',
    category: 'FinTech AI',
    year: '',
    description:
      'Built an AI-powered finance assistant for SMEs that automates bookkeeping by extracting data from multilingual receipts, invoices, and bank statements. Developed workflows for chart-of-accounts mapping, real-time reconciliation, and automated financial reporting. Delivered dashboards for P&L, cash flow, and tax-ready reports, improving accuracy, reducing manual accounting work, and streamlining finance operations.',
    image: '/projects/ccmonet.jpg',
    tags: ['OCR', 'Bookkeeping', 'FinTech', 'Reports', 'Automation'],
    liveUrl: 'https://www.ccmonet.ai/',
    githubUrl: '',
    highlights: [
      'Senior AI Full-Stack Engineer · FinTech AI & Automation',
      'Multilingual OCR for receipts, invoices & bank statements',
      'Chart-of-accounts mapping & real-time reconciliation',
      'P&L, cash flow, and tax-ready reporting dashboards',
    ],
  },
  {
    id: 3,
    title: 'CompliantChatGPT',
    category: 'Healthcare AI',
    year: '',
    description:
      'Built a HIPAA-compliant AI assistant for healthcare professionals to support secure patient data handling, clinical documentation, and research workflows. Developed personalized healthcare interaction modes, speech-to-text functionality, and AI-powered support for patient communication. Designed a secure, scalable platform that improves efficiency while maintaining regulatory compliance and protecting sensitive health information.',
    image: '/projects/compliantchatgpt.jpg',
    tags: ['HIPAA', 'LLM', 'Healthcare AI', 'Secure SaaS', 'Speech-to-Text'],
    liveUrl: 'https://compliantchatgpt.com/',
    githubUrl: '',
    highlights: [
      'AI Full-Stack Developer · Healthcare AI & HIPAA Systems',
      'Secure PHI handling with clinical documentation support',
      'Personalized healthcare modes & speech-to-text',
      'Scalable platform for compliant clinical workflows',
    ],
  },
  {
    id: 4,
    title: 'SpeedLegal',
    category: 'LegalTech AI',
    year: '',
    description:
      'As an AI Full-Stack Developer specializing in LegalTech, I built an AI-powered contract analysis platform that uses deep learning to review contracts, extract key clauses, and detect risks. Developed features for plain-language explanations, multilingual support, and automated amendment suggestions. Designed a secure, scalable system that helps legal teams review contracts faster, improve accuracy, and reduce manual workload.',
    image: '/projects/speedlegal.jpg',
    tags: ['LLM', 'NLP', 'LegalTech', 'Risk Detection', 'Contract AI'],
    liveUrl: 'https://speedlegal.io/',
    githubUrl: '',
    highlights: [
      'AI Full-Stack Developer · LegalTech AI',
      'Deep-learning contract review & clause extraction',
      'Risk detection with plain-language explanations',
      'Multilingual support & amendment suggestions',
    ],
  },
  {
    id: 5,
    title: 'Calpulse',
    category: 'Nutrition Healthcare',
    year: '',
    description:
      'Calpulse is an AI-powered nutrition tracking app that helps users understand their meals through simple menu photo uploads. I built a seamless experience that provides instant calorie and macro estimates, personalized nutrition recommendations, and progress tracking for users focused on weight loss or muscle growth. The app was designed with a strong focus on usability, accuracy, and data privacy to deliver a reliable health companion.',
    image: '/projects/calpulse.jpg',
    tags: ['AI Nutrition', 'Mobile', 'Web', 'Calorie Tracking', 'Healthcare'],
    liveUrl: 'https://calpulse.ai/',
    githubUrl: '',
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.nutrimind.ai' },
      { label: 'App Store', url: 'https://apps.apple.com/us/app/calpulse-ai-calorie-tracker/id6751479241' },
    ],
    highlights: [
      'Nutrition Healthcare developer',
      'Menu photo uploads with calorie & macro estimates',
      'Personalized recommendations & progress tracking',
      'Web + iOS + Android with privacy-first design',
    ],
  },
  {
    id: 6,
    title: 'HL7/FHIR Semantic Retrieval',
    category: 'Healthcare Data',
    year: '2021',
    description:
      'Automated HL7/FHIR dataset ingestion into Pinecone Vector DB for semantic retrieval across patient histories and EHR data.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6ad5d366bb540b63d626eb6a_1792398265545_6c52b9fc.jpg',
    tags: ['Pinecone', 'HL7/FHIR', 'RAG', 'Python'],
    liveUrl: '#',
    githubUrl: '#',
    highlights: ['Vector search', 'EHR semantic retrieval', 'Automated ingestion'],
  },
  {
    id: 7,
    title: 'QR Inventory Tracking',
    category: 'Logistics',
    year: '2019',
    description:
      'Real-time QR-based inventory tracking with WebSockets, role-based dashboards, and automated reconciliation for warehouses.',
    image: 'https://d64gsuwffb70l.cloudfront.net/6ad5d366bb540b63d626eb6a_1792398284691_008bd69c.jpg',
    tags: ['Django', 'React', 'WebSockets', 'Docker'],
    liveUrl: '#',
    githubUrl: '#',
    highlights: ['60% faster reconciliation', '10K+ auth users', 'GitLab CI'],
  },
];

export const education = {
  degree: "Bachelor's degree, Computer Science",
  school: 'Nagoya University',
  period: '2014 — 2018',
};

export const CRM_SUBSCRIBE_URL = 'https://famous.ai/api/crm/6ad5d366bb540b63d626eb6a/subscribe';

/** Downloads the resume — real file if resumeUrl is set, otherwise a generated placeholder. */
export function downloadResume() {
  if (profile.resumeUrl) {
    const a = document.createElement('a');
    a.href = profile.resumeUrl;
    a.download = '';
    a.target = '_blank';
    a.click();
    return;
  }
  const lines = [
    profile.name.toUpperCase(),
    profile.role,
    profile.location,
    socials.map((s) => `${s.label}: ${s.handle}`).join(' | '),
    '',
    'SUMMARY',
    profile.bio.join(' '),
    '',
    'EXPERIENCE',
    ...experience.flatMap((j) => [
      '',
      `${j.role} — ${j.company} (${j.period})`,
      ...j.achievements.map((a) => `  • ${a}`),
    ]),
    '',
    'SKILLS',
    ...skillGroups.map((g) => `${g.title}: ${g.items.join(', ')}`),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${profile.name.replace(/\s+/g, '_')}_Resume.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
