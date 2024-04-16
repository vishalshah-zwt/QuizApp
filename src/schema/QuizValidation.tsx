import * as yup from 'yup';

const QuizValidationSchema = yup.object().shape({
    answers:yup.array().of(
        yup.object().shape({
            answer:yup.string().required().label('answer')
        })
        
    )
  });
  
  // data object that need to be validated
 /*  currentQuestion: storage?.currentQuestion || quiz[pointerOfCurrentQuestion],
  result: storage?.result || {
      score: 0,
      correctAnswers: [],
      wrongAnswers: [],
      skippedQuestions: []
  },
  answers: storage?.answers || [
      { answer: '', index: '' }
  ],
  isSubmitted: storage?.isSubmitted || false, */
  

  export default QuizValidationSchema