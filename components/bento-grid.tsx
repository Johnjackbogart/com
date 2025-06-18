"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, Mail, ArrowRight } from "lucide-react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const MotionCard = motion(Card)

export function BentoGrid() {
  return (
    <motion.div
      id="work"
      className="py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border border-l border-r border-border"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Project 1 */}
      <MotionCard
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.01 }}
        className="rounded-none bg-card col-span-1 md:col-span-2 lg:col-span-2"
      >
        <CardHeader className="border-b border-border p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-card-foreground">Project: E-Commerce Platform</h3>
            <Badge variant="outline" className="rounded-none border-border text-muted-foreground">
              WEB
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="aspect-video bg-neutral-800 mb-4">
            <Image
              src="/placeholder.svg?height=300&width=500"
              alt="Project 1"
              width={500}
              height={300}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            A brutalist e-commerce experience focusing on raw performance and minimal UI. Built with Next.js and Stripe.
          </p>
        </CardContent>
        <CardFooter className="border-t border-border p-4">
          <Link
            href="#"
            className="flex items-center font-bold text-sm uppercase tracking-wider text-card-foreground hover:underline"
          >
            View Project <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </CardFooter>
      </MotionCard>

      {/* About */}
      <MotionCard
        id="about"
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.01 }}
        className="rounded-none bg-card col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2"
      >
        <CardHeader className="border-b border-border p-4">
          <h3 className="font-bold text-lg text-card-foreground">About Me</h3>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <p className="text-sm text-card-foreground">
            I'm a developer with a background in fine arts, which informs my approach to building for the web. I thrive
            on challenging conventions and exploring new possibilities.
          </p>
          <p className="text-sm text-muted-foreground">
            My process is iterative and collaborative. I believe the best work comes from a place of curiosity and
            rigorous experimentation.
          </p>
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-card-foreground">Core Stack</h4>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "TypeScript", "Node.js", "GLSL", "Framer Motion"].map((skill) => (
                <Badge key={skill} variant="secondary" className="rounded-none">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </MotionCard>

      {/* Contact */}
      <MotionCard
        id="contact"
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.01 }}
        className="rounded-none bg-primary text-primary-foreground col-span-1 md:col-span-1"
      >
        <CardHeader className="border-b border-primary-foreground/50 p-4">
          <h3 className="font-bold text-lg">Contact</h3>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <p className="text-sm text-primary-foreground/80">Open for collaborations and interesting projects.</p>
          <div className="space-y-2">
            <Link href="mailto:hello@johnjackbogart.com" className="flex items-center gap-2 hover:underline">
              <Mail className="w-4 h-4" />
              <span>hello@johnjackbogart.com</span>
            </Link>
            <Link href="https://github.com" className="flex items-center gap-2 hover:underline">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </Link>
          </div>
        </CardContent>
      </MotionCard>

      {/* Project 2 */}
      <MotionCard
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.01 }}
        className="rounded-none bg-card col-span-1 md:col-span-1"
      >
        <CardHeader className="border-b border-border p-4">
          <h3 className="font-bold text-lg text-card-foreground">Project: Interactive Art</h3>
        </CardHeader>
        <CardContent className="p-4">
          <div className="aspect-square bg-neutral-800 mb-4">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Project 2"
              width={300}
              height={300}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            A series of generative art pieces created with p5.js and WebGL.
          </p>
        </CardContent>
        <CardFooter className="border-t border-border p-4">
          <Link
            href="#"
            className="flex items-center font-bold text-sm uppercase tracking-wider text-card-foreground hover:underline"
          >
            Explore <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </CardFooter>
      </MotionCard>
    </motion.div>
  )
}
