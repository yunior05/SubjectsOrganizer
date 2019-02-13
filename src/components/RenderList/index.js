import React from 'react';
import RenderProp from '../utils/RenderProp';

import styles from './styles.scss';

const RenderList = ({ elements , style='',  handleChange , withInputs=true } ) => {
  const items = elements.map((item, i) => (
    <li className={styles.element} key={item.id}>
      {/* {item.id} | {item.classroom} | Es virtual: {item.virtual ? "SI" : "NO"}  */}
      <RenderProp style={styles.element} object={item}/>
      {withInputs && <input type="checkbox" name={`Subject${i}`} value={item.id} onChange={(event) => {console.log("clicked"); handleChange(event)}} />}
    </li>
    ))
  return (
    <ul className={styles.list}>
      {items}
    </ul>
  )
}

export default RenderList