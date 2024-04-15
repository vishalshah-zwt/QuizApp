import React, { useContext } from 'react'
import { MyContext } from '../context/MyContext';
import quiz from '../database/quiz';

function Result() {
    const { pointerOfCurrentQuestion, setPointerOfCurrentQuestion, values } = useContext(MyContext);


    /* const storage = localStorage.getItem('Data') ? (JSON.parse(localStorage.getItem('Data') || '{}')) : {}
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
    }) */
    console.log(values?.result?.wrongAnswers)
    return (
        <>
            <div className=' my-5 flex justify-center font-bold text-2xl'>
                Your Score is : {values.result.score}/{quiz.length}
                <br />
                <br />
                You have Skipped  : {values.result.skippedQuestions.length} Questions Out Of {quiz.length}
                <br />
                <br />
                Wrong Answers are  : {values.result.wrongAnswers.length} Questions Out Of {quiz.length}
            </div>

            <div className='border'>
                {
                    quiz?.map((questions, index) => {
                        if (values?.result?.correctAnswers?.find((elem: any) => elem.index === index)) {
                            return <div key={index} className='my-5'>
                                <p className='Question'>{index + 1}. {questions?.question}</p>
                                <p className={(questions?.answer === 'A') ? 'bg-green-700	' : ''}> A. {questions?.A} </p>
                                <p className={(questions?.answer === 'B') ? 'bg-green-700	' : ''}> B. {questions?.B} </p>
                                <p className={(questions?.answer === 'C') ? 'bg-green-700	' : ''}> C. {questions?.C} </p>
                                <p className={(questions?.answer === 'D') ? 'bg-green-700	' : ''}> D. {questions?.D} </p>

                            </div>
                        }
                        values?.result?.wrongAnswers?.map((value: any, index: number) => {
                            if (index === value?.index) {
                                return <div key={index} className='my-5'>
                                    <p className='Question'>{index + 1}. {value?.question}</p>
                                    <p className={(value.answer == 'A') ? 'bg-red-400	' : ''}> A. {value?.A} </p>
                                    <p className={(value.answer == 'B') ? 'bg-red-400	' : ''}> B. {value?.B} </p>
                                    <p className={(value.answer == 'A') ? 'bg-red-400	' : ''}> A. {value?.C} </p>
                                    <p className={(value.answer == 'A') ? 'bg-red-400	' : ''}> A. {value?.D} </p>
                                    

                                </div>
                            }

                        })
                    })
                }
            </div>
        </>
    )
}

export default Result