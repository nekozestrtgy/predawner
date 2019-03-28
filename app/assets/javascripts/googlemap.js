document.addEventListener( 'DOMContentLoaded', function() {
  var latlng = new google.maps.LatLng(35.6811673, 139.7670516);
  var Options = {
    zoom: 15,
    center: latlng,
    mapTypeID: 'roadmap'
  };

  var map = new google.maps.Map(document.getElementById('map'), Options);

  (function(){
    var contentString = gon.place_name;
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var marker = new google.maps.Marker({
      position:{ lat: gon.place_lat, lng: gon.place_lng },
      map: map,
      title: contentString
    });

    marker.addListener('click', function(){
      infowindow.open(map, marker);
    });
  })();
});
