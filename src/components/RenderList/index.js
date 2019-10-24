import React from 'react';

import styles from './styles.scss';

const DAYS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

const RenderList = ({ elements , style='',  handleChange , selected=false } ) => {
  const items = elements.map((item, i) => {
    const { virtual, date, classroom, id} = item;

    return (
      <div>
        { selected && <li><div className={styles.headerName}>{item.name}</div></li> }
        <li className={styles.element} key={item.id}>
          <div className={styles.item} key={id}>{id}</div> 
          <div className={styles.item} key={classroom}>{classroom}</div> 
          <div className={styles.item} key={virtual}>{virtual ? "SI" : "NO"}</div>
          <div className={styles.item} key={date[0]}>{date.map(days => {
                  return (
                    <div style={{  margin: 5}}>{DAYS[days.day-1]}: {days.start} a {days.finish}</div>
                  )
                })}
          </div>
        {<button type="button" name={`Subject${i}`} value={item.id} onClick={handleChange} > {selected ? '-' : '+'} </button>}
    </li>
      </div>
    )
  });

  return (
    <ul className={styles.list}>
      <li className={styles.element}>
        <div className={styles.header}>Clave</div>
        <div className={styles.header}>Curso</div>
        <div className={styles.header}>Virtual</div>
        <div className={styles.header}>Horario</div>
      </li>
      { !selected && (<li><div className={styles.headerName}>{elements[0].name}</div></li>) }
      {items}
    </ul>
  )
}

export default RenderList