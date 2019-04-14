$(function() {
  $('.header__content-box__menu i').on('click', function(e) {
    e.preventDefault()
    var target = $(e.target)
    if (target.attr('class') == "fas fa-map-marked-alt") {
      return
    }
    $('.alert p').html('ごめんなさい、開発中です…泣')
    $('.alert').css('display', 'inline-block')
  })

  $('.user-menu__content__about-page').on('click', function(e) {
    e.preventDefault()
    $('.alert p').html('ごめんなさい、開発中です…泣')
    $('.alert').css('display', 'inline-block')
  })

  $('.user-menu__content__like').on('click', function(e) {
    e.preventDefault()
    $('.alert p').html('ごめんなさい、開発中です…泣')
    $('.alert').css('display', 'inline-block')
  })
})
