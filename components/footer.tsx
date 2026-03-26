import Link from "next/link"

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Jhon Seno Kompany</h3>
            <p className="text-primary-foreground/80 leading-relaxed max-w-md">
              Your Trusted Source for High-Quality Indonesian Export Products. From Specialty Coffee to Sustainable Bioenergy All Meeting Your Market Standards
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 pb-4 md:pb-6">
          <p className="text-primary-foreground/60 text-sm text-center">
            &copy; {new Date().getFullYear()} Jhon Seno Kompany. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
