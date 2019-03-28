document.addEventListener( 'DOMContentLoaded', function() {

  navigator.geolocation.getCurrentPosition(
    function(position) {

      // 地図の描画
      var latlng = new google.maps.LatLng(35.6811673, 139.7670516);
      var Options = {
        zoom: 10,
        center: latlng,
        mapTypeID: 'roadmap'
      };

      var map = new google.maps.Map(document.getElementById('map'), Options);

      // placeマーカーの表示
      var marker = new google.maps.Marker({
        position:{ lat: gon.place_lat, lng: gon.place_lng },
        map: map,
        title: contentString
      });

      // 現在地マーカーの表示
      var LatLng_current = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var symbol = {
          path: 'M16 16 L32 46 L48 16 L32 64 Z',
          fillColor: "blue",
          fillOpacity: 1,
          anchor: new google.maps.Point( 11, 11 ),
        }

      var marker_current = new google.maps.Marker({
        position: LatLng_current,
        map: map,
        icon: symbol,
      });

      // 情報ウィンドウ
      var contentString = gon.place_name;
      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });

      marker.addListener('mouseover', function(){
        infowindow.open(map, marker);
      });
      marker.addListener('mouseout', function(){
        infowindow.close();
      });

      var contentString_current = "現在地";
      var infowindow_current = new google.maps.InfoWindow({
          content: contentString_current
      });

      marker_current.addListener('mouseover', function(){
        infowindow_current.open(map, marker_current);
      });
      marker_current.addListener('mouseout', function(){
        infowindow_current.close();
      });
    }
  );
});
