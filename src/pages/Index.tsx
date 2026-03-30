import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import DestinationsSection from "@/components/DestinationsSection";
import ToursSection from "@/components/ToursSection";
import WhyUsSection from "@/components/WhyUsSection";
import ReviewsSection from "@/components/ReviewsSection";
import SpecialOffers from "@/components/SpecialOffers";


import NewsletterSocial from "@/components/NewsletterSocial";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <DestinationsSection />
      <ToursSection />
      <WhyUsSection />
      <SpecialOffers />
      <ReviewsSection />
      
      
      <NewsletterSocial />
      <Footer />
    </div>
  );
};

export default Index;
