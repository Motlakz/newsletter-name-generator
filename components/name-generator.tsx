"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import confetti from 'canvas-confetti';
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  topic: z.string().min(2, "Topic must be at least 2 characters"),
  tone: z.string(),
  industry: z.string(),
});

type NameSuggestion = {
  name: string;
  description: string;
  score: number;
  keywords: string[];
};

export function NameGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<NameSuggestion[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      tone: "professional",
      industry: "technology",
    },
  });

  const generateNames = async (data: z.infer<typeof formSchema>) => {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to generate names');
    }

    const result = await response.json();
    return result.suggestions;
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const newSuggestions = await generateNames(data);
      setSuggestions(newSuggestions);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      toast.error("Failed to generate names. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (suggestion: NameSuggestion) => {
    const savedFavorites = localStorage.getItem("newsletter-favorites");
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    if (favorites.some((f: any) => f.name === suggestion.name)) {
      favorites = favorites.filter((f: any) => f.name !== suggestion.name);
      toast.success("Removed from favorites");
    } else {
      favorites.push({
        ...suggestion,
        savedAt: new Date().toISOString(),
      });
      toast.success("Added to favorites!");
    }
    
    localStorage.setItem("newsletter-favorites", JSON.stringify(favorites));
    setFavorites(favorites.map((f: any) => f.name));
  };

  return (
    <div id="generator" className="max-w-4xl mx-auto space-y-8 py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Newsletter Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Technology News, Cooking Tips" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tone</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a tone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Names
              </>
            )}
          </Button>
        </form>
      </Form>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center mb-6">Suggestions</h2>
            <div className="grid gap-4">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold group-hover:text-purple-500 transition-colors">
                            {suggestion.name}
                          </h3>
                          <p className="text-muted-foreground mt-1">
                            {suggestion.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {suggestion.keywords.map((keyword) => (
                              <Badge key={keyword} variant="secondary">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm font-medium">
                            <span className={`${
                              suggestion.score >= 0.8 ? 'text-green-500' :
                              suggestion.score >= 0.6 ? 'text-yellow-500' :
                              'text-red-500'
                            }`}>
                              {Math.round(suggestion.score * 100)}%
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(suggestion)}
                            className="group-hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`h-5 w-5 ${
                                favorites.includes(suggestion.name)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground group-hover:text-yellow-400 transition-colors"
                              }`}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}