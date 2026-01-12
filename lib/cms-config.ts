// Simple CMS configuration - stores content in JSON files
// This avoids complex dependencies and works with your current Next.js setup

export interface DientsenSection {
  id: string;
  title: string;
  description: string;
  features: { featureText: string }[];
  image?: string;
  ctaButtonText: string;
  sectionPosition: 'hero' | 'second';
}

// In a real application, you would:
// 1. Create an API route to fetch this data
// 2. Store data in a database or JSON file
// 3. Create an admin panel for editing

// For now, here's the structure you'll need:
// Create a public/cms-data.json file with this structure:
/*
{
  "sections": [
    {
      "id": "hero",
      "title": "Specialty Koffie Catering op Locatie",
      "description": "Laat je gasten genieten van onze barista's...",
      "features": [
        { "featureText": "Feature 1" },
        { "featureText": "Feature 2" },
        { "featureText": "Feature 3" }
      ],
      "image": "/37816e257bbb1297c93824f11276397c0a0fd0dc.jpg",
      "ctaButtonText": "Offerte Aanvragen",
      "sectionPosition": "hero"
    },
    {
      "id": "second",
      "title": "De Nieuwe Standaard",
      "description": "Omdat wij geloven dat koffie meer is...",
      "features": [...],
      "image": "48c9546cc5f89b0b1b590256341dedd37915af07.jpg",
      "ctaButtonText": "Offerte Aanvragen",
      "sectionPosition": "second"
    }
  ]
}
*/
