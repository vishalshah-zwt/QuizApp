import React, { useState } from 'react'
import { useFormik } from 'formik';
import quiz from '../database/quiz';
const Quiz = () => {

  const [pointerOfCurrentQuestion, setPointerOfCurrentQuestion] = useState(0)

  const initialValues = {
    currentQuestion: quiz[pointerOfCurrentQuestion],
    score: 0,
    answers: []
  }

  const { values } = useFormik({
    initialValues
  })

  console.log(quiz.length, "^^^^")
  const handleNext = (e) => {
    if (pointerOfCurrentQuestion < quiz.length - 1)
      setPointerOfCurrentQuestion(pointerOfCurrentQuestion + 1)
  }
  const handlePrevious = (e) => {
    setPointerOfCurrentQuestion(pointerOfCurrentQuestion - 1)
  }

  return (
    <>
      <div className='SuperContainer'>
        <div className='QuestionsContainer border  my-6 mx-auto w-[60%]'>
          <p className='text-xl'>
            <b>{pointerOfCurrentQuestion + 1}</b>. {quiz?.[pointerOfCurrentQuestion]?.question}
          </p>
          <div className='RadioButtonsContainer  my-4'>
            <div className="flex items-center my-2 gap-2">
              <input
                id="default-radio-1"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="default-radio-1" className="ms-2 text-lg font-medium text-gray-900 cursor-pointer dark:text-gray-300"><b>A.</b> {quiz?.[pointerOfCurrentQuestion].A}</label>
            </div>
            <div className="flex items-center my-2 gap-2">
              <input
                id="default-radio-2"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="default-radio-2" className="ms-2 text-lg font-medium text-gray-900 cursor-pointer dark:text-gray-300"><b>B.</b> {quiz?.[pointerOfCurrentQuestion].B}</label>
            </div>
            <div className="flex items-center my-2 gap-2">
              <input
                id="default-radio-3"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="default-radio-3" className="ms-2 text-lg font-medium text-gray-900 cursor-pointer dark:text-gray-300"><b>C.</b> {quiz?.[pointerOfCurrentQuestion].C}</label>
            </div>
            <div className="flex items-center my-2 gap-2">
              <input
                id="default-radio-4"
                type="radio"
                value=""
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="default-radio-4" className="ms-2 text-lg font-medium text-gray-900 cursor-pointer dark:text-gray-300"><b>D.</b> {quiz?.[pointerOfCurrentQuestion].D}</label>
            </div>
          </div>
        </div>
        <p></p>
      </div>
      <div className='ButtonContainer my-8 mx-auto border w-[60%]'>
        {
          pointerOfCurrentQuestion > 0 ?
            <>
              <button
                type="button"
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                onClick={handlePrevious}
              >
                Previous
              </button>

            </>
            :
            null
        }
        {
          pointerOfCurrentQuestion < quiz.length-1 ?
            <>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={handleNext}
              >
                Next
              </button>

            </>
            :
            <>
              <button
                type="button"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={handleNext}
              >
                Submit
              </button>

            </>
          
        }
      </div >
    </>
  )
}

export default Quiz