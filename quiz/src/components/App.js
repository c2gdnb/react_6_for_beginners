import { useState } from "react";
import "../index.scss";
import Game from "./Game";
import Result from "./Result";

const questions = [
  {
    title: "React - это ... ?",
    variants: ["библиотека", "фреймворк", "приложение"],
    correct: 0,
  },
  {
    title: "Компонент - это ... ",
    variants: [
      "приложение",
      "часть приложения или страницы",
      "то, что я не знаю что такое",
    ],
    correct: 1,
  },
  {
    title: "Что такое JSX?",
    variants: [
      "Это простой HTML",
      "Это функция",
      "Это тот же HTML, но с возможностью выполнять JS-код",
    ],
    correct: 2,
  },
];

function App() {
  const [step, setStep] = useState(0);
  const [correct, setcorrect] = useState(0);
  const question = questions[step];

  const onClickVariant = (index) => {
    setStep(step + 1);

    if (index === question.correct) {
      setcorrect(correct + 1);
    }
  };

  const resetGame = () => {
    setStep(0);
    setcorrect(0);
  }

  return (
    <div className="App">
      {step !== questions.length ? (
        <Game step={step} question={question} onClickVariant={onClickVariant} questions={questions}/>
      ) : (
        <Result correct={correct} questions={questions} resetGame={resetGame}/>
      )}
    </div>
  );
}

export default App;
