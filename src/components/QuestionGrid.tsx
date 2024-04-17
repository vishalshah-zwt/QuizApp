import React, { useContext } from 'react'
import { MyContext } from '../context/MyContext';
import quiz from '../database/quiz';

function QuestionGrid() {
    const { pointerOfCurrentQuestion,setPointerOfCurrentQuestion,values , validateForm , setErrors } = useContext(MyContext);
  
    const handleQuestionPointer = async(e:any) =>{
      let clickedQuestion = Number(e.target.value)
      const errorsVariable:any = await validateForm()
        setErrors(errorsVariable)
        if(clickedQuestion > pointerOfCurrentQuestion)
          {
            if((Object.keys(errorsVariable).length === 0) || (errorsVariable?.answers?.[pointerOfCurrentQuestion] === undefined)){
              if( ((clickedQuestion - pointerOfCurrentQuestion) === 1) || ( values?.visitedQuestions?.includes(clickedQuestion)) )
                {
                  setPointerOfCurrentQuestion(clickedQuestion)
                  const answersVariable = values.answers
                  answersVariable.push({ answer: '', index: '' })
                }
            }
            
          }
         
    
    }
    
  return (
    <div className=' h-auto w-[20rem] grid grid-cols-4 gap-2'>
           {
                quiz?.map((question:object,index)=>{
                    return <button 
                                type="button"
                                value={index} 
                                onClick={handleQuestionPointer}
                                className={(pointerOfCurrentQuestion === index) ? `text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-2 py-2.5 me-1 mb-1 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800`: ``}>
                        {index+1}
                    </button>
                })
           } 
    </div>
  )
}

export default QuestionGrid