import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { About } from "@/components/About";
import { ContactForm } from "@/components/ContactForm";
import { CustomCursor } from "@/components/CustomCursor";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Marketing } from "@/components/Marketing";
import { Navbar } from "@/components/Navbar";
import { Portfolio } from "@/components/Portfolio";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ServicesWorld } from "@/components/ServicesWorld";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Stats } from "@/components/Stats";
import { StorySection } from "@/components/StorySection";
import { TechSphere } from "@/components/TechSphere";
import { Testimonials } from "@/components/Testimonials";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { WhySora } from "@/components/WhySora";
import { ThemeProvider } from "@/lib/theme";

const TITLE = "SoRa Innovative Solution — Premium Web Design & Digital Agency";
const DESCRIPTION =
  "SoRa Innovative Solution builds premium websites, brand identities and growth marketing for ambitious businesses. Cinematic design, engineered performance.";
const OG_IMAGE = "https://sorainnovativesolution.in/assets/w1-CcJsnAOO.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: "https://sorainnovativesolution.in/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "SoRa Innovative Solution",
          description: DESCRIPTION,
          url: "https://sorainnovativesolution.in/",
          email: "sorafs.work@gmail.com",
          telephone: "+917708704523",
          areaServed: "Worldwide",
          serviceType: [
            "Website Development",
            "Graphic Design",
            "Brand Identity",
            "Content Writing",
            "Digital Marketing",
            "Website Maintenance",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <ThemeProvider>
      <SmoothScroll />
      <CustomCursor />
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}

      <div
        className="grain relative min-h-screen bg-background text-foreground"
        style={{ opacity: introDone ? 1 : 0, transition: "opacity 700ms ease" }}
      >
        <Navbar />
        <ThemeSwitcher />
        <main>
          <Hero />
          <StorySection />
          <ServicesWorld />
          <About />
          <Portfolio />
          <Marketing />
          <WhySora />
          <Stats />
          <ProcessTimeline />
          <TechSphere />
          <Testimonials />
          <FAQ />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
