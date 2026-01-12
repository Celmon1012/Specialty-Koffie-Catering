import Hero from "../components/hero";
import Services from "../components/services";
import { Why } from "../components/why";
import { Footer1 } from "../components/footer1";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
      <section>
        <Hero />
        <Services />
        <Why />
      </section>
      <Footer1 />
    </main>
  );
}