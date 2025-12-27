"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const MotionCard = motion(Card);

export function BentoGrid() {
  return (
    <motion.div
      id="work"
      className="scroll-mt-24 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white text-black dark:bg-black dark:text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* About */}
      <MotionCard
        id="about"
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.01 }}
        className="scroll-mt-24 rounded-none !bg-white !text-black dark:!bg-black dark:!text-white col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-2"
      >
        <CardHeader className="border-b border-black/10 p-4 dark:border-white/20">
          <h3 className="font-bold text-lg text-black dark:text-white">
            About Me
          </h3>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <p className="text-sm text-black dark:text-white">
            I'm an entrepreneur with a passion for life. I love music, running,
            and technology. I'm particularly interested in AI and frontier
            technology. I'm currently working on building an incubator called
            r.technology, it's been challenging and rewarding!
          </p>
          <p className="text-sm text-black dark:text-white">
            I've struggled with my health throughout my life, but have recently
            made a lot of improvements. I just ran a 100 mile ultramarathon in
            July and was very inspired by that experience. I'm currently
            planning my next adventure!
          </p>
          <p className="text-sm text-black dark:text-white">
            Some of the changes I've made include digging into my passions like
            running, music, and technology. Additionally, I've done a ton of
            internal work to get to where I'm at today. Mostly, this centers
            around self love, but I also owe a ton of my progress to my
            supportive friends and family.
          </p>
          <p className="text-sm text-black dark:text-white">
            I'm worried that my progress won't stick, and imposter syndrome has
            been quite the beast! But, I'm feeling hopeful lately and am excited
            to share my journey.
          </p>
          <p className="text-sm text-black dark:text-white">
            I'm committed to leaving the world better than I found it, and
            believe that I can use my experiences to help those around me.
          </p>
          <p className="text-sm text-black/70 dark:text-white/80">
            On the development side of things, I mostly stick to the front end.
            I love creativity and the new age of AI tools makes the front end
            that much more fun (and important!). I'd like to get deeper into
            backend development, machine learning, and deep tech, but I have a
            long way to go. I hope to share that journey as often as possible
          </p>
          <p className="text-sm text-black/70 dark:text-white/80">
            My process is iterative and collaborative, so please reach out! I
            believe the best work comes from a place of curiosity and rigorous
            experimentation. That's what my incubator is all about. It's a
            grassroots bootstrapped organization with a bone to pick. We're
            excited to make some noise and share what we're working on!
          </p>
          <div className="space-y-2 pt-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-black dark:text-white">
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
                <Badge
                  key={skill}
                  variant="secondary"
                  className="rounded-none !bg-transparent border-black/20 text-black/70 dark:border-white/30 dark:text-white/80"
                >
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
        className="scroll-mt-24 rounded-none !bg-white !text-black dark:!bg-black dark:!text-white col-span-1 md:col-span-1 lg:col-span-2 row-span-1 md:row-span-1"
      >
        <CardHeader className="border-b border-black/20 p-4 dark:border-white/20">
          <h3 className="font-bold text-lg">Contact</h3>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <p className="text-sm text-black/70 dark:text-white/80">
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
        id="portfolio"
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.01 }}
        className="scroll-mt-24 rounded-none !bg-white !text-black dark:!bg-black dark:!text-white col-span-1 md:col-span-2 lg:col-span-2"
      >
        <CardHeader className="border-b border-black/10 p-4 dark:border-white/20">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-black dark:text-white">
              Project: r.technology
            </h3>
            <Badge
              variant="outline"
              className="rounded-none border-black/20 text-black/60 dark:border-white/30 dark:text-white/80"
            >
              WEB
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="aspect-video bg-neutral-800 mb-4">
            <Image
              src="/r.png?height=300&width=500"
              alt="Project 1"
              width={500}
              height={300}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <p className="text-sm text-black/70 dark:text-white/80">
            A clean landing page for the incubator I'm working on. Built with
            R3F, Next and React. Deployed on Vercel
          </p>
        </CardContent>
        <CardFooter className="border-t border-black/10 p-4 dark:border-white/20">
          <Link
            href="https://r.technology"
            className="flex items-center font-bold text-sm uppercase tracking-wider text-black dark:text-white hover:underline"
          >
            View <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </CardFooter>
      </MotionCard>

      {/* Project 2 */}
      <MotionCard
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.01 }}
        className="scroll-mt-24 rounded-none !bg-white !text-black dark:!bg-black dark:!text-white col-span-1 md:col-span-2 lg:col-span-2"
      >
        <CardHeader className="border-b border-black/10 p-4 dark:border-white/20">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-black dark:text-white">
              Project: through.tech
            </h3>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="aspect-video bg-neutral-800 mb-4">
            <Image
              src="/through.png?height=300&width=500"
              alt="Through.tech screenshot"
              width={500}
              height={300}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <p className="text-sm text-black/70 dark:text-white/80">
            An AI powered tech consulting group.
          </p>
        </CardContent>
        <CardFooter className="border-t border-black/10 p-4 dark:border-white/20">
          <Link
            href="https://through.tech"
            className="flex items-center font-bold text-sm uppercase tracking-wider text-black dark:text-white hover:underline"
          >
            View <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </CardFooter>
      </MotionCard>

      <MotionCard
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.01 }}
        className="scroll-mt-24 rounded-none !bg-white !text-black dark:!bg-black dark:!text-white col-span-1 md:col-span-2 lg:col-span-2"
      >
        <CardHeader className="border-b border-black/10 p-4 dark:border-white/20">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-black dark:text-white">
              Project: braign.io
            </h3>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="aspect-video bg-neutral-800 mb-4">
            <Image
              src="/braign.png?height=300&width=500"
              alt="braign.io screenshot"
              width={500}
              height={300}
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <p className="text-sm text-black/70 dark:text-white/80">
            Tools for the technical marketer.
          </p>
        </CardContent>
        <CardFooter className="border-t border-black/10 p-4 dark:border-white/20">
          <Link
            href="https://braign.io"
            className="flex items-center font-bold text-sm uppercase tracking-wider text-black dark:text-white hover:underline"
          >
            View <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </CardFooter>
      </MotionCard>

      {/* Project 3 */}
      <MotionCard
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.01 }}
        className="rounded-none !bg-white !text-black dark:!bg-black dark:!text-white col-span-1 md:col-span-4"
      >
        <CardHeader className="border-b border-black/10 p-4 dark:border-white/20">
          <h3 className="font-bold text-lg text-black dark:text-white">
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
          <p className="text-sm text-black/70 dark:text-white/80">
            Built with v0 for a career talk with students
          </p>
        </CardContent>
        <CardFooter className="border-t border-black/10 p-4 dark:border-white/20">
          <Link
            href="https://v0-gakyqhqc-landing-page.vercel.app/"
            className="flex items-center font-bold text-sm uppercase tracking-wider text-black dark:text-white hover:underline"
          >
            Explore <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </CardFooter>
      </MotionCard>
    </motion.div>
  );
}
