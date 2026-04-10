import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { CtaStrip } from "@/components/CtaStrip";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Process />
      <Projects />
      <Testimonials />
      <CtaStrip />
      <Contact />
    </>
  );
}
