"use client";

import { motion } from "framer-motion";

export function BackgroundGradient() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_#7c3aed_0%,_transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,_#4c1d95_0%,_transparent_50%)]"
      />
      <div className="fixed inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.05]" />
    </>
  );
}