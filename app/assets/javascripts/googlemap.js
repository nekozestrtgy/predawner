document.addEventListener( 'DOMContentLoaded', function() {
  var MyLatLng = new google.maps.LatLng(35.6811673, 139.7670516);
  var Options = {
    zoom: 15,
    center: MyLatLng,
    mapTypeID: 'roadmap'
  };
  var map = new google.maps.Map(document.getElementById('map'), Options);
});
