// Append the tweets after the webpage is loaded
$(document).ready(function() {
  renderTweets(data);
});

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


// append individual tweets to the html page
const renderTweets = function(tweets) {
// loops through tweets
  for (const item of tweets) {
  // calls createTweetElement for each tweet
    const $tweet = createTweetElement(item);
    // takes return value and appends it to the tweets container
    $('.tweet').append($tweet);
  }
};

// returns a markup string to append in html page
const createTweetElement = function(data) {
  let markup = `<article>
  <header>
    <div>
      <img src=${data.user.avatars} alt="profile picture">
      <p>${data.user.name}</p>
    </div>
    <p>${data.user.handle}</p>
  </header>
  <p>${data.content.text}</p>
  <footer>
    <p>${data.created_at}</p>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;

  return markup;
};


