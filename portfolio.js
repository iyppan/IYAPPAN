/*
  Editable portfolio content.
  Update the project, experience, skill and contact details in this file.
  The website layout and interactions live in index.html, styles.css and app.js.
*/
window.PORTFOLIO = {
  about: [
    "I’m a VFX artist and level designer working across 3D game art, real-time environments and cinematic storytelling. I enjoy the full journey: shaping a space, finding its light, and making every detail feel like it belongs.",
    "My work moves between Unreal Engine world building and studio VFX pipelines — from creature lookdev and character matchmove to hard-surface assets and multi-pass compositing. I’m the Founder & Lead Artist at IYAL STUDIOS, where I help bring original ideas and production work to life."
  ],

  skillGroups: [
    {
      number: "01",
      title: "Real-time worlds",
      description: "Build environments with a strong sense of place, scale and atmosphere.",
      items: ["Unreal Engine 5", "Blueprints", "Level design", "Terrain & foliage", "Unity"]
    },
    {
      number: "02",
      title: "3D & creature art",
      description: "Shape, refine and present assets with care for form and surface.",
      items: ["Blender", "Maya", "ZBrush", "Substance 3D Painter", "Groom & lookdev"]
    },
    {
      number: "03",
      title: "VFX & finishing",
      description: "Connect practical production workflows with a considered final image.",
      items: ["Houdini", "Nuke", "After Effects", "Matchmove", "Multi-pass compositing"]
    }
  ],

  tools: ["UNREAL ENGINE 5", "BLENDER", "NUKE", "MAYA", "SUBSTANCE 3D", "HOUDINI", "ZBRUSH", "AFTER EFFECTS"],

  projects: [
    {
      number: "01",
      title: "Outback Highway",
      type: "Real-time environment · Unreal Engine",
      description: "A weathered road cuts through a dense, far-reaching landscape. Built around terrain sculpting, foliage instancing, surface wear and atmospheric depth.",
      image: "assets/outback-highway.jpg",
      alt: "A wooded, weathered highway environment with a road stretching toward the hills",
      tags: ["Unreal Engine", "Environment art", "Level design"],
      featured: true
    },
    {
      number: "02",
      title: "Samanilai — The Balance",
      type: "Original cinematic IP · In development",
      description: "Mountain terrain, conifer forest dispersal and aviation-scale calibration for an original IYAL STUDIOS project. Visual and narrative direction by Iyappan.",
      image: "assets/samanilai-terrain.jpg",
      alt: "Mountain terrain and conifer foliage shown in a grayscale environment study",
      tags: ["Terrain", "World building", "IYAL STUDIOS"]
    },
    {
      number: "03",
      title: "African Lion — Creature Lookdev",
      type: "Creature pipeline · Groom & lighting",
      description: "A studio creature study spanning topology and anatomy, directional groom clumping, calibrated lookdev and a final enclosure plate integration.",
      image: "assets/creature-grooming.jpg",
      alt: "A digitally created lion in a sunlit enclosure, shown at the lookdev stage",
      tags: ["Creature art", "Grooming", "Lookdev"]
    },
    {
      number: "04",
      title: "Cinematic Matchmove",
      type: "Character rigging · Blender",
      description: "A high-poly character aligned to a live-action plate, with a Rigify setup and keyframed rope dynamics designed to hold up in the shot.",
      image: "assets/character-matchmove.jpg",
      alt: "A cinematic Blender character and rope matchmove shown in a 3D viewport",
      tags: ["Blender", "Rigging", "Camera tracking"]
    },
    {
      number: "05",
      title: "Vintage Camera — Asset & Comp",
      type: "Hard-surface asset · Multi-pass composite",
      description: "An 8K camera asset with worn brass, textured leather and optical glass, rebuilt in Nuke from separate AOV passes for a controlled final grade.",
      image: "assets/vintage-camera-composite.jpg",
      alt: "A detailed black vintage camera model with brass wear and a large optical lens",
      tags: ["Blender", "Substance 3D", "Nuke"]
    }
  ],

  credits: [
    { title: "Ottikichi", detail: "Music video · Compositing & roto", studio: "Team C — IYAL STUDIOS" },
    { title: "Studio feature productions", detail: "VFX team artist · Official 3D partner", studio: "Symbiosys Technologies & Dheera Studio" },
    { title: "Samanilai — The Balance", detail: "Visual & narrative lead · In development", studio: "IYAL STUDIOS" }
  ],

  experience: [
    {
      role: "VFX Faculty",
      place: "MAAC · Salem",
      period: "Current work",
      description: "Teaching visual effects at MAAC Salem."
    },
    {
      role: "Founder & Lead Artist",
      place: "IYAL STUDIOS",
      period: "December 2025 — Present",
      description: "Leading visual direction and studio VFX work across cinematic storytelling, matchmove and dynamic simulation. Developing the original project Samanilai — The Balance."
    },
    {
      role: "Unreal Faculty · Internship",
      place: "Arena Animation · Velachery",
      period: "Teaching & mentorship",
      description: "Guided students through Unreal Engine workflows, game-art pipelines, level design, lighting and real-time environment creation."
    }
  ],

  education: {
    school: "Arena Animation · Vellore",
    qualification: "Arena Certified Expert in 3D Digital Game Art",
    period: "January 2023 — May 2026",
    result: "Distinction",
    detail: "Training across game design, environment concepts, Blender modeling, retopology, texturing, sculpting, character rigging and engine setup."
  },

  services: [
    { title: "Environment & level art", description: "Playable spaces, terrain studies, foliage dressing and atmosphere for real-time worlds." },
    { title: "Creature & asset lookdev", description: "3D modeling, sculpting, materials, groom direction and polished presentation." },
    { title: "Cinematic VFX & compositing", description: "Shot finishing, multi-pass AOV workflows, integration and visual continuity." },
    { title: "Matchmove & rigging", description: "Camera tracking, character alignment, practical rigs and shot-ready motion details." }
  ],

  contact: {
    email: "loveboi9324@icloud.com",
    phone: "+91 6374824497",
    location: "Katpadi, Vellore · Tamil Nadu, India",
    links: [
      { label: "VFX Showreel", url: "https://youtube.com/playlist?list=PLIdYUy_Mpxrs5ZOd-kiE3Cv57YJDCxnR0&si=NXdOCfDmi3wyYHYk" },
      { label: "ArtStation", url: "https://www.artstation.com/mrmarvelloveboi" },
      { label: "IYAL STUDIOS", url: "https://www.iyalstudios.com" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/mrmarvelloveboi" }
    ]
  }
};
