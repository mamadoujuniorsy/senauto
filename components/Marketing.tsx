/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Marketing = () => {
  // Variantes d'animation pour les éléments
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Ajoute un délai progressif pour chaque carte
        duration: 0.8,
        ease: "easeInOut"
      }
    })
  };

  const cards = [
    {
      title: "Entraînements en ligne",
      description: "Accédez à des séries de tests complets et préparez-vous comme si vous étiez à l'examen officiel.",
      image: "/training.png"
    },
    {
      title: "Corrections détaillées",
      description: "Chaque question est accompagnée de corrections claires pour vous aider à comprendre vos erreurs.",
      image: "/correction.png"
    },
    {
      title: "Timer intégré",
      description: "Simulez l'examen réel avec un timer intégré pour tester vos capacités sous pression.",
      image: "/timer.png"
    }
  ];

  return (
    <div className="bg-gray-100 py-20">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Pourquoi utiliser <span className="text-indigo-600">SenAuto</span> ?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              custom={index} // Pour indexer le délai d'apparition
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={card.image}
                alt={card.title}
                width={140}
                height={140}
                className="mx-auto"
              />
              <h3 className="text-2xl font-bold text-gray-800 mt-6 text-center">{card.title}</h3>
              <p className="text-gray-600 mt-4 text-center">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketing;
