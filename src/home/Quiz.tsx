import React, { useEffect, useState } from 'react'
import quiz from '../database/quiz';
import { useFormik } from 'formik';
import { MyContext } from '../context/MyContext';
import QuestionGrid from '../components/QuestionGrid';
import Result from '../components/Result';
import { useTimer } from 'react-timer-hook';


interface initialValues {
    currentQuestion?: object,
    result?: object,
    answers?: any
    isSubmitted?: boolean,
}
const Quiz: React.FC = () => {
    
    // const storage = ((localStorage.getItem('Data')) ? JSON.parse((localStorage.getItem('Data') || '{}') : '{}')) 
    const storage = localStorage.getItem('Data') ? (JSON.parse(localStorage.getItem('Data') || '{}')) : {}
    const [pointerOfCurrentQuestion, setPointerOfCurrentQuestion] = useState<number>(Number(storage.pointerOfCurrentQuestion) || 0)
    
 

    const initialValues: initialValues = {
        currentQuestion: storage?.currentQuestion || quiz[pointerOfCurrentQuestion],
        result: storage?.result || {
            score: 0,
            correctAnswers: [],
            wrongAnswers: [],
            skippedQuestions: []
        },
        answers: storage?.answers || ([] || {}),
        isSubmitted: storage?.isSubmitted || false ,
    }

    const { values, handleChange, setFieldValue , handleSubmit} = useFormik({
        initialValues,
        onSubmit: (value,action) => {

        }
    })


    //EVENT HANDLERS STARTED

    const handleNext = (e:any) => {
        console.log(e.target.value,"****")
        if (pointerOfCurrentQuestion < quiz.length - 1) {
            setPointerOfCurrentQuestion(pointerOfCurrentQuestion + 1)
            setFieldValue('currentQuestion', quiz[pointerOfCurrentQuestion + 1])
        }


    }
    const handlePrevious = (e: object) => {
        setPointerOfCurrentQuestion(pointerOfCurrentQuestion - 1)
    }

    const handleCustomChange = (e: any) => {
        const answerVariable = values.answers
        if (values?.answers?.find((answer: any) => answer.index === pointerOfCurrentQuestion)) {
            values?.answers?.map((answer: any) => {
                if (answer.index === pointerOfCurrentQuestion) {
                    answer.answer = e.target.value
                }
                else {
                    return answer
                }
            })
        }
        else {
            answerVariable.push({ answer: e.target.value, index: pointerOfCurrentQuestion })
        }
        setFieldValue(`answers`, answerVariable)
    }

    const calculateResult = () => {
        setFieldValue('isSubmitted', true)
        let correctAnswersVariable: any = []
        let wrongAnswersVariable: any = []
        let skippedQuestionsVariable: any = []
        let score = 0

        values?.answers?.map((answer: any) => {
            if (quiz[answer.index].answer === answer.answer) {
                correctAnswersVariable.push({question:quiz[answer.index],index:answer.index})
                score += 1
            }
            else {
                wrongAnswersVariable.push({ question: quiz[answer.index].question, answer: answer.answer ,index:answer.index})
            }

        })


        quiz?.map((question,indx)=>{
          if(!values?.answers?.find((elem:any)=>indx === elem.index)){
                skippedQuestionsVariable.push({question:question,index:indx})
          }
        })
        

        setFieldValue('result.skippedQuestions', skippedQuestionsVariable)
        setFieldValue('result.correctAnswers', correctAnswersVariable)
        setFieldValue('result.score', score)
        setFieldValue('result.wrongAnswers', wrongAnswersVariable)
        pause()
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
        setFieldValue('answers', [] || {})
        setFieldValue('isSubmitted', false)
        const time = new Date();
        time.setSeconds(time.getSeconds() + (60 * quiz.length));
        restart(time)
    }

    useEffect(()=>{
        if(values.isSubmitted === true)
            {
                const attendeesVariable = localStorage.getItem('Attendees') ? (JSON.parse(localStorage.getItem('Attendees') || '{}') ) :  []
                attendeesVariable.push(values.result)
                localStorage.setItem('Attendees',JSON.stringify(attendeesVariable) )
            } 
    },[values.isSubmitted])
 
    //EVENT HANDLERS ENDED
    
    //TIMER STARTED
    const expiryTimestamp =new Date()
    
    expiryTimestamp.setSeconds(60 * quiz.length)
 
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire:calculateResult });


    //STORING DATA TO LOCAL STORAGE
    localStorage.setItem('Data', JSON.stringify(values))
    localStorage.setItem('pointerOfCurrentQuestion', String(pointerOfCurrentQuestion))
   
    
    

    
    
   
    return (
        <>
            <MyContext.Provider value={{ pointerOfCurrentQuestion, setPointerOfCurrentQuestion, values }}>

                <div className='SuperContainer'>
                
                    <p>{hours}:{minutes}:{seconds}</p>
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
                                                value={(values?.answers?.[pointerOfCurrentQuestion] == '') ? values?.answers?.[pointerOfCurrentQuestion] : 'A'}
                                                onChange={handleCustomChange}
                                                checked={((values?.answers?.find(((item: any) => item?.index === pointerOfCurrentQuestion)))?.answer === 'A')}
                                                name={`answers.${[pointerOfCurrentQuestion]}`}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="optionA" className="ms-2 text-lg font-medium text-gray-900 cursor-pointer dark:text-gray-300"><b>A.</b> {quiz?.[pointerOfCurrentQuestion].A}</label>
                                        </div>
                                        <div className="flex items-center my-2 gap-2">
                                            <input
                                                id="optionB"
                                                type="radio"
                                                checked={((values?.answers?.find(((item: any) => item?.index === pointerOfCurrentQuestion)))?.answer === 'B')}
                                                value={(values?.answers?.[pointerOfCurrentQuestion] == '') ? values?.answers?.[pointerOfCurrentQuestion] : 'B'}
                                                onChange={handleCustomChange}
                                                name={`answers.${[pointerOfCurrentQuestion]}`}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="optionB" className="ms-2 text-lg font-medium text-gray-900 cursor-pointer dark:text-gray-300"><b>B.</b> {quiz?.[pointerOfCurrentQuestion].B}</label>
                                        </div>
                                        <div className="flex items-center my-2 gap-2">
                                            <input
                                                id="optionC"
                                                type="radio"
                                                checked={((values?.answers?.find(((item: any) => item?.index === pointerOfCurrentQuestion)))?.answer === 'C')}
                                                value={(values?.answers?.[pointerOfCurrentQuestion] == '') ? values?.answers?.[pointerOfCurrentQuestion] : 'C'}
                                                onChange={handleCustomChange}
                                                name={`answers.${[pointerOfCurrentQuestion]}`}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="optionC" className="ms-2 text-lg font-medium text-gray-900 cursor-pointer dark:text-gray-300"><b>C.</b> {quiz?.[pointerOfCurrentQuestion].C}</label>
                                        </div>
                                        <div className="flex items-center my-2 gap-2">
                                            <input
                                                id="optionD"
                                                type="radio"
                                                checked={((values?.answers?.find(((item: any) => item?.index === pointerOfCurrentQuestion)))?.answer === 'D')}
                                                value={(values?.answers?.[pointerOfCurrentQuestion] == '') ? values?.answers?.[pointerOfCurrentQuestion] : 'D'}
                                                onChange={handleCustomChange}
                                                name={`answers.${[pointerOfCurrentQuestion]}`}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor="optionD" className="ms-2 text-lg font-medium text-gray-900 cursor-pointer dark:text-gray-300"><b>D.</b> {quiz?.[pointerOfCurrentQuestion].D}</label>
                                        </div>
                                    </div>
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
                                    <button
                                        type="button"
                                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                        onClick={handleReset}
                                    >
                                        Restart Quiz
                                    </button>
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