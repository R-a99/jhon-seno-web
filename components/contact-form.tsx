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
import { Send } from "lucide-react"

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
  {
    category: "Bespoke Sourcing",
    items: [
      "Custom Product (Please specify in message)"
    ]
  }
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const form = e.currentTarget
    const data = new FormData(form)

    const fullName = data.get('fullName') as string
    const companyName = data.get('companyName') as string
    const email = data.get('email') as string
    const country = data.get('country') as string
    const productInterest = data.get('productInterest') as string
    const estimatedQuantity = data.get('estimatedQuantity') as string
    const message = data.get('message') as string

    try {
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

        const waNumber = "6285144911198" 
        
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

        const encodedWaText = encodeURIComponent(waText)

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
  )
}
