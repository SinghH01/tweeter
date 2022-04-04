// Append the tweets after the webpage is loaded
$(document).ready(function() {

  //Prevent default behaviour of Form submit button and sent post request using ajax
  $("#submit-tweet").submit(function(event) {
    event.preventDefault();
    // If user did not enter anything in textarea
    if (!$("#tweet-text").val().trim()) {

      $(".error-msg").text("Error: Input cannot be empty. Please Enter something!");
      $("#error").slideDown("slow");

    } else if ($("#tweet-text").val().length > 140) { // Error If length is more than 140 character
      
      $(".error-msg").text("Error: Tweet cannot be more than 140 characters!");
      $("#error").slideDown("slow");

    } else {

      $("#error").slideUp("slow");

      $.ajax({
        url: '/tweets',
        dataType: 'text',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: $(this).serialize()
      });
      //Set textarea value to empty
      $("#tweet-text").val("");
      $(".tweet").empty();
      //Refresh the tweets section with new tweet included
      loadTweets();
    }
  });

  // Function to load tweets using get request
  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
    }).then(function(data) {
      renderTweets(data);
    });
  }
  loadTweets();
});

// Function to prevent Cross-Site Scripting
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// append individual tweets to the html page
const renderTweets = function(tweets) {
  //console.log(tweets.length);
// loops through tweets
  for (let i = tweets.length - 1; i >= 0; i--) {
  // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweets[i]);
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
  <p>${escape(data.content.text)}</p>
  <footer>
    <p>${timeago.format(data.created_at)}</p>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`;

  return markup;
};


