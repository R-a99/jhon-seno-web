"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#001f3f] mb-4">Request a Quote</h2>
          <p className="text-slate-600">Partner with us for reliable, high-volume export sourcing.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 max-w-5xl mx-auto">
          {/* Form Area */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            {/* GANTI URL DI BAWAH INI DENGAN URL FORMSPREE */}
            <form action="https://formspree.io/f/URL_FORMSPREE_KAMU" method="POST" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-slate-700">First Name *</label>
                  <Input id="firstName" name="firstName" required className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-slate-700">Last Name</label>
                  <Input id="lastName" name="lastName" className="bg-slate-50" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Work Email *</label>
                <Input id="email" name="email" type="email" required className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-slate-700">Company Name</label>
                <Input id="company" name="company" className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">Requirements & MOQ *</label>
                <Textarea id="message" name="message" required className="min-h-[120px] bg-slate-50" placeholder="Please describe your product needs, target destination, and required certifications..." />
              </div>
              <Button type="submit" className="w-full bg-[#001f3f] hover:bg-[#001f3f]/90 text-white h-12 text-lg">
                Submit Inquiry
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 flex flex-col justify-center">
            <div className="flex items-start space-x-4">
              <div className="bg-[#001f3f]/10 p-3 rounded-lg text-[#001f3f]">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-slate-900">Headquarters</h4>
                <p className="text-slate-600 mt-1">Semarang, Central Java<br />Indonesia</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-[#001f3f]/10 p-3 rounded-lg text-[#001f3f]">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-slate-900">Email Us</h4>
                <p className="text-slate-600 mt-1">inquiry@jhonsenokompany.me</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}