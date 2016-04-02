function initMap() {
  var mapOptions = {
    zoom: 16,
    center: {lat: 59.936513, lng: 30.321051},
    disableDefaultUI: true,
    scrollwheel: false
  }
  var map = new google.maps.Map(document.getElementById("map"),
       mapOptions);

  var image = 'img/icon-map-marker.svg';
  var beachMarker = new google.maps.Marker({
    position: {lat: 59.936113, lng: 30.321051},
    map: map,
    icon: image
  });
}
