import React from 'react';
// import RenderProp from '../utils/RenderProp';

import styles from './styles.scss';
import { deflateSync } from 'zlib';

const DAYS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

const RenderList = ({ elements , style='',  handleChange , withInputs=true } ) => {
  const items = elements.map((item, i) => (
    <li className={styles.element} key={item.id}>
      {Object.keys(item).map(key => 
        <div className={styles.item} key={item[key]}>
          {key == 'virtual' ? (  
            item[key] === " True" ? "SI" : "NO"
          ):(
            key === 'date' ? item[key].map(days => {
              return (
                <div style={{  margin: 5}}>{DAYS[days.day-1]}: {days.start} a {days.finish}</div>
              )
            }) : item[key]
          )}
        </div> 
      )}
      {<button type="button" name={`Subject${i}`} value={item.id} onClick={handleChange} > {withInputs ? '+' : '-'} </button>}
    </li>
    ))
  return (
    <ul className={styles.list}>
      <li className={styles.element}>
        <div className={styles.header}>Clave</div>
        <div className={styles.header}>Curso</div>
        <div className={styles.header}>Virtual</div>
        <div className={styles.header}>Horario</div>
      </li>
      {items}
    </ul>
  )
}

export default RenderList