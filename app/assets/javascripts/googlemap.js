function googleMap() {
  console.log('googlemaped')
  // ターミナル駅latlng定義
  var latlng_shibuya = new google.maps.LatLng(35.658034, 139.701636);
  var latlng_shinjuku = new google.maps.LatLng(35.689738, 139.700391);
  var latlng_ikebukuro = new google.maps.LatLng(35.729503, 139.7109);

  // 地図の描画
  var latlng = new google.maps.LatLng(35.658034, 139.701636);
  var Options = {
    zoom: 15,
    center: latlng,
    mapTypeID: 'roadmap'
  };

  var map = new google.maps.Map(document.getElementById('map'), Options);

  // ターミナル駅ボタン
  $('.shibuya-btn').on('click', function () {
    var bounds = new google.maps.LatLngBounds(latlng_shibuya);
    map.fitBounds(bounds)
    map.setZoom(15)
  })
  $('.shinjuku-btn').on('click', function () {
    var bounds = new google.maps.LatLngBounds(latlng_shinjuku);
    map.fitBounds(bounds)
    map.setZoom(15)
  })
  $('.ikebukuro-btn').on('click', function () {
    var bounds = new google.maps.LatLngBounds(latlng_ikebukuro);
    map.fitBounds(bounds)
    map.setZoom(15)
  })

  // placeマーカーの表示
  $.each(gon.place, function (index, place) {
    var marker = new google.maps.Marker({
      position: { lat: place.latitude, lng: place.longitude },
      map: map,
      title: place.name,
      zIndex: index,
    });

    // 情報ウィンドウの表示
    var contentString = place.name;
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('mouseover', function () {
      infowindow.open(map, marker);
    });
    marker.addListener('mouseout', function () {
      infowindow.close();
    });

    //markerクリック時詳細情報表示
    marker.addListener('click', function () {
      var request = {
        placeId: place.googlemap_place_id
      }
      var service = new google.maps.places.PlacesService(map);
      service.getDetails(request, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // DRY
          $('.place-details__name h4').text('店名')
          $('.place-details__name p').text(place.name);
          $('.place-details__address h4').text('住所')
          $('.place-details__address p').text(place.formatted_address);
          if (place.opening_hours) {
            $('.place-details__opening-hours h4').text('営業時間')
            $('.place-details__opening-hours .mon').text(place.opening_hours.weekday_text[0]);
            $('.place-details__opening-hours .tue').text(place.opening_hours.weekday_text[1]);
            $('.place-details__opening-hours .wed').text(place.opening_hours.weekday_text[2]);
            $('.place-details__opening-hours .thr').text(place.opening_hours.weekday_text[3]);
            $('.place-details__opening-hours .fri').text(place.opening_hours.weekday_text[4]);
            $('.place-details__opening-hours .sat').text(place.opening_hours.weekday_text[5]);
            $('.place-details__opening-hours .sun').text(place.opening_hours.weekday_text[6]);
          }
          if (place.formatted_phone_number) {
            $('.place-details__phone-number h4').text('電話番号')
            $('.place-details__phone-number p').text(place.formatted_phone_number);
          }
          if (place.price_level) {
            $('.place-details__price-level h4').text('価格帯')
            $('.place-details__price-level p').text(place.price_level);
          }
          if (place.rating) {
            $('.place-details__rating h4').text('評価')
            $('.place-details__rating p').text(place.rating);
          }
          if (place.website) {
            $('.place-details__website h4').text('ホームページ')
            $('.place-details__website p').text(place.website);
          }
          //プレイス登録ボタンを不能化
          $('.new_place_btn').prop('disabled', true)

          //inputを空に
          $('#pac-input').val('')
          $('#places-search-input').val('')
        }
      })
    })
  })

  //検索ボックスの設置
  var input = $('#pac-input').get(0);
  var searchBox = new google.maps.places.SearchBox(input);

  //マーカーを空配列で定義
  var markers = [];
  //ユーザーsearchboxの検索結果を確定した時
  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();//searchBoxのマーカーの場所の情報を取得し、placesに定義

    if (places.length == 0) {
      return;
    }
    //古いマーカーをリセット
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
    markers = [];

    //place情報を取得
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Return place contains no geometry");
        return;
      }

      //マーカーを配置
      markers.push(new google.maps.Marker({
        map: map,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }

      //登録するplaceの詳細情報を表示
      // DRY
      $('.place-details__name h4').text('店名')
      $('.place-details__name p').text(place.name);
      $('.place-details__address h4').text('住所')
      $('.place-details__address p').text(place.formatted_address);
      if (place.opening_hours) {
        $('.place-details__opening-hours h4').text('営業時間')
        $('.place-details__opening-hours .mon').text(place.opening_hours.weekday_text[0]);
        $('.place-details__opening-hours .tue').text(place.opening_hours.weekday_text[1]);
        $('.place-details__opening-hours .wed').text(place.opening_hours.weekday_text[2]);
        $('.place-details__opening-hours .thr').text(place.opening_hours.weekday_text[3]);
        $('.place-details__opening-hours .fri').text(place.opening_hours.weekday_text[4]);
        $('.place-details__opening-hours .sat').text(place.opening_hours.weekday_text[5]);
        $('.place-details__opening-hours .sun').text(place.opening_hours.weekday_text[6]);
      }
      if (place.formatted_phone_number) {
        $('.place-details__phone-number h4').text('電話番号')
        $('.place-details__phone-number p').text(place.formatted_phone_number);
      }
      if (place.price_level) {
        $('.place-details__price-level h4').text('価格帯')
        $('.place-details__price-level p').text(place.price_level);
      }
      if (place.rating) {
        $('.place-details__rating h4').text('評価')
        $('.place-details__rating p').text(place.rating);
      }
      if (place.website) {
        $('.place-details__website h4').text('ホームページ')
        $('.place-details__website p').text(place.website);
      }
      //---todo:写真表示---

      //フォームに登録するplaceの情報を入力
      $('#place_name').val(place.name)
      $('#place_address').val(place.formatted_address)
      $('#place_googlemap_place_id').val(place.place_id)

      //inputを空に
      $('#pac-input').val('')
      $('#places-search-input').val('')

      //ボタンを可能化
      $('.new_place_btn').prop('disabled', false)
    });

    map.fitBounds(bounds);

  });

  //places/index 検索→詳細情報表示
  $(document).on('click', '#place-details-open', function (e) {

    $('#places-search-result').css('display', 'none')
    $('.place-details').css('display', 'block')

    var target = $(e.target)
    console.log('target=')
    console.log(target)
    if (!target.attr('class')) {
      target = target.parent();
      console.log('if done')
      console.log(target)
    }
    var show_place_googlemap_place_id = target.attr('class')
    var request = {
      placeId: show_place_googlemap_place_id
    }
    var service = new google.maps.places.PlacesService(map);

    service.getDetails(request, function (place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        //placeのマーカーが中心となるようmapを移動
        var bounds = new google.maps.LatLngBounds();
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);

        // DRY
        $('.place-details__name h4').text('店名')
        $('.place-details__name p').text(place.name);
        $('.place-details__address h4').text('住所')
        $('.place-details__address p').text(place.formatted_address);
        if (place.opening_hours) {
          $('.place-details__opening-hours h4').text('営業時間')
          $('.place-details__opening-hours .mon').text(place.opening_hours.weekday_text[0]);
          $('.place-details__opening-hours .tue').text(place.opening_hours.weekday_text[1]);
          $('.place-details__opening-hours .wed').text(place.opening_hours.weekday_text[2]);
          $('.place-details__opening-hours .thr').text(place.opening_hours.weekday_text[3]);
          $('.place-details__opening-hours .fri').text(place.opening_hours.weekday_text[4]);
          $('.place-details__opening-hours .sat').text(place.opening_hours.weekday_text[5]);
          $('.place-details__opening-hours .sun').text(place.opening_hours.weekday_text[6]);
        }
        if (place.formatted_phone_number) {
          $('.place-details__phone-number h4').text('電話番号')
          $('.place-details__phone-number p').text(place.formatted_phone_number);
        }
        if (place.price_level) {
          $('.place-details__price-level h4').text('価格帯')
          $('.place-details__price-level p').text(place.price_level);
        }
        if (place.rating) {
          $('.place-details__rating h4').text('評価')
          $('.place-details__rating p').text(place.rating);
        }
        if (place.website) {
          $('.place-details__website h4').text('ホームページ')
          $('.place-details__website p').text(place.website);
        }
        //inputを空に
        $('#pac-input').val('')
        $('#places-search-input').val('')
      }
    })
  });
};
$(window).on('load', function () {
  console.log('loaded');
  googleMap();
})
