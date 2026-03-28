import Link from "next/link"
import { Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#001f3f] text-white py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-700/50 pb-12">
          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">Jhon Seno Kompany</h3>
            <p className="text-slate-400 text-sm leading-relaxed pr-4">
              Your Trusted Source for High-Quality Indonesian Export Products. Meeting international B2B market standards with integrity.
            </p>
          </div>

          {/* Column 2: Products (With Query Params) */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase">Products</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/products?category=spices" className="hover:text-white transition-colors">Premium Spices</Link></li>
              <li><Link href="/products?category=bioenergy" className="hover:text-white transition-colors">Sustainable Bioenergy</Link></li>
              <li><Link href="/products?category=agriculture" className="hover:text-white transition-colors">Agriculture & Proteins</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase">Connect</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Centered Copyright */}
        <div className="pt-8 text-center">
          <p className="text-sm text-slate-500">
            © 2026 Jhon Seno Kompany. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}