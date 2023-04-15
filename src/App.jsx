import React, { useReducer } from 'react'
import './assets/app.css'
import Button from './Button'
import OperationButton from './OperationButton'

export const ACTIONS={
  ADD_DIGITS:'add digit',
  CLEAR:'clear output',
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE:'evaluate',
  DELETE_DIGIT:'delete digit'
}


function reducer(state,{type,payload}){
  
  switch(type){
    case ACTIONS.ADD_DIGITS:
      if (payload.digit === "0" && state.current === "0") {
        return state
      }
      if (payload.digit === "." && state.current.includes('.')) {
        return state
      }

      return{
        ...state,
        current:`${state.current || ""}${payload.digit}`
      }
    case ACTIONS.CLEAR:
      return{}
    case ACTIONS.CHOOSE_OPERATION:
      console.log('abc')
      if (state.current == null && state.previous== null) {
        return state
      }
      if (state.current == null){
        console.log('xyz')
        return{
          ...state,
          operation: payload.operation,
        }
      }
      
      if(state.previous==null){
        console.log('pqr')
      
        return{
          ...state,
        current:null,
        operation: payload.operation,
        previous:state.current
        }

      }
      return{
        ...state,
        previous:evaluate(state),
        operation:payload.operation,
        current:null
      }
      
    case ACTIONS.EVALUATE:
      
      if (
        state.operation == null ||
        state.current == null ||
        state.previous == null
      ) {
        return state
      }
      console.log('hello')
      return{
        ...state,
        current:evaluate(state),
        previous:null,
        operation:null,
        
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.current == null) return state
      if (state.current.length === 1) {
        return { ...state, current: null }
      }
      return {
        ...state,
        current: state.current.slice(0, -1),
      }
      

  }

}


function evaluate(state){
  
  const prev=parseFloat(state.previous)
  const current=parseFloat(state.current)
  
  if (isNaN(prev) || isNaN(current)) return ""
  
  let result=''
  switch(state.operation){
    case '+':
      result=prev+current
      break;
    case '-':
      result=prev-current
      break;
    case '*':
      result=prev*current
      break;
    case '÷':
      result=prev/current
      break;
    


  }
  
  return result.toString()

}
export default function App() {
  
  const [{previous,current,operation},dispatch]=useReducer(reducer,{})
  
  return (
    <div className='container'>
      <div className="input">
        <div className="previous-input">{previous}{operation}</div>
        <div className="current-input">{current}</div>
      </div>
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button  onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation='÷' dispatch={dispatch}/>
     
      <Button digit='1' dispatch={dispatch}></Button>
      
      <Button digit='2' dispatch={dispatch}></Button>
      <Button digit='3' dispatch={dispatch}></Button>
      <OperationButton operation='*' dispatch={dispatch}/>
      <Button digit='4' dispatch={dispatch}></Button>
      <Button digit='5' dispatch={dispatch}></Button>
      <Button digit='6' dispatch={dispatch}></Button>
      <OperationButton operation='+' dispatch={dispatch}/>
      <Button digit='7' dispatch={dispatch}></Button>
      <Button digit='8' dispatch={dispatch}></Button>
      <Button digit='9' dispatch={dispatch}></Button>
      <OperationButton operation='-' dispatch={dispatch}/>
      <Button digit='.' dispatch={dispatch}></Button>
      <Button digit='0' dispatch={dispatch}></Button>
      <button className='span-two'onClick={()=>{dispatch({type:ACTIONS.EVALUATE})}}>=</button>
      

      
    </div>
  )
}
