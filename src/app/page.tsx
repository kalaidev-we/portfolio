import Hero from "@/components/Hero";
import ChapterJourney from "@/components/ChapterJourney";
import ChapterBuilder from "@/components/ChapterBuilder";
import ChapterProjects from "@/components/ChapterProjects";
import ChapterLeader from "@/components/ChapterLeader";
import ChapterEntrepreneur from "@/components/ChapterEntrepreneur";
import ChapterCertifications from "@/components/ChapterCertifications";
import ChapterInterests from "@/components/ChapterInterests";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full relative bg-bgDark selection:bg-accent selection:text-bgDark">
      {/* Immersive Intro Section */}
      <Hero />

      {/* Chapter 1: The Journey Timeline */}
      <ChapterJourney />

      {/* Chapter 2: The Skill Galaxy */}
      <ChapterBuilder />

      {/* Chapter 3: Cinematic Case Studies */}
      <ChapterProjects />

      {/* Chapter 4: Leadership Dashboard */}
      <ChapterLeader />

      {/* Chapter 5: Entrepreneurial Journey */}
      <ChapterEntrepreneur />

      {/* Chapter 6: Certifications Wall */}
      <ChapterCertifications />

      {/* Chapter 7: Draggable Interests */}
      <ChapterInterests />

      {/* Final Chapter: Contact Call & Easter Eggs */}
      <ContactSection />
    </main>
  );
}
