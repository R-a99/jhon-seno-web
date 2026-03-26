"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"

const categories = [
  {
    id: "bioenergy",
    name: "Sustainable Bioenergy",
    description: "Premium biomass solutions for industrial and residential heating applications",
    featuredImage: "/images/biomass.jpg",
    products: [
      { name: "Wood Pellets", image: "/images/biomass.jpg", description: "High-density fuel from sustainably sourced wood waste" },
      { name: "Coconut Briquettes", image: "/images/coconut-briquettes.jpg", description: "Long-burning, low-smoke charcoal from coconut shells" },
      { name: "Palm Kernel Shells", image: "/images/palm-kernel-shells.jpg", description: "Sustainable biomass fuel from palm oil processing" },
      { name: "Rice Husk Pellets", image: "/images/rice-husk-pellets.jpg", description: "Eco-friendly fuel pellets from rice milling byproduct" },
      { name: "Sawdust Briquettes", image: "/images/sawdust-briquettes.jpg", description: "Compressed wood waste for efficient clean burning" },
    ],
  },
  {
    id: "spices",
    name: "Premium Spices",
    description: "Authentic Indonesian spices sourced directly from local farmers",
    featuredImage: "/images/spices.jpg",
    products: [
      { name: "Turmeric", image: "/images/turmeric.jpg", description: "Golden root with vibrant color and earthy flavor" },
      { name: "Cloves", image: "/images/cloves.jpg", description: "Aromatic flower buds with intense, warm spice" },
      { name: "Nutmeg", image: "/images/nutmeg.jpg", description: "Fragrant seed with sweet, nutty undertones" },
      { name: "Whole Black Pepper", image: "/images/black-pepper.jpg", description: "Bold, pungent spice for culinary excellence" },
    ],
  },
  {
    id: "agriculture",
    name: "Agriculture & Proteins",
    description: "Sustainable protein sources and innovative agricultural products",
    featuredImage: "/images/dried-insects.jpg",
    products: [
      { name: "Dried Insects", image: "/images/dried-insects.jpg", description: "High-protein sustainable feed for aquaculture and poultry" },
      { name: "Cassava Chips", image: "/images/cassava-chips.jpg", description: "Premium dried tapioca for food and industrial use" },
      { name: "Copra", image: "/images/copra.jpg", description: "Dried coconut meat for oil extraction and processing" },
      { name: "Crude Palm Oil", image: "/images/crude-palm-oil.jpg", description: "Sustainably sourced vegetable oil for food industry" },
      { name: "Arabica Coffee", image: "/images/coffee.jpg", description: "Single-origin specialty coffee from Sumatra highlands" },
    ],
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="py-16 md:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-10 md:mb-16">
          <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase mb-2 md:mb-3 font-[family-name:var(--font-heading)]">
            Our Products
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3 md:mb-4 text-balance font-[family-name:var(--font-heading)]">
            Premium Export Categories
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            We specialize in sourcing and exporting Indonesia&apos;s finest natural products 
            to meet the demands of global markets.
          </p>
        </div>

        {/* Category Sections */}
        <div className="space-y-12 md:space-y-16 lg:space-y-24">
          {categories.map((category) => (
            <div key={category.id} className="group">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground font-[family-name:var(--font-heading)]">
                  {category.name}
                </h3>
                <a 
                  href="/products" 
                  className="text-primary text-xs md:text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View All <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              {/* Category Grid: Mobile stacked (featured on top), Desktop side-by-side */}
              <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6">
                {/* Large Featured Card - Full width on mobile, left side on desktop */}
                <div className="w-full md:col-span-5 relative rounded-xl md:rounded-2xl overflow-hidden aspect-[16/10] md:aspect-[4/3] lg:aspect-auto lg:min-h-[400px] group/featured">
                  <Image
                    src={category.featuredImage}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover/featured:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/90 via-[#001a33]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
                    <span className="inline-block bg-primary text-primary-foreground text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1 rounded-full mb-2 md:mb-3 uppercase tracking-wide">
                      Featured
                    </span>
                    <h4 className="text-white text-lg md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 font-[family-name:var(--font-heading)]">
                      {category.name}
                    </h4>
                    <p className="text-white/80 text-xs md:text-sm lg:text-base leading-relaxed mb-3 md:mb-4 line-clamp-2 md:line-clamp-none">
                      {category.description}
                    </p>
                    <a 
                      href="#contact"
                      className="inline-flex items-center gap-2 text-white font-medium text-xs md:text-sm hover:gap-3 transition-all"
                    >
                      Request Quote <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                    </a>
                  </div>
                </div>

                {/* Small Product Cards Grid - 2 columns on mobile, right side on desktop */}
                <div className="w-full md:col-span-7 grid grid-cols-2 gap-3 md:gap-4">
                  {category.products.map((product, idx) => (
                    <div 
                      key={idx} 
                      className="relative rounded-lg md:rounded-xl overflow-hidden aspect-[4/3] group/card cursor-pointer"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/80 via-[#001a33]/30 to-transparent" />
                      
                      {/* Product Label */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                        <span className="inline-block bg-primary text-primary-foreground text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg font-[family-name:var(--font-heading)]">
                          {product.name}
                        </span>
                      </div>

                      {/* Hover Overlay with Request Quote - Hidden on mobile touch devices */}
                      <div className="absolute inset-0 bg-primary/90 hidden md:flex flex-col items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                        <h5 className="text-white font-bold text-base lg:text-lg mb-2 font-[family-name:var(--font-heading)]">
                          {product.name}
                        </h5>
                        <p className="text-white/80 text-xs text-center px-4 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <a 
                          href="#contact"
                          className="bg-white text-primary font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white/90 transition-colors"
                        >
                          Request Quote
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bespoke Sourcing Banner */}
        <div className="mt-12 md:mt-16 lg:mt-24 relative rounded-xl md:rounded-2xl overflow-hidden bg-primary">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15),transparent_40%)]" />
          </div>
          
          <div className="relative px-4 py-10 md:px-6 md:py-12 lg:px-16 lg:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block bg-white/20 text-white text-[10px] md:text-xs font-semibold px-3 md:px-4 py-1 md:py-1.5 rounded-full mb-4 md:mb-6 uppercase tracking-widest">
                Bespoke Sourcing Solutions
              </span>
              <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 md:mb-4 font-[family-name:var(--font-heading)]">
                Need Something Specific?
              </h3>
              <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed mb-5 md:mb-6 max-w-2xl mx-auto">
                We source agriculture, biomass, and other Indonesian commodities tailored to your exact specifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 font-semibold text-sm md:text-base"
                >
                  <a href="#contact">
                    Discuss Your Requirements
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
              <p className="text-white/70 text-xs md:text-sm mt-4 md:mt-6">
                Best Quality Product • Direct Sourcing • Ethical & Sustainable • Customized Solution
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
