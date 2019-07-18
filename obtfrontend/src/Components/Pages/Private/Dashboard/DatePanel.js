import React from 'react';

export default ({currentDate, dateBeforeHandler, dateAfterHandler })=>{
  if(!currentDate){currentDate = new Date()}
  if(!dateBeforeHandler) {dateBeforeHandler = ()=>{}}
  if (!dateAfterHandler) { dateAfterHandler = ()=> {} }
  return(
    <div className="datePanel">
      <span onClick={dateBeforeHandler}>&lt;--</span>
      <span>{currentDate.getFullYear()}-{currentDate.getMonth() + 1}-{currentDate.getDate()}</span>
      <span onClick={dateAfterHandler}>--&gt;</span>
    </div>
  )
}
