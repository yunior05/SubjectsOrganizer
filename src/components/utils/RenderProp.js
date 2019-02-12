import React from 'react';
//RENDER PROPS OF A OBJECT

const RenderProp = ({object}) => (
  <div>
    {Object.keys(object).map(key => (
    <div key={object[key]}>
      {key}:{object[key]}
    </div>
    ))}
  </div>);

export default RenderProp