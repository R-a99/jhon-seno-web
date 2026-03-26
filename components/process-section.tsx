import { Search, ClipboardCheck, Package, Ship, Headphones } from "lucide-react"

const processSteps = [
  {
    icon: Search,
    step: "01",
    title: "Sourcing & Selection",
    description: "We identify and select the finest commodities from our trusted network of Indonesian farmers and producers.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Quality Inspection",
    description: "Every product undergoes multi-stage quality control to ensure it meets international export standards.",
  },
  {
    icon: Package,
    step: "03",
    title: "Processing & Packaging",
    description: "Products are processed and packaged according to your specifications and destination requirements.",
  },
  {
    icon: Ship,
    step: "04",
    title: "Export & Logistics",
    description: "We handle all export documentation, customs clearance, and coordinate reliable international shipping.",
  },
  {
    icon: Headphones,
    step: "05",
    title: "Ongoing Support",
    description: "Dedicated account management ensures seamless communication and support throughout our partnership.",
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#003366] text-sm font-semibold tracking-widest uppercase mb-3 font-[family-name:var(--font-heading)]">
            Our Process
          </p>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6 text-balance font-[family-name:var(--font-heading)]">
            From Source to Shipment
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A transparent, end-to-end export process designed to deliver premium Indonesian commodities 
            to your doorstep with complete peace of mind.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
          {processSteps.map((item, index) => (
            <div 
              key={index} 
              className="relative group"
            >
              {/* Connector Line (hidden on mobile and last item) */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-[#003366]/20" />
              )}
              
              <div className="bg-muted rounded-2xl p-6 lg:p-8 h-full flex flex-col items-center text-center transition-all duration-300 hover:bg-[#003366] hover:shadow-xl group-hover:scale-[1.02]">
                {/* Step Number */}
                <span className="text-[#003366] text-xs font-bold tracking-widest mb-4 group-hover:text-white/70 transition-colors font-[family-name:var(--font-heading)]">
                  Step {item.step}
                </span>
                
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-[#003366] flex items-center justify-center mb-5 group-hover:bg-white transition-colors">
                  <item.icon className="h-7 w-7 text-white group-hover:text-[#003366] transition-colors stroke-[1.5]" />
                </div>
                
                {/* Title */}
                <h3 className="text-foreground font-bold text-base lg:text-lg group-hover:text-white transition-colors font-[family-name:var(--font-heading)]">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
