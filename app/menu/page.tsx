import React from "react";
import Footer2 from "../footer2";

// Menu data for cleaner code
const coffeeItems = [
  { name: "Espresso", desc: "Basis voor alle dranken, @duifcoffee brazil: cacao, hazelnoot, gedroogde vruchten." },
  { name: "Americano", desc: "Espresso aangelengd met heet water (oftewel \"koffie\")." },
  { name: "Cappuccino", desc: "Espresso met gestoomde melk." },
  { name: "Latte", desc: "Espresso met een dunner laagje melkschuim, eventueel met een siroopje." },
];

const notCoffeeItems = [
  { name: "Matcha", desc: "Groene thee poeder met melk, energiek en trendy." },
  { name: "Chai", desc: "Letterlijk een \"thee latte\" kruidig en warm." },
  { name: "Losse Thee", desc: "Selectie thee van or tea?, van hele bladeren." },
  { name: "Hot Chocolate", desc: "Met echte belgische chocolade." },
];

const melkItems = [
  { name: "Koeien-melk", desc: "De lekkerste melk van zuivelrijck + biologisch." },
  { name: "Haver", desc: "De lekkerste haver van zuivelrijck" },
  { name: "Extra optie?", desc: "Vraag gerust." },
];

const siropenItems = [
  { name: "Vanille", desc: "Huisgemaakt, gebalanceerd en een lekkere toevoeging." },
  { name: "Brown Sugar", desc: "Een simpele huisgemaakte siroop als je van zoet houd." },
];

const extraItems = [
  { name: "Gebak", desc: "Carrotcake, bananenbrood, oranjekoek + logo, of iets anders lekkers." },
  { name: "Iced dranken", desc: "Voor de iced lattes/ iced matchas" },
];

// Reusable menu card component
function MenuCard({ 
  title, 
  items, 
  accent = false 
}: { 
  title: string; 
  items: { name: string; desc: string }[]; 
  accent?: boolean 
}) {
  return (
    <div 
      className={`
        bg-white border-2 border-neutral-900 p-6 md:p-8 lg:p-10
        flex flex-col transition-all duration-200
        hover:translate-y-[-2px] hover:shadow-xl
        ${accent ? 'border-[3px]' : ''}
      `}
    >
      <h2 
        className="text-neutral-900 text-2xl md:text-3xl lg:text-4xl font-bold mb-5 md:mb-6 pb-3 md:pb-4 border-b-2 border-neutral-200"
        style={{ 
          fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
          letterSpacing: '-0.02em'
        }}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-4 md:gap-5 flex-1">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className={`pb-4 md:pb-5 ${idx !== items.length - 1 ? 'border-b border-neutral-100' : ''}`}
          >
            <h3 
              className="text-neutral-900 text-lg md:text-xl font-semibold mb-1"
              style={{ fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
            >
              {item.name}
            </h3>
            <p 
              className="text-neutral-500 text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <>
      <main className="min-h-screen w-full bg-gradient-to-b from-neutral-50 to-white pt-[90px] md:pt-[100px] lg:pt-[110px]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          
          {/* Header */}
          <header className="text-center mb-10 md:mb-14 lg:mb-16">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4"
              style={{ 
                fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                letterSpacing: '-0.03em'
              }}
            >
              Menu
            </h1>
            <p 
              className="text-neutral-600 text-base md:text-lg lg:text-xl max-w-xl mx-auto leading-relaxed"
              style={{ fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}
            >
              Alle dranken van onze menukaart worden geserveerd zoals jouw gasten ze willen — precies naar wens.
            </p>
          </header>

          {/* Main drinks section - COFFEE & NOT COFFEE */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8 mb-5 md:mb-6 lg:mb-8">
            <MenuCard title="COFFEE" items={coffeeItems} accent />
            <MenuCard title="NOT COFFEE" items={notCoffeeItems} accent />
          </section>

          {/* Secondary section - MELK, SIROPEN, EXTRA */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            <MenuCard title="MELK" items={melkItems} />
            <MenuCard title="SIROPEN" items={siropenItems} />
            <MenuCard title="EXTRA OPTIES" items={extraItems} />
          </section>

        </div>
      </main>
      <Footer2 />
    </>
  );
}
