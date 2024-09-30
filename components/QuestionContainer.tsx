import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface QuestionContainerProps {
  series: string;
  currentQuestion: number;
  userAnswers: string[][];
  onChangeAnswer: (questionIndex: number, choice: string) => void;
  onNext: () => void;
  onSubmit: () => void;
  onQuit: () => void;
  submitted: boolean;
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({
  series,
  currentQuestion,
  userAnswers,
  onChangeAnswer,
  onNext,
  onSubmit,
  onQuit,
  submitted,
}) => {
  const choices = ["A", "B", "C", "D"];
  const [timeLeft, setTimeLeft] = useState(30);
  const [answerCorrect, setAnswerCorrect] = useState<boolean | null>(null);

  // Timer effect
  useEffect(() => {
    if (timeLeft === 0) {
      onNext(); // Passe automatiquement à la question suivante
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onNext]);

  // Reset le timer lorsqu'on change de question
  useEffect(() => {
    setTimeLeft(30);
    setAnswerCorrect(null); // Réinitialise le statut de la réponse
  }, [currentQuestion]);

  // Styles pour le timer circulaire
  const progressStyles = buildStyles({
    pathColor: timeLeft < 6 ? "red" : "#4caf50", 
    textColor: timeLeft < 6 ? "red" : "#333",
    trailColor: "#d6d6d6",
  });

  return (
    <Card className="relative w-full max-w-3xl mx-auto my-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold text-blue-600">
          Question {currentQuestion + 1}
        </CardTitle>
        {/* Affiche si la réponse est correcte ou non */}
        {answerCorrect !== null && (
          <div
            className={`text-center font-semibold mt-4 ${
              answerCorrect ? "text-green-500" : "text-red-500"
            }`}
          >
            {answerCorrect ? "Réponse correcte!" : "Réponse incorrecte!"}
          </div>
        )}
      </CardHeader>

      {/* Image de la question */}
      <div className="relative flex justify-center my-4">
        <Image
          className="max-w-full max-h-64 object-contain"
          src={`/images/${String(series)}/${String(series)}-${(currentQuestion + 1).toString().padStart(2, "0")}.JPG`}
          alt={`Question ${currentQuestion + 1}`}
          width={640}
          height={480}
        />
      </div>

      {/* Timer en dessous de l'image */}
      <div className="flex justify-center my-4">
        <div className="w-20 h-20">
          <CircularProgressbar
            value={timeLeft}
            maxValue={30}
            text={`${timeLeft}s`}
            styles={progressStyles}
          />
        </div>
      </div>

      <CardContent>
        <div className="flex flex-wrap justify-around">
          {choices.map((choice) => (
            <label key={choice} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={choice}
                checked={userAnswers[currentQuestion].includes(choice)}
                onChange={() => onChangeAnswer(currentQuestion, choice)}
                disabled={submitted}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button onClick={onNext} disabled={submitted}
        className="bg-blue-500 text-white hover:bg-blue-300">
          Suivant
        </Button>
        <Button variant="destructive" onClick={onQuit}
        className="bg-red-500 text-white hover:bg-red-300">
          Quitter
        </Button>
        {!submitted && (
          <Button onClick={onSubmit} className="bg-green-500 text-white hover:bg-green-300">
            Soumettre
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuestionContainer;
