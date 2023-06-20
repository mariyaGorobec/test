import logo from "./logo.svg";
import React from "react";

const databaseOfQuestions = [
  {
    title:
      'Though they sound happy, what animal`s "laugh" is reaction to being threatened?',
    variants: ["hyena", "baboon", "ox", "woodpecker"],
    correct: "hyena",
  },
  {
    title:
      "Capable of exceeding 186 miles per hour, what is the fastest creature in the animal kingdom?",
    variants: ["cheetah", "black marlin", "horsefly", "peregrine falcon"],
    correct: "peregrine falcon",
  },
  {
    title:
      "Known for its intelligence, which dog breed has been found capable of understanding more than a thousand words?",
    variants: ["Dachshund", "French Buldog", "Border Collie", "Cocker Spaniel"],
    correct: "Border Collie",
  },
  {
    title: "The tiniest animal with a backbone is a what?",
    variants: ["lizard", "fish", "frog", "bird"],
    correct: "frog",
  },
  {
    title: 'Which of these "fish" is actually a fish?',
    variants: ["starfish", "crayfish", "swordfish", "jellyfish"],
    correct: "swordfish",
  },
  {
    title: "What gives flamingos their pink color?",
    variants: [
      "reaction to sunlight",
      "eating shrimp",
      "dominant genes",
      "mud captured in feathers",
    ],
    correct: "eating shrimp",
  },
];

const Result = ({ correct, questions, setStep, setCorrect }) => {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>
        You guessed {correct} answers out of {questions.length}
      </h2>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Try again
      </button>
    </div>
  );
};

const Game = ({ questions, step, onClickVariants }) => {
  const progress = Math.round((step / questions.length) * 100);
  return (
    <>
      <div className="progress">
        <div
          style={{ width: `${progress}%` }}
          className="progress__inner"
        ></div>
      </div>
      <h1>{questions[step].title}</h1>
      <ul>
        {questions[step].variants.map((item, index) => (
          <li onClick={() => onClickVariants(item)}>{item}</li>
        ))}
      </ul>
    </>
  );
};

function App() {
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const [questions,setQuestions] = React.useState('');
  
  React.useEffect(()=>{
    databaseOfQuestions.map(item=>(shuffle(item.variants)));
    shuffle(databaseOfQuestions);
    setQuestions(databaseOfQuestions);
  },[]);


  const onClickVariants = (item) => {
    if (questions[step].correct === item) {
      setCorrect(correct + 1);
    }
    setStep(step + 1);
  };

  return (
    <div className="App">
     
      {step >= questions.length ? (
        <Result
          setCorrect={setCorrect}
          setStep={setStep}
          correct={correct}
          questions={questions}
        ></Result>
      ) : (
        <Game
          questions={questions}
          step={step}
          onClickVariants={onClickVariants}
        ></Game>
      )}
    </div>
  );
}

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export default App;
