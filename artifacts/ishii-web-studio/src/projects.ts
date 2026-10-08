/**
 * PORTFOLIO CONTENT CONFIG
 * Update the studio identity, contact details, preview URLs, and preview images here.
 * For images, add a public image URL or a path in the app's public folder.
 * Empty URLs are intentional placeholders; no demo destination is fabricated.
 * Update index.html's SEO title and descriptions if the studio name changes.
 */
export type StudioProject = {
  name: string;
  category: string;
  description: string;
  url: string;
  image: string;
  visual: 'flourish' | 'sanam' | 'israr' | 'kabab' | 'perfume';
  initials: string;
  accent: string;
};

export const studioName = 'Ishii Web Studio';

export const projects: StudioProject[] = [
  {
    name: 'Flourish Beauty Studio',
    category: 'Beauty Salon Website Concept',
    description: 'A modern and elegant website concept designed for a beauty salon, featuring services, gallery, booking, contact information and WhatsApp integration.',
    url: 'https://flourish-beauty-studio--dhiraniishannah.replit.app/',
    image: '',
    visual: 'flourish',
    initials: 'FB',
    accent: '#d3b7a9',
  },
  {
    name: 'Sanam Boutique',
    category: 'Clothing Boutique Website Concept',
    description: 'A stylish boutique website concept designed to showcase clothing collections, brand identity and customer enquiries.',
    url: 'https://sanamboutique.netlify.app/',
    image: '',
    visual: 'sanam',
    initials: 'SB',
    accent: '#d3bc9d',
  },
  {
    name: 'Israr Jewellery',
    category: 'Jewellery Website Concept',
    description: 'A premium jewellery website concept designed to showcase jewellery collections and make it easy for customers to enquire through WhatsApp.',
    url: 'https://israrwholesalejewelry.netlify.app/',
    image: '',
    visual: 'israr',
    initials: 'IJ',
    accent: '#cab48a',
  },
  {
    name: 'Kabab Ghar',
    category: 'Restaurant Website Concept',
    description: 'A modern restaurant website concept focused on food presentation, menu browsing, location, contact and online enquiries.',
    url: 'https://kabab-ghar-website--contactwebworks.replit.app',
    image: '',
    visual: 'kabab',
    initials: 'KG',
    accent: '#c7815c',
  },
  {
    name: 'Perfume Brand Website',
    category: 'Perfume Brand Website Concept',
    description: 'A premium perfume website concept designed to showcase fragrances, strengthen brand identity and create an elegant shopping experience for customers.',
    url: 'https://dhiranifragnancess.netlify.app/',
    image: '',
    visual: 'perfume',
    initials: 'P',
    accent: '#c4aa82',
  },
];

export const studioContact = {
  whatsapp: '03423500748',
  email: 'contact.webworks.studio@gmail.com',
};
