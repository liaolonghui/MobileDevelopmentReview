var mySwiper = new Swiper('.swiper-container',{
  autoplay: {
    stopOnLastSlide: false,
  },
  // direction: 'vertical', // 用于垂直切换选项
  loop: true, // 循环模式选项
  speed: 1000,

  //切换效果
  effect : 'cube',
  cubeEffect: {
    slideShadows: true,
    shadow: true,
    shadowOffset: 100,
    shadowScale: 0.6
  },

  // 如果需要分页器
  // pagination: {
  //   el: '.swiper-pagination',
  // },

  // 如果需要前进后退按钮
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },

  // 如果需要滚动条
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
});
