import React from 'react';
import Db from '../services/dbService'

const db = new Db();
export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardTitle: '',
      cardDescription: '',
      cardType: 'sketch',
    };
  }
  componentDidMount() {
    db.get('data').then(Data => {
      const {data} = Data;
      console.log('componentDidMount', data);
      this.setState({
        cardTitle: data.cardTitle || '',
        cardDescription: data.cardDescription || '',
        cardType: data.cardType || '',
      });
    })
  }
  handleChange = (evt) => {
   const data = this.state;
    this.setState({
      [evt.target.name]: evt.target.value,
    });
    data[evt.target.name] = evt.target.value;
    db.set({data: data});
    console.log("state", data);
  };

  render() {
    return (
      <form>
        <input
          name="cardTitle"
          type="text"
          placeholder="Card Title"
          value={this.state.cardTitle}
          onChange={this.handleChange}
        />
        <input
          name="cardDescription"
          type="text"
          placeholder="Description"
          value={this.state.cardDescription}
          onChange={this.handleChange}
        />
        <select
          id="cardType"
          name="cardType"
          value={this.state.cardType}
          onChange={this.handleChange}
        >
          <option value="sketch">Sketch </option>
          <option value="size">Size</option>
          <option value="material">Material</option>
          <option value="table">table</option>
        </select>
      </form>
    );
  }
}
