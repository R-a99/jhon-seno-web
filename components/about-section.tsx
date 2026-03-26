import { Shield, Handshake, Leaf, Settings } from "lucide-react"

const commitments = [
  {
    icon: Shield,
    title: "Best Quality Product",
  },
  {
    icon: Handshake,
    title: "Direct Sourcing",
  },
  {
    icon: Leaf,
    title: "Ethical & Sustainable",
  },
  {
    icon: Settings,
    title: "Customized Solutions",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <p className="text-[#003366] text-xs md:text-sm font-semibold tracking-widest uppercase mb-2 md:mb-3 font-[family-name:var(--font-heading)]">
              Company Overview
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 md:mb-6 text-balance font-[family-name:var(--font-heading)]">
              Your Reliable Partner in Indonesian Exports
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4 md:mb-6">
              Jhon Seno Kompany is a dedicated B2B export partner based in Indonesia, 
              specializing in the supply of premium-grade commodities. Built on a foundation 
              of integrity, we connect Indonesia&apos;s finest natural resources with international 
              industry standards.
            </p>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Our mission is to provide global market access to the best Indonesian premium 
              commodities, ensuring every shipment meets rigorous international benchmarks.
            </p>
          </div>

          {/* Commitment Cards - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {commitments.map((commitment, index) => (
              <div 
                key={index} 
                className="bg-[#003366] rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 flex flex-col items-center justify-center text-center aspect-square"
              >
                <commitment.icon className="h-8 w-8 md:h-10 md:w-10 text-white mb-3 md:mb-4 stroke-[1.5]" />
                <h3 className="text-white font-bold text-[10px] md:text-sm lg:text-base tracking-wide uppercase font-[family-name:var(--font-heading)] leading-tight">
                  {commitment.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
