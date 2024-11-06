"use client";

import { motion } from "framer-motion";
import { Sparkles, Wand2, BookOpen, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12 md:py-24"
    >
      <div className="space-y-6 max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center space-x-2"
        >
          <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-purple-500" />
          <h1 className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
            NewsletterGPT
          </h1>
        </motion.div>
        <p className="text-base md:text-xl text-muted-foreground">
          Generate captivating newsletter names powered by AI. Stand out in the inbox with unique, memorable titles.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 w-full sm:w-auto"
            onClick={() => {
              document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Names
          </Button>
          <Link href="/examples" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full">
              <BookOpen className="mr-2 h-4 w-4" />
              View Examples
            </Button>
          </Link>
          <Link href="/favorites" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full">
              <StarIcon className="mr-2 h-4 w-4" />
              My Favorites
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}