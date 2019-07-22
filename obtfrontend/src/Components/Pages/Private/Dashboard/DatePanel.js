import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default ({currentDate, dateBeforeHandler, dateAfterHandler })=>{
  if(!currentDate){currentDate = new Date()}
  if(!dateBeforeHandler) {dateBeforeHandler = ()=>{}}
  if (!dateAfterHandler) { dateAfterHandler = ()=> {} }
  return(
    <div className="datePanel">
      <span onClick={dateBeforeHandler}><IoIosArrowBack/></span>
      <span>{currentDate.getFullYear()}-{currentDate.getMonth() + 1}-{currentDate.getDate()}</span>
      <span onClick={dateAfterHandler}><IoIosArrowForward/></span>
    </div>
  )
}
