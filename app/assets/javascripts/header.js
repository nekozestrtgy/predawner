$(function(){
  if($('.notice').text == "プレイスを登録しました×") {
    $('.notice').css('display', 'inline-block')
    $('.notice').on('click', function(){
      $('.notice').css('display', 'none')
    });
  };

  $('.alert').on('click', function(){
    $('.alert').css('display', 'none')
  });
});
