import React from 'react';
import styles from './styles.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      since: '',
      until: '',
      renderSearch: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const {value, name} = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event){
    if(this.state.since && this.state.until){
      this.setState({
        renderSearch: true,
      })
    }
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
        {this.state.renderSearch && <div> REnder!</div>}
      </div>
    </div>
    )
  }
}

export default Home;
