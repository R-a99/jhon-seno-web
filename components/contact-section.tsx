"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Mail, Phone, MapPin, Send } from "lucide-react"

// --- DATA KATEGORI PRODUK B2B ---
const productCategories = [
  {
    category: "Sustainable Bioenergy",
    items: [
      "Coconut Shell Charcoal Briquettes",
      "Cocopeat",
      "Cocofiber"
    ]
  },
  {
    category: "Premium Spices",
    items: [
      "Cloves",
      "Cardamom",
      "Javanese Turmeric"
    ]
  },
  {
    category: "Agriculture",
    items: [
      "Robusta Coffee"
    ]
  },
  // Kategori tambahan untuk menonjolkan layanan pencarian produk custom
  {
    category: "Bespoke Sourcing",
    items: [
      "Custom Product (Please specify in message)"
    ]
  }
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const form = e.currentTarget
    const data = new FormData(form)

    // 1. Ambil data dari input form untuk dimasukkan ke pesan WA
    const fullName = data.get('fullName') as string
    const companyName = data.get('companyName') as string
    const email = data.get('email') as string
    const country = data.get('country') as string
    const productInterest = data.get('productInterest') as string
    const estimatedQuantity = data.get('estimatedQuantity') as string
    const message = data.get('message') as string

    try {
      // 2. Kirim data ke Formspree (Masuk ke Email)
      // Wajib Ganti: 'YOUR_FORMSPREE_ID' dengan ID Anda
      const response = await fetch("https://formspree.io/f/xeepelow", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      })
      
      if (response.ok) {
        setSubmitted(true)
        form.reset()

        // 3. Siapkan Pesan WhatsApp
        // Wajib Ganti: Nomor WA Anda (gunakan 62 tanpa + atau 0 di depan)
        const waNumber = "6281390988731" 
        
        const waText = `Halo Jhon Seno Company,

Saya tertarik untuk melakukan inquiry produk ekspor Anda. Berikut detail saya:

*Nama:* ${fullName}
*Perusahaan:* ${companyName}
*Email:* ${email}
*Negara:* ${country}

*Produk yang diminati:* ${productInterest}
*Estimasi Kuantitas:* ${estimatedQuantity || 'Belum ditentukan'}

*Pesan Tambahan:*
${message}

Mohon informasi lebih lanjut mengenai spesifikasi dan penawaran harganya. Terima kasih.`

        // Encode URI agar format enter/spasi terbaca benar di URL WA
        const encodedWaText = encodeURIComponent(waText)

        // 4. Buka Tab Baru menuju WhatsApp
        window.open(`https://wa.me/${waNumber}?text=${encodedWaText}`, '_blank')

      } else {
        alert("Terjadi kesalahan saat mengirim pesan via server. Silakan coba lagi.")
      }
    } catch (error) {
      alert("Terjadi kesalahan jaringan. Silakan coba lagi.")
    }
    
    setIsSubmitting(false)
  }

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
                  <p className="text-muted-foreground text-sm md:text-base">+62 812 3456 7890</p>
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
          <div className="bg-background rounded-xl md:rounded-2xl p-5 md:p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Send className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Thank You!
                </h3>
                <p className="text-muted-foreground">
                  We have received your inquiry and will respond shortly. You are being redirected to our WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Full Name *</FieldLabel>
                      <Input name="fullName" placeholder="John Smith" required />
                    </Field>
                    <Field>
                      <FieldLabel>Company Name *</FieldLabel>
                      <Input name="companyName" placeholder="Acme Corp" required />
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Email *</FieldLabel>
                      <Input name="email" type="email" placeholder="john@company.com" required />
                    </Field>
                    <Field>
                      <FieldLabel>Phone / WhatsApp</FieldLabel>
                      <Input name="phone" type="tel" placeholder="+1 234 567 8900" />
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Country *</FieldLabel>
                      <Input name="country" placeholder="United States" required />
                    </Field>
                    <Field>
                      <FieldLabel>Product Interest *</FieldLabel>
                      <Select name="productInterest" required>
                        <SelectTrigger translate="no">
                          <SelectValue placeholder="Select a specific product" />
                        </SelectTrigger>
                        <SelectContent translate="no">
                          {productCategories.map((group) => (
                            <SelectGroup key={group.category}>
                              <SelectLabel className="text-primary font-bold bg-muted/30">
                                {group.category}
                              </SelectLabel>
                              {group.items.map((item) => (
                                <SelectItem key={item} value={item} className="ml-2">
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel>Estimated Quantity</FieldLabel>
                    <Input name="estimatedQuantity" placeholder="e.g., 1 Container (20ft) per month" />
                  </Field>
                  <Field>
                    <FieldLabel>Message *</FieldLabel>
                    <Textarea
                      name="message"
                      placeholder="Please describe your requirements, delivery timeline, and any specific certifications needed..."
                      rows={4}
                      required
                    />
                  </Field>
                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Submit Inquiry"}
                  </Button>
                </FieldGroup>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}