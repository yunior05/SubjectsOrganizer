import React from 'react';
import RenderProp from '../utils/RenderProps';

const RenderList = ({ elements , style='',  handleChange , withInputs=true } ) => {
  const items = elements.map((item, i) => {
    return (
    <div key={item.id}>
      {/* {item.id} | {item.classroom} | Es virtual: {item.virtual ? "SI" : "NO"}  */}
      <RenderProp object={item}/>
      {withInputs && <input type="checkbox" name={`Subject${i}`} value={item.id} onChange={(event) => {console.log("clicked"); handleChange(event)}} />}
    </div>)
  })
  return (
    <div className={style}>
      {items}
    </div>
  )
}

export default RenderList