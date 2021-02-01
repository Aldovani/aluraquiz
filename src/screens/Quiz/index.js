/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
// import db from '../../../db.json';
import QuizBackground from '../../components/QuizBackground';
// eslint-disable-next-line import/no-named-as-default
import QuizContainer from '../../components/QuizContainer';
import QuizLogo from '../../components/QuizLogo';
import Widget from '../../components/Widget';
import Button from '../../components/Button';
import AlternativesForm from '../../components/AltrenativesForm';
import BackLinkArrow from '../../components/BackLinkArrow';
import LoadingWidget from '../../components/LoadingWidget';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        <p> Tela de resultado</p>
      </Widget.Header>
      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {/* {' '}
          {results.reduce((somatoriaAtual, resultadoAtual) => {
            const isAcerto = resultadoAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)}
          {' '} */}
          {results.filter((x) => x).length}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, resultIndex) => (
            <li key={`result_${result}`}>
              {`#${resultIndex + 1} `}
              resultado:
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>

    </Widget>
  );
}

function QuestionWidget({
  questions,
  QuestionIndex,
  totalQuestions,
  onSubmit,
  addResults,
}) {
  const [selectedAlternative, setSlectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionsSubmited] = useState(false);
  const questionId = `question__${QuestionIndex}`;
  const isCorrect = selectedAlternative === questions.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />
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
        <AlternativesForm onSubmit={(event) => {
          event.preventDefault();
          setIsQuestionsSubmited(true);
          setTimeout(() => {
            addResults(isCorrect);
            onSubmit();
            setIsQuestionsSubmited(false);
            setSlectedAlternative(undefined);
          }, 3 * 1000);
        }}
        >

          {questions.alternatives.map((alternatives, alternativesIndex) => {
            const alternativesId = `alternative_${alternativesIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativesIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativesId}
                htmlFor={alternativesId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}

              >
                {alternatives}
                <input
                  style={{ display: 'none' }}
                  id={alternativesId}
                  name={questionId}
                  onChange={() => setSlectedAlternative(alternativesIndex)}
                  type="radio"
                />
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você Errou!</p>}
        </AlternativesForm>
      </Widget.Content>

    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage({ externalQuestions, externalBg }) {
  const [screenState, setScreenStates] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionsIndex = currentQuestion;
  const questions = externalQuestions[questionsIndex];
  const bg = externalBg;

  function addResults(result) {
    setResults([
      ...results,
      result,
    ]);
  }

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
    <QuizBackground backgroundImage={bg}>

      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            questions={questions}
            totalQuestions={totalQuestions}
            QuestionIndex={questionsIndex}
            onSubmit={handleSubmitQuiz}
            addResults={addResults}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}
        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
