"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Github, Linkedin, ArrowLeft, Send, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"

export default function ContactPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const currentTheme = theme === "system" ? resolvedTheme : theme
  const isDark = currentTheme === "dark"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 md:p-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="https://github.com" className="text-foreground hover:text-muted-foreground transition-colors">
            <Github className="w-5 h-5" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="text-foreground hover:text-muted-foreground"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </nav>

      {/* Header */}
      <section className="px-6 md:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations. Let's discuss how we can work together to
            bring your ideas to life.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="px-6 md:px-8 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-card/80 backdrop-blur-sm border-border">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-card-foreground mb-6">Send me a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-card-foreground mb-2 block">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-card-foreground mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject" className="text-card-foreground mb-2 block">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-card-foreground mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground min-h-[120px]"
                    placeholder="Tell me about your project or idea..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-card-foreground mb-6">Let's connect</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-card-foreground font-semibold mb-2">Email</h3>
                    <Link
                      href="mailto:hello@johnjackbogart.com"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      hello@johnjackbogart.com
                    </Link>
                  </div>
                  <div>
                    <h3 className="text-card-foreground font-semibold mb-2">Social</h3>
                    <div className="flex gap-4">
                      <Link
                        href="https://github.com"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-6 h-6" />
                      </Link>
                      <Link
                        href="https://linkedin.com"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Linkedin className="w-6 h-6" />
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-card-foreground font-semibold mb-2">Response Time</h3>
                    <p className="text-muted-foreground">I typically respond within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-card-foreground mb-4">What I can help with</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {[
                    "Web application development",
                    "UI/UX design and consultation",
                    "Code reviews and optimization",
                    "Technical consulting",
                    "Freelance projects",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-foreground rounded-full"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-8 py-8 border-t border-border mt-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2024 John Jack Bogart. All rights reserved.</p>
          <p className="text-muted-foreground text-sm mt-2 md:mt-0">Built with Next.js and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}
