import { getPayload } from "payload";
import config from "@payload-config";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Challenges from "@/components/Challenges";
import Problems from "@/components/Problems";
import WhyChooseUs from "@/components/WhyChooseUs";
import LoanCalculator from "@/components/LoanCalculator";
import InfoPenting from "@/components/InfoPenting";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import type {
  ChallengesData,
  FooterData,
  HeroData,
  InfoPentingData,
  ProblemsData,
  Testimonial,
  WhyChooseUsData,
} from "@/types/cms";

// Render on-demand at runtime instead of at build time so Vercel's build
// process never touches the database. The `revalidate` still caches the
// rendered HTML on the edge for 60 seconds.
export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function Home() {
  const payload = await getPayload({ config });

  // Run queries sequentially — the pool is small and serverless Postgres
  // (Neon, Supabase free) reject bursts of parallel connections.
  const hero = await payload.findGlobal({ slug: "hero" });
  const challenges = await payload.findGlobal({ slug: "challenges" });
  const problems = await payload.findGlobal({ slug: "problems" });
  const whyChooseUs = await payload.findGlobal({ slug: "why-choose-us" });
  const infoPenting = await payload.findGlobal({ slug: "info-penting" });
  const footer = await payload.findGlobal({ slug: "footer" });
  const testimonials = await payload.find({
    collection: "testimonials",
    limit: 100,
    sort: "order",
  });

  return (
    <>
      <Navbar />
      <Hero data={hero as unknown as HeroData} />
      <Challenges data={challenges as unknown as ChallengesData} />
      <Problems data={problems as unknown as ProblemsData} />
      <WhyChooseUs data={whyChooseUs as unknown as WhyChooseUsData} />
      <LoanCalculator />
      <InfoPenting data={infoPenting as unknown as InfoPentingData} />
      <Testimonials items={testimonials.docs as unknown as Testimonial[]} />
      <Footer data={footer as unknown as FooterData} />
    </>
  );
}
