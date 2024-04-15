import React, { useContext } from 'react'
import { MyContext } from '../context/MyContext';
import quiz from '../database/quiz';

function QuestionGrid() {
    const { pointerOfCurrentQuestion,setPointerOfCurrentQuestion,values  } = useContext(MyContext);
    const handleQuestionPointer = (e:any) =>{
        setPointerOfCurrentQuestion(Number(e.target.value))
    }
  return (
    <div className=' h-auto w-[20rem] grid grid-cols-4 gap-2'>
           {
                quiz?.map((question:object,index)=>{
                    return <button 
                                type="button"
                                value={index} 
                                onClick={handleQuestionPointer}
                                className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 font-medium rounded-lg text-sm px-2 py-2.5 me-1 mb-1 dark:bg-cyan-600 dark:hover:bg-cyan-700 focus:outline-none dark:focus:ring-cyan-800">
                        {index+1}
                    </button>
                })
           } 
    </div>
  )
}

export default QuestionGrid