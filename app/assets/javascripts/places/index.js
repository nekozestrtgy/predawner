$(function() {

  function appendSearchPlace(search_place) {
    var html = `<div id="place-details-open" class="${search_place.googlemap_place_id}">
                  <p>${search_place.name}</p>
                  <p>→</p>
                </div>
                `
    $('#places-search-result').append(html);
  }

  function appendNoSearchPlace(search_place) {
    var html =`<div>
                <p>一致するお店は存在しません</p>
              </div>`
    $('#places-search-result').append(html);
  }

  $('#places-search-input').on('keyup', function (){

    $('.place-details').css('display', 'none')
    $('#places-search-result').css('display', 'block')

    var input = $(this).val();

    if (input == "") {
      $('#places-search-result').css('display', 'none')
    }

    $.ajax({
      type: 'GET',
      url:'/places',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(search_places) {
      $('#places-search-result').empty();
      if (search_places.length !== 0) {
        search_places.forEach(function(search_place){
          appendSearchPlace(search_place);
        });
      }
      else {
        appendNoSearchPlace("一致するお店は存在しません")
      }
    })
    .fail(function() {
      alert("検索に失敗しました")
    })
  })
});
