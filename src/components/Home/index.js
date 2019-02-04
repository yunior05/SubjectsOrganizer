import React from 'react';
import { SearchData } from '../SearchData';
import styles from './styles.scss';
import data from '../../config/mock_data';
import RenderList from '../RenderList';
import remove from '../utils/remove';

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
    this.handleSelected = this.handleSelected.bind(this);
  }

  handleChange(event){
    const { value, name } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event){
    console.log(SearchData(this.state.since, this.state.until))
    this.setState({
      renderSearch: true,
      result: SearchData(this.state.since, this.state.until)
    })
    event.preventDefault()
  }

  handleSelected(event){
    console.log("SELECTED")
    const { value, name, checked } = event.target;
    console.log(value)
    const list = this.state.selected
    this.setState({
      selected:  checked ? list.concat({name: name, value: value}) : remove(value, list)
    })
  }

  

  render(){
    
    return(
    <div className={styles.container}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit} method="POST">
          <input placeholder="Desde" value={this.state.since} onChange={this.handleChange} name="since" />
          <input placeholder="Hasta" value={this.state.until} onChange={this.handleChange} name="until" />
          <input type="submit" value="Buscar" />
        </form>
      </div>
      <div>
        {
          this.state.renderSearch &&
            <RenderList elements={this.state.result} handleChange={this.handleSelected}/>
          // <form className={styles.form} onSubmit={this.handleSubmit} method="POST">
            
          // </form>
        }
        <hr/>
        {
          this.state.selected &&
            <RenderList elements={this.state.selected} withInputs={false} />
        }
      </div>
    </div>
    )
  }
}

export default Home;
