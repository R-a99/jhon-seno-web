import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft } from "lucide-react"

// Import data tersentralisasi (sesuai posisi folder lib kamu)
import { allProducts } from "../../../lib/products"

// 1. Generate Metadata asinkron
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = allProducts.find((p) => p.id === id)
  
  if (!product) return { title: "Product Not Found" }

  return {
    title: `${product.name} | Jhon Seno Company Export`,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  }
}

// 2. SSG (Static Site Generation)
export function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id,
  }))
}

// 3. Komponen Utama asinkron
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = allProducts.find((p) => p.id === id)

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
            <span>Back to All Products</span>
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Image Panel */}
              <div className="relative bg-[#f8fafc] flex flex-col min-h-[400px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-border p-8 group">
                <div className="relative flex-1 w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-110"
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDMzNjYiLz48L3N2Zz4="
                  />
                </div>
              </div>

              {/* Detail Panel */}
              {/* Penyesuaian: Ubah p-8 menjadi p-5 di mobile, dan tambah pb-24 agar konten tidak tertutup tombol sticky */}
              <div className="p-5 sm:p-8 md:p-12 flex flex-col pb-24 md:pb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-[#003366] mb-4">
                  {product.name}
                </h1>

                <div className="flex flex-wrap gap-2 mb-8">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {product.category}
                  </Badge>
                  <Badge variant="outline">
                    MOQ: {product.moq}
                  </Badge>
                  <Badge className={product.badge === "Premium" ? "bg-primary" : "bg-[#003366]"}>
                    {product.badge}
                  </Badge>
                </div>

                <div className="mb-8">
                  <h2 className="text-sm font-semibold text-[#003366] uppercase tracking-wider mb-3">
                    Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {product.description}
                  </p>
                </div>

                <div className="mb-10">
                  <h2 className="text-sm font-semibold text-[#003366] uppercase tracking-wider mb-4">
                    Specifications
                  </h2>
                  {/* Penyesuaian: p-4 untuk mobile agar box tidak terlalu memakan lebar layar */}
                  <div className="bg-muted/50 rounded-xl p-4 sm:p-5 space-y-3 border border-border/50">
                    {product.specifications.map((spec, i) => (
                      <div
                        key={i}
                        // Penyesuaian: Tambah gap-4 dan items-start agar aman di layar super kecil
                        className="flex justify-between items-start gap-4 border-b border-border/50 pb-3 last:border-0 last:pb-0"
                      >
                        {/* Penyesuaian: shrink-0 memastikan label tidak terlipat */}
                        <span className="font-semibold text-sm text-foreground/80 shrink-0">
                          {spec.label}
                        </span>
                        {/* Penyesuaian: break-words memastikan teks panjang membungkus ke bawah dengan rapi */}
                        <span className="text-gray-600 text-sm text-right break-words">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Penyesuaian Tombol: Dibuat Sticky di mobile, kembali normal di Desktop */}
                <div className="mt-auto fixed md:relative bottom-0 left-0 right-0 p-4 md:p-0 bg-white/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-t md:border-none border-border/50 z-50">
                  <Button
                    asChild
                    className="w-full bg-[#003366] hover:bg-[#002244] h-14 sm:h-16 rounded-xl font-bold text-sm sm:text-base shadow-lg md:shadow-md hover:shadow-xl transition-all whitespace-normal text-center leading-tight px-4"
                  >
                    <Link href="/#contact">
                      <span>REQUEST QUOTE FOR THIS PRODUCT</span>
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