import { ArrowRight, DollarSign, TrendingUp, Rocket } from "lucide-react";
import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export function InvestmentPlans() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0A1F44] sm:text-4xl">
            Investment Plans
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Diversified investment options tailored to your financial goals
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Starter Plan */}
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0A1F44]/10">
                <DollarSign className="h-8 w-8 text-[#0A1F44]" />
              </div>
              <CardTitle className="font-serif text-2xl text-[#0A1F44]">
                Starter Plan
              </CardTitle>
              <CardDescription>Ideal for new investors</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <span className="font-serif text-4xl font-bold text-[#0A1F44]">
                  0.70%
                </span>
                <span className="text-gray-500"> / daily profit</span>
              </div>
              <ul className="mb-6 space-y-2 text-left text-sm text-gray-600">
                <li>✔️ Low entry threshold</li>
                <li>✔️ Daily profit accrual</li>
                <li>✔️ Start with just $50</li>
                <li>✔️ Investment Range: $50 – $199</li>
              </ul>
            </CardContent>
            <Link href="/dashboard/premium-list">
              <CardFooter>
                <Button className="w-full bg-[#0A1F44] text-white hover:bg-[#0A1F44]/90">
                  Invest Now
                </Button>
              </CardFooter>
            </Link>
          </Card>

          {/* Growth Spark Plan */}
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C49B3E]/10">
                <TrendingUp className="h-8 w-8 text-[#C49B3E]" />
              </div>
              <CardTitle className="font-serif text-2xl text-[#0A1F44]">
                Growth Spark Plan
              </CardTitle>
              <CardDescription>Steady portfolio growth</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <span className="font-serif text-4xl font-bold text-[#0A1F44]">
                  0.80%
                </span>
                <span className="text-gray-500"> / daily profit</span>
              </div>
              <ul className="mb-6 space-y-2 text-left text-sm text-gray-600">
                <li>✔️ Enhanced daily returns</li>
                <li>✔️ Suitable for growth</li>
                <li>✔️ Flexible withdrawal options</li>
                <li>✔️ Investment Range: $200 – $499</li>
              </ul>
            </CardContent>
            <Link href="/dashboard/premium-list">
              <CardFooter>
                <Button className="w-full bg-[#C49B3E] text-white hover:bg-[#B38A2D]">
                  Invest Now
                </Button>
              </CardFooter>
            </Link>
          </Card>

          {/* Accelerator Plan */}
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#333333]/10">
                <Rocket className="h-8 w-8 text-[#333333]" />
              </div>
              <CardTitle className="font-serif text-2xl text-[#0A1F44]">
                Accelerator Plan
              </CardTitle>
              <CardDescription>Maximize daily ROI</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <span className="font-serif text-4xl font-bold text-[#0A1F44]">
                  1.00%
                </span>
                <span className="text-gray-500"> / daily profit</span>
              </div>
              <ul className="mb-6 space-y-2 text-left text-sm text-gray-600">
                <li>✔️ Balanced for growth and risk</li>
                <li>✔️ Ideal for serious investors</li>
                <li>✔️ Minimum Investment: $500</li>
                <li>✔️ Investment Range: $500 – $999</li>
              </ul>
            </CardContent>
            <Link href="/dashboard/premium-list">
              <CardFooter>
                <Button className="w-full bg-[#333333] text-white hover:bg-[#333333]/90">
                  Invest Now
                </Button>
              </CardFooter>
            </Link>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/dashboard/premium-list"
            className="inline-flex items-center text-[#0A1F44] hover:text-[#C49B3E]"
          >
            View All Investment Plans <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
