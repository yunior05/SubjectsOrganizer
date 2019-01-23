import data from '../../config/mock_data';
import React from 'react';

const toInt = (string) => {return parseInt(string.substr(-3))}

const SearchData = ({ since, until }) => { //since = ESP301001 until = ESP301005
  const dataFilter = [];
  const sinceNumber = toInt(since)
  const untilNumber = toInt(until) 
  data.Groups.map((group) => {
    if(group.id.substr(-3) >= sinceNumber && group.id.substr(-3) <= untilNumber) {
      dataFilter.push({ id: group.id, classroom: group.classroom, virtual: group.virtual})
    }
  })
  const subjects = dataFilter == [] ? (
    () => {return <div>Error, no se han encontrado asignaturas en el rango indicado.</div>}
  ) : (
    dataFilter.map((subject) => {
      return <div id={subject.id}>{subject.id} | {subject.classroom} | Es virtual: {subject.virtual}</div>
    })
  )
  return(
    <div>
      {subjects}
    </div>
  )
}

export default SearchData