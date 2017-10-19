          function call() {
  $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(json) {
    $(".quoteTxt").html(json[0].content);
    $(".quoteFooter").html(json[0].title);
    $(".quoteTxt").css('opacity', '1');
    $("#tweet").attr("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent(json[0].content.replace('<p>','').replace('</p>','') + " - " + json[0].title));
    var newColor = "rgb(" + parseInt(Math.random()*150) + ', ' + parseInt(Math.random()*150) + ', ' + parseInt(Math.random()*150) + ')';
    $("body").css("background-color", newColor );
    $(".quoteTxt").css("color", newColor )
  });
}
$(document).ready(function() {
  $.ajaxSetup({ cache: false });
  $("#next").click(function(){
    $(".quoteTxt").css('opacity', '0');
    call();
  });
});
