import Link from "next/link"
import { Facebook, Flame, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-[#0A1F44] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="mb-4 flex items-center">
              <Flame className="h-8 w-8 text-[#C49B3E]" />
              <span className="ml-2 font-serif text-xl font-bold">EnergyInvest</span>
            </Link>
            <p className="mb-4 text-sm text-gray-300">
              Secure your financial future with strategic investments in the energy sector. Professional portfolio
              management with proven returns.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-[#C49B3E]">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-[#C49B3E]">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-[#C49B3E]">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-[#C49B3E]">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#C49B3E]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/plans" className="text-gray-300 hover:text-[#C49B3E]">
                  Investment Plans
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-gray-300 hover:text-[#C49B3E]">
                  Market Insights
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-[#C49B3E]">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-[#C49B3E]">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#C49B3E]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-bold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-[#C49B3E]" />
                <span className="text-gray-300">
                  1234 Energy Plaza, Suite 500
                  <br />
                  Houston, TX 77002, USA
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-[#C49B3E]" />
                <span className="text-gray-300">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-[#C49B3E]" />
                <span className="text-gray-300">info@energyinvest.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-bold">Newsletter</h3>
            <p className="mb-4 text-sm text-gray-300">
              Subscribe to our newsletter for the latest market insights and investment opportunities.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 text-white placeholder:text-gray-400"
              />
              <Button className="w-full bg-[#C49B3E] text-white hover:bg-[#B38A2D]">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-300">
              &copy; {new Date().getFullYear()} EnergyInvest. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/terms" className="text-gray-300 hover:text-[#C49B3E]">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-[#C49B3E]">
                Privacy Policy
              </Link>
              <Link href="/disclaimer" className="text-gray-300 hover:text-[#C49B3E]">
                Investment Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
