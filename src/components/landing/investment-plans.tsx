import { ArrowRight, BarChart3, Flame, TrendingUp } from "lucide-react";
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
          {/* Plan 1 */}
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0A1F44]/10">
                <Flame className="h-8 w-8 text-[#0A1F44]" />
              </div>
              <CardTitle className="font-serif text-2xl text-[#0A1F44]">
                Oil Bonds
              </CardTitle>
              <CardDescription>Stable fixed income returns</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <span className="font-serif text-4xl font-bold text-[#0A1F44]">
                  8-12%
                </span>
                <span className="text-gray-500"> / annual return</span>
              </div>
              <ul className="mb-6 space-y-2 text-left text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-[#C49B3E]">✓</span> Backed by
                  physical oil assets
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#C49B3E]">✓</span> Quarterly
                  dividend payments
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#C49B3E]">✓</span> Low volatility
                  investment
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#C49B3E]">✓</span> Minimum
                  investment: $10,000
                </li>
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

          {/* Plan 2 */}
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C49B3E]/10">
                <TrendingUp className="h-8 w-8 text-[#C49B3E]" />
              </div>
              <CardTitle className="font-serif text-2xl text-[#0A1F44]">
                Energy Stocks
              </CardTitle>
              <CardDescription>Growth-focused equity portfolio</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <span className="font-serif text-4xl font-bold text-[#0A1F44]">
                  15-25%
                </span>
                <span className="text-gray-500"> / annual return</span>
              </div>
              <ul className="mb-6 space-y-2 text-left text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-[#C49B3E]">✓</span> Curated
                  portfolio of energy stocks
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#C49B3E]">✓</span> Active
                  management by experts
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#C49B3E]">✓</span> Higher growth
                  potential
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#C49B3E]">✓</span> Minimum
                  investment: $25,000
                </li>
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

          {/* Plan 3 */}
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#333333]/10">
                <BarChart3 className="h-8 w-8 text-[#333333]" />
              </div>
              <CardTitle className="font-serif text-2xl text-[#0A1F44]">
                Diversified Energy
              </CardTitle>
              <CardDescription>Balanced risk-return profile</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4">
                <span className="font-serif text-4xl font-bold text-[#0A1F44]">
                  10-18%
                </span>
                <span className="text-gray-500"> / annual return</span>
              </div>
              <ul className="mb-6 space-y-2 text-left text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-[#C49B3E]">✓</span> Mix of bonds,
                  stocks, and assets
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#C49B3E]">✓</span> Balanced risk
                  exposure
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#C49B3E]">✓</span> Quarterly
                  rebalancing
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-[#C49B3E]">✓</span> Minimum
                  investment: $50,000
                </li>
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
