import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/src/components/ui/card";
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/src/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";


const MarketInsigts = () => {
    return (
        <section className="bg-[#F4F4F4] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0A1F44] sm:text-4xl">
              Market Insights
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Stay informed with the latest trends and analysis in the energy
              sector
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center">
              <TabsList className="mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="oil">Oil</TabsTrigger>
                <TabsTrigger value="gas">Gas</TabsTrigger>
                <TabsTrigger value="investments">Investments</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card
                  key="1"
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative h-48 w-full bg-gradient-to-r from-[#0A1F44] to-[#0D2E5A]"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>May 15, 2023</span>
                      <span>•</span>
                      <span>Oil & Gas</span>
                    </div>
                    <CardTitle className="font-serif text-xl text-[#0A1F44]">
                      The Future of Sustainable Energy Investment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Exploring how traditional energy companies are adapting
                      to the changing landscape while maintaining strong
                      returns for investors.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href="#"
                      className="flex items-center text-sm font-medium text-[#0A1F44] hover:text-[#C49B3E]"
                    >
                      Read More <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>

                <Card
                  key="2"
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative h-48 w-full bg-gradient-to-r from-[#0D2E5A] to-[#0A1F44]"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>May 10, 2023</span>
                      <span>•</span>
                      <span>Oil & Gas</span>
                    </div>
                    <CardTitle className="font-serif text-xl text-[#0A1F44]">
                      Global Oil Supply Chain Resilience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Analysis of how the global oil supply chain is adapting
                      to geopolitical challenges and what it means for
                      investors.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href="#"
                      className="flex items-center text-sm font-medium text-[#0A1F44] hover:text-[#C49B3E]"
                    >
                      Read More <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>

                <Card
                  key="3"
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className="relative h-48 w-full bg-gradient-to-r from-[#0A1F44] via-[#0D2E5A] to-[#0A1F44]"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>May 5, 2023</span>
                      <span>•</span>
                      <span>Oil & Gas</span>
                    </div>
                    <CardTitle className="font-serif text-xl text-[#0A1F44]">
                      Emerging Technologies in Energy Production
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Discover the latest technological innovations reshaping
                      energy production and creating new investment
                      opportunities.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href="#"
                      className="flex items-center text-sm font-medium text-[#0A1F44] hover:text-[#C49B3E]"
                    >
                      Read More <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Other tabs would have similar content */}
            <TabsContent value="oil" className="mt-0">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Oil specific articles */}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="border-[#0A1F44] text-[#0A1F44] hover:bg-[#0A1F44] hover:text-white"
            >
              View All Insights
            </Button>
          </div>
        </div>
      </section>
    )
}
export default MarketInsigts
