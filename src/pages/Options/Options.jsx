import React from 'react';
import axios from 'axios';
const queryString = require("query-string");
const parsed = queryString.parse(location.search);

export default class Card extends React.Component {
  constructor() {
    super();
    this.urlString = decodeURIComponent(parsed.url ? parsed.url : "");
    this.state = {
      imageUrl: this.urlString,
      title: '',
      description: '',
      favorite: '',
      collection: 'Sketch',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getUserCookie = () => {
    return new Promise((resolve, reject) => {
      const cookieDetails = {
        url: 'https://angora.techpacker.io',
        name: 'user',
      };
      chrome.cookies.get(cookieDetails, (cookie) => {
        // chrome.cookies.get takes callback as 2nd parameter
        // when callback returns we resolve
        resolve(cookie);
      });
    });
  };

  getUserInfo = async () => {
    let userInfo;
    // getUserCookie returns a Promise
    // so using await to wait for it to return
    const userCookie = await this.getUserCookie();
    if (userCookie) {
      // decode cookie value using decodeURIComponent
      userInfo = decodeURIComponent(userCookie.value);
      // user info returns string, need to parse into json
      userInfo = JSON.parse(userInfo);
    } else {
      console.log('Check if you are logged in');
    }
    return userInfo;
  };
  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  async handleSubmit(evt) {
    evt.preventDefault();
    console.log('this.state', this.state);
    // getUserInfo().then((userInfo) => {
    //   let userId = userInfo.id;
    //
    //   let fullName = userInfo.fullName;
    //
    //   window.localStorage.setItem('userId', userId);
    //
    //   window.localStorage.setItem('fullName', fullName);
    // });
    const userInfo = await this.getUserInfo();
    let payload = {
      pack: { ...this.state, favorite: `${userInfo.id}` },
      timeStamp: Date.now(),
    };

    console.log(payload);
    //need to make request for image to imageMagic for processing
    //save the big file and optimize file
    //process image in s3
    //
    try {
      let data = await axios.post(
        'https://angora.techpacker.io/api/favorite/createCard ',
        payload
      );
      alert("uploaded");
      console.log(data);
    } catch (error) {
      console.log({error});
      alert("error");
    }
  }

  componentDidMount() {
    //listen for messages from content - image url
    //this.setState({imageUrl})
    console.log('mounted');
    console.log(this.state);

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.message === 'hi') sendResponse({ message: 'hi to you' });
    });
  }

  render() {
    return (
      <form
        onSubmit={(evt) => {
          this.handleSubmit(evt);
        }}
      >
        <img src={this.urlString} style={{width: '300px', height: '300px'}}/>
        <br/>
        <input
          name="imageUrl"
          type="hidden"
          placeholder="Image Url"
          value={this.urlString}
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
