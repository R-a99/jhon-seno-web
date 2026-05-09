"use client"

import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
// import Link from "next/link" // <-- Hapus atau nonaktifkan ini karena kita pakai tag <a> biasa

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-white/10 shadow-sm">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Text Header */}
          <a href="/" className="flex items-center gap-3"> {/* <-- Ganti Link jadi a */}
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image 
                src="/images/logo1.png" 
                alt="Jhon Seno Company Logo" 
                fill
                className="object-contain hover:opacity-90 transition-opacity"
                priority 
              />
            </div>
            <span className="font-bold text-lg md:text-xl hidden sm:block text-foreground">
              Jhon Seno Company
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a // <-- Ganti Link jadi a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button asChild size="sm">
              <a href="/#contact"> {/* <-- Ganti Link jadi a, dan pastikan href-nya lengkap /#contact */}
                <span>Request Quote</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a // <-- Ganti Link jadi a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.label}</span>
                </a>
              ))}
              <Button asChild className="mt-2 w-full">
                <a href="/#contact" onClick={() => setMobileMenuOpen(false)}> {/* <-- Ganti Link jadi a */}
                  <span>Request Quote</span>
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}