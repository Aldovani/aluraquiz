/* eslint-disable space-in-parens */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import db from '../db.json';
import QuizBackground from '../src/components/QuizBackground';
// eslint-disable-next-line import/no-named-as-default
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando ...
      </Widget.Header>
      <Widget.Content>
        [Desafio do loading]
      </Widget.Content>

    </Widget>
  );
}

function QuestionWidget({
  questions,
  QuestionIndex,
  totalQuestions,
  onSubmit,
}) {
  const questionId = `question__${QuestionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {
            `Pergunta ${QuestionIndex + 1}
             de ${totalQuestions}`
          }
        </h3>
      </Widget.Header>
      <img
        src={questions.image}
        alt="descrição"
        style={
          {
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }
        }
      />
      <Widget.Content>
        <h2>{questions.title}</h2>
        <p>{questions.description}</p>
        <form onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        >

          {questions.alternatives.map((alternatives, alternativesIndex) => {
            const alternativesId = `alternative_${alternativesIndex}`;
            return (
              <Widget.Topic
                as="label"
                htmlFor={alternativesId}
              >
                {alternatives}
                <input
                  // style={{ display: 'none' }}
                  id={alternativesId}
                  name={questionId}
                  type="radio"
                />
              </Widget.Topic>
            );
          })}
          <Button type="submit">
            Confirmar
          </Button>
        </form>
      </Widget.Content>

    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenStates] = useState(screenStates.LOADING);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionsIndex = currentQuestion;
  const questions = db.questions[questionsIndex];

  useEffect(() => {
    setTimeout(() => {
      setScreenStates(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionsIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenStates(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>

      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            questions={questions}
            totalQuestions={totalQuestions}
            QuestionIndex={questionsIndex}
            onSubmit={handleSubmitQuiz}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <div>Parabens voçe acertou X questoes</div>}
      </QuizContainer>
    </QuizBackground>
  );
}
