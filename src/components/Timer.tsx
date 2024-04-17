import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/MyContext';
import quiz from '../database/quiz';
function Timer() {



  const { values, pointerOfCurrentQuestion, setPointerOfCurrentQuestion, validateForm, setErrors, setFieldValue , nextButtonClicked} = useContext(MyContext)



  
  const [second, setSecond] = useState<number>(10)
  var timer: any
  
  const resetTime = () => {
    setSecond(10)
    const answersVariable = values.answers
    setFieldValue(`answers`, answersVariable)

    if (pointerOfCurrentQuestion < quiz.length - 1) {
      
      setPointerOfCurrentQuestion(pointerOfCurrentQuestion + 1)
      setFieldValue('currentQuestion', quiz[pointerOfCurrentQuestion + 1])
      let visitedQuestionsVariable = values?.visitedQuestions
      visitedQuestionsVariable?.push(pointerOfCurrentQuestion + 1)
      setFieldValue('visitedQuestions', visitedQuestionsVariable)
    }
    answersVariable.push({ answer: '', index: '' })
  }

  timer = setTimeout(() => {
    if (second > 1) {
      setSecond(second - 1)
    }
    else {
      resetTime()   
      setFieldValue('totalTime', (values?.totalTime + ((10-(second))+1)))
   }
  }, 1000)

  localStorage.setItem('Timer', JSON.stringify(second))

    useEffect(()=>{
      setSecond(10)
      setFieldValue('totalTime', (values?.totalTime + ((10-(second))+1)))
      
    },[nextButtonClicked])
  return (
    <div className='text-xl'>
      {second}

      
    </div>
  )
}

export default Timer