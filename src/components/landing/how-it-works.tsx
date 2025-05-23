import {
  ArrowRight,
  CheckCircle,
  CircleDollarSign,
  UserPlus,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export function HowItWorks() {
  return (
    <section className="bg-gradient-to-br from-[#0A1F44] via-[#0D2E5A] to-[#0A1F44] relative py-16 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            How It <span className="text-[#C49B3E]">Works</span>
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Start your investment journey in three simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <div className="relative flex flex-col items-center rounded-lg bg-white/5 p-6 text-center backdrop-blur-sm">
            <div className="absolute -top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#C49B3E] text-white">
              1
            </div>
            <UserPlus className="mb-4 h-12 w-12 text-[#C49B3E]" />
            <h3 className="mb-2 font-serif text-xl font-bold">
              Create Account
            </h3>
            <p className="text-gray-300">
              Register for an account and complete our simple verification
              process to get started.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative flex flex-col items-center rounded-lg bg-white/5 p-6 text-center backdrop-blur-sm">
            <div className="absolute -top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#C49B3E] text-white">
              2
            </div>
            <CheckCircle className="mb-4 h-12 w-12 text-[#C49B3E]" />
            <h3 className="mb-2 font-serif text-xl font-bold">Choose Plan</h3>
            <p className="text-gray-300">
              Select from our range of investment plans based on your financial
              goals and risk tolerance.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative flex flex-col items-center rounded-lg bg-white/5 p-6 text-center backdrop-blur-sm">
            <div className="absolute -top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#C49B3E] text-white">
              3
            </div>
            <CircleDollarSign className="mb-4 h-12 w-12 text-[#C49B3E]" />
            <h3 className="mb-2 font-serif text-xl font-bold">Watch It Grow</h3>
            <p className="text-gray-300">
              Monitor your investments through our dashboard and watch your
              wealth grow over time.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/dashboard">
            <Button className="bg-[#C49B3E] text-white hover:bg-[#B38A2D]">
              Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 h-24 w-24 rounded-tr-full bg-[#C49B3E]/20"></div>
      <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-[#C49B3E]/20"></div>
    </section>
  );
}
