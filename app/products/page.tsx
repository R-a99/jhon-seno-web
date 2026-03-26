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

// --- DATA PRODUCTS (Tetap Sama) ---
const allProducts = [
  {
    id: "wood-pellets",
    name: "Wood Pellets",
    category: "Bioenergy",
    image: "/images/biomass.jpg",
    badge: "Premium",
    moq: "20 Tons",
    description: "Premium-grade wood pellets sourced from sustainably managed forests in Central Java. Our pellets deliver consistent heat output and low ash content, ideal for industrial boilers and residential heating systems across Europe and North America.",
    specifications: [
      { label: "Grade", value: "ENplus A1" },
      { label: "Moisture Content", value: "≤ 8%" },
      { label: "Calorific Value", value: "≥ 16.5 MJ/kg" },
      { label: "Ash Content", value: "≤ 0.7%" },
      { label: "Diameter", value: "6mm / 8mm" },
    ],
  },
  {
    id: "coconut-briquettes",
    name: "Coconut Briquettes",
    category: "Bioenergy",
    image: "/images/coconut-briquettes.jpg",
    badge: "Sourced Direct",
    moq: "10 Tons",
    description: "High-quality coconut shell charcoal briquettes from Sulawesi, crafted for premium BBQ and hookah applications. Our briquettes offer extended burn time with minimal smoke and spark, meeting stringent international quality standards.",
    specifications: [
      { label: "Grade", value: "Export Premium" },
      { label: "Moisture Content", value: "≤ 5%" },
      { label: "Ash Content", value: "≤ 2.5%" },
      { label: "Burning Time", value: "≥ 2.5 hours" },
      { label: "Shape", value: "Cube / Hexagonal / Finger" },
    ],
  },
  {
    id: "palm-kernel-shells",
    name: "Palm Kernel Shells",
    category: "Bioenergy",
    image: "/images/palm-kernel-shells.jpg",
    badge: "Premium",
    moq: "50 Tons",
    description: "Premium palm kernel shells (PKS) sourced from certified sustainable palm oil mills in Kalimantan. Our PKS provides excellent calorific value for industrial boilers and power generation, meeting European sustainability standards.",
    specifications: [
      { label: "Grade", value: "Export Grade A" },
      { label: "Moisture Content", value: "≤ 15%" },
      { label: "Calorific Value", value: "≥ 16.0 MJ/kg" },
      { label: "Ash Content", value: "≤ 3%" },
      { label: "Shell Size", value: "15-25mm" },
    ],
  },
  {
    id: "rice-husk-pellets",
    name: "Rice Husk Pellets",
    category: "Bioenergy",
    image: "/images/rice-husk-pellets.jpg",
    badge: "Sourced Direct",
    moq: "25 Tons",
    description: "Eco-friendly rice husk pellets from Java's rice milling districts. These compressed pellets transform agricultural waste into efficient renewable fuel, ideal for industrial heating and co-firing applications.",
    specifications: [
      { label: "Grade", value: "Industrial Grade" },
      { label: "Moisture Content", value: "≤ 10%" },
      { label: "Calorific Value", value: "≥ 14.5 MJ/kg" },
      { label: "Ash Content", value: "≤ 18%" },
      { label: "Diameter", value: "6mm / 8mm" },
    ],
  },
  {
    id: "sawdust-briquettes",
    name: "Sawdust Briquettes",
    category: "Bioenergy",
    image: "/images/sawdust-briquettes.jpg",
    badge: "Premium",
    moq: "15 Tons",
    description: "Compressed sawdust briquettes from certified sustainable forestry operations in Central Java. Our briquettes offer consistent burning with high heat output and minimal residue, perfect for industrial and commercial heating.",
    specifications: [
      { label: "Grade", value: "Premium Export" },
      { label: "Moisture Content", value: "≤ 8%" },
      { label: "Calorific Value", value: "≥ 17.0 MJ/kg" },
      { label: "Ash Content", value: "≤ 1.5%" },
      { label: "Shape", value: "Pini-Kay / Nestro" },
    ],
  },
  {
    id: "turmeric",
    name: "Turmeric",
    category: "Spices",
    image: "/images/turmeric.jpg",
    badge: "Premium",
    moq: "1 Ton",
    description: "Vibrant, high-curcumin turmeric sourced from organic farms in West Java. Our turmeric delivers intense golden color and earthy flavor, perfect for food processing, pharmaceutical applications, and natural colorant industries.",
    specifications: [
      { label: "Grade", value: "Export Grade A" },
      { label: "Curcumin Content", value: "≥ 3.5%" },
      { label: "Moisture Content", value: "≤ 12%" },
      { label: "Purity", value: "99.5%" },
      { label: "Form", value: "Whole / Powder / Sliced" },
    ],
  },
  {
    id: "cloves",
    name: "Cloves",
    category: "Spices",
    image: "/images/cloves.jpg",
    badge: "Sourced Direct",
    moq: "500 Kg",
    description: "Aromatic whole cloves from the renowned spice gardens of Maluku. Hand-picked and sun-dried to preserve essential oil content, our cloves are ideal for culinary, cigarette manufacturing, and essential oil extraction industries.",
    specifications: [
      { label: "Grade", value: "Hand-Picked Select" },
      { label: "Essential Oil Content", value: "≥ 17%" },
      { label: "Moisture Content", value: "≤ 12%" },
      { label: "Purity", value: "99%" },
      { label: "Size", value: "12-16mm" },
    ],
  },
  {
    id: "nutmeg",
    name: "Nutmeg",
    category: "Spices",
    image: "/images/nutmeg.jpg",
    badge: "Premium",
    moq: "500 Kg",
    description: "Premium whole nutmeg seeds from the fertile volcanic soils of Maluku. Our nutmeg offers rich, warm aromatic notes with high essential oil content, suitable for food processing and pharmaceutical applications.",
    specifications: [
      { label: "Grade", value: "ABCD / Shrivels" },
      { label: "Essential Oil Content", value: "≥ 7%" },
      { label: "Moisture Content", value: "≤ 10%" },
      { label: "Defect Rate", value: "≤ 5%" },
      { label: "Size", value: "80-100 nuts/kg" },
    ],
  },
  {
    id: "black-pepper",
    name: "Whole Black Pepper",
    category: "Spices",
    image: "/images/black-pepper.jpg",
    badge: "Sourced Direct",
    moq: "1 Ton",
    description: "Bold, pungent whole black pepper from the highlands of Lampung. Our pepper delivers exceptional piperine content and robust flavor profile, meeting the exacting standards of international spice traders and food manufacturers.",
    specifications: [
      { label: "Grade", value: "FAQ / ASTA" },
      { label: "Piperine Content", value: "≥ 4%" },
      { label: "Moisture Content", value: "≤ 13%" },
      { label: "Density", value: "500-550 g/L" },
      { label: "Size", value: "4-5mm average" },
    ],
  },
  {
    id: "dried-insects",
    name: "Dried Insects",
    category: "Agriculture",
    image: "/images/dried-insects.jpg",
    badge: "Premium",
    moq: "500 Kg",
    description: "Sustainably farmed dried insects from controlled facilities in Central Java. Our insect protein products offer an eco-friendly alternative for aquaculture feed, poultry nutrition, and pet food industries with superior amino acid profiles.",
    specifications: [
      { label: "Protein Content", value: "≥ 55%" },
      { label: "Fat Content", value: "25-30%" },
      { label: "Moisture Content", value: "≤ 10%" },
      { label: "Form", value: "Whole / Powder / Oil" },
      { label: "Species", value: "BSF Larvae / Crickets" },
    ],
  },
  {
    id: "cassava-chips",
    name: "Cassava Chips",
    category: "Agriculture",
    image: "/images/cassava-chips.jpg",
    badge: "Sourced Direct",
    moq: "25 Tons",
    description: "Premium dried cassava chips (tapioca) from the fertile fields of East Java. Our chips are ideal for animal feed, ethanol production, and starch manufacturing, meeting international food safety and quality standards.",
    specifications: [
      { label: "Grade", value: "Export Grade A" },
      { label: "Starch Content", value: "≥ 65%" },
      { label: "Moisture Content", value: "≤ 14%" },
      { label: "Sand/Silica", value: "≤ 2%" },
      { label: "Size", value: "2-5cm chips" },
    ],
  },
  {
    id: "copra",
    name: "Copra",
    category: "Agriculture",
    image: "/images/copra.jpg",
    badge: "Premium",
    moq: "20 Tons",
    description: "High-quality dried copra from the coconut plantations of Sulawesi. Our copra offers excellent oil content for coconut oil extraction, suitable for food processing, cosmetics, and industrial applications.",
    specifications: [
      { label: "Grade", value: "FAQ / Milling Grade" },
      { label: "Oil Content", value: "≥ 63%" },
      { label: "Moisture Content", value: "≤ 6%" },
      { label: "Free Fatty Acid", value: "≤ 1%" },
      { label: "Form", value: "Whole / Chips" },
    ],
  },
  {
    id: "crude-palm-oil",
    name: "Crude Palm Oil",
    category: "Agriculture",
    image: "/images/crude-palm-oil.jpg",
    badge: "Sourced Direct",
    moq: "100 Tons",
    description: "Sustainably sourced crude palm oil (CPO) from RSPO-certified plantations in Sumatra. Our CPO meets international standards for food-grade vegetable oil, suitable for refining, cooking oil, and oleochemical production.",
    specifications: [
      { label: "Grade", value: "RSPO Certified" },
      { label: "FFA Content", value: "≤ 5%" },
      { label: "Moisture", value: "≤ 0.2%" },
      { label: "Iodine Value", value: "50-55" },
      { label: "Carotene", value: "500-700 ppm" },
    ],
  },
  {
    id: "arabica-coffee",
    name: "Arabica Coffee",
    category: "Agriculture",
    image: "/images/coffee.jpg",
    badge: "Premium",
    moq: "1 Ton",
    description: "Single-origin Arabica coffee beans from the highlands of Sumatra. Our specialty-grade beans offer complex flavor notes with earthy undertones and low acidity, preferred by premium roasters and specialty coffee importers worldwide.",
    specifications: [
      { label: "Grade", value: "Specialty Grade 1" },
      { label: "Altitude", value: "1200-1600 MASL" },
      { label: "Moisture Content", value: "11-12%" },
      { label: "Defect Count", value: "≤ 5 per 300g" },
      { label: "Processing", value: "Wet-Hulled / Washed" },
    ],
  },
  {
    id: "robusta-coffee",
    name: "Robusta Coffee",
    category: "Agriculture",
    image: "/images/coffee.jpg",
    badge: "Sourced Direct",
    moq: "2 Tons",
    description: "High-quality Robusta coffee beans from the fertile lowlands of Lampung. Our beans deliver bold, full-bodied flavor with high caffeine content, ideal for expense blends and instant coffee manufacturing.",
    specifications: [
      { label: "Grade", value: "EK1 / Grade 4" },
      { label: "Altitude", value: "400-800 MASL" },
      { label: "Moisture Content", value: "12-13%" },
      { label: "Defect Count", value: "≤ 60 per 300g" },
      { label: "Processing", value: "Natural / Washed" },
    ],
  },
  {
    id: "cinnamon",
    name: "Cinnamon Sticks",
    category: "Spices",
    image: "/images/cinnamon.jpg",
    badge: "Premium",
    moq: "500 Kg",
    description: "Fragrant cinnamon sticks (Cassia) from the forests of West Sumatra. Our cinnamon delivers sweet, warm aromatics with high cinnamaldehyde content, perfect for food flavoring, beverage industries, and traditional medicine applications.",
    specifications: [
      { label: "Grade", value: "KA / KB / KC" },
      { label: "Cinnamaldehyde", value: "≥ 2%" },
      { label: "Moisture Content", value: "≤ 14%" },
      { label: "Length", value: "40-45cm" },
      { label: "Form", value: "Sticks / Broken / Powder" },
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

// --- KOMPONEN UTAMA (ProductsContent) ---
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
      if (mappedCategory && !selectedCategories.includes(mappedCategory)) {
        setSelectedCategories([mappedCategory])
      }
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
                    <SelectTrigger className="w-full sm:w-40 h-9"><SelectValue placeholder="Sort by" /></SelectTrigger>
                    <SelectContent>
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
        <DialogContent className="w-[95vw] max-w-7xl max-h-[90vh] overflow-y-auto p-0 rounded-2xl border-0 shadow-2xl" showCloseButton={false}>
          <DialogTitle className="sr-only">Product Details</DialogTitle>
          <DialogDescription className="sr-only">Detailed specs for {selectedProduct?.name}</DialogDescription>
          
          <DialogClose className="absolute right-4 top-4 z-30 rounded-full bg-[#003366] p-2 text-white hover:scale-105 transition-all">
            <X className="h-5 w-5" />
          </DialogClose>

          {selectedProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative bg-muted flex flex-col">
                <div className={`relative aspect-square lg:flex-1 overflow-hidden cursor-zoom-in ${imageZoomed ? 'cursor-zoom-out' : ''}`} onClick={() => setImageZoomed(!imageZoomed)}>
                  <Image src={selectedProduct.image} alt={selectedProduct.name} fill className={`object-contain transition-transform duration-500 ${imageZoomed ? 'scale-150 object-cover' : 'scale-100'}`} />
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2"><ZoomIn className="h-3 w-3" /> {imageZoomed ? 'Zoom out' : 'Zoom in'}</div>
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

// --- WRAPPER DENGAN SUSPENSE (Export Default) ---
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