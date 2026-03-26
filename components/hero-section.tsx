import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Handshake, Leaf, Settings } from "lucide-react"

const valueProps = [
  { icon: Shield, title: "Best Quality Product" },
  { icon: Handshake, title: "Direct Sourcing" },
  { icon: Leaf, title: "Ethical & Sustainable" },
  { icon: Settings, title: "Customized Solutions" },
]

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-ship.jpg"
          alt="Export cargo ship at port representing international trade"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-24 pb-16">
        <div className="max-w-4xl">
          <p className="text-primary-foreground/80 text-xs md:text-sm lg:text-base font-medium tracking-widest uppercase mb-4 md:mb-6">
            Trusted Sourcing Specialist
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-foreground leading-tight mb-6 md:mb-8 text-balance font-[family-name:var(--font-heading)]">
            Your Gateway to Premium Indonesian Commodities
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-primary-foreground/90 mb-8 md:mb-10 max-w-3xl leading-relaxed font-sans">
            Your Trusted Source for High-Quality Indonesian Export Products. From Specialty 
            Coffee to Sustainable Bioenergy All Meeting Your Market Standards
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button size="lg" variant="outline" asChild className="text-base bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="#products">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="text-base">
              <Link href="#contact">
                Request Quote
              </Link>
            </Button>
          </div>

          {/* Value Propositions - Mobile: 2x2 Grid, Desktop: Horizontal Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 pt-10 border-t border-primary-foreground/20">
            {valueProps.map((item, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-4 md:p-0"
              >
                <item.icon className="h-7 w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-primary-foreground/90 mb-2 md:mb-3 stroke-[1.5]" />
                <h3 className="text-primary-foreground font-semibold text-[10px] md:text-xs lg:text-sm tracking-wide uppercase font-[family-name:var(--font-heading)] leading-tight">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
