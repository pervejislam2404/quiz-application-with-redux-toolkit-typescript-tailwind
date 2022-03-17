import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentCorrectAnsIndex, setQuizIndex, setScore, setSelectedAnsList, setSelectedIndex, setTemporarySelect } from "../redux/counter/counterSlice";




const Quiz = () => {
  const dispatch = useDispatch();

  const data = useSelector((state:any)=>state.quizData);
  const selectedIndex = useSelector((state:any)=>state.selectedIndex);
  const currentCorrectAnsIndex = useSelector((state:any)=>state.currentCorrectAnsIndex);
  const quizIndex = useSelector((state:any)=>state.quizIndex);
  const temporarySelect = useSelector((state:any)=>state.temporarySelect);
  let score = useSelector((state:any)=>state.score);


  const handleClick = (ans:string,id:number,correctAns:number) => {
    dispatch(setTemporarySelect(ans))
    dispatch(setSelectedIndex(id));
    dispatch(setCurrentCorrectAnsIndex(correctAns));
  }

  const handleReset = ( ) =>{
    dispatch(setQuizIndex(0))
    dispatch(setScore(0))
    dispatch(setCurrentCorrectAnsIndex(55))
    dispatch(setSelectedIndex(55));
    dispatch(setSelectedAnsList([]));
    dispatch(setSelectedAnsList({type:'remove',payload:[]}))
  }   


  const handleNext = ( ) =>{
     if(selectedIndex===currentCorrectAnsIndex) {
      dispatch(setScore(score +=1))
    }

    dispatch(setQuizIndex(quizIndex + 1))
    dispatch(setSelectedIndex(55))
    dispatch(setSelectedAnsList({type:'add',payload:temporarySelect}));
  }

  return <div className=" h-full">
     <div className="h-[35rem] border absolute top-2/4  left-2/4 w-3/12 -translate-y-2/4 -translate-x-2/4 bg-slate-700 text-slate-300 p-10 font-sans">
        
         {
          quizIndex < data?.length ?  <div className="mt-15">
             <p className="font-bold text-2xl">{data[0]?.question}</p>
          <p className="font-bold mt-5">Question No: {quizIndex+1}</p>
          {data[quizIndex]?.answers?.map((item:any,index:number)=><h1 key={index} onClick={()=>handleClick(item,index,data[quizIndex].correctIndex)} className={selectedIndex===index? "border rounded my-5 p-3 text-lg font-semibold bg-blue-700":`border rounded my-5 p-3 text-lg font-semibold `}>{item}</h1>)}
          <div className="text-center">
             <button 
             onClick={handleNext} 
             className="mx-auto px-10 font-bold bg-blue-500 outline-none border-0 py-2 rounded-full">Next</button>
          </div>
        </div>:
        <div className="text-center mt-10">
         <p className="text-4xl font-bold text-yellow-400 drop-shadow-md">Wow ! you finished the game</p>
         <p className="text-2xl font-bold text-lime-500 drop-shadow-md mt-5">Your score is <span className="text-white">{score}</span> out out of <span className="text-white">{data.length}</span></p>
        
         <img className="w-full" src="https://i.ibb.co/w7wY5bL/congratulations-300x145-removebg-preview.png" alt="congratulations-300x145-removebg-preview"/>
         <button onClick={handleReset} type="button" className="bg-gradient-to-r shadow-lg duration-700 px-5 p-2 font-bold text-white rounded from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...">
          Play Again
        </button>
        </div>

         }
     </div>
  </div>;
};

export default Quiz;
