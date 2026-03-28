"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, Check } from "lucide-react"

// --- DATA PRODUK B2B ---
const B2B_PRODUCTS = [
  {
    id: 1,
    name: "Premium Arabica Beans",
    category: "agriculture",
    image: "http://googleusercontent.com/image_collection/image_retrieval/16856706778101069953_0",
    badge: "Sourced Direct",
    moq: "1 Container",
    desc: "High-altitude Arabica green beans sourced directly from Indonesian volcanic highlands. Exceptional cupping score.",
    specs: ["Moisture: <11%", "Defect: <5%", "Grade: Specialty/Grade 1", "Process: Washed/Natural"]
  },
  {
    id: 2,
    name: "Industrial Wood Pellets",
    category: "bioenergy",
    image: "http://googleusercontent.com/image_collection/image_retrieval/12062570522823909837_0",
    badge: "Premium",
    moq: "50 Tons",
    desc: "High calorific value wood pellets made from 100% sustainable hardwood sawdust. Ideal for industrial boilers.",
    specs: ["Calorific Value: >4600 kcal/kg", "Ash Content: <2%", "Moisture: <8%", "Diameter: 6mm/8mm"]
  },
  {
    id: 3,
    name: "Coconut Charcoal Briquettes",
    category: "bioenergy",
    image: "http://googleusercontent.com/image_collection/image_retrieval/9815874610753702906_0",
    badge: "Export Grade",
    moq: "18 Tons (20ft)",
    desc: "Premium shisha and BBQ charcoal cubes. Odorless, smokeless, and offers a long burning time with white ash.",
    specs: ["Fixed Carbon: >75%", "Ash Content: <2.5%", "Burning Time: 2+ Hours", "Shape: Cube/Hexagonal"]
  },
  {
    id: 4,
    name: "Dried Mealworms",
    category: "agriculture",
    image: "http://googleusercontent.com/image_collection/image_retrieval/8062870869747875636_0",
    badge: "High Protein",
    moq: "500 Kg",
    desc: "Nutrient-dense dried insect protein for animal feed and pet food industries. Microwave dried for maximum nutrient retention.",
    specs: ["Protein: >50%", "Moisture: <5%", "Fat: 28%", "Shelf Life: 12 Months"]
  },
  {
    id: 5,
    name: "Indonesian Spices Assortment",
    category: "spices",
    image: "http://googleusercontent.com/image_collection/image_retrieval/4203335042344429750_0",
    badge: "Premium",
    moq: "1 Ton",
    desc: "A carefully curated assortment of whole Indonesian spices including turmeric, cloves, and nutmeg. Rich in essential oils.",
    specs: ["Purity: 99%", "Moisture: <10%", "Admixture: <1%", "Origin: Java/Sumatra"]
  }
]

// --- KOMPONEN FILTER & GRID (DIBUNGKUS AGAR BISA PAKAI useSearchParams) ---
function ProductFilterContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  
  const [activeCategory, setActiveCategory] = useState(categoryParam || "all")
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)

  // Sinkronisasi saat URL berubah
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam)
    }
  }, [categoryParam])

  const filteredProducts = B2B_PRODUCTS.filter(p => 
    activeCategory === "all" || p.category === activeCategory
  )

  const categories = [
    { id: "all", label: "All Products" },
    { id: "spices", label: "Premium Spices" },
    { id: "bioenergy", label: "Sustainable Bioenergy" },
    { id: "agriculture", label: "Agriculture & Proteins" }
  ]

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filter */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 sticky top-24">
          <h3 className="font-bold text-lg mb-4 text-[#001f3f]">Categories</h3>
          <ul className="space-y-3">
            {categories.map(cat => (
              <li key={cat.id}>
                <button 
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center space-x-2 text-sm w-full text-left transition-colors ${activeCategory === cat.id ? 'text-[#001f3f] font-semibold' : 'text-slate-600 hover:text-[#001f3f]'}`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${activeCategory === cat.id ? 'bg-[#001f3f] border-[#001f3f]' : 'border-slate-300'}`}>
                    {activeCategory === cat.id && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span>{cat.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Product Grid (4 Columns on Desktop) */}
      <main className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#001f3f] text-white text-xs font-semibold px-2 py-1 rounded">
                  {product.badge}
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-[#001f3f] mb-1">{product.name}</h3>
                <p className="text-xs text-slate-500 mb-4 uppercase tracking-wider">MOQ: {product.moq}</p>
                <div className="mt-auto">
                  <Button variant="outline" className="w-full border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* QUICK VIEW MODAL (Besar & Profesional) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto relative flex flex-col md:flex-row">
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur rounded-full p-2 hover:bg-slate-100 transition"
            >
              <X className="w-6 h-6 text-[#001f3f]" />
            </button>

            {/* Kiri: Gambar Besar */}
            <div className="w-full md:w-1/2 bg-slate-50 relative aspect-square md:aspect-auto md:min-h-[600px]">
              <Image 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                fill 
                className="object-cover"
              />
            </div>

            {/* Kanan: Detail & Spesifikasi */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block bg-slate-100 text-[#001f3f] text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest w-fit">
                {selectedProduct.category}
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#001f3f] mb-4 leading-tight">
                {selectedProduct.name}
              </h2>
              <p className="text-lg text-slate-600 mb-8 border-l-4 border-[#001f3f] pl-4">
                {selectedProduct.desc}
              </p>

              <div className="mb-8">
                <h4 className="text-sm font-bold tracking-widest text-slate-900 uppercase mb-4">Technical Specifications</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-slate-600">
                  {selectedProduct.specs.map((spec: string, idx: number) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#001f3f] mr-2"></div>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-auto">
                <div className="space-y-1">
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Minimum Order</p>
                  <p className="font-bold text-xl text-[#001f3f]">{selectedProduct.moq}</p>
                </div>
                <Button className="bg-[#001f3f] hover:bg-[#001f3f]/90 text-white h-12 px-8 text-lg rounded-xl">
                  Request Quote
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

// --- MAIN EXPORT PAGE ---
export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="bg-[#001f3f] text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Export Catalog</h1>
        <p className="text-slate-300 max-w-2xl mx-auto px-4">Browse our comprehensive range of premium Indonesian commodities, rigorously processed for international markets.</p>
      </div>
      <Suspense fallback={<div className="text-center py-24 text-slate-500">Loading catalog...</div>}>
        <ProductFilterContent />
      </Suspense>
    </div>
  )
}