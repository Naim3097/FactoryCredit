export type HeroData = {
  headlineLine1: string;
  headlineLine2: string;
  subheadline: string;
  bullets?: { text: string; id?: string | null }[] | null;
  formHeading: string;
};

export type ChallengesData = {
  heading: string;
  concerns?: { text: string; iconKey?: string | null; id?: string | null }[] | null;
  ctaBannerText: string;
};

export type ProblemsData = {
  heading: string;
  subheading: string;
  items?: { title: string; iconKey: string; id?: string | null }[] | null;
};

export type MediaDoc = {
  id: number | string;
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  filename?: string | null;
};

export type WhyChooseUsData = {
  heading: string;
  reasons?:
    | {
        title: string;
        image?: MediaDoc | number | string | null;
        imageUrl?: string | null;
        id?: string | null;
      }[]
    | null;
};

export type InfoPentingData = {
  eyebrow: string;
  heading: string;
  terms?: { text: string; id?: string | null }[] | null;
  exampleCardTitle: string;
  exampleCardSubtitle: string;
  example: { amount: string; rate: string; tenure: string; monthly: string };
  ctaLabel: string;
};

export type FooterData = {
  companyDescription: string;
  license: {
    number: string;
    validity: string;
    adPermitNumber: string;
    adPermitValidity: string;
  };
  operatingHours?: { text: string; id?: string | null }[] | null;
  branches?:
    | {
        name: string;
        address: string;
        phoneDisplay: string;
        wa: string;
        mapUrl: string;
        facebookUrl?: string | null;
        instagramUrl?: string | null;
        tiktokUrl?: string | null;
        id?: string | null;
      }[]
    | null;
  copyrightText: string;
  legalLinks: { privacyUrl: string; disclaimerUrl: string };
};

export type Testimonial = {
  id: number | string;
  quote: string;
  name: string;
  role: string;
  color: "red" | "blue" | "green" | "yellow" | "purple" | string;
};
