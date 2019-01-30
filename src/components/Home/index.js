import React from 'react';
import SearchData from '../SearchData';
import styles from './styles.scss';
import data from '../../config/mock_data';
import remove from '../utils/remove';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      since: '',
      until: '',
      renderSearch: false,
      selected: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }

  handleChange(event){
    const { value, name } = event.target;
    console.log(event.type)
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event){
    this.setState({
      renderSearch: true,
    })
    event.preventDefault()
  }

  handleSelected(event){
    const { value, name, checked } = event.target;
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
          <form className={styles.form} onSubmit={this.handleSubmit} method="POST">
            <SearchData since={this.state.since} until={this.state.until} handleChange={this.handleSelected}/>
          </form>
        }
        {
          this.state.selected &&
            this.state.selected.map((obj) => {
              return <div>{obj.name} : {obj.value} </div>
            })
        }
      </div>
    </div>
    )
  }
}

export default Home;
