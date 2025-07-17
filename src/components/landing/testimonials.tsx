"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { testimonials } from "@/src/lib/store/image/image";

const testimonialData = [
  {
    id: 1,
    content:
      "I've been investing in oil and gas for over a decade, and EnergyInvest has consistently delivered the best returns with minimal hassle. Their team's expertise is unmatched.",
    author: "David Langston",
    title: "CEO, Thompson Ventures",
    image: testimonials.testimonials1,
  },
  {
    id: 2,
    content:
      "As someone new to energy investments, I was looking for a trustworthy platform. EnergyInvest provided clear guidance and their diversified portfolio has performed exceptionally well.",
    author: "Carlos Mendoza",
    title: "Financial Advisor",
    image: testimonials.testimonials2,
  },
  {
    id: 3,
    content:
      "The quarterly dividends from my Oil Bonds investment have provided the stable income I was looking for in retirement. Highly recommend their fixed income options.",
    author: "Andrei Volkov",
    title: "Retired Investment Banker",
    image: testimonials.testimonials3,
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonialData.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonialData.length) % testimonialData.length
    );
  };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#0A1F44] sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Hear from investors who have achieved their financial goals with us
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <Quote className="mb-6 h-12 w-12 text-[#C49B3E]/20" />
              <div className="grid gap-8 md:grid-cols-[1fr_3fr]">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full">
                    <Image
                      src={
                        testimonialData[activeIndex].image || "/placeholder.svg"
                      }
                      alt={testimonialData[activeIndex].author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-center font-serif text-lg font-bold text-[#0A1F44]">
                    {testimonialData[activeIndex].author}
                  </h4>
                  <p className="text-center text-sm text-gray-500">
                    {testimonialData[activeIndex].title}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-lg text-gray-700">
                    {testimonialData[activeIndex].content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-[#0A1F44] text-[#0A1F44]"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <div className="flex items-center gap-2">
              {testimonialData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-2 rounded-full ${
                    index === activeIndex ? "bg-[#C49B3E]" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-[#0A1F44] text-[#0A1F44]"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
