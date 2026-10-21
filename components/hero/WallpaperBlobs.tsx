"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

interface WallpaperBlobsProps {
  className?: string;
}

export default function WallpaperBlobs({ className = "" }: WallpaperBlobsProps) {
  const { wallpaper } = useTheme();

  // Only render moving ambient blobs for default mesh; other wallpapers have their own distinct visuals
  if (wallpaper !== "mesh") {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      {/* Blob 1 - Peach, top-left drift */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-peach/50 blur-[140px]"
        initial={{ x: "-10%", y: "5%" }}
        animate={{
          x: ["−10%", "5%", "−10%"],
          y: ["5%", "15%", "5%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "10%", left: "10%" }}
      />

      {/* Blob 2 - Lavender, center-right drift */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full bg-lavender/50 blur-[120px]"
        initial={{ x: "0%", y: "0%" }}
        animate={{
          x: ["0%", "-8%", "0%"],
          y: ["0%", "10%", "0%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ top: "20%", right: "15%" }}
      />

      {/* Blob 3 - Mint, bottom-center drift */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-mint/40 blur-[130px]"
        initial={{ x: "0%", y: "0%" }}
        animate={{
          x: ["0%", "6%", "0%"],
          y: ["0%", "-8%", "0%"],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        style={{ bottom: "15%", left: "30%" }}
      />

      {/* Blob 4 - Sky, bottom-right subtle */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full bg-sky/30 blur-[110px]"
        initial={{ x: "0%", y: "0%" }}
        animate={{
          x: ["0%", "-5%", "0%"],
          y: ["0%", "5%", "0%"],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        style={{ bottom: "25%", right: "10%" }}
      />
    </div>
  );
}
