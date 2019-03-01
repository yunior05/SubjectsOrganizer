import { type } from "os";

//REMOVE A ELEMENT FROM A LIST OF ARRAYS

const remove = (value, list) => {
  return list.filter(element => {
    return element.id !== value;
  })
}

export default remove