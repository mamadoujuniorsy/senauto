"use client";

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from "react-icons/fa6";

const CorrectionPage: React.FC = () => {
  const seriesCorrectAnswers: Record<string, string[]> = {
    B1: ['BD', 'AD', 'B', 'BC', 'B', 'A', 'B', 'B', 'AD', 'B', 'C', 'BC', 'AD', 'AC', 'A', 'B', 'B', 'A', 'B', 'B', 'A', 'B', 'A', 'B', 'B'],
    B2: ['AD', 'BD', 'BD', 'B', 'AD', 'A', 'AD', 'B', 'BD', 'B', 'B', 'BD', 'A', 'B', 'A', 'B', 'B', 'BC', 'A', 'B', 'A', 'A', 'AC', 'BD', 'BC'],
    B3: ['BD', 'BC', 'B', 'BD', 'B', 'A', 'BC', 'B', 'A', 'BC', 'A', 'AD', 'B', 'BC', 'B', 'A', 'BC', 'A', 'B', 'B', 'A', 'A', 'AC', 'BD', 'B'],
    B4: ['BD', 'AD', 'B', 'AC', 'AC', 'A', 'B', 'A', 'B', 'BC', 'B', 'B', 'A', 'B', 'A', 'B', 'B', 'A', 'BC', 'AD', 'C', 'A', 'BC', 'BD', 'BC'],
    B5: ['AD', 'BD', 'BD', 'BC', 'AD', 'A', 'B', 'B', 'C', 'B', 'B', 'A', 'A', 'B', 'B', 'B', 'A', 'A', 'BD', 'B', 'A', 'A', 'BC', 'AD', 'AD'],
    B6: ['AD', 'BD', 'B', 'A', 'B', 'A', 'B', 'B', 'AD', 'A', 'B', 'B', 'A', 'B', 'A', 'A', 'BD', 'AC', 'BC', 'AC', 'AC', 'A', 'A', 'B', 'AD'],
    B7: ['AD', 'BD', 'BD', 'A', 'A', 'B', 'BD', 'B', 'A', 'A', 'A', 'A', 'A', 'BC', 'A', 'A', 'BC', 'B', 'A', 'B', 'B', 'B', 'B', 'AD', 'AC'],
    B8: ['BD', 'A', 'BC', 'BC', 'AD', 'B', 'A', 'B', 'B', 'A', 'AD', 'A', 'BC', 'A', 'A', 'B', 'B', 'B', 'B', 'BC', 'A', 'BD', 'A', 'B', 'B'],
    B9: ['AC', 'BD', 'AC', 'B', 'BD', 'A', 'A', 'A', 'B', 'B', 'BC', 'A', 'AD', 'B', 'AD', 'B', 'AD', 'BC', 'B', 'A', 'B', 'BC', 'A', 'BC', 'B'],
    B10: ['AD', 'B', 'BD', 'B', 'BC', 'BC', 'AD', 'B', 'B', 'B', 'BC', 'B', 'BC', 'BD', 'BC', 'B', 'BD', 'B', 'BC', 'B', 'B', 'B', 'BC', 'A', 'BD'],
    B11: ['AD', 'BD', 'BD', 'AD', 'A', 'B', 'A', 'B', 'BC', 'B', 'B', 'B', 'AC', 'A', 'B', 'AC', 'A', 'BC', 'A', 'BC', 'B', 'A', 'AD', 'B', 'A'],
    B12: ['AD', 'BD', 'B', 'BC', 'B', 'A', 'A', 'A', 'B', 'A', 'B', 'B', 'BC', 'AD', 'B', 'BC', 'BC', 'A', 'A', 'B', 'B', 'A', 'B', 'BC', 'B'],
  };

  const searchParams = useSearchParams();
  const series = searchParams.get('series') ?? '';
  const userAnswersJson = searchParams.get('userAnswers') ?? '[]';
  
  const correctAnswers = seriesCorrectAnswers[series as keyof typeof seriesCorrectAnswers] || [];

  // Désérialiser les réponses
  const parsedUserAnswers: string[][] = JSON.parse(userAnswersJson);
  const parsedCorrectAnswers: string[] = correctAnswers;

  // État pour gérer l'image ouverte
  const [openImage, setOpenImage] = useState<{ index: number; isOpen: boolean } | null>(null);

  // Fonction pour ouvrir ou fermer l'image
  const handleImageClick = (index: number) => {
    setOpenImage(openImage && openImage.index === index ? null : { index, isOpen: true });
  };

  // Fonction pour quitter le modal
  const closeModal = () => {
    setOpenImage(null);
  };

  return (
    <div className="container mx-auto py-10 px-5 bg-gray-50 rounded-lg shadow-md">
      <Link href="/series" className="text-blue-600 underline text-lg flex items-center mb-6">
        <FaArrowLeft className="text-2xl mr-2" /> Retour à la sélection des séries
      </Link>
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">Correction de la série {series}</h1>

      <table className="table-auto w-full text-left border-collapse shadow-lg">
        <thead className="bg-blue-100">
          <tr>
            <th className="border px-4 py-2">Question</th>
            <th className="border px-4 py-2">Réponses fournies</th>
            <th className="border px-4 py-2">Réponses correctes</th>
            <th className="border px-4 py-2">Image</th>
          </tr>
        </thead>
        <tbody>
          {parsedCorrectAnswers.map((correctAnswer, index) => {
            const userAnswer = parsedUserAnswers[index] || [];
            const isCorrect = userAnswer.join('') === correctAnswer; // Convert array to string for comparison

            return (
              <tr key={index} className={isCorrect ? "bg-green-50" : "bg-red-50"}>
                <td className="border px-4 py-2 font-semibold">Question {index + 1}</td>
                <td className="border px-4 py-2">
                  <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                    {userAnswer.length ? userAnswer.join(', ') : 'Aucune réponse fournie'}
                  </span>
                </td>
                <td className="border px-4 py-2 text-blue-600 font-semibold">
                  {correctAnswer}
                </td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleImageClick(index)} className="hover:opacity-80 transition duration-200">
                    <Image
                      src={`/images/${series}/${series}-${(index + 1).toString().padStart(2, '0')}.JPG`}
                      alt={`Question ${index + 1}`}
                      width={100}
                      height={100}
                      className="cursor-pointer rounded-md shadow hover:shadow-lg transition duration-200"
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal pour afficher l'image avec les bonnes réponses */}
      {openImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-black text-2xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="font-bold text-lg mb-2">Réponses correctes pour la question {openImage.index + 1} :</h2>
            <Image
              src={`/images/${series}/${series}-${(openImage.index + 1).toString().padStart(2, '0')}.JPG`}
              alt={`Question ${openImage.index + 1}`}
              width={600}
              height={400}
              className="mx-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      )}
      <Link href="/series" className="text-blue-600 underline text-lg flex items-center mb-6">
        <FaArrowLeft className="text-2xl mr-2" /> Retour à la sélection des séries
      </Link>
    </div>
  );
};

export default CorrectionPage;
