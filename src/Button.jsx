import React from 'react'
import { ACTIONS } from './App'

export default function Button({digit,dispatch}) {
  return (
    <button onClick={()=>{
        dispatch({type:ACTIONS.ADD_DIGITS,payload:{digit}})
    }}>{digit}</button>
  )
}
