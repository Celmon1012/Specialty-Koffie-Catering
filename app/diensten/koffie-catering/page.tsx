import Hero from "../../../components/hero";
import Services from "../../../components/services";
import { Why } from "../../../components/why";
import { Footer1 } from "../../../components/footer1";
import images from "../../content/koffie-catering-images";

export default function EspressoPage() {
  return (
    <main className="min-h-screen w-full bg-white">
      <section>
        <Hero heading={
          <span className="block">Specialty Koffie Catering</span>
        }
        description={
          <>
Wij komen naar jouw locatie met koffie die klopt.
Voor bedrijven, events en bruiloften — eenvoudig geregeld.
          </>
        }
        imageSrc={images.hero.src}
        imageAlt={images.hero.alt}
      />
        <Services
          heading="Wat je Kunt Verwachten          "
          description={
            <>
Specialty koffie catering doet wat iedereen wil:
            </>
          }
          bullets={[
            "Koffie die doorloopt, ook als het druk is",
            "Professionele & blije barista’s",
            "Alles geregeld, van opbouw tot afbouw",
          ]}
          imageSrc={images.services.src}
          imageAlt={images.services.alt}
        />
        <div className="koffie-why-override">
        <Why
          title={<span className="koffie-title relative -left-6" style={{ display: 'inline-block', maxWidth: '640px' }}>Laat Ons Regelen</span>}
          description={
            <>
Zo simpel is het:
            </>
          }
          bullets={[
            "1. Vraag een offerte aan.",
            "2. Wij sturen een offerte op maat binnen 24 uur",
            "3. Jij regelt een stopcontact en wij de rest.",
          ]}
          imageSrc={images.why.src}
          imageAlt={images.why.alt}
        />
        </div>

        <style>{`@media (min-width: 768px) and (max-width: 1024px) {
          /* Page-scoped override: move CTA right 0.3rem only on iPads */
          .koffie-why-override #why-cta { transform: translateX(0.3rem) !important; }
        }
        @media (max-width: 767px) {
          /* Mobile-only: move the title right by 0.1rem for this page */
          .koffie-why-override .koffie-title { left: 0.1rem !important; }
        }`}</style>

        <style>{`@media (width: 768px) {
          /* iPad mini only: shift hero image left by 0.3rem */
          .hero-image img { transform: translateX(-0.3rem) !important; }
        }`}</style>
      </section>
      <Footer1 />
    </main>
  );
}
