"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, Search, SlidersHorizontal, X, ZoomIn } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// --- DATA PRODUCTS ---
const allProducts = [
  {
    id: "briket-arang-kelapa",
    name: "Briket Arang Kelapa",
    category: "Bioenergy",
    image: "/images/coconut-briquettes.jpg",
    badge: "Premium",
    moq: "10 Tons",
    description: "Briket Arang Tempurung Kelapa Premium Indonesia 100% Murni, Kualitas Ekspor, Energi Berkelanjutan. Dibuat secara eksklusif dari tempurung kelapa matang pilihan, briket kami menghasilkan panas yang unggul, abu rendah, dan waktu pembakaran yang lebih lama tanpa asap, bau, atau percikan api.",
    specifications: [
      { label: "Bentuk & Ukuran", value: "Kubus/Heksagonal/Silinder/Dome ± 15-40 mm" },
      { label: "Kadar Air", value: "± 5 - 8%" },
      { label: "Kandungan Abu", value: "± 2 - 8%" },
      { label: "Karbon Tetap", value: "± 70 - 85%" },
      { label: "Nilai Kalor", value: "± 5000 - 8000 kcl/kg" },
      { label: "Waktu Bakar", value: "± 1 - 2.5 jam" },
    ],
  },
  {
    id: "cocopeat",
    name: "Cocopeat",
    category: "Agriculture",
    image: "/images/cocopeat.jpg",
    badge: "Sourced Direct",
    moq: "10 Tons",
    description: "Cocopeat Premium Indonesia media tanam alami yang sempurna. Diproses dengan cermat dari sabut kelapa matang, cocopeat kami 100% alami, terbarukan, dan ramah lingkungan pilihan berkelanjutan yang dipercaya oleh para petani profesional. Dicuci dua kali dan di-buffer, steril, bebas patogen.",
    specifications: [
      { label: "Bentuk", value: "Blok kompres 5kg, Bale 15 - 25 kg" },
      { label: "Kadar Air", value: "± 10 - 20%" },
      { label: "Electrical Conductivity", value: "± 0.5 - 1.0 mS/cm" },
      { label: "Volume", value: "± 60 - 85 liter/5kg" },
      { label: "pH", value: "5.5 - 7.0" },
    ],
  },
  {
    id: "cocofiber",
    name: "Cocofiber",
    category: "Agriculture",
    image: "/images/cocofiber.jpg",
    badge: "Premium",
    moq: "10 Tons",
    description: "Cocofiber berkualitas unggul yang dibuat dari serat kelapa matang pilihan. Seratnya panjang, kuat, dan elastis berkat kandungan lignin alami yang tinggi. Tahan terhadap air asin, panas, dan jamur, sangat cocok untuk media tanam, stabilisasi lereng, atau pembuatan produk premium.",
    specifications: [
      { label: "Kadar Air", value: "± 15 - 20% (Maksimal 20%)" },
      { label: "Kemurnian", value: "± 2 - 5%" },
      { label: "Kandungan Debu", value: "± 2 - 5%" },
      { label: "Warna", value: "Golden yellow / Bright brown / Natural brown" },
      { label: "Berat per Bale", value: "80 - 120 kg" },
    ],
  },
  {
    id: "kapulaga",
    name: "Kapulaga",
    category: "Spices",
    image: "/images/cardamom.jpg",
    badge: "Sourced Direct",
    moq: "500 Kg",
    description: "Dari pegunungan tropis Indonesia yang hijau, tumbuh kapulaga berkualitas unggul. Diproses secara alami dan dikeringkan hati-hati agar aroma hangat, segar, manis, dan sedikit pedasnya terjaga. Memiliki kadar minyak atsiri dan 1,8-cineole yang melimpah.",
    specifications: [
      { label: "Kadar Air", value: "± 8 - 12%" },
      { label: "Kandungan Minyak Atsiri", value: "± 2.0 - 4.5%" },
      { label: "Kemurnian", value: "± 0.5 - 2%" },
      { label: "Warna", value: "Hijau mengkilap, cokelat muda" },
    ],
  },
  {
    id: "temulawak",
    name: "Temulawak",
    category: "Spices",
    image: "/images/temulawak.jpg",
    badge: "Premium",
    moq: "1 Ton",
    description: "Rimpang temulawak terbaik (Raja Jamu) dari petani lokal, dikeringkan alami agar kandungan bioaktifnya terjaga. Memiliki khasiat luar biasa dengan kandungan curcuminoid dan xanthorrhizol tinggi untuk mendukung kesehatan hati, pencernaan, dan antioksidan.",
    specifications: [
      { label: "Kadar Air", value: "± 8 - 14%" },
      { label: "Kandungan Minyak Atsiri", value: "± 1 - 2%" },
      { label: "Kandungan Kurkuminoid", value: "± 1 - 2.5%" },
      { label: "Kemurnian", value: "± 0.5 - 2%" },
      { label: "Ukuran Irisan", value: "± 3 - 6 mm" },
    ],
  },
  {
    id: "cengkeh",
    name: "Cengkeh",
    category: "Spices",
    image: "/images/cloves.jpg",
    badge: "Premium",
    moq: "500 Kg",
    description: "Cengkeh terbaik dari tanah Indonesia (Maluku, Sulawesi, Jawa). Dipetik dengan tangan dan dikeringkan secara alami. Memiliki warna cokelat kemerahan yang indah dengan aroma kuat serta kadar minyak atsiri dan eugenol tinggi.",
    specifications: [
      { label: "Kadar Air", value: "± 8 - 13%" },
      { label: "Kandungan Minyak Atsiri", value: "± 12 - 20%" },
      { label: "Kemurnian", value: "± 0.5 - 2%" },
      { label: "Warna", value: "Cokelat kemerahan, Hitam mengkilap, Coklat standar" },
    ],
  },
  {
    id: "robusta-coffee",
    name: "Kopi Robusta",
    category: "Agriculture",
    image: "/images/coffee.jpg",
    badge: "Sourced Direct",
    moq: "2 Tons",
    description: "High-quality Robusta coffee beans from the fertile lowlands of Indonesia. Our beans deliver bold, full-bodied flavor with high caffeine content, ideal for espresso blends and instant coffee manufacturing.",
    specifications: [
      { label: "Grade", value: "EK1 / Grade 4" },
      { label: "Altitude", value: "400-800 MASL" },
      { label: "Moisture Content", value: "12-13%" },
      { label: "Defect Count", value: "≤ 60 per 300g" },
      { label: "Processing", value: "Natural / Washed" },
    ],
  },
]

const categories = ["Bioenergy", "Spices", "Agriculture"]

const categoryMap: Record<string, string> = {
  spices: "Spices",
  bioenergy: "Bioenergy",
  agriculture: "Agriculture",
}

type Product = typeof allProducts[number]

function ProductsContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(true)
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [imageZoomed, setImageZoomed] = useState(false)

useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      const mappedCategory = categoryMap[categoryParam.toLowerCase()]
      if (mappedCategory) {
        // Langsung setel state ke kategori yang dipilih dari URL (Footer)
        setSelectedCategories([mappedCategory])
      }
    } else {
      // Jika URL tidak memiliki parameter kategori (misal: saat klik "All Products"),
      // kosongkan semua filter agar semua produk muncul
      setSelectedCategories([])
      setSearchQuery("") // (Opsional) membersihkan kolom pencarian juga
    }
  }, [searchParams])

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value))
    } else {
      setSelected([...selected, value])
    }
  }

  const filteredProducts = useMemo(() => {
    let products = [...allProducts]
    if (searchQuery) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    if (selectedCategories.length > 0) {
      products = products.filter((p) => selectedCategories.includes(p.category))
    }
    if (sortBy === "name-asc") {
      products.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "name-desc") {
      products.sort((a, b) => b.name.localeCompare(a.name))
    }
    return products
  }, [searchQuery, sortBy, selectedCategories])

  const clearAllFilters = () => {
    setSelectedCategories([])
    setSearchQuery("")
  }

  const hasActiveFilters = selectedCategories.length > 0

  const FilterSidebar = () => (
    <div className="space-y-6">
      <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-semibold text-foreground">
          Categories
          <ChevronDown className={`h-4 w-4 transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-3">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
              />
              {category}
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>
      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={clearAllFilters} className="w-full mt-4">
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <main className="min-h-screen bg-muted pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-6 md:py-10">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink asChild><Link href="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>All Products</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 font-[family-name:var(--font-heading)]">All Products</h1>
          <p className="text-muted-foreground text-sm md:text-base">Browse our complete catalog of premium Indonesian export products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 bg-background rounded-xl p-6 border border-border">
              <h2 className="font-semibold text-foreground mb-4">Filters</h2>
              <FilterSidebar />
            </div>
          </aside>

          <div className="flex-1">
            <div className="bg-background rounded-xl p-4 mb-6 border border-border">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
                    <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
                  </Button>
                  <span className="text-sm text-muted-foreground">{filteredProducts.length} products</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9" />
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-40 h-9" translate="no"><SelectValue placeholder="Sort by" /></SelectTrigger>
                    <SelectContent translate="no">
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="name-asc">Name A-Z</SelectItem>
                      <SelectItem value="name-desc">Name Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} onClick={() => setSelectedProduct(product)} className="group bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all cursor-pointer hover:border-primary/50">
                  <div className="relative aspect-square overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <Badge className={`absolute top-2 left-2 text-[10px] ${product.badge === "Premium" ? "bg-primary" : "bg-[#003366]"}`}>{product.badge}</Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3">MOQ: {product.moq}</p>
                    <Button size="sm" className="w-full text-xs">View Details</Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                <Button variant="outline" onClick={clearAllFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background p-6 shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}><X className="h-5 w-5" /></Button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}

      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        {/* --- PERUBAHAN: Max width responsif --- */}
        <DialogContent 
          className="w-[95vw] sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl border-0 shadow-2xl" 
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Product Details</DialogTitle>
          <DialogDescription className="sr-only">Detailed specs for {selectedProduct?.name}</DialogDescription>
          
         <DialogClose 
            translate="no" 
            className="absolute right-4 top-4 z-30 rounded-full bg-[#003366] p-2 text-white hover:scale-105 transition-all"
          >
            <X className="h-5 w-5" />
            <span className="sr-only" translate="no">Close</span>
          </DialogClose>

          {selectedProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* --- PERUBAHAN: Container Gambar Fleksibel & Object Cover --- */}
              <div className="relative bg-muted flex flex-col min-h-[300px] lg:min-h-full">
                <div 
                  className={`relative flex-1 overflow-hidden cursor-zoom-in ${imageZoomed ? 'cursor-zoom-out' : ''}`} 
                  onClick={() => setImageZoomed(!imageZoomed)}
                >
                  <Image 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    fill 
                    className={`object-cover transition-transform duration-500 ${imageZoomed ? 'scale-150' : 'scale-100'}`} 
                  />
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2">
                    <ZoomIn className="h-3 w-3" /> {imageZoomed ? 'Zoom out' : 'Zoom in'}
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-12 bg-white flex flex-col">
                <h2 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">{selectedProduct.name}</h2>
                <div className="flex gap-2 mb-8">
                  <Badge variant="secondary">{selectedProduct.category}</Badge>
                  <Badge variant="outline">MOQ: {selectedProduct.moq}</Badge>
                </div>
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-[#003366] uppercase tracking-wider mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
                </div>
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-[#003366] uppercase tracking-wider mb-4">Specifications</h3>
                  <div className="bg-muted rounded-xl p-4 space-y-2">
                    {selectedProduct.specifications.map((spec, i) => (
                      <div key={i} className="flex justify-between border-b border-border/50 py-2 last:border-0">
                        <span className="font-semibold text-xs md:text-sm">{spec.label}</span>
                        <span className="text-gray-600 text-xs md:text-sm">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button asChild size="lg" className="w-full bg-[#003366] hover:bg-[#002244] py-6 rounded-xl font-bold">
                  <Link href="/#contact">REQUEST QUOTE</Link>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003366] mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading Products...</p>
        </div>
      }>
        <ProductsContent />
      </Suspense>
      <Footer />
    </>
  )
}