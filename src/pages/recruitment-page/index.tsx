import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroBanner from "./hero-banner";
import PositionsSection from "./positions-section";
import BenefitsSection from "./benefits-section";

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroBanner />
      <PositionsSection />
      <BenefitsSection />
      <Footer />
    </div>
  );
}
