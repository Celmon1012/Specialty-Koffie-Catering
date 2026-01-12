/**
 * Reviews Content Configuration
 * =============================
 * Edit the reviews below to update the customer testimonials shown in the footer.
 * Each review should have:
 * - text: The review message
 * - customerName: The customer's name or identifier
 * - rating: Number of stars (1-5)
 */

export interface Review {
  text: string;
  customerName: string;
  rating: number; // 1-5 stars
}

const reviews: Review[] = [
  {
    text: "Tijdens de heropening na de verbouwing van onze winkel stond Menno met zijn koffiebar bij ons in de zaak. Hij was ontzettend vriendelijk en de koffie was heerlijk. Toen we vroegen of ze een uurtje langer konden blijven, was dat totaal geen probleem. Alles was perfect geregeld.",
    customerName: "Piersma Juweliers",
    rating: 5,
  },
  {
    text: "Mennoskoffie was op onze bruiloft. Voor ons een onmisbaar onderdeel. De koffie was fantastisch, alles zag er verzorgd en netjes uit. Vriendelijk mensen die met onze wensen rekening hielden. Wanneer we weer een groot feest hebben in de toekomst weten wij waar we de koffie gaan regelen! Onze gasten hebben het ook nog steeds over de heerlijke koffie! Zeker een aanrader.",
    customerName: "Sanne Menger",
    rating: 5,
  },
  {
    text: "Altijd 'n glimlach, altijd vers bereid!",
    customerName: "Marinthe de Hek - ITGWO",
    rating: 5,
  },
  {
    text: "Heerlijke en goede service tijdens onze bedrijfsbbq. Zeker een aanrader, bedankt!",
    customerName: "Levo",
    rating: 5,
  },
  {
    text: 'We kregen snel een offerte en Menno was duidelijk en vriendelijk in de communicatie. De reactie van de mensen hier: "Wat een heerlijke koffie!" De keuze in koffie- en theesoorten was top en aan de kar waren Menno en zijn partner ook plezierig.',
    customerName: "IKC Trianova",
    rating: 5,
  },
];

export default reviews;
