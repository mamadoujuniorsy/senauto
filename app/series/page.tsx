/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Importer useRouter
import QuestionContainer from "@/components/QuestionContainer";
import SeriesSelector from "@/components/SeriesSelector";

const SeriesPage = () => {
  const router = useRouter(); // Initialiser useRouter

  // État pour la série sélectionnée
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);

  // État pour la question actuelle
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // État pour stocker les réponses de l'utilisateur
  const [userAnswers, setUserAnswers] = useState<string[][]>(
    Array(25).fill([]) // 25 questions, initialisées avec des réponses vides
  );

  // État pour savoir si l'utilisateur a soumis ses réponses
  const [submitted, setSubmitted] = useState(false);

  // Réponses correctes pour chaque série
  const correctAnswers = {
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

  // Fonction appelée lorsque l'utilisateur sélectionne une série
  const handleSeriesSelect = (series: string) => {
    setSelectedSeries(series);
    setCurrentQuestion(0); 
    setUserAnswers(Array(25).fill([])); 
    setSubmitted(false); 
  };

  // Fonction pour changer une réponse
  const onChangeAnswer = (questionIndex: number, choice: string) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      if (updatedAnswers[questionIndex].includes(choice)) {
        updatedAnswers[questionIndex] = updatedAnswers[questionIndex].filter(
          (answer) => answer !== choice
        );
      } else {
        updatedAnswers[questionIndex] = [...updatedAnswers[questionIndex], choice];
      }
      return updatedAnswers;
    });
  };

  // Fonction pour passer à la question suivante
  const onNext = () => {
    if (currentQuestion < 24) {
      setCurrentQuestion(currentQuestion + 1);
    }else{
      alert("Fin de quizz, cliquez sur soumettre!")
    }
  };

  // Fonction pour soumettre les réponses
  const onSubmit = () => {
    setSubmitted(true);
    console.log("Réponses soumises : ", userAnswers);

    // Rediriger vers la page de correction
    const query = new URLSearchParams({
      series: selectedSeries || '',
      userAnswers: JSON.stringify(userAnswers),
      correctAnswers: JSON.stringify(correctAnswers)
    }).toString();

    router.push(`/correction?${query}`);
  };

  // Fonction pour quitter et revenir à la sélection de séries
  const onQuit = () => {
    setSelectedSeries(null); // Retourne à la sélection des séries
    setSubmitted(false); // Réinitialise l'état de soumission
    setUserAnswers(Array(25).fill([])); // Réinitialise les réponses
    setCurrentQuestion(0); // Réinitialise à la première question
  };

  return (
    <div className="mb-14 flex xl:flex-row flex-col gap-5 relative z-0 max-w-[1440px] mx-auto h-screen">
      <div className="flex-1 pt-36 sm:px-16 px-6">
        <div className="mb-6">
          <h1 className="text-center text-4xl sm:text-2xl font-bold text-blue-400">
            Tests de code de la route
          </h1>
          <p className="text-center">
            On vous propose comme à l'examen du code,
            <br />
            12 séries de 25 questions.
          </p>
        </div>

        {/* Composant de sélection de série */}
        <SeriesSelector onSelect={handleSeriesSelect} />

        {/* Affiche les questions seulement après sélection de la série */}
        {selectedSeries ? (
          <QuestionContainer
            series={selectedSeries}
            currentQuestion={currentQuestion}
            userAnswers={userAnswers}
            onChangeAnswer={onChangeAnswer}
            onNext={onNext}
            onSubmit={onSubmit}
            onQuit={onQuit} // Ajouter le bouton Quitter
            submitted={submitted}
            
          />
        ) : (
          <p className="text-center text-red-500">Veuillez choisir une série pour commencer.</p>
        )}
      </div>
    </div>
  );
};

export default SeriesPage;
