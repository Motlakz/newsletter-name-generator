"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, ExternalLink, Wand2 } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EXAMPLE_NEWSLETTERS = [
  {
    name: "The Morning Brew",
    description: "Daily business news in a witty, conversational tone",
    category: "Business",
    subscribers: "3M+",
    style: "Casual",
    link: "https://www.morningbrew.com",
  },
  {
    name: "Brain Food",
    description: "Weekly insights on mental models and decision making",
    category: "Personal Development",
    subscribers: "500K+",
    style: "Professional",
    link: "https://fs.blog/newsletter/",
  },
  {
    name: "NextJS Weekly",
    description: "Latest updates and tips from the Next.js ecosystem",
    category: "Technology",
    subscribers: "200K+",
    style: "Technical",
    link: "https://nextjs.org/blog",
  },
  {
    name: "Dense Discovery",
    description: "Weekly newsletter about design, technology, and productivity",
    category: "Design",
    subscribers: "100K+",
    style: "Professional",
    link: "https://www.densediscovery.com/",
  },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold">Real-World Examples</h1>
            <div className="hidden sm:block w-20" />
          </div>

          <div className="grid gap-6">
            {EXAMPLE_NEWSLETTERS.map((newsletter, index) => (
              <motion.div
                key={newsletter.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 sm:p-6 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold group-hover:text-purple-500 transition-colors">
                          {newsletter.name}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {newsletter.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {newsletter.subscribers}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="outline">{newsletter.category}</Badge>
                      <Badge variant="outline">{newsletter.style}</Badge>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <a href={newsletter.link} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit Website
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Ready to create your own newsletter name?
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700">
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Names
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}