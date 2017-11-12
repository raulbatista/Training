var converted = false;
var cel;
var far;

$.ajaxSetup({ cache: false });
navigator.geolocation.getCurrentPosition(function(pos){
  var crd = pos.coords;
  next(crd);
});

function next(crd){
  $.getJSON( "https://fcc-weather-api.glitch.me/api/current?lat="+String(crd.latitude)+"&lon="+String(crd.longitude), function(json){
    cel = Number( json.main.temp );
    far = cel * 9/5 + 32;
    $('#temp').text(cel.toFixed(1) + "° C");
    $('#name').text(json.name);

    if(json.weather[0].main == 'Clear')
      $('div').css('background', 'url(https://s3-us-west-2.amazonaws.com/melingoimages/Images/93539.jpg)');
    else if(json.weather[0].main == 'Clouds')
      $('div').css('background', 'url(https://i.ytimg.com/vi/gKKYnNvfU1A/maxresdefault.jpg)');
    else
      $('div').css('background', 'url(https://cache.pakistantoday.com.pk/Rain-lahore.jpg)');

    $('div').css('background-size', 'cover');
  });
}

//swith to farenheit
$('button').on('click', function(){
  if(!converted) {
    $('#temp').text(far.toFixed(1) + "° F"); 
    $('span').text('Celsius');
  }
  else {
    $('#temp').text(cel.toFixed(1) + "° C"); 
    $('span').text('Farenheit');
  }
  converted = !converted;
});