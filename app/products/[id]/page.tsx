// File: app/products/[id]/page.tsx

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft } from "lucide-react"

// Import data tersentralisasi
import { allProducts } from "@/lib/products"

// INI KUNCI SEO-NYA: Generate Meta Tags otomatis berdasarkan data produk
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = allProducts.find((p) => p.id === params.id)
  
  if (!product) return { title: "Product Not Found" }

  return {
    title: `${product.name} | Jhon Seno Company Export`,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  }
}

// Fitur Next.js untuk SSG (Static Site Generation) agar performa secepat kilat
export function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id,
  }))
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Cari produk berdasarkan URL ID
  const product = allProducts.find((p) => p.id === params.id)

  if (!product) {
    return notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-muted pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Tombol Back */}
          <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to All Products
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Image Panel (Efek zoom disederhanakan menggunakan CSS Hover agar tetap Server-Side) */}
              <div className="relative bg-[#f8fafc] flex flex-col min-h-[400px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-border p-8 group">
                <div className="relative flex-1 w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                </div>
              </div>

              {/* Detail Panel */}
              <div className="p-8 md:p-12 flex flex-col">
                <h1 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
                  <span translate="no">{product.name}</span>
                </h1>

                <div className="flex flex-wrap gap-2 mb-8">
                  <Badge variant="secondary" translate="no" className="bg-primary/10 text-primary">
                    {product.category}
                  </Badge>
                  <Badge variant="outline" translate="no">
                    MOQ: {product.moq}
                  </Badge>
                  <Badge className={`${product.badge === "Premium" ? "bg-primary" : "bg-[#003366]"}`} translate="no">
                    {product.badge}
                  </Badge>
                </div>

                <div className="mb-8">
                  <h2 className="text-sm font-semibold text-[#003366] uppercase tracking-wider mb-3">
                    <span translate="no">Description</span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    <span translate="no">{product.description}</span>
                  </p>
                </div>

                <div className="mb-10">
                  <h2 className="text-sm font-semibold text-[#003366] uppercase tracking-wider mb-4">
                    <span translate="no">Specifications</span>
                  </h2>
                  <div className="bg-muted/50 rounded-xl p-5 space-y-3 border border-border/50">
                    {product.specifications.map((spec, i) => (
                      <div
                        key={i}
                        className="flex justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0"
                      >
                        <span className="font-semibold text-sm text-foreground/80">
                          <span translate="no">{spec.label}</span>
                        </span>
                        <span className="text-gray-600 text-sm text-right max-w-[60%]">
                          <span translate="no">{spec.value}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-[#003366] hover:bg-[#002244] py-6 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all"
                  >
                    <Link href="/#contact">
                      <span translate="no">REQUEST QUOTE FOR THIS PRODUCT</span>
                    </Link>
                  </Button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}