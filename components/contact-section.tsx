"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Mail, Phone, MapPin, Send } from "lucide-react"

const products = [
  "Spices (Rempah-rempah)",
  "Biomass",
  "Dried Insects (Serangga Kering)",
  "Coconut Briquettes (Briket Kelapa)",
  "Coffee (Kopi)",
  "Multiple Products",
]

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-16 md:py-20 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20">
          {/* Contact Info */}
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
                  <p className="text-muted-foreground text-sm md:text-base">----</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1 text-sm md:text-base">Phone</p>
                  <p className="text-muted-foreground text-sm md:text-base">----</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1 text-sm md:text-base">Office</p>
                  <p className="text-muted-foreground text-sm md:text-base">----</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
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
                  We have received your inquiry and will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <FieldGroup>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Full Name *</FieldLabel>
                      <Input
                        placeholder="John Smith"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Company Name *</FieldLabel>
                      <Input
                        placeholder="Acme Corp"
                        required
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Email *</FieldLabel>
                      <Input
                        type="email"
                        placeholder="john@company.com"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Phone</FieldLabel>
                      <Input
                        type="tel"
                        placeholder="+1 234 567 8900"
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>Country *</FieldLabel>
                      <Input
                        placeholder="United States"
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel>Product Interest *</FieldLabel>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product} value={product}>
                              {product}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Field>
                    <FieldLabel>Estimated Quantity</FieldLabel>
                    <Input
                      placeholder="e.g., 5 tons per month"
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Message *</FieldLabel>
                    <Textarea
                      placeholder="Please describe your requirements, delivery timeline, and any specific certifications needed..."
                      rows={4}
                      required
                    />
                  </Field>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
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
