import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/ui/Navbar";
import { PageEnter } from "@/components/ui/PageEnter";

export default function Home() {
  return (
    <PageEnter>
      <Navbar />
      <main className="font-sans">
        <Hero />
        <div id="features">
          <Features />
        </div>
      </main>
    </PageEnter>
  );
}
