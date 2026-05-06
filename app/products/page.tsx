// File: app/products/page.tsx
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
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Ambil data dari lib/products.ts yang sudah kamu buat
import { allProducts } from "../../lib/products"

const categories = ["Bioenergy", "Spices", "Agriculture"]

const categoryMap: Record<string, string> = {
  spices: "Spices",
  bioenergy: "Bioenergy",
  agriculture: "Agriculture",
}

function ProductsContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(true)

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      const mappedCategory = categoryMap[categoryParam.toLowerCase()]
      if (mappedCategory) {
        setSelectedCategories([mappedCategory])
      }
    } else {
      setSelectedCategories([])
      setSearchQuery("")
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
          <span translate="no">Categories</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${categoryOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-3">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-3 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Checkbox
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
              />
              <span translate="no">{category}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>
      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={clearAllFilters} className="w-full mt-4">
          <span>Clear All Filters</span>
        </Button>
      )}
    </div>
  )

  return (
    <main className="min-h-screen bg-muted pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-6 md:py-10">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link href="/"><span>Home</span></Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage><span>All Products</span></BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 font-[family-name:var(--font-heading)]">
            <span >All Products</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            <span >Browse our complete catalog of premium Indonesian export products</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 bg-background rounded-xl p-6 border border-border">
              <h2 className="font-semibold text-foreground mb-4">
                <span translate="no">Filters</span>
              </h2>
              <FilterSidebar />
            </div>
          </aside>

          <div className="flex-1">
            <div className="bg-background rounded-xl p-4 mb-6 border border-border">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <span translate="no">Filters</span>
                  </Button>
                  <span className="text-sm text-muted-foreground" translate="no">
                    {filteredProducts.length} products
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9"
                      translate="no"
                    />
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-40 h-9" translate="no">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
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
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="group bg-background rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all cursor-pointer hover:border-primary/50 flex flex-col"
                >
                  <div className="relative aspect-video bg-white overflow-hidden border-b border-border/50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDMzNjYiLz48L3N2Zz4="
                    />
                    <Badge
                      className={`absolute top-2 left-2 text-[10px] ${product.badge === "Premium" ? "bg-primary" : "bg-[#003366]"}`}
                      translate="no"
                    >
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="p-3 flex flex-col flex-grow">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                      <span translate="no">{product.name}</span>
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      <span translate="no">MOQ: {product.moq}</span>
                    </p>
                    <div className="mt-auto bg-secondary text-secondary-foreground text-xs font-medium py-2 px-4 rounded-md text-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <span >View Details</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  <span translate="no">No products found matching your criteria.</span>
                </p>
                <Button variant="outline" onClick={clearAllFilters}>
                  <span translate="no">Clear All Filters</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background p-6 shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">
                <span translate="no">Filters</span>
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}
    </main>
  )
}

export default function ProductsPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003366] mb-4" />
            <p className="text-muted-foreground font-medium">Loading Products...</p>
          </div>
        }
      >
        <ProductsContent />
      </Suspense>
      <Footer />
    </>
  )
}