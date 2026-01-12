
'use client';
import React, { useState, useEffect } from "react";
import Footer2 from "../footer2";
import CheckIcon from "../../components/CheckIcon";

export default function OffertePage() {
  const [activeDot, setActiveDot] = useState(0);
  const [submitAttemptedStep, setSubmitAttemptedStep] = useState<number | null>(null);
  // form state per step
  const [step0, setStep0] = useState({ duration: "", guests: "" });
  const [step1, setStep1] = useState<{ extras: string[]; occasion: string }>({ extras: [], occasion: "" });
  const [step2, setStep2] = useState({ address: "", date: "", startTime: "", endTime: "" });
  const [step3, setStep3] = useState({ name: "", email: "", phone: "", comment: "" });
  const [stepErrors, setStepErrors] = useState<{ [k: number]: boolean }>({ 0: false, 1: false, 2: false, 3: false });
  const [errorsMap, setErrorsMap] = useState<{ [k: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showButtonError, setShowButtonError] = useState(false);
  const handleDotClick = (index: number) => {
    // If navigating forward, ensure previous steps are valid
    if (index > activeDot) {
      // validate all steps up to index-1
      for (let i = 0; i < index; i++) {
        if (!validateStep(i)) {
          setStepErrors((s) => ({ ...s, [i]: true }));
          return;
        }
      }
    }

    setActiveDot(index);
  };

  const [extrasOpen, setExtrasOpen] = useState(false);
  const extrasOptions = [
    { value: 'Gebak', label: 'Gebak' },
    { value: 'Gepersonaliseerde bekers & bar', label: 'Gepersonaliseerde bekers & bar' },
    { value: 'Iced dranken', label: 'Iced dranken' },
  ];

  // Selectable time slots: only 12:30 and 14:50
  const generateTimeSlots = (start: string, end: string, stepMinutes = 10) => {
    const slots: string[] = [];
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    let cur = sh * 60 + sm;
    const endMinutes = eh * 60 + em;
    while (cur <= endMinutes) {
      const hh = String(Math.floor(cur / 60)).padStart(2, '0');
      const mm = String(cur % 60).padStart(2, '0');
      slots.push(`${hh}:${mm}`);
      cur += stepMinutes;
    }
    return slots;
  };

  // Allowed time range for user-typed times
  const minAllowedTime = '12:30';
  const maxAllowedTime = '21:00';

  function validateStep(index: number) {
    const nextErrors: { [k: string]: string } = {};
    if (index === 0) {
      if (step0.duration.trim() === "") {
        nextErrors.duration = "Vul de duur van het evenement in.";
      } else if (!/^\d+$/.test(step0.duration) || parseInt(step0.duration, 10) <= 0) {
        nextErrors.duration = "Voer een geldig aantal uren in.";
      }

      if (step0.guests.trim() === "") {
        nextErrors.guests = "Vul het aantal gasten in.";
      } else if (!/^\d+$/.test(step0.guests) || parseInt(step0.guests, 10) <= 0) {
        nextErrors.guests = "Voer een geldig aantal gasten in.";
      }
    }
    // Step 1 (extras / occasion) is optional — do not block navigation if empty.
    if (index === 1) {
      // intentionally left blank to make this step optional
    }
    if (index === 2) {
      if (step2.address.trim() === "") nextErrors.address = "Vul het adres in.";
      if (step2.date.trim() === "") {
        nextErrors.date = "Kies een datum.";
      } else {
        const y = new Date(step2.date).getFullYear();
        if (isNaN(y) || y < 2025 || y > 2026) nextErrors.date = "Kies een datum in 2025 of 2026.";
      }
      if (step2.startTime.trim() === "" || step2.endTime.trim() === "") {
        nextErrors.time = "Kies zowel een start- als eindtijd.";
      } else {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(step2.startTime) || !timeRegex.test(step2.endTime)) {
          nextErrors.time = "Kies geldige tijden in HH:MM formaat.";
        } else {
          const toMinutes = (t: string) => {
            const [hh, mm] = t.split(':').map(Number);
            return hh * 60 + mm;
          };
          const s = toMinutes(step2.startTime);
          const e = toMinutes(step2.endTime);
          const min = toMinutes(minAllowedTime);
          const max = toMinutes(maxAllowedTime);
          if (s < min || e < min || s > max || e > max) {
            nextErrors.time = `Kies tijden tussen ${minAllowedTime} en ${maxAllowedTime}.`;
          } else if (s > e) {
            nextErrors.time = 'De starttijd mag niet na de eindtijd zijn.';
          }
        }
      }
    }
    if (index === 3) {
      if (step3.name.trim() === "") nextErrors.name = "Vul uw naam in.";
      if (step3.email.trim() === "") nextErrors.email = "Vul uw e-mail in.";
      else if (!/^[\w-.]+@[\w-]+\.[A-Za-z]{2,}$/.test(step3.email)) nextErrors.email = "Ongeldig e-mailadres.";
      if (step3.phone.trim() === "") nextErrors.phone = "Vul uw telefoonnummer in.";
    }

    setErrorsMap(nextErrors);
    const ok = Object.keys(nextErrors).length === 0;
    setStepErrors((s) => ({ ...s, [index]: !ok }));
    return ok;
  }

  function goToNext() {
    if (validateStep(activeDot)) {
      setStepErrors((s) => ({ ...s, [activeDot]: false }));
      setActiveDot((d) => d + 1);
      setShowButtonError(false);
    } else {
      setStepErrors((s) => ({ ...s, [activeDot]: true }));
      setShowButtonError(true);
    }
  }
  useEffect(() => {
    setSubmitAttemptedStep(null);
    setErrorsMap({});
  }, [activeDot]);

  // Debug: log state when arriving on step 3 to diagnose premature errors
  useEffect(() => {
    if (activeDot === 3) {
      // eslint-disable-next-line no-console
      console.log('DEBUG offerte step3 state', {
        activeDot,
        submitAttemptedStep,
        errorsMap,
        stepErrors,
        step3,
      });
    }
  }, [activeDot, submitAttemptedStep, errorsMap, stepErrors, step3]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitAttemptedStep(3);

    // Validate step 3 before submitting
    if (!validateStep(3)) {
      setStepErrors((s) => ({...s, 3: true}));
      return;
    }
    
    setIsSubmitting(true);
    
    // Combine all form data
    const formData = new FormData();
    formData.append('duration', step0.duration);
    formData.append('guests', step0.guests);
    formData.append('extras', step1.extras.join(', '));
    formData.append('occasion_select', step1.occasion);
    formData.append('address', step2.address);
    formData.append('date', step2.date);
    formData.append('start_time', step2.startTime);
    formData.append('end_time', step2.endTime);
    formData.append('name', step3.name);
    formData.append('email', step3.email);
    formData.append('phone', step3.phone);
    formData.append('comment', step3.comment);
    
    // Submit to formspree
    fetch('https://formspree.io/f/xeeokzdv', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        // Show success state
        setIsSubmitted(true);
        setIsSubmitting(false);
          setSubmitAttemptedStep(null);
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setIsSubmitting(false);
      alert('Er is iets fout gegaan. Probeer het alstublieft opnieuw.');
    });
  };
  return (
    <>
      <main className="min-h-screen w-full bg-white">
        <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 px-4 md:px-6 lg:px-8 gap-8 md:gap-12 lg:gap-16">
          {/* Left side - Content */}
          <div className="flex-1 lg:max-w-xl">
            <h1 className="text-black text-left font-semibold text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight" style={{
              fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              fontWeight: 650,
            }}>
              Offerte aanvragen
            </h1>
            <p className="mb-8 text-base md:text-lg text-gray-700 max-w-2xl leading-relaxed" style={{
              fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              fontWeight: 500,
            }}>
              Elk event is uniek, daarom werken we niet met standaard pakketten. Of het nu gaat om een kleinschalige bruiloft of een groot zakelijk event: wij maken een voorstel op maat dat precies past bij jouw aantal gasten, de gewenste opstelling en de locatie.
            </p>
            <div className="flex flex-col gap-4 mt-8">
              <div className="flex items-center gap-3">
                <CheckIcon />
                <span className="text-black leading-6 text-base md:text-lg font-semibold" style={{ fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>Ontvang binnen 24 uur je offerte</span>
              </div>
              <hr className="border-gray-200 my-1" />
              <div className="flex items-center gap-3">
                <CheckIcon />
                <span className="text-black leading-6 text-base md:text-lg font-semibold" style={{ fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>Alles inclusief & onbeperkt service.</span>
              </div>
              <hr className="border-gray-200 my-1" />
              <div className="flex items-center gap-3">
                <CheckIcon />
                <span className="text-black leading-6 text-base md:text-lg font-semibold" style={{ fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>Plug & Play: Jij regelt alleen het stopcontact.</span>
              </div>
            </div>
          </div>
          
          {/* Right side: Form */}
          <div className="flex-1 lg:max-w-lg w-full">
            <div className="bg-black text-white p-4 md:p-6 flex flex-col">
              {isSubmitted ? (
                // Success message
                <div className="flex flex-col items-center justify-center flex-1 py-8 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
                    Bedankt voor je aanvraag!
                  </h2>
                  <p className="text-gray-300 mb-8 text-base md:text-lg" style={{ fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
                    We hebben je offerte aanvraag ontvangen en nemen binnen 24 uur contact met je op.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setStep0({ duration: "", guests: "" });
                      setStep1({ extras: [], occasion: "" });
                      setStep2({ address: "", date: "", startTime: "", endTime: "" });
                      setStep3({ name: "", email: "", phone: "", comment: "" });
                      setActiveDot(0);
                      setShowButtonError(false);
                      setSubmitAttemptedStep(null);
                    }}
                    className="bg-white text-black font-medium py-3 px-8 text-base md:text-lg hover:bg-gray-100 transition-colors cursor-pointer rounded-lg"
                  >
                    Nieuwe aanvraag
                  </button>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 justify-between">
                {/* Step Indicator Dots */}
                <div className="flex justify-center mb-8 gap-1">
                  {[0, 1, 2, 3].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Step ${idx + 1}`}
                      onClick={() => handleDotClick(idx)}
                      style={{ width: '12px', height: '12px', padding: 0, borderWidth: '0px' }}
                      className={`rounded-full inline-block transition-all duration-200 focus:outline-none bg-white ${
                        activeDot === idx ? "opacity-100" : "opacity-40"
                      }`}
                      disabled={activeDot === idx}
                    />
                  ))}
                </div>
                
                {/* Form Steps */}
                <div className="flex-1 flex flex-col justify-between">
                  {activeDot === 0 ? (
                    // First form (Duration, Guests)
                    <div className="flex flex-col gap-8 flex-1">
                      <div className="flex flex-col gap-6">
                        <div>
                          <label className="block text-gray-300 mb-2 text-lg font-normal">Duur van Evenement</label>
                          <input
                            type="number"
                            inputMode="numeric"
                            pattern="\d*"
                            min={1}
                            value={step0.duration}
                            onKeyDown={(e) => {
                              if (e.ctrlKey || e.metaKey || e.altKey) return;
                              const allowed = ['Backspace','ArrowLeft','ArrowRight','Delete','Tab'];
                              if (allowed.includes(e.key)) return;
                              if (!/^[0-9]$/.test(e.key)) e.preventDefault();
                            }}
                            onChange={(e) => { const v = e.target.value.replace(/[^0-9]/g, ''); setStep0(s => ({...s, duration: v})); setErrorsMap(m=>({...m, duration: ""})); setStepErrors(s=>({...s, 0: false})); }}
                            className="w-full bg-black border-b border-gray-400 text-white py-2 px-0 focus:outline-none focus:border-white placeholder-gray-400 text-lg font-normal"
                            placeholder="Bijv. 3 (uur)"
                          />
                          {errorsMap.duration && <p className="text-red-500 text-sm mt-1">{errorsMap.duration}</p>}
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-lg font-normal">Aantal Gasten</label>
                          <input
                            type="number"
                            inputMode="numeric"
                            pattern="\d*"
                            min={1}
                            value={step0.guests}
                            onKeyDown={(e) => {
                              if (e.ctrlKey || e.metaKey || e.altKey) return;
                              const allowed = ['Backspace','ArrowLeft','ArrowRight','Delete','Tab'];
                              if (allowed.includes(e.key)) return;
                              if (!/^[0-9]$/.test(e.key)) e.preventDefault();
                            }}
                            onChange={(e) => { const v = e.target.value.replace(/[^0-9]/g, ''); setStep0(s => ({...s, guests: v})); setErrorsMap(m=>({...m, guests: ""})); setStepErrors(s=>({...s, 0: false})); }}
                            className="w-full bg-black border-b border-gray-400 text-white py-2 px-0 focus:outline-none focus:border-white placeholder-gray-400 text-lg font-normal"
                            placeholder="Bijv. 50"
                          />
                          {errorsMap.guests && <p className="text-red-500 text-sm mt-1">{errorsMap.guests}</p>}
                        </div>
                      </div>
                      <div className="pt-8 pb-2 px-2">
                        <button type="button" className="w-full bg-white text-black font-medium py-4 text-lg cursor-pointer" onClick={goToNext}>Volgende</button>
                      </div>
                    </div>
                  ) : activeDot === 1 ? (
                    // Second form (Extras, Occasion)
                    <div className="flex flex-col gap-8 flex-1">
                      <div className="flex flex-col gap-6">
                        <div>
                          <label className="block text-gray-300 mb-2 text-lg font-normal">Extra&apos;s</label>
                          <div className="relative group">
                            <button
                              type="button"
                              onClick={() => setExtrasOpen((o) => !o)}
                              className="w-full bg-black border-b border-gray-400 text-white py-2 md:py-1 px-0 focus:outline-none focus:border-white appearance-none pr-10 text-lg md:text-base font-normal text-left flex items-center justify-between"
                            >
                              <div className="flex flex-wrap gap-2">
                                {step1.extras.length === 0 ? (
                                  <span className="text-white text-lg font-normal">Kies extra&apos;s</span>
                                ) : (
                                  step1.extras.map((ex) => {
                                    const opt = extrasOptions.find((o) => o.value === ex);
                                    return (
                                      <span key={ex} className="bg-white text-black px-3 py-1 rounded-full text-sm">{opt ? opt.label : ex}</span>
                                    );
                                  })
                                )}
                              </div>
                            </button>

                            <span className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white transition-transform duration-200 ${extrasOpen ? 'rotate-180' : ''} group-focus-within:rotate-180`}>
                              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>

                            {extrasOpen && (
                              <div className="absolute z-20 mt-1 w-full bg-black border border-gray-700 max-h-44 overflow-auto shadow-lg">
                                {extrasOptions.map((opt) => {
                                  const selected = step1.extras.includes(opt.value);
                                  return (
                                    <div
                                      key={opt.value}
                                      role="button"
                                      tabIndex={0}
                                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const exists = step1.extras.includes(opt.value); const next = exists ? step1.extras.filter((v) => v !== opt.value) : [...step1.extras, opt.value]; setStep1((s) => ({ ...s, extras: next })); setErrorsMap((m) => ({ ...m, extras: "" })); setStepErrors((s) => ({ ...s, 1: false })); setShowButtonError(false); } }}
                                      onClick={() => {
                                        const exists = step1.extras.includes(opt.value);
                                        const next = exists ? step1.extras.filter((v) => v !== opt.value) : [...step1.extras, opt.value];
                                        setStep1((s) => ({ ...s, extras: next }));
                                        setErrorsMap((m) => ({ ...m, extras: "" }));
                                        setStepErrors((s) => ({ ...s, 1: false }));
                                        setShowButtonError(false);
                                      }}
                                      className={`flex items-center justify-between px-4 py-3 hover:bg-gray-800 cursor-pointer transition-colors ${selected ? 'bg-gray-800' : ''}`}
                                    >
                                      <span className="text-white text-base">{opt.label}</span>
                                      {selected && <span className="text-sm text-gray-400">✓</span>}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            {errorsMap.extras && <p className="text-red-400 text-sm mt-2">{errorsMap.extras}</p>}
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-lg font-normal">Gelegenheid</label>
                          <div className="relative group">
                            <select 
                              value={step1.occasion} 
                              onChange={(e) => { setStep1(s => ({...s, occasion: e.target.value})); setErrorsMap(m=> ({...m, occasionSelect: ""})); setStepErrors(s=>({...s, 1: false})); setShowButtonError(false); }} 
                              className="w-full bg-black border-b border-gray-400 text-white py-2 md:py-1 px-0 focus:outline-none focus:border-white appearance-none pr-10 text-lg md:text-base font-normal"
                            >
                              <option value="" className="bg-gray-900">Kies gelegenheid</option>
                              <option value="Bruiloft" className="bg-gray-900">Bruiloft</option>
                              <option value="Bedrijfsevenement" className="bg-gray-900">Bedrijfsevenement</option>
                              <option value="Opening" className="bg-gray-900">Opening</option>
                              <option value="Beurs" className="bg-gray-900">Beurs</option>
                              <option value="Anders" className="bg-gray-900">Anders</option>
                            </select>
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                              <svg width="18" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            {errorsMap.occasionSelect && <p className="text-red-400 text-sm mt-2">{errorsMap.occasionSelect}</p>}
                          </div>
                        </div>
                      </div>
                      {stepErrors[1] && <p className="text-red-500 text-sm mt-2">Vul alle velden in om door te gaan.</p>}
                      <div className="pt-8 pb-2 px-2 flex gap-4">
                        <button type="button" className="flex-1 border-2 border-white text-white py-4 text-lg font-bold transition-colors hover:bg-white hover:text-black cursor-pointer" onClick={() => setActiveDot(0)}>Vorige</button>
                        <button type="button" className={`flex-1 font-medium py-4 text-lg transition-colors cursor-pointer ${showButtonError && activeDot === 1 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white text-black hover:bg-gray-100'}`} onClick={goToNext}>{showButtonError && activeDot === 1 ? '!' : 'Volgende'}</button>
                      </div>
                    </div>
                  ) : activeDot === 2 ? (
                    // Third form (Address, Date, Time)
                    <div className="flex flex-col gap-8 flex-1">
                      <div className="flex flex-col gap-6">
                        <div>
                          <label className="block text-gray-300 mb-2 text-lg font-normal">Adres</label>
                          <input
                            value={step2.address}
                            onChange={(e) => { setStep2(s => ({...s, address: e.target.value})); setErrorsMap(m=>({...m, address: ""})); setStepErrors(s=>({...s, 2: false})); setShowButtonError(false); }}
                            className="w-full bg-black border-b border-gray-400 text-white py-2 px-0 focus:outline-none focus:border-white placeholder-gray-400 text-lg font-normal"
                            placeholder="Bijv. Keizersgracht 123, Amsterdam"
                          />
                          {errorsMap.address && <p className="text-red-500 text-sm mt-1">{errorsMap.address}</p>}
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-lg font-normal">Datum</label>
                          <input
                            type="date"
                            min="2025-01-01"
                            max="2026-12-31"
                            value={step2.date}
                            onChange={(e) => { setStep2(s => ({...s, date: e.target.value})); setErrorsMap(m=>({...m, date: ""})); setStepErrors(s=>({...s, 2: false})); setShowButtonError(false); }}
                            className="w-full bg-black border-b border-gray-400 text-white py-2 px-0 focus:outline-none focus:border-white placeholder-gray-400 text-lg font-normal"
                          />
                          {errorsMap.date && <p className="text-red-500 text-sm mt-1">{errorsMap.date}</p>}
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-lg font-normal">Tijd</label>
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <input
                                type="text"
                                inputMode="numeric"
                                pattern="^([01]\d|2[0-3]):([0-5]\d)$"
                                placeholder="12:00"
                                value={step2.startTime}
                                onChange={(e) => {
                                  const v = e.target.value.replace(/[^0-9:]/g, '');
                                  setStep2(s => ({...s, startTime: v}));
                                  setErrorsMap(m=>({...m, time: ""}));
                                  setStepErrors(s=>({...s, 2: false}));
                                  setShowButtonError(false);
                                }}
                                onBlur={(e) => {
                                  let v = e.target.value.trim();
                                  if (/^\d{1,2}$/.test(v)) {
                                    v = v.padStart(2, '0') + ':00';
                                  } else if (/^\d{3,4}$/.test(v)) {
                                    const parts = v.match(/^(\d{1,2})(\d{2})$/);
                                    if (parts) v = parts[1].padStart(2, '0') + ':' + parts[2];
                                  }
                                  setStep2(s => ({...s, startTime: v}));
                                }}
                                className="flex-1 min-w-0 bg-black border-b border-gray-400 text-white py-2 px-2 focus:outline-none focus:border-white appearance-none text-lg font-normal"
                              />
                            </div>
                            <div className="flex items-center text-gray-400">-</div>
                            <div className="flex-1">
                              <input
                                type="text"
                                inputMode="numeric"
                                pattern="^([01]\d|2[0-3]):([0-5]\d)$"
                                placeholder="20:00"
                                value={step2.endTime}
                                onChange={(e) => {
                                  const v = e.target.value.replace(/[^0-9:]/g, '');
                                  setStep2(s => ({...s, endTime: v}));
                                  setErrorsMap(m=>({...m, time: ""}));
                                  setStepErrors(s=>({...s, 2: false}));
                                  setShowButtonError(false);
                                }}
                                onBlur={(e) => {
                                  let v = e.target.value.trim();
                                  if (/^\d{1,2}$/.test(v)) {
                                    v = v.padStart(2, '0') + ':00';
                                  } else if (/^\d{3,4}$/.test(v)) {
                                    const parts = v.match(/^(\d{1,2})(\d{2})$/);
                                    if (parts) v = parts[1].padStart(2, '0') + ':' + parts[2];
                                  }
                                  setStep2(s => ({...s, endTime: v}));
                                }}
                                className="flex-1 min-w-0 bg-black border-b border-gray-400 text-white py-2 px-2 focus:outline-none focus:border-white appearance-none text-lg font-normal"
                              />
                            </div>
                          </div>
                          {errorsMap.time && <p className="text-red-500 text-sm mt-1">{errorsMap.time}</p>}
                        </div>
                      </div>
                      {stepErrors[2] && <p className="text-red-500 text-sm mt-2">Vul alle velden in om door te gaan.</p>}
                      <div className="pt-8 pb-2 px-2 flex gap-4">
                        <button type="button" className="flex-1 border-2 border-white text-white py-4 text-lg font-bold transition-colors hover:bg-white hover:text-black cursor-pointer" onClick={() => setActiveDot(1)}>Vorige</button>
                        <button type="button" className={`flex-1 font-medium py-4 text-lg transition-colors cursor-pointer ${showButtonError && activeDot === 2 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-white text-black hover:bg-gray-100'}`} onClick={goToNext}>{showButtonError && activeDot === 2 ? '!' : 'Volgende'}</button>
                      </div>
                    </div>
                  ) : (
                    // Fourth form (Name, Email, Phone, Comment)
                    <div className="flex flex-col gap-8 flex-1">
                      <div className="flex flex-col gap-6">
                        <div>
                          <label className="block text-gray-300 mb-2 text-lg font-normal">Naam</label>
                          <input
                            value={step3.name}
                            onChange={(e) => { setStep3(s => ({...s, name: e.target.value})); setErrorsMap(m=>({...m, name: ""})); setStepErrors(s=>({...s, 3: false})); setSubmitAttemptedStep(null); }}
                            className="w-full bg-black border-b border-gray-400 text-white py-2 px-0 focus:outline-none focus:border-white placeholder-gray-400 text-lg font-normal"
                            placeholder="Bijv. Jan Jansen"
                          />
                          {(errorsMap.name && submitAttemptedStep === 3) && <p className="text-red-500 text-sm mt-1">{errorsMap.name}</p>}
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-lg font-normal">E-mail</label>
                          <input
                            type="email"
                            value={step3.email}
                            onChange={(e) => { setStep3(s => ({...s, email: e.target.value})); setErrorsMap(m=>({...m, email: ""})); setStepErrors(s=>({...s, 3: false})); setSubmitAttemptedStep(null); }}
                            className="w-full bg-black border-b border-gray-400 text-white py-2 px-0 focus:outline-none focus:border-white placeholder-gray-400 text-lg font-normal"
                            placeholder="bijv. naam@voorbeeld.nl"
                          />
                          {(errorsMap.email && submitAttemptedStep === 3) && <p className="text-red-500 text-sm mt-1">{errorsMap.email}</p>}
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-lg font-normal">Telefoon</label>
                          <input
                            type="tel"
                            inputMode="tel"
                            value={step3.phone}
                            onFocus={() => {
                              if (!step3.phone || step3.phone.trim() === "") {
                                setStep3((s) => ({ ...s, phone: "+31" }));
                                setErrorsMap((m) => ({ ...m, phone: "" }));
                                setStepErrors((s) => ({ ...s, 3: false }));
                              }
                            }}
                            onChange={(e) => {
                              let v = e.target.value || "";
                              const hasPlus = v.startsWith("+");
                              const digits = v.replace(/\D/g, "");
                              v = hasPlus ? `+${digits}` : digits;
                              if (v === "") {
                                setStep3((s) => ({ ...s, phone: "" }));
                              } else {
                                setStep3((s) => ({ ...s, phone: v }));
                              }
                              setErrorsMap((m) => ({ ...m, phone: "" }));
                              setStepErrors((s) => ({ ...s, 3: false }));
                              setSubmitAttemptedStep(null);
                            }}
                            className="w-full bg-black border-b border-gray-400 text-white py-2 px-0 focus:outline-none focus:border-white placeholder-gray-400 text-lg font-normal"
                            placeholder="Bijv. +31612345678"
                          />
                          {(errorsMap.phone && submitAttemptedStep === 3) && <p className="text-red-500 text-sm mt-1">{errorsMap.phone}</p>}
                        </div>
                        <div>
                          <label className="block text-gray-300 mb-2 text-lg font-normal">Opmerking</label>
                          <input
                            value={step3.comment}
                            onChange={(e) => setStep3(s => ({...s, comment: e.target.value}))}
                            className="w-full bg-black border-b border-gray-400 text-white py-2 px-0 focus:outline-none focus:border-white placeholder-gray-400 text-lg font-normal"
                            placeholder="Eventuele extra info, bijv. voorkeuren"
                          />
                        </div>
                      </div>
                      <div className="pt-8 pb-2 px-2 flex gap-4">
                        <button type="button" className="flex-1 border-2 border-white text-white py-4 text-lg font-bold transition-colors hover:bg-white hover:text-black cursor-pointer" onClick={() => setActiveDot(2)}>Vorige</button>
                        <button type="submit" disabled={isSubmitting} className="flex-1 bg-white text-black font-medium py-4 text-lg hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50">{isSubmitting ? 'Verzenden...' : 'Verzenden'}</button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer2 />
    </>
  );
}
