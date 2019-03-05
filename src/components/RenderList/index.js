import React from 'react';
// import RenderProp from '../utils/RenderProp';

import styles from './styles.scss';

const RenderList = ({ elements , style='',  handleChange , withInputs=true } ) => {
  const items = elements.map((item, i) => (
    <li className={styles.element} key={item.id}>
      {/* {item.id} | {item.classroom} | Es virtual: {item.virtual ? "SI" : "NO"}  */}
      {Object.keys(item).map(key => 
        <div className={styles.item} key={item[key]}>
          {key == 'virtual' ? (  
            item[key] === " True" ? "SI" : "NO"
          ):(
            item[key]
          )}
        </div> 
      )}
      {withInputs && <button type="button" name={`Subject${i}`} value={item.id} onClick={handleChange} >+</button>}
    </li>
    ))
  return (
    <ul className={styles.list}>
      <li className={styles.element}>
        <div className={styles.header}>Clave</div>
        <div className={styles.header}>Curso</div>
        <div className={styles.header}>Virtual</div>
      </li>
      {items}
    </ul>
  )
}

export default RenderList