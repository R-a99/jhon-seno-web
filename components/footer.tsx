import Link from "next/link"
import Image from "next/image"

const footerLinks = {
  products: [
    { label: "Spices", href: "/products?category=spices" },
    { label: "Bioenergy", href: "/products?category=bioenergy" },
    { label: "Agriculture", href: "/products?category=agriculture" },
    { label: "All Products", href: "/products" },
  ],
  company: [
    { label: "About Us", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Grid diubah menjadi 5 kolom agar distribusi ruang lebih seimbang di kanan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand - Mengambil 2 kolom */}
          <div className="lg:col-span-2">
            {/* Box putih dihilangkan agar logo menyatu dengan background */}
            <div className="mb-6 inline-block">
              <Link href="/">
                <div className="relative h-12 w-28 md:h-14 md:w-32">
                  {/* Penambahan 'brightness-0 invert' agar logo otomatis menjadi solid putih */}
                  <Image 
                    src="/images/logo.png" 
                    alt="Jhon Seno Company Logo" 
                    fill
                    className="object-contain hover:opacity-80 transition-opacity brightness-0 invert"
                  />
                </div>
              </Link>
            </div>
            
            <p className="text-primary-foreground/80 leading-relaxed max-w-md">
              Your Trusted Source for High-Quality Javanese Commodities and Indonesian Export Products. From Specialty Coffee and Spices to Sustainable Bioenergy, All Meeting Your Market Standards.
            </p>
          </div>

          {/* Products - 1 kolom */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company - 1 kolom */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach Us (Tambahan Baru) - 1 kolom untuk menyeimbangkan whitespace */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Reach Us</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li>Temanggung, Central Java</li>
              <li>
                <a href="https://wa.me/6285144911198" className="hover:text-white transition-colors">
                  +62 851-4491-1198
                </a>
              </li>
              <li>
                <a href="mailto:inquiry@jhonsenokompany.me" className="hover:text-white transition-colors break-all">
                  inquiry@jhonsenokompany.me
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 pb-4 md:pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Jhon Seno Company. All rights reserved.
            </p>
            {/* Optional: Bisa ditambah link kecil seperti Privacy Policy di sini jika ada nantinya */}
          </div>
        </div>
      </div>
    </footer>
  )
}