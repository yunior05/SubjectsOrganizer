const toInt = (string) => {return parseInt(string.substr(-3))}

export const SearchData = (since, until) => { //since = ESP301001 until = ESP301005
  const id = since.slice(0, 6);
  return fetch(`http://127.0.0.1:5000/?id=${id}`)
    .then(res => res.json())
    .then(data => {
      const sinceNumber = toInt(since)
      const untilNumber = toInt(until) 
      return data.groups.reduce((dataFilter, group) => {
        if(group.id.substr(-3) >= sinceNumber && group.id.substr(-3) <= untilNumber) {
          group.name = data.name;
          dataFilter.push(group);
        }
        return dataFilter;
      }, [])
    })
}
