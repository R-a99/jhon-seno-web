// import Link from "next/link" // <-- Hapus atau nonaktifkan karena kita pakai tag <a>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand - Mengambil 2 kolom */}
          <div className="lg:col-span-2">
            
            {/* Logo dan Teks Footer dirata-tengahkan */}
            <div className="mb-6 flex flex-col items-center lg:items-start">
              <a href="/" className="flex flex-col items-center w-max"> {/* <-- Ganti Link jadi a */}
                {/* Ukuran diubah agar rasio 1:1 (kotak) */}
                <div className="relative h-16 w-16 md:h-20 md:w-20 mb-3">
                  <Image 
                    src="/images/logo1.png" // Sesuaikan nama file logo Anda jika berbeda
                    alt="Jhon Seno Company Logo" 
                    fill
                    className="object-contain hover:opacity-80 transition-opacity brightness-0 invert"
                  />
                </div>
                {/* Teks di bawah logo, rata tengah (sudah ada span-nya jadi aman) */}
                <span className="font-bold text-xl tracking-wide text-white text-center">
                  Jhon Seno Company
                </span>
              </a>
            </div>
            
            <p className="text-primary-foreground/80 leading-relaxed max-w-md text-center lg:text-left mx-auto lg:mx-0">
              Your Trusted Source for High-Quality Javanese Commodities and Indonesian Export Products. From Specialty Coffee and Spices to Sustainable Bioenergy, All Meeting Your Market Standards.
            </p>
          </div>

          {/* Products - 1 kolom */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-center lg:text-left">Products</h4>
            <ul className="space-y-3 text-center lg:text-left">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <a // <-- Ganti Link jadi a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    <span>{link.label}</span> {/* <-- Bungkus label dengan span */}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company - 1 kolom */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-center lg:text-left">Company</h4>
            <ul className="space-y-3 text-center lg:text-left">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a // <-- Ganti Link jadi a
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-white transition-colors"
                  >
                    <span>{link.label}</span> {/* <-- Bungkus label dengan span */}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach Us - 1 kolom */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-center lg:text-left">Reach Us</h4>
            <ul className="space-y-3 text-primary-foreground/80 text-center lg:text-left">
              <li>Temanggung, Central Java</li>
              <li>
                <a href="https://wa.me/6285144911198" className="hover:text-white transition-colors">
                  <span>+62 851-4491-1198</span> {/* <-- Opsional tapi baik dibungkus span */}
                </a>
              </li>
              <li>
                <a href="mailto:inquiry@jhonsenokompany.me" className="hover:text-white transition-colors break-all">
                  <span>inquiry@jhonsenokompany.me</span> {/* <-- Opsional tapi baik dibungkus span */}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 pb-4 md:pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              <span>&copy; {new Date().getFullYear()} Jhon Seno Company. All rights reserved.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}