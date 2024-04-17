import React, { useEffect, useState } from 'react'
import quiz from '../database/quiz';
import { useFormik } from 'formik';
import { MyContext } from '../context/MyContext';
import QuestionGrid from '../components/QuestionGrid';
import Result from '../components/Result';
import QuizValidationSchema from '../schema/QuizValidation';


interface initialValues {
    currentQuestion?: object,
    result?: object,
    answers?: any
    isSubmitted?: boolean,
    visitedQuestions?: Array<number>
    timeTaken?: any,
    totalTime:any,
    updatedAnswers:any,
}
const Quiz: React.FC = () => {



    const storedPointerOfCurrentQuestion = (JSON.parse(localStorage.getItem('pointerOfCurrentQuestion') || '0'))
    const storage = localStorage.getItem('Data') ? (JSON.parse(localStorage.getItem('Data') || '{}')) : {}
    const [pointerOfCurrentQuestion, setPointerOfCurrentQuestion] = useState<number>(Number(storedPointerOfCurrentQuestion || 0))




    const initialValues: initialValues = {
        currentQuestion: storage?.currentQuestion || quiz[pointerOfCurrentQuestion],
        result: storage?.result || {
            score: 0,
            correctAnswers: [],
            wrongAnswers: [],
            skippedQuestions: []
        },
        answers: storage?.answers || [
            { answer: '', index: '' }
        ],
        visitedQuestions: [0],
        isSubmitted: storage?.isSubmitted || false,
        timeTaken: 0,
        updatedAnswers:[],
        totalTime:(quiz.length * 30)
    }

    const { values, handleChange, setFieldValue, handleSubmit, validateForm } = useFormik({
        initialValues,
        validationSchema: QuizValidationSchema,
        onSubmit: (value, action) => {

        }
    })




    const [Time, setTime] = useState(10)
    var time: any
    //EVENT HANDLERS STARTED
    const [errors, setErrors] = useState<any>()
    const handleNext = async (e: any) => {
        const errorsVariable: any = await validateForm()
        setErrors(errorsVariable)
        console.log(errorsVariable, "errorsVariable")
        if (Object.keys(errorsVariable).length === 0 || errorsVariable.answers[pointerOfCurrentQuestion] === undefined) {
            const answersVariable = values.answers
            answersVariable.push({ answer: '', index: '' })
            setFieldValue(`answers`, answersVariable)
            if (pointerOfCurrentQuestion < quiz.length - 1) {
                setFieldValue('timeTaken', (values?.timeTaken + ((10-Time)+1)))
                setTime(10)
                setPointerOfCurrentQuestion(pointerOfCurrentQuestion + 1)
                setFieldValue('currentQuestion', quiz[pointerOfCurrentQuestion + 1])
                let visitedQuestionsVariable = values?.visitedQuestions
                visitedQuestionsVariable?.push(pointerOfCurrentQuestion + 1)
                setFieldValue('visitedQuestions', visitedQuestionsVariable)
            }
            else {
                setFieldValue('isSubmitted', true)
            }
        }

    }


    const handleCustomChange = (e: any) => {
        console.log(e.target.value, "&&")
        setFieldValue(`answers[${pointerOfCurrentQuestion}]`, {
            answer: e.target.value,
            index: pointerOfCurrentQuestion
        }
        )
    }

    const calculateResult = async () => {
        const errorsVariable: any = await validateForm()
        setErrors(errorsVariable)
        console.log(errorsVariable, "errorsVariable")
        if (Object.keys(errorsVariable).length === 0 || errorsVariable.answers[pointerOfCurrentQuestion] === undefined) {
            setFieldValue('isSubmitted', true)
            let allAnswersVariable: any = []
            let correctAnswersVariable: any = []
            let wrongAnswersVariable: any = []
            let skippedQuestionsVariable: any = []
            let updatedAnswerVariable: any = []

            let score = 0

            values?.answers?.map((answer: any) => {
                if (quiz[answer.index]?.answer === answer.answer) {
                    correctAnswersVariable?.push({ question: quiz[answer.index], index: answer.index })
                    allAnswersVariable?.push({ question: quiz[answer.index], index: answer.index, answerType: "right" })
                    score += 1
                }
                else if (quiz[answer.index]?.question === undefined) {
                    skippedQuestionsVariable?.push({ question: quiz?.[answer.index]?.question, answer: answer.answer, index: answer.index })
                    allAnswersVariable?.push({ question: quiz[answer.index], index: answer.index, answerType: "skipped" })
                }

                else {
                    wrongAnswersVariable?.push({ question: quiz?.[answer.index]?.question, answer: answer.answer, index: answer.index })
                    allAnswersVariable?.push({ question: quiz?.[answer.index], index: answer.index, answerType: "wrong" })
                }


            })

            quiz?.map((data,indx)=>{
                   updatedAnswerVariable.push({
                    question:data?.question , 
                    option1:data?.A ,
                    option2:data?.B ,
                    option3:data?.C ,
                    option4:data?.D ,
                    selectedAns:values?.answers?.[indx]?.answer,
                    correctAnswer:data?.answer
                })
            })


            quiz?.map((question, indx) => {
                if (!values?.answers?.find((elem: any) => indx === elem.index)) {
                    skippedQuestionsVariable.push({ question: question, index: indx })
                }
            })


            setFieldValue('updatedAnswers', updatedAnswerVariable)
            setFieldValue('result.skippedQuestions', skippedQuestionsVariable)
            setFieldValue('result.correctAnswers', correctAnswersVariable)
            setFieldValue('result.score', score)
            setFieldValue('result.wrongAnswers', wrongAnswersVariable)
            setFieldValue('result.allAnswers', allAnswersVariable)

        }
    }

    const handleReset = () => {
        localStorage.removeItem('Data')
        localStorage.removeItem('pointerOfCurrentQuestion')
        setPointerOfCurrentQuestion(0)
        setFieldValue('currentQuestion', quiz[pointerOfCurrentQuestion])
        setFieldValue('result', {
            score: 0,
            correctAnswers: [],
            wrongAnswers: [],
            skippedQuestions: []
        })
        setFieldValue('answers', [{ answer: '', index: '' }])
        setFieldValue('isSubmitted', false)
        setFieldValue('visitedQuestions', [0])
        setFieldValue('totalTime', 0)
        setTime(10)
        setFieldValue('timeTaken', 0)
        
    }

    useEffect(() => {
        if (values.isSubmitted === true) {
            const attendeesVariable = localStorage.getItem('Attendees') ? (JSON.parse(localStorage.getItem('Attendees') || '{}')) : []
            attendeesVariable.push(values.result)
            localStorage.setItem('Attendees', JSON.stringify(attendeesVariable))
        }
    }, [values.isSubmitted])



    useEffect(() => {
        if (values?.isSubmitted === false) {

            time = setInterval(() => {
                if (Time > 0) {
                    setTime(Time => Time - 1)
                }
                else {

                    if (pointerOfCurrentQuestion < (quiz?.length - 1)) {
                        setPointerOfCurrentQuestion(pointerOfCurrentQuestion + 1)
                        setFieldValue('currentQuestion', quiz[pointerOfCurrentQuestion + 1])
                        const answersVariable = values.answers
                        answersVariable.push({ answer: '', index: '' })
                        setFieldValue(`answers`, answersVariable)
                        setFieldValue('timeTaken', (values?.timeTaken + ((10-Time)+1)))
                        setTime(10)
                    }
                    else {
                        setFieldValue('isSubmitted', true)
                        let allAnswersVariable: any = []
                        let correctAnswersVariable: any = []
                        let wrongAnswersVariable: any = []
                        let skippedQuestionsVariable: any = []
                        let score = 0

                        values?.answers?.map((answer: any) => {
                            if (quiz[answer.index]?.answer === answer.answer) {
                                correctAnswersVariable?.push({ question: quiz[answer.index], index: answer.index })
                                allAnswersVariable?.push({ question: quiz[answer.index], index: answer.index, answerType: "right" })
                                score += 1
                            }
                            else if (quiz[answer.index]?.question === undefined) {
                                skippedQuestionsVariable?.push({ question: quiz?.[answer.index]?.question, answer: answer.answer, index: answer.index })
                                allAnswersVariable?.push({ question: quiz[answer.index], index: answer.index, answerType: "skipped" })
                            }

                            else {
                                wrongAnswersVariable?.push({ question: quiz?.[answer.index]?.question, answer: answer.answer, index: answer.index })
                                allAnswersVariable?.push({ question: quiz?.[answer.index], index: answer.index, answerType: "wrong" })
                            }


                        })


                        quiz?.map((question, indx) => {
                            if (!values?.answers?.find((elem: any) => indx === elem.index)) {
                                skippedQuestionsVariable.push({ question: question, index: indx })
                            }
                        })


                        setFieldValue('result.skippedQuestions', skippedQuestionsVariable)
                        setFieldValue('result.correctAnswers', correctAnswersVariable)
                        setFieldValue('result.score', score)
                        setFieldValue('result.wrongAnswers', wrongAnswersVariable)
                        setFieldValue('result.allAnswers', allAnswersVariable)

                        clearInterval(time)
                    }
                }
            }, 1000)

            return () => {
                clearInterval(time)
            }
        }
        else {
            setTime(0)
        }
    }, [Time])


    //STORING DATA TO LOCAL STORAGE
    /*  localStorage.setItem('Data', JSON.stringify(values))
     localStorage.setItem('pointerOfCurrentQuestion', JSON.stringify(pointerOfCurrentQuestion)) */

    console.log(values, "**")
    return (
        <>
            <MyContext.Provider value={{ pointerOfCurrentQuestion, setPointerOfCurrentQuestion, values, validateForm, setErrors, setFieldValue }}>

                {
                    !values?.isSubmitted ?
                    "Time Left:  " + Time
                    :
                    ''   
                }
                <div className='SuperContainer'>

                    {
                        values?.isSubmitted === false ?
                            <>
                                <div className='QuestionsContainer border  my-6 mx-auto w-[60%]'>
                                    <p className='text-xl'>
                                        <b>{pointerOfCurrentQuestion + 1}</b>. {quiz?.[pointerOfCurrentQuestion]?.question}
                                    </p>
                                    <div className='RadioButtonsContainer  my-4'>
                                        <div className="flex items-center my-2 gap-2">
                                            <input
                                                id="optionA"
                                                type="radio"
                                                onChange={handleCustomChange}
                                                checked={values?.answers[pointerOfCurrentQuestion]?.answer === 'A'}
                                                value='A'
                                                name={`answers.${[pointerOfCurrentQuestion]}.answer`}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="optionA" className="ms-2 text-lg font-medium text-gray-900 cursor-pointer dark:text-gray-300"><b>A.</b> {quiz?.[pointerOfCurrentQuestion].A}</label>
                                        </div>
                                        <div className="flex items-center my-2 gap-2">
                                            <input
                                                id="optionB"
                                                type="radio"
                                                onChange={handleCustomChange}
                                                checked={values?.answers[pointerOfCurrentQuestion]?.answer === 'B'}
                                                value='B'
                                                name={`answers.${[pointerOfCurrentQuestion]}.answer`}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="optionB" className="ms-2 text-lg font-medium text-gray-900 cursor-pointer dark:text-gray-300"><b>B.</b> {quiz?.[pointerOfCurrentQuestion].B}</label>
                                        </div>
                                        <div className="flex items-center my-2 gap-2">
                                            <input
                                                id="optionC"
                                                type="radio"
                                                onChange={handleCustomChange}
                                                checked={values?.answers[pointerOfCurrentQuestion]?.answer === 'C'}
                                                value='C'
                                                name={`answers.${[pointerOfCurrentQuestion]}.answer`}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="optionC" className="ms-2 text-lg font-medium text-gray-900 cursor-pointer dark:text-gray-300"><b>C.</b> {quiz?.[pointerOfCurrentQuestion].C}</label>
                                        </div>
                                        <div className="flex items-center my-2 gap-2">
                                            <input
                                                id="optionD"
                                                type="radio"
                                                onChange={handleCustomChange}
                                                checked={values?.answers[pointerOfCurrentQuestion]?.answer === 'D'}
                                                value='D'
                                                name={`answers.${[pointerOfCurrentQuestion]}.answer`}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="optionD" className="ms-2 text-lg font-medium text-gray-900 cursor-pointer dark:text-gray-300"><b>D.</b> {quiz?.[pointerOfCurrentQuestion].D}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='ButtonContainer my-8 mx-auto border w-[60%]'>
                                    {
                                        pointerOfCurrentQuestion < quiz.length - 1 ?
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
                                                    onClick={calculateResult}
                                                >
                                                    Submit
                                                </button>

                                            </>

                                    }

                                </div >
                                <QuestionGrid />
                            </>
                            :
                            <>
                                <Result />
                                <button
                                    type="button"
                                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                                    onClick={handleReset}
                                >
                                    Start Quiz
                                </button>
                            </>
                    }
                </div>

            </MyContext.Provider>

        </>
    )
}

export default Quiz