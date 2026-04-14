import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Challenges from "@/components/Challenges";
import Problems from "@/components/Problems";
import WhyChooseUs from "@/components/WhyChooseUs";
import LoanCalculator from "@/components/LoanCalculator";
import InfoPenting from "@/components/InfoPenting";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Challenges />
      <Problems />
      <WhyChooseUs />
      <LoanCalculator />
      <InfoPenting />
      <Testimonials />
      <Footer />
    </>
  );
}
