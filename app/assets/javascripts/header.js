$(function(){
  if($('.notice p').text() !== "") {
    $('.notice').css('display', 'inline-block')
  };

  $('.exit-bottun').on('click', function(e){
    var target = $(e.target)
    target.parent().css('display', 'none')
  });

});
