export const business = {
  name: "Jouissance",
  descriptor: "Travaux Divers",
  fullName: "Jouissance Travaux Divers",
  experience: "15+",
  experienceLabel: {
    fr: "ans d'expérience",
    ar: "سنة من الخبرة",
  },
  location: "Salé, Maroc",
  coverage: {
    fr: "Intervention partout au Maroc",
    ar: "نتنقلو لجميع أنحاء المغرب",
  },
  coordinates: {
    lat: 34.0765368,
    lng: -6.7602793,
  },
  mapsUrl:
    "https://www.google.com/maps?q=34.0765368,-6.7602793&z=17&hl=en",
  contact: {
    phone: "+212658393049",
    phoneDisplay: "06 58 39 30 49",
    whatsapp: "+212658393049",
    email: "jouissance.travauxdivers@gmail.com",
    address: "N°02 Avenue Med V, Hay Nahda, Sect. 05, Karia – Salé",
  },
  social: {
    instagram: "",
    facebook: "",
    googleBusiness: "",
  },
} as const;

export type Business = typeof business;
