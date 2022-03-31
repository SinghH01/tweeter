$(document).ready(function() {
  $("#tweet-text").on("input", counter);
});


function counter() {
  console.log($(this).val().length);
  let  countNumberEl = $($(this).parent().children()[1]).children()[1];

  let count = 140;
  count = 140 - $(this).val().length;

  if (count >= 0) {
    $(countNumberEl).removeClass("red-counter");
    $(countNumberEl).text(count);
  } else {
    $(countNumberEl).addClass("red-counter");
    $(countNumberEl).text(count);
  }  
}