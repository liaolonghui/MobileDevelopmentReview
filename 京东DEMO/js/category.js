window.onload = function(){
  // 获取左侧栏
  var ct_cLeft = document.querySelector('.ct_cLeft');
  // 获取用来滑动的列表
  var ulBox = ct_cLeft.querySelector('ul:first-of-type');
  // 实现滑动
  var startY = 0;
  var moveY = 0;
  var distanceY = 0;
  //记录当前元素滑动到的距离
  var currentY = 0;

  ulBox.addEventListener('touchstart',function(e){
    startY = e.targetTouches[0].clientY;
  });
  ulBox.addEventListener('touchmove',function(e){
    moveY = e.targetTouches[0].clientY;
    distanceY = moveY - startY;
    // 实现偏移操作（要先把可能存在的过渡效果清除）
    ulBox.style.transition = "none";
    // 应该在之前的滑动距离的基础之上再进行滑动
    ulBox.style.top = (currentY + distanceY) + 'px';
  });
  ulBox.addEventListener('touchend',function(e){
    // 在松开手指之后要把滑动的距离记录下来(累加)
    currentY += distanceY;
  });
}
