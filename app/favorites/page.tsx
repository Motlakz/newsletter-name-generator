"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Trash2, Calendar, Wand2 } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

type SavedName = {
  name: string;
  description: string;
  savedAt: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<SavedName[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("newsletter-favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const removeFavorite = (name: string) => {
    const updated = favorites.filter((f) => f.name !== name);
    setFavorites(updated);
    localStorage.setItem("newsletter-favorites", JSON.stringify(updated));
    toast.success("Removed from favorites");
  };

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
            <h1 className="text-2xl sm:text-3xl font-bold">Saved Names</h1>
            <div className="hidden sm:block w-20" />
          </div>

          {favorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-4">
                Start saving your favorite newsletter names!
              </p>
              <Link href="/">
                <Button className="gap-2">
                  <Wand2 className="h-4 w-4" />
                  Generate Names
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-4"
            >
              {favorites.map((favorite, index) => (
                <motion.div
                  key={favorite.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 sm:p-6 group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xl font-semibold group-hover:text-purple-500 transition-colors">
                          {favorite.name}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {favorite.description}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Saved on {new Date(favorite.savedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFavorite(favorite.name)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}