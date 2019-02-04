import { type } from "os";

//REMOVE A ELEMENT FROM A LIST OF ARRAYS

const remove = (value, list) => {
  return list.filter(element => {
    console.log("ID => ", element, " value =>", value)
    return element.value !== value;
  })
}

export default remove