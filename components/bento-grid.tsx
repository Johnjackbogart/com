"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Mail,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
};

const MotionCard = motion(Card);

export function BentoGrid() {
  return (
    <motion.div
      id="work"
      className="py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border border-l border-r border-border"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
            I'm an entrepreneur with a passion for life. I love music, running,
            and technology. I'm also a transhumanist and socialist with a lot of
            skepticism about how to turn those ideas into reality
          </p>
          <p className="text-sm text-card-foreground">
            I've struggled with my health throughout my life, but have recently
            made a lot of improvements. I'm a bit nervous to talk about that,
            but everyone says stay vulnerable!
          </p>
          <p className="text-sm text-card-foreground">
            Some of the changes I've made include digging into my passions like
            running (signed up for a 100M Ultra!), making music (learning how to
            use ableton and DJ), and getting sober (I used to be a smoker and a
            pothead). Additionally, I've had to do a ton of internal work to get
            myself to a place of stability. Mostly, this centers around self
            love and logical thinking, but I also owe a ton of my progress to my
            supportive family, friends, and partner
          </p>
          <p className="text-sm text-card-foreground">
            I'm worried that my progress won't stick, and I'll come across as
            disingenuous. But, I'm feeling very hopeful lately, and am excited
            to share my journey, the good and the bad
          </p>
          <p className="text-sm text-card-foreground">
            I'm committed to leaving the world better than I found it, and
            believe that I can use my experiences to help those around me
          </p>
          <p className="text-sm text-muted-foreground">
            On the development side of things, I mostly stick to the front end.
            I love creativity and the new age of AI tools makes the front end
            that much more fun (and important!). I'd like to get deeper into
            backend development, machine learning, and deep tech, but I have a
            long way to go. I hope to share that journey as often as possible
          </p>
          <p className="text-sm text-muted-foreground">
            My process is iterative and collaborative. I believe the best work
            comes from a place of curiosity and rigorous experimentation. I'm
            currently working on r.technology, my tech incubator (more like my
            baby), and all of the things that come with building that. It's a
            grassroots bootstrapped organization with a bone to pick. We're
            excited to make some noise and share what we're working on
          </p>
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-card-foreground">
              Core Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "GLSL",
                "Framer Motion",
              ].map((skill) => (
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
          <p className="text-sm text-primary-foreground/80">
            Would love to get connected!
          </p>
          <div className="space-y-2">
            <Link
              href="mailto:hello@johnjackbogart.com"
              className="flex items-center gap-2 hover:underline"
            >
              <Mail className="w-4 h-4" />
              <span>johnjackbogart@gmail.com</span>
            </Link>
            <Link
              href="https://www.instagram.com/johnjackbogart"
              className="flex items-center gap-2 hover:underline"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </Link>
            <Link
              href="https://twitter.com/JohnJackBogart"
              className="flex items-center gap-2 hover:underline"
            >
              <Twitter className="w-4 h-4" />
              <span>Twitter</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/john-jack-bogart/"
              className="flex items-center gap-2 hover:underline"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </Link>
            <Link
              href="https://github.com/johnjackbogart"
              className="flex items-center gap-2 hover:underline"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </Link>
          </div>
        </CardContent>
      </MotionCard>

      {/* Project 1 */}
      <MotionCard
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.01 }}
        className="rounded-none bg-card col-span-1 md:col-span-2 lg:col-span-2"
      >
        <CardHeader className="border-b border-border p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-card-foreground">
              Project: r.technology
            </h3>
            <Badge
              variant="outline"
              className="rounded-none border-border text-muted-foreground"
            >
              WEB
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="aspect-video bg-neutral-800 mb-4">
            <Image
              src="/r_screenshot.png?height=300&width=500"
              alt="Project 1"
              width={500}
              height={300}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            A clean landing page for the incubator I'm working on. Built with
            R3F, Next and React. Deployed on Vercel
          </p>
        </CardContent>
        <CardFooter className="border-t border-border p-4">
          <Link
            href="https://r.technology"
            className="flex items-center font-bold text-sm uppercase tracking-wider text-card-foreground hover:underline"
          >
            View Project <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </CardFooter>
      </MotionCard>

      {/* Project 2 */}
      <MotionCard
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.01 }}
        className="rounded-none bg-card col-span-1 md:col-span-1"
      >
        <CardHeader className="border-b border-border p-4">
          <h3 className="font-bold text-lg text-card-foreground">
            Project: Founder Journey
          </h3>
        </CardHeader>
        <CardContent className="p-4">
          <div className="aspect-square bg-neutral-800 mb-4">
            <Image
              src="/founder_journey.png?height=300&width=300"
              alt="Project 2"
              width={300}
              height={300}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Built with v0 for a career talk with students
          </p>
        </CardContent>
        <CardFooter className="border-t border-border p-4">
          <Link
            href="https://v0-gakyqhqc-landing-page.vercel.app/"
            className="flex items-center font-bold text-sm uppercase tracking-wider text-card-foreground hover:underline"
          >
            Explore <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </CardFooter>
      </MotionCard>
    </motion.div>
  );
}
