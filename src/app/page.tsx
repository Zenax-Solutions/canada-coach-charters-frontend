import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import CoreServices from "@/components/CoreServices";
import FleetSection from "@/components/FleetSection";
import ToursSection from "@/components/ToursSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import GTAServiceAreas from "@/components/GTAServiceAreas";
import HowItWorks from "@/components/HowItWorks";
import FaqSection from "@/components/FaqSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="relative rounded-3xl overflow-hidden">
        <Header />
        <Hero />
      </div>
      <AboutUs />
      <CoreServices />
      <FleetSection />
      <ToursSection />
      <WhyChooseUs />
      <GTAServiceAreas />
      <HowItWorks />
      <FaqSection />
      <TestimonialsSection />
      <QuoteSection />
      <Footer />
    </div>
  );
}
