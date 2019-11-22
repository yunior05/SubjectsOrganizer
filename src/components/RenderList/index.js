import React from 'react';

import styles from './styles.scss';

const DAYS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

const RenderList = ({ elements , id='',  handleChange , selected=false, printMode=false} ) => {
  const items = elements.map((item, i) => {
    const { virtual, date, classroom, id} = item;

    return (
      <div key={`${i}_${item.id}`}>
        { selected && <li><div className={styles.headerName}>{item.name}</div></li> }
        <li className={styles.element} >
          <div className={styles.item} >{id}</div> 
          <div className={styles.item} >{classroom}</div> 
          <div className={styles.item} >{virtual ? "SI" : "NO"}</div>
          <div className={styles.item} >{date.map((days, i) => {
                  return (
                    <div key={`${i}_${days.day}`} style={{  margin: 5}}>{DAYS[days.day-1]}: {days.start} a {days.finish}</div>
                  )
                })}
          </div>
        {!printMode && <button type="button" name={`Subject${i}`} value={item.id} onClick={handleChange} > {selected ? '-' : '+'} </button>}
    </li>
      </div>
    )
  });

  return (
    <ul  className={printMode ? styles.listPrint : styles.list} id={id ? id: undefined} >
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