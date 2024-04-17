import React, { useContext } from 'react'
import { MyContext } from '../context/MyContext';
import quiz from '../database/quiz';

function Result() {
    const { pointerOfCurrentQuestion, setPointerOfCurrentQuestion, values } = useContext(MyContext);



    console.log(values?.updatedAnswers, "UpdatedAnswers")
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
                <br />
                <br />
                You Took : {values?.timeTaken}  out of {values?.totalTime}
            </div>

            {/* <div className='border'>
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
                        
                    })
                }

              
            </div> */}

            <div className='border'>
                
                {   
                    values?.updatedAnswers?.map((data: any, index: number) => {
                        
                        return <div key={index} className='my-5'>
                            <p className='Question font-bold'>{index + 1}. {data?.question}</p>
                            <p className={(data?.selectedAns === "" && data?.correctAnswer === "A") ? 'bg-yellow-400' : (data?.selectedAns === "A" && data?.correctAnswer == data?.selectedAns) ? 'bg-green-700' : (data?.selectedAns === "A" && data?.correctAnswer !== data?.selectedAns) ?  'bg-red-700' : (data?.correctAnswer =='A') ?'bg-green-700' : ''}> A. {data?.option1} </p>
                            <p className={(data?.selectedAns === "" && data?.correctAnswer === "B") ? 'bg-yellow-400' :(data?.selectedAns === "B" && data?.correctAnswer == data?.selectedAns) ? 'bg-green-700' : (data?.selectedAns === "B" && data?.correctAnswer !== data?.selectedAns) ?  'bg-red-700' : (data?.correctAnswer =='B') ?'bg-green-700' : ''}> B. {data?.option2} </p>
                            <p className={(data?.selectedAns === "" && data?.correctAnswer === "C") ? 'bg-yellow-400' :(data?.selectedAns === "C" && data?.correctAnswer == data?.selectedAns) ? 'bg-green-700' : (data?.selectedAns === "C" && data?.correctAnswer !== data?.selectedAns) ?  'bg-red-700' : (data?.correctAnswer =='C') ?'bg-green-700' : ''}> C. {data?.option3} </p>
                            <p className={(data?.selectedAns === "" && data?.correctAnswer === "D") ? 'bg-yellow-400' :(data?.selectedAns === "D" && data?.correctAnswer == data?.selectedAns) ? 'bg-green-700' : (data?.selectedAns === "D" && data?.correctAnswer !== data?.selectedAns) ?  'bg-red-700' : (data?.correctAnswer =='D') ? 'bg-green-700' : ''}> D. {data?.option4} </p>

                        </div>

                    })
                }


            </div>
        </>
    )
}

export default Result