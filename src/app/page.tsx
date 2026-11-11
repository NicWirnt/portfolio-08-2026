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
    <>
      <AmbientBackground />
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="min-h-screen">
        <HeroSection featuredProjects={getFeaturedProjects()} />
        <ProjectShowcase projects={projects} />
        <SkillGraph skills={skills} projects={projects} />
        <QaSection />
        <TimelineSection experiences={experiences} />
        <ContactSection />
      </main>
    </>
  );
}
