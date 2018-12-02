import style from '../css/styles.css';
import React from 'react';
import Header from './Header';
import Gallery from './Gallery';
import Footer from './Footer';
import init from '../scripts/init';
import axios from 'axios';

const imageArray = [];
const captionArray = [];

let shorterDimension;
window.innerWidth < window.innerHeight
  ? shorterDimension = window.innerWidth
  : shorterDimension = window.innerHeight;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageArray: [],
      captionArray: []
    };

    this.getImages = this.getImages.bind(this);
  }

  componentDidMount() {
    console.log('App mounted');
    init(this);
  }

  getImages(self, subreddit) {
    axios({
      method: 'get',
      url: `https://www.reddit.com/r/${subreddit}/hot/.json`

    }).then(function (response) {
      Array.from(response.data.data.children).map((post) => {
        imageArray.push(post.data.url);
      });
      self.setState({
        imageArray: imageArray
      });
    });
  }

  getCaptions(self, subreddit) {
    axios({
      method: 'get',
      url: `https://www.reddit.com/r/${subreddit}/comments/.json`

    }).then(function (response) {
      Array.from(response.data.data.children).map((post) => {
        if (post.data.body.length < 75) {
          captionArray.push(post.data.body);
        } else {
          captionArray.push(`TOO LONG AT ${post.data.body.length}: ${post.data.body}`);
        }
      });
      self.setState({
        captionArray: captionArray
      });
    });
  }

  render() {
    return (
      <div id='container'>
        <Header />
        <div id='main'>
          <Gallery imageArray={imageArray}
            captionArray={captionArray} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;