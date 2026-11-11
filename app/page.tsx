import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Achievements } from "@/components/achievements";
import { Skills } from "@/components/skills";
import { Education } from "@/components/education";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip">
        Перейти к содержимому
      </a>
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <Experience />
        <Projects />
        <Achievements />
        <Skills />
        <Education />
        <Footer />
      </main>
    </>
  );
}
