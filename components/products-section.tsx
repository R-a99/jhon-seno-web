"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronRight } from "lucide-react"

const categories = [
  {
    id: "bioenergy",
    name: "Sustainable Bioenergy",
    description: "Solusi energi berkelanjutan dari olahan kelapa premium Indonesia.",
    featuredImage: "/images/bioenergy.png",
    products: [
      { name: "Briket Arang Kelapa", image: "/images/bricket.png", description: "Briket Arang Tempurung Kelapa Premium Indonesia 100% Murni, menghasilkan panas unggul tanpa asap." },
      { name: "Cocopeat", image: "/images/cocopeat.png", description: "Media tanam alami yang 100% terbarukan dan ramah lingkungan." },
      { name: "Cocofiber", image: "/images/cocofiber.png", description: "Serat kelapa berkualitas unggul yang tahan lama dan serbaguna." },
    ],
  },
  {
    id: "spices",
    name: "Premium Spices",
    description: "Rempah-rempah otentik dan premium yang bersumber langsung dari petani lokal Indonesia.",
    featuredImage: "/images/rempah.png",
    products: [
      { name: "Cengkeh", image: "/images/cengkeh.png", description: "Cengkeh utuh berwarna cokelat kemerahan dengan aroma kuat dan rasa pedas manis." },
      { name: "Kapulaga", image: "/images/kopilaga.png", description: "Ratu Rempah dengan aroma hangat, segar, dan kadar minyak atsiri yang tinggi." },
      { name: "Temulawak", image: "/images/temulawak.png", description: "Raja jamu berkualitas unggul dengan kandungan bioaktif maksimal untuk kesehatan." },
    ],
  },
  {
    id: "agriculture",
    name: "Agriculture",
    description: "Produk pertanian berkelanjutan berkualitas ekspor.",
    featuredImage: "/images/kopi1.jpg",
    products: [
      { name: "Kopi Robusta", image: "/images/kopi.png", description: "Kopi Robusta berkualitas dari dataran rendah Indonesia dengan rasa bold." },
    ],
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="py-16 md:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* --- HEADER RATA TENGAH --- */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center mb-12 md:mb-20">
          <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase mb-2 md:mb-3 font-[family-name:var(--font-heading)]">
            Our Products
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 md:mb-5 text-balance font-[family-name:var(--font-heading)]">
            Premium Export Categories
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
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

              {/* Category Grid */}
              <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6">
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

                <div className="w-full md:col-span-7 grid grid-cols-2 gap-3 md:gap-4">
                  {category.products.map((product, idx) => (
                    <div 
                      key={idx} 
                      /* DIUBAH: Menggunakan aspect-video (16:9) dan bg-white agar banner tidak terpotong */
                      className="relative rounded-lg md:rounded-xl overflow-hidden aspect-video bg-white group/card cursor-pointer border border-muted/50"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        /* DIUBAH: object-cover menjadi object-contain memastikan seluruh teks/logo masuk semua tanpa terpotong */
                        className="object-contain transition-transform duration-500 group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001a33]/80 via-[#001a33]/10 to-transparent" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                        <span className="inline-block bg-primary text-primary-foreground text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg font-[family-name:var(--font-heading)]">
                          {product.name}
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-primary/90 hidden md:flex flex-col items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                        <h5 className="text-white font-bold text-base lg:text-lg mb-2 font-[family-name:var(--font-heading)] text-center px-2">
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