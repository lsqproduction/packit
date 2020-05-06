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
      description: this.urlString,
      favorite: '',
      type: 'sketch',
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
      [evt.target.name]: evt.target.value.toString().toLowerCase(),
    });
  };
  async getImageAsBlob(imgUrl) {
    let response = await fetch(imgUrl);
    let blob = await response.blob(); // download as Blob object
    console.log(blob);
    return blob;
  }
  uploadImageViaUrlToCard = async (imgUrl, cardData) => {
    const blob = await this.getImageAsBlob(imgUrl);
    const saveCardUrl = 'https://angora.techpacker.io/api/favorite/save/card';
    // create formdata as favorite/save/card need form data
    // we generally use form data when image upload is involved
    let fd = new FormData();
    fd.append('card', JSON.stringify(cardData));
    fd.append('timestamp', JSON.stringify(Date.now()));
    fd.append('upload', blob);
    const response = await fetch(saveCardUrl, {
      method: 'POST',
      body: fd,
    });
    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      alert('Yay! card saved! image uploaded!');
    } else {
      alert('Nay! card saved failed!');
    }
  }
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
      // now save with image url
      // check if user provide image url
      // and that previous request to create was successful
      if (this.state.imageUrl && data.data) {
        console.log('this.state.imageUrl:', this.state.imageUrl);
        // data.data is creaded card data returned from server
        this.uploadImageViaUrlToCard(this.state.imageUrl, data.data);
      }
    } catch (error) {
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
          id="type"
          name="type"
          value={this.state.type}
          onChange={this.handleChange}
        >
          <option value="sketch">Sketch </option>
          <option value="size">Size</option>
          <option value="material">Material</option>
          <option value="table">table</option>
        </select>

        <button className="button" type="submit">
          Save
        </button>
      </form>
    );
  }
}
