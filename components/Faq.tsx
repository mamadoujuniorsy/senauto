/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const faqData = [
  {
    question: "Comment m'inscrire sur SenAuto ?",
    answer: "Pour vous inscrire, rendez-vous sur la page de connexion et suivez les instructions. Vous pouvez vous inscrire avec une adresse e-mail ou via des réseaux sociaux."
  },
  {
    question: "Est-ce que SenAuto est gratuit ?",
    answer: "Oui, SenAuto est entièrement gratuit pour l'entraînement au Code de la Route. Vous pouvez accéder à toutes les séries d'examen et corrections sans frais."
  },
  {
    question: "Comment fonctionne le timer pendant les examens ?",
    answer: "Pendant chaque examen, un timer est affiché en haut de l'écran. Vous devez terminer l'examen avant la fin du temps imparti pour soumettre vos réponses."
  },
  {
    question: "Puis-je accéder à SenAuto depuis mon téléphone ?",
    answer: "Oui, SenAuto est compatible avec les appareils mobiles. Vous pouvez vous entraîner au Code de la Route depuis votre téléphone, tablette ou ordinateur."
  }
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border-b py-4"
      initial={false}
      animate={{ height: isOpen ? "auto" : "0px" }}
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold text-gray-900">{question}</h3>
        <span className="text-indigo-600">{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && (
        <motion.p
          className="text-gray-600 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {answer}
        </motion.p>
      )}
    </motion.div>
  );
};

const FAQ = () => {
  return (
    <div className="max-w-[1440px] mx-auto py-16 px-6">
      {/* Section avec image */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Questions fréquemment posées
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            Parcourez les FAQ pour trouver les réponses aux questions les plus fréquentes.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="/think.png" // Assurez-vous que l'image existe à cet emplacement
            alt="Pensez à une question"
            width={400}
            height={300}
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* FAQ Accordions */}
      <div className="space-y-8">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
