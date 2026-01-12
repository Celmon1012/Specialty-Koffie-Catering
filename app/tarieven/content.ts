/**
 * Edit this file to change the static copy shown on the `tarieven` page.
 * Keep content simple: strings for headings/descriptions and arrays for lists.
 * Example: add/remove entries in `packages[*].features` to change the bullet list.
 */

export interface TariefPackage {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[]; // edit these strings to change the list items
}

export interface TarievenContent {
  whyTitle: string;
  heroHeading: string;
  heroDescription: string;
  whyDescription: string;
  // Intro paragraph used across the site; edit this to change the short intro copy
  introParagraph: string;
  // Service bullets shown in multiple components (editable list)
  serviceBullets: string[];
  // Hero-specific short bullets shown on the tarieven hero — editable
  heroBullets: string[];
  // Default image used for the Services hero (editable)
  serviceImage: string;
  // Logos used in marquees (editable list) — components will cycle through these
  marqueeLogos: string[];
  packages: TariefPackage[];
}

const tarievenContent: TarievenContent = {
  whyTitle: "Tarieven",
  heroHeading: "Pakketten",
  heroDescription:
    "Al onze offertes worden op maat gemaakt, die worden gebaseerd op deze pakketten.",
  whyDescription:
    "Wij geloven in transparantie en duidelijkheid. Daarom hanteren wij vaste prijzen voor onze koffiecatering diensten. Geen verborgen kosten, geen verrassingen achteraf. Wat je ziet is wat je krijgt.",
  introParagraph:
    "Wij vertellen het graag, maar dit zegt alles.",
  serviceBullets: [
    "Vaste prijzen",
    "Alles inbegrepen: van opbouw tot afbouw",
    "Geen verrassingen",
  ],
  // Default hero image for the Services component — change path to update image site-wide
  serviceImage: "/G003.webp",
  // Logos used for the Google/Adidas marquees; edit to change which logos show
  marqueeLogos: ["/Google.png", "/Adidas.png"],
  // Short bullets used in the tarieven hero section — edit these to change hero bullets
  heroBullets: [
    "Vaste prijzen",
    "Alles inbegrepen: van opbouw tot afbouw",
    "Geen verrassingen",
  ],
  packages: [
    {
      id: "basis",
      title: "Basis",
      description: "Voor kleinschalige evenementen zonder extra gedoe",
      price: "Vanaf €600",
      features: ["Barista", "Basis Menu", "Onbeperkt Service"],
    },
    {
      id: "premium",
      title: "Premium",
      description: "Voor kleinschalige evenementen zonder extra gedoe",
      price: "Vanaf €800",
      features: [
        "Alles van het basis pakket",
        "Custom koffiekar & bekers",
        "Premium Menu",
      ],
    },
  ],
};

export default tarievenContent;
