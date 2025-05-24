import { Navbar } from "@/src/components/navbarAndFooter/navbar";
import { InvestmentPlans } from "@/src/components/landing/investment-plans";
import { HowItWorks } from "@/src/components/landing/how-it-works";
import { Testimonials } from "@/src/components/landing/testimonials";
import { Footer } from "@/src/components/navbarAndFooter/footer";
import HeroSection from "@/src/components/landing/HeroSection";
import TrustSection from "@/src/components/landing/TrustSection";
import MarketInsigts from "@/src/components/landing/MarketInsigts";
import CtaSection from "@/src/components/landing/CtaSection";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = await cookieStore.get("petroxcinToken")?.value;
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar token={token}/>
      <main className="flex-1">
        <HeroSection />
        <TrustSection />
        <InvestmentPlans />
        <HowItWorks />
        <MarketInsigts />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
