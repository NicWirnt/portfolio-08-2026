export type Project = {
  title: string;
  slug: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  year: string;
  coverImageUrl: string;
  coverImageAlt: string;
  stack: string[];
  links: {
    live?: string;
    github?: string;
  };
  content: Array<{
    heading: string;
    body: string;
  }>;
};

export type Skill = {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tooling" | "Security";
  iconUrl?: string;
  color: string;
};

export type Experience = {
  role: string;
  organization: string;
  period: string;
  description: string;
};

export const projects: Project[] = [
  {
    title: "AI Article Summarizer",
    slug: "ai-article-summarizer",
    summary:
      "A GPT-powered article summarizer focused on simplifying long-form reading into clear, concise takeaways.",
    problem:
      "Long articles are time-consuming to process, and users need fast summaries without losing the point of the source.",
    solution:
      "Built a focused summarization interface with a URL input, clean result state, and a minimal reading workflow.",
    role: "Frontend + API integration",
    year: "2024",
    coverImageUrl: "/legacy-assets/Ai.png",
    coverImageAlt: "AI article summarizer landing page",
    stack: ["React", "TypeScript", "API", "Tailwind"],
    links: {},
    content: [
      {
        heading: "Product focus",
        body:
          "The interface reduces friction to one primary action: paste a URL and receive a useful summary."
      },
      {
        heading: "Upgrade opportunity",
        body:
          "The new portfolio can present this as an AI product case study with architecture notes, prompt strategy, and error handling."
      }
    ]
  },
  {
    title: "Berbagi Image Discovery",
    slug: "berbagi-image-discovery",
    summary:
      "A visual discovery interface with category navigation, masonry-style image browsing, and download-oriented project flow.",
    problem:
      "Image discovery tools need fast category switching, readable browsing, and clear interaction targets.",
    solution:
      "Created a gallery-style UI with category filters, image cards, and direct download affordances.",
    role: "Frontend application design",
    year: "2024",
    coverImageUrl: "/legacy-assets/berbagi.png",
    coverImageAlt: "Berbagi image discovery app screenshot",
    stack: ["React", "UI Design", "Search", "Responsive Layout"],
    links: {},
    content: [
      {
        heading: "Interaction model",
        body:
          "The app uses category-driven exploration with visual density similar to a lightweight media platform."
      },
      {
        heading: "Upgrade opportunity",
        body:
          "The portfolio case study should show information architecture, state handling, and performance considerations for image-heavy UI."
      }
    ]
  },
  {
    title: "Netflix Clone",
    slug: "netflix-clone",
    summary:
      "A media browsing clone exploring hero sections, content rows, movie cards, and streaming-service interaction patterns.",
    problem:
      "Entertainment interfaces must present large collections while keeping browsing fast and visually engaging.",
    solution:
      "Built a recognisable streaming UI pattern with content sections, poster cards, and visual hierarchy.",
    role: "Frontend implementation",
    year: "2023",
    coverImageUrl: "/legacy-assets/netflix.png",
    coverImageAlt: "Netflix-style media browsing project screenshot",
    stack: ["React", "CSS", "API", "Media UI"],
    links: {},
    content: [
      {
        heading: "UI pattern",
        body:
          "The project demonstrates layout discipline for content-heavy interfaces."
      },
      {
        heading: "Upgrade opportunity",
        body:
          "A strong case study can focus on component reuse, loading states, and responsive card rails."
      }
    ]
  },
  {
    title: "Map Experience",
    slug: "map-experience",
    summary:
      "A map-oriented interface concept for location exploration and spatial browsing.",
    problem:
      "Map interfaces require clear controls, search context, and careful visual hierarchy over dense geographic information.",
    solution:
      "Created a focused map experience that can be expanded into a location-based case study.",
    role: "Interface exploration",
    year: "2023",
    coverImageUrl: "/legacy-assets/map.png",
    coverImageAlt: "Map interface project screenshot",
    stack: ["React", "Maps", "UX", "State"],
    links: {},
    content: [
      {
        heading: "Potential depth",
        body:
          "The project can be upgraded with route planning, saved places, and geospatial search notes."
      }
    ]
  },
  {
    title: "Car Showcase",
    slug: "car-showcase",
    summary:
      "A compact showcase for vehicle browsing, product-style presentation, and visual filtering.",
    problem:
      "Product browsing needs compelling media, fast filters, and clear detail pages.",
    solution:
      "Built a visual showcase pattern that can be extended into a polished product catalogue case study.",
    role: "Frontend application",
    year: "2023",
    coverImageUrl: "/legacy-assets/car.png",
    coverImageAlt: "Car showcase project screenshot",
    stack: ["React", "Catalog UI", "Filters"],
    links: {},
    content: [
      {
        heading: "Upgrade opportunity",
        body:
          "This can become a case study around typed filters, server-rendered detail pages, and image optimisation."
      }
    ]
  }
];

export const skills: Skill[] = [
  {
    name: "React",
    category: "Frontend",
    iconUrl: "/legacy-assets/react.png",
    color: "#61DAFB"
  },
  {
    name: "TypeScript",
    category: "Frontend",
    iconUrl: "/legacy-assets/typescript.png",
    color: "#3178C6"
  },
  {
    name: "Node.js",
    category: "Backend",
    iconUrl: "/legacy-assets/node.png",
    color: "#68A063"
  },
  {
    name: "Postgres",
    category: "Database",
    color: "#22D3EE"
  },
  {
    name: "Drizzle ORM",
    category: "Database",
    color: "#C5F74F"
  },
  {
    name: "Git",
    category: "Tooling",
    iconUrl: "/legacy-assets/git.png",
    color: "#F05032"
  },
  {
    name: "Figma",
    category: "Tooling",
    iconUrl: "/legacy-assets/figma.png",
    color: "#A259FF"
  },
  {
    name: "Security Mindset",
    category: "Security",
    color: "#F59E0B"
  }
];

export const experiences: Experience[] = [
  {
    role: "Full-stack Developer",
    organization: "Portfolio rebuild",
    period: "2026",
    description:
      "Rebuilding nicowiranata.dev as a modern Next.js portfolio with Neon Postgres, Drizzle, and an admin workflow."
  },
  {
    role: "React Developer",
    organization: "Legacy portfolio projects",
    period: "2023 - 2024",
    description:
      "Built project interfaces covering AI tools, media galleries, catalogue UI, and map-driven experiences."
  },
  {
    role: "Cybersecurity learner",
    organization: "Personal development",
    period: "Ongoing",
    description:
      "Combining web engineering with secure-by-default thinking around authentication, data handling, and admin workflows."
  }
];

export function getFeaturedProjects() {
  return projects.slice(0, 3);
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
