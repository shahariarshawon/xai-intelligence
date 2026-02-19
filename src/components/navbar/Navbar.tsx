"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  // Container variants for mobile menu stagger
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 },
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 flex items-center gap-2"
            >
              <Image
                src="https://i.postimg.cc/jjVyz17J/xai-(2).png"
                alt="Logo"
                width={50}
                height={50}
                className="bg-black rounded-2xl"
              />
              <p className="text-2xl font-bold">Xai</p>
            </Link>

            {/* Desktop Nav */}
            <LayoutGroup>
              <motion.ul
                className="hidden md:flex items-center gap-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08 },
                  },
                }}
              >
                {navItems.map((item, index) => {
                  const isHovered = hoveredIndex === index;
                  const isActive = activeIndex === index;

                  return (
                    <motion.li
                      key={item.name}
                      className="relative"
                      variants={{
                        hidden: { opacity: 0, y: -10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      onHoverStart={() => setHoveredIndex(index)}
                      onHoverEnd={() => setHoveredIndex(null)}
                      onClick={() => setActiveIndex(index)}
                    >
                      <AnimatePresence>
                        {(isHovered || isActive) && (
                          <motion.div
                            className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                            layoutId="navbar-bg"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                      </AnimatePresence>

                      <motion.div
                        className="px-4 py-2 rounded-full relative"
                        animate={{
                          x: isHovered ? (index < hoveredIndex ? -5 : 5) : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <Link
                          href={item.href}
                          className={`text-sm font-medium transition-colors ${
                            isActive
                              ? "text-black"
                              : "text-gray-600 hover:text-black"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </LayoutGroup>

            {/* Hamburger Button */}
            <button
              className="md:hidden text-gray-900 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isMobileOpen ? "open" : "closed"}
                variants={{
                  closed: { rotate: 0 },
                  open: { rotate: 90 },
                }}
                transition={{ duration: 0.4 }}
              >
                {isMobileOpen ? (
                  <X className="h-7 w-7" />
                ) : (
                  <Menu className="h-7 w-7" />
                )}
              </motion.div>
            </button>

            {/* CTA - hidden on mobile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:block px-5 py-2 bg-black text-white text-sm font-medium rounded-full"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleMobileMenu} // close on backdrop click
          >
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              onClick={(e) => e.stopPropagation()} // prevent close when clicking inside menu
            >
              <div className="flex flex-col h-full p-6">
                {/* Close button inside menu */}
                <div className="flex justify-end mb-10">
                  <button onClick={toggleMobileMenu}>
                    <X className="h-8 w-8 text-gray-800" />
                  </button>
                </div>

                {/* Nav Items with stagger */}
                <motion.ul
                  className="flex flex-col gap-8 text-2xl font-medium"
                  variants={menuVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={item.href}
                        className="text-gray-900 hover:text-indigo-600 transition-colors"
                        onClick={toggleMobileMenu}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Optional CTA in mobile menu */}
                <motion.div className="mt-auto" variants={itemVariants}>
                  <button className="w-full py-4 bg-black text-white text-lg font-medium rounded-full">
                    Get Started
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content overlap */}
      <div className="h-16" />
    </>
  );
}
