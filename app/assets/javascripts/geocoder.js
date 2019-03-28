$(document).on('submit', '#new_place', function(e){
  e.preventDefault();
  const place = $('#place_address').val();
  getLatLng(place);
});

function getLatLng(place){
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    address: place
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      $('#place_latitude').val(results[0].geometry.location.lat());
      $('#place_longitude').val(results[0].geometry.location.lng());
      $("#new_place").get(0).submit();
    }
    else {
      alert('Geocode was not successful for the following reason: ' + status )
    $(".new_place_btn").prop("disabled", false);
    }
  }
  )
}
