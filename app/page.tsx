"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Hero images - these should be placed in /public/assets/
const heroImages = [
  "/assets/1.jpg",
  "/assets/2.jpg",
  "/assets/3.jpg",
];

interface GalleryItem {
  file: string;
  type: "image" | "video";
}

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  // Image slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Load gallery data
  useEffect(() => {
    fetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => setGalleryItems(data))
      .catch(() => setGalleryItems([]));
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("letter-podcast");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Images with Crossfade */}
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: index === 0 ? 1 : 0 }}
              animate={{
                opacity: currentImageIndex === index ? 1 : 0,
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
        <Image
                src={img}
                alt={`Hero image ${index + 1}`}
                fill
                className="object-cover object-top"
                priority={index === 0}
                onError={(e) => {
                  console.warn(`Failed to load hero image: ${img}`);
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-6 text-5xl font-bold md:text-7xl lg:text-8xl"
            >
              Happy 25th, my forever
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="mb-12 text-xl md:text-2xl"
            >
              I put together a little something.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
              onClick={scrollToNext}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border-2 border-white/80 bg-white/10 px-8 py-3 text-lg backdrop-blur-sm transition-all duration-500 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            >
              See it
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Letter & Podcast Section */}
      <section
        id="letter-podcast"
        className="flex min-h-screen flex-col md:flex-row"
      >
        {/* Letter Div */}
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative flex flex-1 flex-col items-center justify-center bg-white p-12 text-center md:p-16"
        >
          {/* Medium Icon - Playful positioning */}
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute right-8 top-12 hidden md:block"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-black/20"
            >
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 text-2xl font-normal tracking-wide md:text-3xl"
          >
            The Letter
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mb-8 max-w-md text-lg italic leading-relaxed text-gray-700 md:text-xl"
          >
            "You are, without trying, a light — my light."
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            href="https://justinjnr.medium.com/happy-25th-jesulayomi-af52d62c8558"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full border-2 border-black bg-transparent px-8 py-3 text-lg transition-all duration-500 hover:bg-black hover:text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
            Read the Letter
          </motion.a>
        </motion.div>

        {/* Podcast Div */}
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative flex flex-1 flex-col items-center justify-center bg-[#1DB954] p-12 text-center text-white md:p-16"
        >
          {/* Spotify Icon - Playful positioning */}
          <motion.div
            initial={{ opacity: 0, rotate: 10 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="absolute left-8 top-12 hidden md:block"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white/20"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 text-2xl font-normal tracking-wide md:text-3xl"
          >
            The Letter (voiced)
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mb-8 max-w-md text-lg italic leading-relaxed md:text-xl"
          >
            "Let me read it to you."
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            href="https://open.spotify.com/episode/6JIP4drtIYK8OOAqkkpJnn"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-3 text-lg transition-all duration-500 hover:bg-white hover:text-[#1DB954]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            Listen on Spotify
          </motion.a>
        </motion.div>
      </section>

      {/* Prayer Section */}
      <section className="flex min-h-screen items-center justify-center bg-black px-4 py-20 text-center text-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-6 text-lg leading-relaxed md:text-xl lg:text-2xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="transition-all duration-300 hover:text-gray-200"
          >
            Jesulayomi, welcome to your best year yet. This year, you gain clarity beyond doubts. Your zeal for God grows better than it has ever been and you see His hand in all of your works.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="transition-all duration-300 hover:text-gray-200"
          >
            He leads you and protects you. You're in the center of His will for you and He is making a name for Himself with your life. You're shielded from wicked and unreasonable men.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="transition-all duration-300 hover:text-gray-200"
          >
            You'll lay up gold as dust and your growth and profiting will bring so much glory to God. Wealth is available for you abundantly.
          </motion.p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-12 text-center text-3xl font-normal text-black md:text-4xl lg:text-5xl"
          >
            Evidence that you're the most adorable woman on earth
          </motion.h2>
          {galleryItems.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-3 gap-6"
            >
              {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8, rotate: index % 2 === 0 ? -5 : 5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="overflow-hidden rounded-lg shadow-lg"
              >
                {item.type === "image" ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-square w-full"
                  >
                    <Image
                      src={`/assets/${item.file}`}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ) : (
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                    <video
                      src={`/assets/${item.file}`}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center text-gray-500">
              <p>Loading gallery...</p>
            </div>
          )}
        </div>
      </section>

      {/* Playlist Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#1DB954] via-[#1ed760] to-[#1DB954] px-4 py-20 text-center">
        {/* Song Titles - Playfully Scattered */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -15 }}
          viewport={{ once: true }}
          className="absolute left-8 top-20 text-sm font-light text-white/30 md:text-base lg:text-lg"
          animate={{
            y: [0, -10, 0],
            rotate: [-15, -20, -15],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.6 },
            scale: { duration: 0.8, delay: 0.6 },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          Believe me
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 12 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 12 }}
          viewport={{ once: true }}
          className="absolute right-12 top-32 text-xs font-light text-white/25 md:text-sm lg:text-base"
          animate={{
            y: [0, 8, 0],
            rotate: [12, 18, 12],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.8 },
            scale: { duration: 0.8, delay: 0.8 },
            rotate: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
          }}
        >
          I go nowhere
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
          viewport={{ once: true }}
          className="absolute left-16 bottom-32 text-sm font-light text-white/30 md:text-base lg:text-lg"
          animate={{
            y: [0, -12, 0],
            rotate: [-8, -15, -8],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 1 },
            scale: { duration: 0.8, delay: 1 },
            rotate: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          }}
        >
          Now and always
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 20 }}
          viewport={{ once: true }}
          className="absolute right-20 bottom-24 text-xs font-light text-white/25 md:text-sm lg:text-base"
          animate={{
            y: [0, 10, 0],
            rotate: [20, 25, 20],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 1.2 },
            scale: { duration: 0.8, delay: 1.2 },
            rotate: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
            y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
          }}
        >
          Smile for me
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -10 }}
          viewport={{ once: true }}
          className="absolute left-1/4 top-1/3 text-xs font-light text-white/20 md:text-sm"
          animate={{
            y: [0, -8, 0],
            rotate: [-10, -15, -10],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.7 },
            scale: { duration: 0.8, delay: 0.7 },
            rotate: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
            y: { duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
          }}
        >
          Forever baby
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 15 }}
          viewport={{ once: true }}
          className="absolute right-1/4 bottom-1/3 text-xs font-light text-white/20 md:text-sm"
          animate={{
            y: [0, 8, 0],
            rotate: [15, 22, 15],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.9 },
            scale: { duration: 0.8, delay: 0.9 },
            rotate: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
            y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
          }}
        >
          Count on you
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -18 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -18 }}
          viewport={{ once: true }}
          className="absolute left-1/3 top-1/4 text-xs font-light text-white/25 md:text-sm lg:text-base"
          animate={{
            y: [0, -15, 0],
            rotate: [-18, -25, -18],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 1.1 },
            scale: { duration: 0.8, delay: 1.1 },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
          }}
        >
          Perfect for you
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10 max-w-3xl space-y-8"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-3xl font-normal text-white md:text-4xl lg:text-5xl"
          >
            I put together a playlist of 25 songs just for you
          </motion.h2>
          <motion.a
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            href="https://open.spotify.com/playlist/4YNRrIe5zpzdcKGcwKBb7e?si=S7ugCB6LR7Cj4fijJ2zHWg&pi=P1i_yV5rSWWr4"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto flex w-fit items-center gap-3 rounded-full border-2 border-white bg-white/10 px-8 py-4 text-lg text-white backdrop-blur-sm transition-all duration-500 hover:bg-white hover:text-[#1DB954] hover:shadow-lg"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.359.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            <span className="font-medium">Listen on Spotify</span>
          </motion.a>
        </motion.div>
      </section>

      {/* Closing Note Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#E8DCC6] px-4 py-20 text-center">
        {/* Decorative Icons - Scattered around */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute left-10 top-20 text-4xl md:text-5xl"
          animate={{
            rotate: [0, 10, -10, 0],
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.2 },
            scale: { duration: 0.8, delay: 0.2 },
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          🎂
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute right-16 top-32 text-3xl md:text-4xl"
          animate={{
            rotate: [0, -15, 15, 0],
            y: [0, 10, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.4 },
            scale: { duration: 0.8, delay: 0.4 },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
          }}
        >
          💕
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute left-20 bottom-32 text-3xl md:text-4xl"
          animate={{
            rotate: [0, 20, -20, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.6 },
            scale: { duration: 0.8, delay: 0.6 },
            rotate: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
        >
          🎈
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute right-12 bottom-24 text-4xl md:text-5xl"
          animate={{
            rotate: [0, -10, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.8 },
            scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
            rotate: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
          }}
        >
          🌟
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute left-1/4 top-1/3 text-2xl md:text-3xl"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 1 },
            scale: { duration: 0.8, delay: 1 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
          }}
        >
          💝
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute right-1/4 bottom-1/3 text-2xl md:text-3xl"
          animate={{
            rotate: [0, -20, 20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 1.2 },
            scale: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
            rotate: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
          }}
        >
          🎁
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute left-1/3 bottom-20 text-3xl md:text-4xl"
          animate={{
            rotate: [0, 25, -25, 0],
            y: [0, 5, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.3 },
            scale: { duration: 0.8, delay: 0.3 },
            rotate: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
            y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
          }}
        >
          💐
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute right-1/3 top-24 text-2xl md:text-3xl"
          animate={{
            y: [0, -12, 0],
            rotate: [0, -15, 15, 0],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.5 },
            scale: { duration: 0.8, delay: 0.5 },
            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
            rotate: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
          }}
        >
          ✨
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl space-y-6 text-lg leading-relaxed text-black md:text-2xl lg:text-3xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            "Twenty-five today, but my goal is forever, and the day after that. I look forward to celebrating every new age, every new chapter, every ordinary day with you."
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            "I love you, forever, my forever"
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            "With love, Jr."
          </motion.p>
          <motion.span
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block text-4xl md:text-5xl"
          >
            ❤️
          </motion.span>
        </motion.div>
      </section>
      </main>
  );
}
