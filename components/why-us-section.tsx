import { Shield, Globe, Award, Truck, Headphones, FileCheck } from "lucide-react"

const reasons = [
  {
    icon: Shield,
    title: "Trusted Partner",
    description: "Committed to transparent communication and long-term business integrity",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Ready to facilitate efficient shipping from Indonesia to your port of choice.",
  },
  {
    icon: Award,
    title: "Premium Standards",
    description: "Strictly adhering to international quality and safety protocols for every shipment.",
  },
  {
    icon: Truck,
    title: "Reliable Logistics",
    description: "Efficient supply chain management with real-time tracking and on-time delivery guarantee.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Personal account managers and 24/7 customer support for seamless communication.",
  },
  {
    icon: FileCheck,
    title: "Full Documentation",
    description: "Complete export documentation, certificates of origin, and compliance paperwork handled.",
  },
]

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
            Core Value Proposition
          </p>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 text-balance font-[family-name:var(--font-heading)]">
            The Jhon Seno Advantage
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We go beyond just exporting products, we also set new standards for reliability through 
            high-quality products, responsive service, and an integrated global logistics system 
            tailored to your market&apos;s needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-muted hover:bg-[#003366] transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#003366] group-hover:bg-white flex items-center justify-center mb-6 transition-colors duration-300">
                <reason.icon className="h-6 w-6 text-white group-hover:text-[#003366] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-white mb-3 transition-colors duration-300 font-[family-name:var(--font-heading)]">
                {reason.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-white/80 leading-relaxed transition-colors duration-300">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
