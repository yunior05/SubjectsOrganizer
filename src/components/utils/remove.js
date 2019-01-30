import { type } from "os";

//REMOVE A ELEMENT FROM A LIST OF ARRAYS

const remove = (value, list) => {
  let result = []
  list.map((obj, i) => {
    console.log(i)
    if(obj.value === value){console.log("TRUE"); result = list.splice(i, 1) }
  })
  if(result == []) {
    console.log("RETURN SAME LIST")
    return list
  }
  else {
    console.log("RETURN RESULT LIST")
    return result
  }
}

export default remove