import Link from "next/link";
import {
  Facebook,
  Flame,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { FaTelegramPlane } from "react-icons/fa";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Image from "next/image";
import { Images } from "@/src/lib/store/image/image";

export function Footer() {
  return (
    <footer className="bg-[#0A1F44] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="mb-4 flex items-center">
              <Image
                className="w-32"
                src={Images.logo}
                alt="img"
                width={500}
                height={500}
              />
            </Link>
            <p className="mb-4 text-sm text-gray-300">
              Secure your financial future with strategic investments in the
              energy sector. Professional portfolio management with proven
              returns.
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
                <span className="text-gray-300 hover:text-[#C49B3E] cursor-pointer">
                  About Us
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-[#C49B3E] cursor-pointer">
                  Investment Plans
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-[#C49B3E] cursor-pointer">
                  Market Insights
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-[#C49B3E] cursor-pointer">
                  Projects
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-[#C49B3E] cursor-pointer">
                  Resources
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-[#C49B3E] cursor-pointer">
                  Contact
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-bold">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-[#C49B3E]" />
                <a
                  href="https://www.google.com/maps?q=Los+Angeles,+CA,+USA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:underline"
                >
                  USA, Los Angeles, CA, United States, California
                </a>
              </li>
              <li className="flex items-center">
                <FaTelegramPlane className="mr-2 h-5 w-5 text-[#C49B3E]" />
                <a
                  href="https://t.me/petroxcin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:underline"
                >
                  @petroxcin
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-[#C49B3E]" />
                <a
                  href="mailto:petroxcin@gmail.com"
                  className="text-gray-300 hover:underline"
                >
                  petroxcin@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-[#C49B3E]" />
                <a
                  href="tel:+13235527691"
                  className="text-gray-300 hover:underline"
                >
                  +1 323-552-7691
                </a>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-bold">Newsletter</h3>
            <p className="mb-4 text-sm text-gray-300">
              Subscribe to our newsletter for the latest market insights and
              investment opportunities.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 text-white placeholder:text-gray-400"
              />
              <Button className="w-full bg-[#C49B3E] text-white hover:bg-[#B38A2D]">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="text-center">
            <p className="text-sm text-gray-300">
              &copy; {new Date().getFullYear()} Petroxcin. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
