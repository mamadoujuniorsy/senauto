/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Hero = () => {
  // Variantes pour l'animation du texte
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        yoyo: Infinity // Crée un effet de rebond
      }
    }
  };

  return (
    <div className="flex flex-col-reverse xl:flex-row gap-10 items-center xl:justify-between py-20 max-w-[1440px] mx-auto">
      
      {/* Texte principal */}
      <div className="flex-1 text-center xl:text-left px-6">
        <motion.h1
          className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight"
          initial="hidden" // Etat initial
          animate="visible" // Etat après animation
          variants={textVariants} // Utilisation des variantes définies plus haut
        >
          Préparez-vous pour le <span className="text-indigo-600">Code de la Route</span> avec SenAuto
        </motion.h1>

        <motion.p
          className="text-lg sm:text-2xl text-gray-700 mt-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.5, duration: 1 }
            }
          }}
        >
          Accédez à toutes les séries d'examens avec des corrections détaillées, et entraînez-vous dans les conditions réelles d'examen avec un timer.
        </motion.p>

        <motion.button
          className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
          variants={buttonVariants}
          whileHover="hover" // Effet au survol
        >
          <Link href="/auth/login">Commencer maintenant</Link>
        </motion.button>
      </div>

      {/* Image principale */}
      <motion.div
        className="flex-1 flex justify-center xl:justify-end items-center relative w-full h-[500px] xl:h-[600px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <Image 
          src="/hero.png" 
          alt="hero" 
          layout="fill" 
          objectFit="contain" 
          className="max-w-[400px] h-auto cursor-pointer hover:animate-bounce"
        />
        {/* Background décoratif */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-300 via-purple-200 to-blue-100 opacity-30 z-[-1]" />
      </motion.div>
    </div>
  );
};

export default Hero;
