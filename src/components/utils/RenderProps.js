import React from 'react';
//RENDER PROPS OF A OBJECT

const RenderProps = ({object}) => {
  const keys = Object.keys(object);
  const allProps = keys.map(key => {
    return  <div>{key} : {object[key]}</div> 
  })
  return (
    <div>
      {allProps}
    </div>
  ) 
}

export default RenderProps