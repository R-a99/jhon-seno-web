import { Mail, Phone, MapPin } from "lucide-react"
import { ContactForm } from "./contact-form"

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-20 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20">
          {/* Bagian Kiri: Info Kontak */}
          <div>
            <p className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase mb-2 md:mb-3">
              Contact Us
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 md:mb-6 text-balance">
              Request a Quote
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              Ready to source premium Indonesian products? Fill out the form and our 
              team will get back to you within 24 hours with a customized quote.
            </p>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1 text-sm md:text-base">Email</p>
                  <p className="text-muted-foreground text-sm md:text-base">inquiry@jhonsenokompany.me</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1 text-sm md:text-base">Phone / WhatsApp</p>
                  <p className="text-muted-foreground text-sm md:text-base">+62 85144911198</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1 text-sm md:text-base">Office</p>
                  <p className="text-muted-foreground text-sm md:text-base">Temanggung, Central Java, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bagian Kanan: Form Kontak */}
          <ContactForm />
        </div>
      </div>
    </section>
  )
}