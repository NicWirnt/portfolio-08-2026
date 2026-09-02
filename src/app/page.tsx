import { AmbientBackground } from "@/components/portfolio/ambient-background";
import { ContactSection } from "@/components/portfolio/contact-section";
import { HeroSection } from "@/components/portfolio/hero-section";
import { ProjectShowcase } from "@/components/portfolio/project-showcase";
import { QaSection } from "@/components/portfolio/qa-section";
import { SiteHeader } from "@/components/portfolio/site-header";
import { SkillGraph } from "@/components/portfolio/skill-graph";
import { TimelineSection } from "@/components/portfolio/timeline-section";
import { experiences, getFeaturedProjects, projects, skills } from "@/lib/portfolio-content";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <AmbientBackground />
      <SiteHeader />
      <HeroSection featuredProjects={getFeaturedProjects()} />
      <ProjectShowcase projects={projects} />
      <SkillGraph skills={skills} projects={projects} />
      <TimelineSection experiences={experiences} />
      <QaSection />
      <ContactSection />
    </main>
  );
}
