window.onload = function(){
  // 头部搜索块效果
  searchEffect();
  // 秒杀块的倒计时
  timeBack();
}

// 头部搜索块的js效果
function searchEffect(){
  // 1.获取当前banner的高度
  var banner = document.querySelector('.jd_banner');
  var bannerHeight = banner.offsetHeight;
  var search = document.querySelector('.jd_search');
  // 2.获取当前屏幕滚动时，banner滚出屏幕的高度值(即文档滚出的高度)
  window.onscroll = function(){
    var offsetTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 3.算出比例值
    var opacity = 0.5;
    // 边界处理
    if(offsetTop < bannerHeight){
      opacity = offsetTop/bannerHeight/2 + 0.5;
      // 设置样式
      search.style.backgroundColor = "rgba(233,35,34," + opacity + ")";
    }
  }
}
//倒计时效果
function timeBack(){
  // 1.获取用于展示时间的span
  var spans = document.querySelector('.jd_sk_time').querySelectorAll('span');
  // 2.设置初始的倒计时时间(以秒作为单位)
  var totalTime = 3805;//模拟倒计时3805秒
  // 3.定时器
  var timer = setInterval(function(){
    totalTime--;
    // 边界处理
    if(totalTime < 0){
      clearInterval(timer);
      return;
    }
    // 得到剩余时间中的 时 分 秒
    var hour = Math.floor(totalTime/3600);
    var minute = Math.floor(totalTime%3600/60);
    var second = totalTime%60;
    // 赋值
    spans[0].innerHTML = Math.floor(hour/10);
    spans[1].innerHTML = Math.floor(hour%10);
    spans[3].innerHTML = Math.floor(minute/10);
    spans[4].innerHTML = Math.floor(minute%10);
    spans[6].innerHTML = Math.floor(second/10);
    spans[7].innerHTML = Math.floor(second%10);
  },1000);
}
