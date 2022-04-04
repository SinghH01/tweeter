// Append the tweets after the webpage is loaded
$(document).ready(function() {

  //Prevent default behaviour of Form submit button and sent post request using ajax
  $( "#submit-tweet" ).submit(function( event ) {  
    event.preventDefault();    
    // If user did not enter wnything in textarea
    if (!$("#tweet-text").val().trim()) {
      alert("Please Enter something");     
    } else if($("#tweet-text").val().length > 140 ) { // If length is more than 140 character 

      alert("Tweet cannot be more than 140 characters");

    } else {
      $.ajax({
        url: '/tweets',
        dataType: 'text',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: $(this).serialize()
      }); 
    }              
  });

  // Function to load tweets using get request
  function loadTweets () {
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "json",
  }).then(function (data) {
    renderTweets(data);
  });
}

  loadTweets();    
});



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


