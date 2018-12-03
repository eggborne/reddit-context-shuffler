import style from '../css/styles.css';
import React from 'react';
import Header from './Header';
import Gallery from './Gallery';
import Footer from './Footer';
import init from '../scripts/init';
import axios from 'axios';
import { EventEmitter } from 'events';
let Util = require('../scripts/util.js');

const imageArray = [];
const captionArray = [];

const collapsedMenuHeight = '3.5rem';
const menuHeight = '19.5rem';

const randomImageSources = [
  'hmmm',
  'catsstandingup',
  'aww',
  'sneks',
  'wtf',
  'discgolf',
  'mildlyinteresting',
  'trees',
  'trashy',
  'cosplay',
  'retrogaming'
];
const randomCommentSources = [
  'gonewild',
  'gonewildplus',
  'hotasianmilfs',
  'chocolatemilf',
  'sockgirls',
  'pantyhose',
  'cameltoe',
  'hungrybutts',
  'celebcumsluts',
  'boltedondicks',
  'ass',
  'assholesbehindthongs',

];

let previousScrollY;
// window.onscroll = function () {
//   let currentScrollY = window.pageYOffset;
//   if (currentScrollY < previousScrollY) {
//     // swiping down
//     if (currentScrollY < window.innerWidth * 0.2) {
//       if (document.getElementById('up-button').classList.contains('on-screen')) {
//         document.getElementById('up-button').classList.remove('on-screen');
//         if (document.getElementById('header').style.height === menuHeight) {
//           this.handleHamburgerClick();
//         }
//       }
//     }
//   } else {
//     // swiping up
//     if (currentScrollY > window.innerWidth * 0.2) {
//       if (!document.getElementById('up-button').classList.contains('on-screen')) {
//         document.getElementById('up-button').classList.add('on-screen');
//       }
//     }
//   }
//   previousScrollY = currentScrollY;
// }

let shorterDimension;
window.innerWidth < window.innerHeight
  ? shorterDimension = window.innerWidth
  : shorterDimension = window.innerHeight;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: {
        images: randomImageSources[Util.randomInt(0, randomImageSources.length-1)],
        comments: randomCommentSources[Util.randomInt(0, randomCommentSources.length-1)]
      },
      imageArray: [],
      captionArray: []
    };

    this.getImages = this.getImages.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this);
    this.handleReloadClick = this.handleReloadClick.bind(this);
    this.handleClickRandomImageSource = this.handleClickRandomImageSource.bind(this);
    this.handleClickRandomCommentSource = this.handleClickRandomCommentSource.bind(this);
    this.handleTopButtonClick = this.handleTopButtonClick.bind(this);
  }
  componentDidMount() {
    console.log('App mounted');
    window.onscroll = this.handleScroll;
    this.getImages(this, this.state.sources.images);
    this.getCaptions(this, this.state.sources.comments);
  }

  getImages(self, subreddit, replace) {
    axios({
      method: 'get',
      url: `https://www.reddit.com/r/${subreddit}/hot/.json`

    }).then(function (response) {
      let shuffledArray = Util.shuffleArray(Array.from(response.data.data.children));
      shuffledArray.map((post) => {
        let ext = post.data.url.substring(post.data.url.length - 3, post.data.url.length);
        if (ext === 'jpg' || ext === 'png' || ext === 'peg' || ext === 'gif' || ext === 'mp4') {
          if (replace) {
            imageArray.unshift(post.data.url);
          } else {
            imageArray.push(post.data.url);
          }
        } else {
          // console.log(`rejecting for last three char ${ext} -- ${post.data.url}`);
        }
      });
      self.setState({
        imageArray: imageArray
      });
      console.warn('IMAGEARRAY LENGTH', self.state.imageArray.length)
    });
  }
  getCaptions(self, subreddit, replace) {
    axios({
      method: 'get',
      url: `https://www.reddit.com/r/${subreddit}/comments/.json`

    }).then(function (response) {
      let shuffledArray = Util.shuffleArray(Array.from(response.data.data.children));
      shuffledArray.map((post) => {
        if (post.data.body.length < 120) {
          if (replace) {
            captionArray.unshift(post.data.body);
          } else {
            captionArray.push(post.data.body);
          }
        } else {
          // captionArray.push(`TOO LONG AT ${post.data.body.length}: ${post.data.body}`);
        }
      });
      self.setState({
        captionArray: captionArray
      });
      console.warn('CAPTIONARRAY LENGTH', self.state.captionArray.length)

    });
  }

  handleScroll() {
    let downLimit = window.innerWidth * 0.2
    let upLimit = window.innerWidth * 0.2
    let menuOpen = document.getElementById('header').style.height === menuHeight;
    if (menuOpen) {
      upLimit *= 3.5; 
      downLimit *= 3.5; 
    }
    let currentScrollY = window.pageYOffset;
    if (currentScrollY < previousScrollY) {
      // swiping down
      if (currentScrollY <= downLimit) {
        if (document.getElementById('up-button').classList.contains('on-screen')) {
          document.getElementById('up-button').classList.remove('on-screen');  
        }
      }
    } else {
      // swiping up
      if (currentScrollY > upLimit) {
        if (!document.getElementById('up-button').classList.contains('on-screen')) {
          document.getElementById('up-button').classList.add('on-screen');
        }
      }
    }
    previousScrollY = currentScrollY;
  }
  
  handleHamburgerClick(event) {
    if (event) {
      event.preventDefault();
    }
    if (document.getElementById('header').style.height !== menuHeight) {
      document.getElementById('header').style.height = menuHeight;
      document.getElementById('hamburger').style.transform = 'rotate(-90deg)';
      document.getElementById('hamburger-bar-1').style.transform = 'rotate(40deg) scaleX(0.8) translateX(0.9rem)';
      document.getElementById('hamburger-bar-3').style.transform = 'rotate(-40deg) scaleX(0.8) translateX(0.9rem)';
    } else {
      document.getElementById('header').style.height = collapsedMenuHeight;
      document.getElementById('hamburger').style.transform = 'none';
      document.getElementById('hamburger-bar-1').style.transform = 'none';
      document.getElementById('hamburger-bar-3').style.transform = 'none';
    
    }
  }

  handleReloadClick(event) {
    event.preventDefault();
    let source = Array.from(document.getElementsByName('reddit-source'));
    let newSources = {
      images: source[0].value,
      comments: source[1].value
    };
    this.setState({
      sources: newSources
    });
    this.getImages(this, source[0].value, true);
    this.getCaptions(this, source[1].value, true);

  }

  handleClickRandomImageSource() {
    event.preventDefault();
    let source = Array.from(document.getElementsByName('reddit-source'));
    let newValue = randomImageSources[Util.randomInt(0, randomImageSources.length - 1)];
    source[0].value = newValue;
  }

  handleClickRandomCommentSource() {
    event.preventDefault();
    let source = Array.from(document.getElementsByName('reddit-source'));
    let newValue = randomCommentSources[Util.randomInt(0, randomCommentSources.length - 1)];
    source[1].value = newValue;
  }

  handleTopButtonClick() {
    document.getElementById('up-button').classList.remove('on-screen');  
    // expand menu if not already
    if (document.getElementById('header').style.height !== menuHeight) {
      this.handleHamburgerClick();
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  render() {
    return (
      <div id='container'>
        <Header sources={this.state.sources}
          onHamburgerClick={this.handleHamburgerClick}
          onClickReload={this.handleReloadClick}
          onClickRandomImageSource={this.handleClickRandomImageSource}
          onClickRandomCommentSource={this.handleClickRandomCommentSource} />
        <div id='main'>
          <Gallery imageArray={this.state.imageArray}
            captionArray={this.state.captionArray} />
        </div>
        <div id='up-button' onClick={this.handleTopButtonClick}>^</div>
        <Footer />
      </div>
    );
  }
}

export default App;