import React from 'react';
//import fetchAddedCard

export default class Card extends React.Component {
  constructor() {
    super();
    this.state = {
      imageUrl: '',
      title: '',
      description: '',
      collection: 'Sketch',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  async handleSubmit(evt) {
    evt.preventDefault();
    console.log('this.state', this.state);
    try {
      // make axio request with this.state
      //send local state to background
      // this.setState({
      //   imageUrl: '',
      //   title: '',
      //   description: '',
      //   collection: '1',
      // });
    } catch (err) {
      this.setState({
        errorMessage: `There was a problem saving the card: ${err.message} `,
      });
    }
  }

  render() {
    return (
      <form
        onSubmit={(evt) => {
          this.handleSubmit(evt);
        }}
      >
        <input
          name="imageUrl"
          type="text"
          placeholder="Image Url"
          value={this.state.imageUrl}
          onChange={this.handleChange}
        />

        <input
          name="title"
          type="text"
          placeholder="Card Title"
          value={this.state.title}
          onChange={this.handleChange}
        />

        <input
          name="description"
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleChange}
        />

        {/* <input
          name="collection"
          type="text"
          placeholder="Collection"
          value={this.state.collection}
          onChange={this.handleChange}
        /> */}
        <select
          id="collection"
          name="collection"
          value={this.state.collection}
          onChange={this.handleChange}
        >
          <option value="1">Sketch </option>
          <option value="2">Size</option>
          <option value="3">Material</option>
          <option value="3">table</option>
        </select>

        <button className="button" type="submit">
          Save
        </button>
      </form>
    );
  }
}
