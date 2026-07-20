import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import CommentSection from "@/components/sections/CommentSection";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <CommentSection />
    </>
  );
}
