import React from 'react';

export default ({thingType, children})=>{
  return (
    <div className={["card", thingType].join(" ")}>
      {children}
    </div>
  );
}
