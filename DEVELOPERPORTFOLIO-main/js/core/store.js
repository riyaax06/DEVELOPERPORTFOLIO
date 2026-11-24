/**
 * store.js — localStorage state management
 * Architecture: designed for easy swap to fetch('/api/...') calls for MongoDB integration.
 * All store methods are async-compatible (return values wrapped consistently).
 */

const KEYS = {
  PROFILE:  'dpb_profile',
  PROJECTS: 'dpb_projects',
  SETTINGS: 'dpb_settings',
};

const DEFAULT_PROFILE = {
  name: '',
  title: '',
  bio: '',
  email: '',
  phone: '',
  location: '',
  avatar: '',
  website: '',
  skills: [],
  social: { github: '', linkedin: '', twitter: '', website: '' },
  education: [],
  experience: [],
};

const DEFAULT_SETTINGS = {
  theme: 'dark',
  selectedTemplate: 'aurora',
  editorConfig: {
    primaryColor: '#3b82f6',
    secondaryColor: '#8b5cf6',
    fontFamily: 'Inter',
    showSections: {
      hero: true,
      about: true,
      skills: true,
      projects: true,
      education: true,
      experience: true,
      contact: true,
    },
  },
};

// ── Helpers ──────────────────────────────────────────────
function _read(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function _write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(`[Store] Failed to write key "${key}":`, e);
    return false;
  }
}

function _generateId() {
  return `proj_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ── Profile ──────────────────────────────────────────────
const Profile = {
  get() {
    return { ...DEFAULT_PROFILE, ..._read(KEYS.PROFILE, {}) };
  },
  save(data) {
    const merged = { ...Profile.get(), ...data };
    _write(KEYS.PROFILE, merged);
    Store.emit('profile:updated', merged);
    return merged;
  },
  getCompletionPercent() {
    const p = Profile.get();
    const checks = [
      !!p.name, !!p.title, !!p.bio, !!p.email,
      !!p.avatar, !!p.location,
      p.skills.length > 0,
      p.education.length > 0,
      !!(p.social.github || p.social.linkedin),
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  },
};

// ── Projects ─────────────────────────────────────────────
const Projects = {
  getAll() {
    return _read(KEYS.PROJECTS, []);
  },
  getById(id) {
    return Projects.getAll().find(p => p.id === id) || null;
  },
  add(data) {
    const projects = Projects.getAll();
    const project = {
      id: _generateId(),
      title: '',
      tagline: '',
      thumbnail: '',
      problem: '',
      solution: '',
      features: [],
      technologies: [],
      challenges: '',
      outcomes: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      order: projects.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };
    projects.push(project);
    _write(KEYS.PROJECTS, projects);
    Store.emit('projects:added', project);
    return project;
  },
  update(id, data) {
    const projects = Projects.getAll();
    const idx = projects.findIndex(p => p.id === id);
    if (idx === -1) return null;
    projects[idx] = { ...projects[idx], ...data, updatedAt: new Date().toISOString() };
    _write(KEYS.PROJECTS, projects);
    Store.emit('projects:updated', projects[idx]);
    return projects[idx];
  },
  delete(id) {
    const projects = Projects.getAll().filter(p => p.id !== id);
    _write(KEYS.PROJECTS, projects);
    Store.emit('projects:deleted', id);
    return true;
  },
  duplicate(id) {
    const original = Projects.getById(id);
    if (!original) return null;
    const { id: _id, createdAt, updatedAt, ...rest } = original;
    return Projects.add({ ...rest, title: `${rest.title} (Copy)`, featured: false });
  },
  reorder(orderedIds) {
    const projects = Projects.getAll();
    orderedIds.forEach((id, index) => {
      const proj = projects.find(p => p.id === id);
      if (proj) proj.order = index;
    });
    projects.sort((a, b) => a.order - b.order);
    _write(KEYS.PROJECTS, projects);
    Store.emit('projects:reordered', projects);
  },
};

// ── Settings ─────────────────────────────────────────────
const Settings = {
  get() {
    return _deepMerge(DEFAULT_SETTINGS, _read(KEYS.SETTINGS, {}));
  },
  save(data) {
    const merged = _deepMerge(Settings.get(), data);
    _write(KEYS.SETTINGS, merged);
    Store.emit('settings:updated', merged);
    return merged;
  },
  setTheme(theme) {
    return Settings.save({ theme });
  },
  setTemplate(name) {
    return Settings.save({ selectedTemplate: name });
  },
  setEditorConfig(config) {
    const current = Settings.get();
    return Settings.save({
      editorConfig: { ...current.editorConfig, ...config },
    });
  },
};

// ── Deep merge helper ─────────────────────────────────────
function _deepMerge(target, source) {
  const out = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      out[key] = _deepMerge(target[key] || {}, source[key]);
    } else {
      out[key] = source[key];
    }
  }
  return out;
}

// ── Event Bus ─────────────────────────────────────────────
const _listeners = {};

const Store = {
  Profile,
  Projects,
  Settings,
  KEYS,

  on(event, callback) {
    if (!_listeners[event]) _listeners[event] = [];
    _listeners[event].push(callback);
    return () => Store.off(event, callback); // returns unsubscribe fn
  },

  off(event, callback) {
    if (_listeners[event]) {
      _listeners[event] = _listeners[event].filter(cb => cb !== callback);
    }
  },

  emit(event, data) {
    (_listeners[event] || []).forEach(cb => {
      try { cb(data); } catch (e) { console.error(`[Store] Event handler error for "${event}":`, e); }
    });
  },

  // Utility: clear all data (dev/testing)
  clearAll() {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    Store.emit('store:cleared');
  },

  // Utility: export all data as JSON
  exportData() {
    return {
      profile:  Profile.get(),
      projects: Projects.getAll(),
      settings: Settings.get(),
      exportedAt: new Date().toISOString(),
    };
  },

  // Utility: import data from JSON
  importData(json) {
    try {
      const data = typeof json === 'string' ? JSON.parse(json) : json;
      if (data.profile)  _write(KEYS.PROFILE,  data.profile);
      if (data.projects) _write(KEYS.PROJECTS, data.projects);
      if (data.settings) _write(KEYS.SETTINGS, data.settings);
      Store.emit('store:imported', data);
      return true;
    } catch (e) {
      console.error('[Store] Import failed:', e);
      return false;
    }
  },

  // Seed realistic developer demo data (without inventing fake personal achievements)
  seedRealisticDemoData(force = false) {
    const existing = Profile.get();
    if (!force && existing.name && existing.name !== 'Demo User') return;

    const sampleProfile = {
      name: 'Alex Morgan',
      title: 'Senior Full-Stack Engineer',
      bio: 'Senior software engineer with 6+ years of experience architecting high-concurrency cloud systems, distributed microservices, and modern web applications. Passionate about developer tooling, API design, and performance optimization.',
      email: 'alex.morgan@example.dev',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      website: 'https://alexmorgan.dev',
      resumeUrl: 'https://example.com/alex-morgan-resume.pdf',
      skills: [
        'TypeScript', 'React', 'Next.js', 'Node.js', 'Go', 'Python',
        'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GraphQL',
        'REST APIs', 'Tailwind CSS', 'CI/CD Pipelines', 'Microservices'
      ],
      social: {
        github: 'https://github.com/alexmorgan-dev',
        linkedin: 'https://linkedin.com/in/alexmorgan-engineer',
        twitter: 'https://twitter.com/alexmorgan_dev',
        website: 'https://alexmorgan.dev'
      },
      education: [
        {
          degree: 'B.S. in Computer Science',
          school: 'University of California, Berkeley',
          year: '2018 — 2022',
          description: 'Specialization in Distributed Systems, Cloud Architecture, and Database Systems.'
        }
      ],
      experience: [
        {
          role: 'Senior Full-Stack Engineer',
          company: 'Veloce Cloud Systems',
          period: '2023 — Present',
          description: 'Lead engineering for the core cloud telemetry platform processing 100M+ daily events with 99.99% uptime.'
        },
        {
          role: 'Full-Stack Software Engineer',
          company: 'Nexus Data Labs',
          period: '2021 — 2023',
          description: 'Engineered real-time collaboration dashboards and high-speed GraphQL data federation services.'
        }
      ]
    };

    const sampleProjects = [
      {
        id: 'proj_cloudscale',
        title: 'CloudScale — Distributed Metrics & Observability Platform',
        tagline: 'High-throughput telemetry ingestion engine and real-time operational dashboard.',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        problem: 'Legacy monitoring systems dropped telemetry packets during high-load traffic spikes and took over 8 seconds to render system health metrics.',
        solution: 'Engineered an event-driven telemetry pipeline using Kafka stream processing, ClickHouse columnar storage, and WebGL-accelerated visualization components.',
        features: [
          'Sub-second query response over 100M+ time-series records',
          'Dynamic multi-tenant dashboard with anomaly threshold alerts',
          'OpenTelemetry native collector integration',
          'Zero-downtime distributed cluster replication'
        ],
        technologies: ['Go', 'TypeScript', 'React', 'Kafka', 'ClickHouse', 'Docker', 'Kubernetes'],
        challenges: 'Managing backpressure under sudden 10x traffic surges while preventing memory exhaustion on edge agent daemons.',
        outcomes: 'Reduced telemetry latency by 64%, decreased cloud compute expenditure by 38%, and scaled reliably across 12 production clusters.',
        liveUrl: 'https://example.com/cloudscale-demo',
        githubUrl: 'https://github.com/example/cloudscale-observability',
        featured: true,
        order: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'proj_devflow',
        title: 'DevFlow — GitOps CI/CD Deployment Orchestrator',
        tagline: 'Declarative workflow orchestration tool for preview environments and safe canary releases.',
        thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
        problem: 'Engineering teams spent 45+ minutes deploying microservices due to flaky scripts and inconsistent staging environments.',
        solution: 'Built a containerized pipeline engine with declarative YAML definitions, ephemeral staging environments on PR creation, and automated canary evaluation.',
        features: [
          'Automatic ephemeral environment provisioning via Kubernetes CRDs',
          'Canary progressive rollout with automated error-rate rollback',
          'Real-time build log streaming via WebSockets',
          'GitHub Checks API integration and Slack release notifications'
        ],
        technologies: ['Node.js', 'React', 'Kubernetes', 'Docker', 'Redis', 'AWS', 'Tailwind CSS'],
        challenges: 'Ensuring safe secret management and fast cleanup of ephemeral cluster namespaces without orphan volume leaks.',
        outcomes: 'Cut average deployment cycle time from 45 minutes down to 4 minutes, and eliminated 98% of human-error deployment rollbacks.',
        liveUrl: 'https://example.com/devflow-demo',
        githubUrl: 'https://github.com/example/devflow-orchestrator',
        featured: true,
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'proj_pulse',
        title: 'Pulse — Real-Time Collaborative Canvas Engine',
        tagline: 'Multiplayer architecture system with conflict-free replicated data types (CRDTs).',
        thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        problem: 'Collaborative editing tools often suffer from split-brain state desynchronization and cursor lag when multiple engineers work on diagrams simultaneously.',
        solution: 'Implemented Yjs-based CRDT state synchronization over WebSockets with an optimized binary diff protocol and optimistic local UI updates.',
        features: [
          'Sub-20ms multiplayer cursor and object positioning',
          'Full offline edit mode with automatic conflict resolution upon reconnect',
          'End-to-end encrypted session rooms',
          'Export to SVG, PNG, and PDF formats'
        ],
        technologies: ['TypeScript', 'Canvas API', 'WebSockets', 'Yjs CRDT', 'Next.js', 'Tailwind CSS'],
        challenges: 'Rendering 5,000+ interactive canvas elements at 60 FPS while parsing continuous state mutations from 50 concurrent editors.',
        outcomes: 'Achieved rock-solid 60 FPS performance and supported 50+ simultaneous editors with zero state loss.',
        liveUrl: 'https://example.com/pulse-demo',
        githubUrl: 'https://github.com/example/pulse-canvas',
        featured: false,
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    Profile.save(sampleProfile);
    _write(KEYS.PROJECTS, sampleProjects);
    Store.emit('projects:updated', sampleProjects);
    return { profile: sampleProfile, projects: sampleProjects };
  },
};

// Expose globally (future: replace with ES module exports for React)
window.Store = Store;
