import { Button } from "@/src/components/ui/button";
import Link from "next/link";

const CtaSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#0A1F44] via-[#0D2E5A] to-[#0A1F44] relative py-16 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to{" "}
            <span className="text-[#C49B3E]">fuel your financial future</span>?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Join thousands of investors who have already secured their financial
            future with our strategic oil and gas investment plans.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-[#C49B3E] hover:bg-[#B38A2D] text-white"
              >
                Create Your Account
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black"
              >
                Schedule a Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-full bg-[#C49B3E]/20"></div>
      <div className="absolute top-0 left-0 h-24 w-24 rounded-br-full bg-[#C49B3E]/20"></div>
    </section>
  );
};
export default CtaSection;
