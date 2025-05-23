import { Button } from "@/src/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#0A1F44] via-[#0D2E5A] to-[#0A1F44] relative">
      <div className="relative z-10 mx-auto flex min-h-[600px] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center text-white sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Invest in the Energy That{" "}
          <span className="text-[#C49B3E]">Powers the World</span>
        </h1>
        <p className="mt-6 max-w-2xl text-xl text-gray-200">
          Secure your financial future with strategic investments in the oil and
          gas industry. Professional portfolio management with proven returns.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-[#C49B3E] hover:bg-[#B38A2D] text-white"
            >
              Start Investing <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-white/10"
            >
              View Investment Plans
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 h-24 w-24 rounded-tr-full bg-[#C49B3E]/20"></div>
      <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-[#C49B3E]/20"></div>
    </section>
  );
};
export default HeroSection;
