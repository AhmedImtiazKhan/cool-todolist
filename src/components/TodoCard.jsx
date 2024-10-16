import React from 'react'

export default function TodoCard(props) {
  const {children,handleDeleteTodos,index} = props
  return (
    <li className='todoItem'>
      {children}
      <div className='actionsContainer'>
        <button>        <i className="fa-regular fa-pen-to-square"></i>
        </button>
       <button onClick={()=>{handleDeleteTodos(index)}}><i className="fa-regular fa-trash"></i></button> 
      </div>
    </li>
  )
}
