"use client";
import React, { useState } from "react";
import Footer2 from "../footer2";

export default function ContactPage() {
  // Form state
  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    onderwerp: "",
    bericht: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Check if form is valid (for button state)
  const isFormValid = 
    formData.naam.trim() !== "" &&
    formData.email.trim() !== "" &&
    /^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(formData.email) &&
    formData.onderwerp.trim() !== "" &&
    formData.bericht.trim() !== "";

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validate email on change
    if (name === "email") {
      setEmailError(validateEmail(value));
    }
  };

  function validateEmail(value: string) {
    if (value.trim() === "") return "Vul uw e-mail in.";
    if (!/^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(value)) return "Ongeldig e-mailadres.";
    return "";
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitAttempted(true);
    
    // Only submit if form is valid
    if (!isFormValid) {
      setEmailError(validateEmail(formData.email));
      return;
    }

    setIsSubmitting(true);

    const submitData = new FormData();
    submitData.append("naam", formData.naam);
    submitData.append("email", formData.email);
    submitData.append("onderwerp", formData.onderwerp);
    submitData.append("bericht", formData.bericht);

    fetch("https://formspree.io/f/xzdppqlv", {
      method: "POST",
      body: submitData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setIsSubmitted(true);
          setIsSubmitting(false);
        } else {
          throw new Error("Form submission failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsSubmitting(false);
        alert("Er is iets fout gegaan. Probeer het alstublieft opnieuw.");
      });
  };

  return (
    <>
      <main className="min-h-screen w-full bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20">
          
          {/* Header Section */}
          <header className="text-center mb-12 md:mb-16 lg:mb-20">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-4 md:mb-6"
              style={{
                fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                letterSpacing: '-0.03em'
              }}
            >
              Contact
            </h1>
            <p
              className="text-base md:text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed"
              style={{
                fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                fontWeight: 500
              }}
            >
              Do you have a question, need a quote, or just want to discuss the possibilities for your event? We value short lines of communication and quick turnaround times.
            </p>
          </header>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 mb-16 md:mb-20">
            
            {/* Left Column: Contact Info */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <a
                  href="mailto:info@mennoskoffiebar.nl"
                  className="text-lg md:text-xl font-semibold text-neutral-900 hover:text-neutral-600 transition-colors underline decoration-2 underline-offset-4"
                  style={{
                    fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                  }}
                >
                  info@mennoskoffiebar.nl
                </a>
                <hr className="mt-4 border-neutral-300" />
              </div>
              
              <div>
                <span
                  className="text-lg md:text-xl font-semibold text-neutral-900"
                  style={{
                    fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                  }}
                >
                  +31 683013586
                </span>
                <hr className="mt-4 border-neutral-300" />
              </div>
              
              <div>
                <span
                  className="text-lg md:text-xl font-semibold text-neutral-900"
                  style={{
                    fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                  }}
                >
                  Locatie: Dokkum
                </span>
                <hr className="mt-4 border-neutral-300" />
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-neutral-900 rounded-lg md:rounded-xl p-6 md:p-8 lg:p-10">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 md:py-16 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-6 md:mb-8">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2
                    className="text-2xl md:text-3xl font-semibold text-white mb-4"
                    style={{
                      fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                    }}
                  >
                    Bedankt!
                  </h2>
                  <p
                    className="text-neutral-400 mb-8 text-base md:text-lg"
                    style={{
                      fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                    }}
                  >
                    We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ naam: "", email: "", onderwerp: "", bericht: "" });
                      setSubmitAttempted(false);
                    }}
                    className="bg-white text-neutral-900 font-semibold py-3 md:py-4 px-8 md:px-10 text-base md:text-lg rounded-lg hover:bg-neutral-100 transition-all duration-200 hover:scale-105"
                    style={{
                      fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                    }}
                  >
                    Nieuw bericht
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 md:space-y-8"
                  suppressHydrationWarning
                >
                  {/* Naam Field */}
                  <div>
                    <label
                      htmlFor="naam"
                      className="block text-neutral-300 mb-2 text-sm md:text-base font-medium"
                      style={{
                        fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                      }}
                    >
                      Naam
                    </label>
                    <input
                      type="text"
                      id="naam"
                      name="naam"
                      value={formData.naam}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border-b-2 border-neutral-600 text-white py-3 px-0 focus:outline-none focus:border-white transition-colors text-base md:text-lg placeholder-neutral-500"
                      placeholder="Uw naam"
                      autoComplete="name"
                    />
                    {submitAttempted && formData.naam.trim() === "" && (
                      <p className="text-red-400 text-sm mt-2">Vul uw naam in.</p>
                    )}
                  </div>

                  {/* E-mail Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-neutral-300 mb-2 text-sm md:text-base font-medium"
                      style={{
                        fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                      }}
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={(e) => setEmailError(validateEmail((e.target as HTMLInputElement).value))}
                      className="w-full bg-neutral-900 border-b-2 border-neutral-600 text-white py-3 px-0 focus:outline-none focus:border-white transition-colors text-base md:text-lg placeholder-neutral-500"
                      placeholder="uw@email.nl"
                      autoComplete="email"
                    />
                    {(emailError || (submitAttempted && validateEmail(formData.email))) && (
                      <p className="text-red-400 text-sm mt-2">{emailError || validateEmail(formData.email)}</p>
                    )}
                  </div>

                  {/* Onderwerp Field */}
                  <div>
                    <label
                      htmlFor="onderwerp"
                      className="block text-neutral-300 mb-2 text-sm md:text-base font-medium"
                      style={{
                        fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                      }}
                    >
                      Onderwerp
                    </label>
                    <input
                      type="text"
                      id="onderwerp"
                      name="onderwerp"
                      value={formData.onderwerp}
                      onChange={handleChange}
                      className="w-full bg-neutral-900 border-b-2 border-neutral-600 text-white py-3 px-0 focus:outline-none focus:border-white transition-colors text-base md:text-lg placeholder-neutral-500"
                      placeholder="Onderwerp van uw bericht"
                      autoComplete="off"
                    />
                    {submitAttempted && formData.onderwerp.trim() === "" && (
                      <p className="text-red-400 text-sm mt-2">Vul het onderwerp in.</p>
                    )}
                  </div>

                  {/* Bericht Field */}
                  <div>
                    <label
                      htmlFor="bericht"
                      className="block text-neutral-300 mb-2 text-sm md:text-base font-medium"
                      style={{
                        fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                      }}
                    >
                      Bericht
                    </label>
                    <textarea
                      id="bericht"
                      name="bericht"
                      value={formData.bericht}
                      onChange={handleChange}
                      rows={6}
                      className="w-full bg-neutral-900 border-b-2 border-neutral-600 text-white py-3 px-0 focus:outline-none focus:border-white transition-colors resize-none text-base md:text-lg placeholder-neutral-500"
                      placeholder="Uw bericht..."
                    />
                    {submitAttempted && formData.bericht.trim() === "" && (
                      <p className="text-red-400 text-sm mt-2">Vul uw bericht in.</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-neutral-900 font-semibold py-4 md:py-5 text-base md:text-lg rounded-lg hover:bg-neutral-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                      }}
                    >
                      {isSubmitting ? 'Verzenden...' : 'Verzenden'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <section className="w-full">
            <h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-900 text-center mb-3 md:mb-4"
              style={{
                fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                letterSpacing: '-0.03em'
              }}
            >
              FAQ
            </h2>
            <p
              className="text-base md:text-lg lg:text-xl text-neutral-600 text-center mb-8 md:mb-12"
              style={{
                fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                fontWeight: 500
              }}
            >
              Meest gestelde vragen
            </p>
            <div className="max-w-4xl mx-auto">
              <FAQAccordion />
            </div>
          </section>
        </div>
      </main>
      <Footer2 />
    </>
  );
}

// FAQ Accordion Component
function FAQAccordion() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const faqs = [
    {
      question: 'Wat heb ik nodig om een koffiebar te huren?',
      answer: 'Eigenlijk heel weinig. Wij nemen alles mee: de bonen, de melk, de barista en de bar zelf. Het enige wat wij van jou nodig hebben is een stopcontact (230v) waar niks anders bij op zit.  ',
    },
    {
      question: 'Wat kost koffie catering op locatie?',
      answer:
        'De prijs hangt af van drie dingen: hoe lang we staan, hoeveel gasten er komen en waar het event is. Omdat we maatwerk leveren voor zowel kleine bruiloften als grote zakelijke events, maken we altijd een offerte op maat. Zo betaal je nooit voor koffie die niet gedronken wordt.',
    },
    {
      question: "Welke regio's rijden jullie naar toe?",
      answer:
        'Onze thuisbasis is het Noorden. We schenken de meeste koffie in Friesland, Groningen en Drenthe. Maar voor een mooi event rijden we met plezier door heel Nederland.',
    },
    {
      question: 'Welke koffie serveren jullie?',
      answer:
        'Wij werken met de Brazil Natural (South of Minas) van @duifcoffee. Dit is een Specialty Coffee met een vol en toegankelijk karakter. Je proeft duidelijke tonen van cacao, hazelnoot en gedroogde vruchten. Het is een natuurlijke koffie (natural processed), wat zorgt voor een fijne zoetheid die perfect samengaat met melk, maar ook zwart indruk maakt.',
    },
    {
      question: 'Hebben jullie ook alternatieven voor koemelk (zoals havermelk)?',
      answer:
        "Standaard hebben we altijd havermelk bij ons voor de lekkerste vegan cappuccino's en lattes. Heb je specifieke wensen voor andere alternatieven, zoals kokosmelk of amandelmelk? Laat het ons weten bij de aanvraag, dan zorgen we dat het klaarstaat.",
    },
    {
      question: 'Hoeveel koffies kunnen jullie per uur zetten?',
      answer:
        "De snelheid waarmee we koffie serveren hangt af van de opstelling en het aantal mensen dat we meenemen. Wanneer we met één barista achter onze compacte koffiebar staan, schenken we gemiddeld 40 tot 60 koppen per uur. Heb je een groter event en kies je voor onze koffietrailer met twee barista's, dan schroeven we de capaciteit flink op naar 80 tot 120 koppen per uur. Zo zorgen we ervoor dat bij zowel kleine gezelschappen als grote bedrijfsfeesten de koffie altijd vlot blijft doorlopen en niemand lang hoeft te wachten.",
    },
    {
      question: 'Kan de koffiebar ook buiten staan?',
      answer:
        'Zeker! De Koffietrailer is volledig ingericht voor buiten en kan tegen een stootje. De Koffiebar kan ook buiten staan, mits deze op een vlakke ondergrond staat en onder een overkapping of tent wordt geplaatst (tegen de zon en regen).',
    }
  ];
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className="border-2 border-neutral-900 bg-white rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg"
        >
          <button
            className="w-full flex justify-between items-center p-4 md:p-6 lg:p-8 text-left focus:outline-none group"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
          >
            <span
              className="text-base md:text-lg lg:text-xl font-semibold text-neutral-900 pr-4 group-hover:text-neutral-600 transition-colors"
              style={{
                fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
              }}
            >
              {faq.question}
            </span>
            <span
              className="flex-shrink-0 text-2xl md:text-3xl font-light text-neutral-900 transition-transform duration-200"
              style={{
                transform: openIndex === idx ? 'rotate(0deg)' : 'rotate(90deg)',
                fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
              }}
              aria-hidden
            >
              {openIndex === idx ? '−' : '+'}
            </span>
          </button>
          {openIndex === idx && faq.answer && (
            <div
              className="px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 text-base md:text-lg text-neutral-600 leading-relaxed"
              style={{
                fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
              }}
            >
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
