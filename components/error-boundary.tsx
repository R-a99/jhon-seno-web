"use client"

import React from "react"
import { Button } from "@/components/ui/button"

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Products page error (likely caused by Google Translate DOM mutation):", error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-muted">
          <p className="text-muted-foreground text-center px-4">
            Terjadi kesalahan. Silakan tutup modal dan coba lagi.
          </p>
          <Button
            onClick={() => this.setState({ hasError: false })}
            className="bg-[#003366] hover:bg-[#002244]"
          >
            Coba Lagi
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}
