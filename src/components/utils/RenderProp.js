import React from 'react';
//RENDER PROPS OF A OBJECT

const RenderProp = ({object, style}) => {
  return(
    <React.Fragment>
      {Object.keys(object).map(key => 
          <div className={style} key={object[key]}>
            {key}:{object[key]}
          </div> 
      )}
  </React.Fragment>
  )
};

export default RenderProp