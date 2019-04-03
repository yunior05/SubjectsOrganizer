import data from '../../config/mock_data';

const toInt = (string) => {return parseInt(string.substr(-3))}

export const SearchData = (since, until) => { //since = ESP301001 until = ESP301005
  const dataFilter = [];
  const sinceNumber = toInt(since)
  const untilNumber = toInt(until) 
   data.Groups.map((group) => {
    if(group.id.substr(-3) >= sinceNumber && group.id.substr(-3) <= untilNumber) {
      dataFilter.push({ id: group.id, classroom: group.classroom, virtual: group.virtual });
    }
  })
  return dataFilter
}
