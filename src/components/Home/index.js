import React from 'react';
import SearchData from '../SearchData';
import styles from './styles.scss';
import data from '../../config/mock_data';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      since: '',
      until: '',
      renderSearch: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const {value, name} = event.target;
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

  render(){
    return(
    <div className={styles.container}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input placeholder="Desde" value={this.state.since} onChange={this.handleChange} name="since" />
          <input placeholder="Hasta" value={this.state.until} onChange={this.handleChange} name="until" />
          <input type="submit" value="Buscar" />
        </form>
      </div>
      <div>
        {
          this.state.renderSearch &&
          <SearchData since={this.state.since} until={this.state.until} />
        }
      </div>
    </div>
    )
  }
}

export default Home;
