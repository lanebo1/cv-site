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
      <Nav />
      <main className="flex-1">
        <Hero />
        <Experience />
        <Projects />
        <Achievements />
        <Skills />
        <Education />
        <Footer />
      </main>
      <footer className="border-t border-line py-6">
        <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-2 px-5 sm:px-8">
          <p className="font-mono text-[11px] text-faint">
            © 2026 {`Кирилл Ефимович`}
          </p>
          <p className="font-mono text-[11px] text-faint">
            next.js · tailwind · framer-motion
          </p>
        </div>
      </footer>
    </>
  );
}
