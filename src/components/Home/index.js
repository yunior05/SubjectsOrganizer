import React from 'react';
import { SearchData } from '../SearchData';
import styles from './styles.scss';
import data from '../../config/mock_data';
import RenderList from '../RenderList';
import remove from '../utils/remove';
import getData from '../utils/getData'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      since: '',
      until: '',
      renderSearch: false,
      selected: [],
      result: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd= this.handleAdd.bind(this);
    this.handleRemove= this.handleRemove.bind(this);

  }

  handleChange(event){
    const { value, name } = event.target;
    name === 'since' ? (
      this.setState({
        [name]: value,
        until: `${value.slice(0, 6)}999`
      })
    ): (
      this.setState({
        [name]: value
      })
    )

  }

  handleSubmit(event){
    this.setState({
      renderSearch: true,
      result: SearchData(this.state.since, this.state.until)
    })
    event.preventDefault();
    event.stopPropagation();
  }

  handleAdd(event){
    let { value } = event.target;
    const {selected, result: subjectsList} = this.state;
    const subject = subjectsList.filter(subject => subject.id === value)[0] //Search Subject to extract their data
    const sameGroup = selected.find(e => e.id.slice(0, 6) === subject.id.slice(0, 6)) //Verify if the subject exist in the list of selected
    if(sameGroup != undefined) return alert("Ya existe un grupo de esta materia seleccionado");
  

    const sameDate = () => {
      const subjectDateList = subject.date.map((dateTime) => (createDate(dateTime)));

      selected.forEach((e) => {
        e.date.map(function(dateTime){
          startDate = createDate(dateTime.startDate);
          endDate = createDate(dateTime.endDate);
          subjectDateList.forEach((subjectDate) => {
            subStartDate = createDate(subjectDate.startDate);
            subEndDate = createDate(subjectDate.endDate);

            if(subStartDate < endDate && subStartDate > startDate) return true
            if(subEndDate < endDate && subEndDate > startDate) return true
          })
        })
      })

      return false;
    }

    const createDate = (time) => {
      const BASEDATE = "2000/01/01 ";
      return new Date(Date.parse(BASEDATE + time))
    }
  

    if(sameDate()) return alert("Existe una materia en conflicto con las horas");

    this.setState({
      selected: this.state.selected.concat(subject)
    })
  }

  handleRemove(event){
    let { value } = event.target;
    if(confirm("Desea eliminar esta materia?")) {
      this.setState({
        selected: remove(value, this.state.selected)
      })
    }
  }



  render(){
    
    return(
    <div className={styles.container}>
      <div className={styles.container__form}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input className={styles.form__input} placeholder="Desde" value={this.state.since} onChange={this.handleChange} name="since" />
          <input className={styles.form__input} placeholder="Hasta" value={this.state.until} onChange={this.handleChange} name="until" />
          <input className={styles.form__button} type="submit" value="Buscar" />
        </form>
      </div>
      <div className={styles.container__lists}>
        { 
          this.state.renderSearch &&
            (this.state.result.length ? <RenderList elements={this.state.result} handleChange={this.handleAdd}/> : <div>Error, rango especificado no encontrado.</div>)
        }
        <hr/>
        {
          this.state.selected.length > 0 &&
            <RenderList elements={this.state.selected} handleChange={this.handleRemove} withInputs={false} />
        }
      </div>
    </div>
    )
  }
}

export default Home;
