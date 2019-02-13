import React from 'react';
//RENDER PROPS OF A OBJECT

const RenderProp = ({object, style}) => (
  <div>
    {Object.keys(object).map(key => (
    <div className={style} key={object[key]}>
      {key}:{object[key]}
    </div>
    ))}
  </div>);

export default RenderProp