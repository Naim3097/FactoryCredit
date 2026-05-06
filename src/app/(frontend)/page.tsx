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

export const revalidate = 60;

export default async function Home() {
  const payload = await getPayload({ config });

  const [hero, challenges, problems, whyChooseUs, infoPenting, footer, testimonials] =
    await Promise.all([
      payload.findGlobal({ slug: "hero" }),
      payload.findGlobal({ slug: "challenges" }),
      payload.findGlobal({ slug: "problems" }),
      payload.findGlobal({ slug: "why-choose-us" }),
      payload.findGlobal({ slug: "info-penting" }),
      payload.findGlobal({ slug: "footer" }),
      payload.find({ collection: "testimonials", limit: 100, sort: "order" }),
    ]);

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
