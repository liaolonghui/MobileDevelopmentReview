window.onload = function(){
  // 获取左侧栏
  var ct_cLeft = document.querySelector('.ct_cLeft');
  //获取左侧栏高度
  var leftHeight = ct_cLeft.offsetHeight;
  // 获取用来滑动的列表
  var ulBox = ct_cLeft.querySelector('ul:first-of-type');
  // 获取列表的高度
  var ulBoxHeight = ulBox.offsetHeight;
  //获取所有的li元素
  var lis = ulBox.querySelectorAll('li');

  // 设置静止状态下的 最大的top值 与 最小的top值
  var maxTop = 0;
  var minTop = leftHeight-ulBoxHeight;
  // 设置滑动状态下 最大最小top (这里是在静止状态最大最小top基础上加减100)
  var maxBounceTop = maxTop + 100;
  var minBounceTop = minTop - 100;

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
    // 判断是否超出指定的滑动区间
    if( currentY+distanceY > maxBounceTop || currentY+distanceY < minBounceTop ){
      return;
    }
    // 实现偏移操作（要先把可能存在的过渡效果清除）
    ulBox.style.transition = "none";
    // 应该在之前的滑动距离的基础之上再进行滑动
    ulBox.style.top = (currentY + distanceY) + 'px';
  });
  ulBox.addEventListener('touchend',function(e){
    // 判断当前滑动的距离是否在静止状态下最大top与最小top之间
    if(currentY+distanceY < minTop){
      // 记录滑动距离（minTop）
      currentY = minTop;
      // 回到minTop处
      ulBox.style.transition = "top 0.5s";
      ulBox.style.top = minTop + "px";
    }else if (currentY+distanceY > maxTop) {
      // 记录滑动距离（maxTop）
      currentY = maxTop;
      // 回到maxTop
      ulBox.style.transition = "top 0.5s";
      ulBox.style.top = maxTop + "px";
    }else{
      // 在松开手指之后要把滑动的距离记录下来(累加)
      currentY += distanceY;
    }
  });

  //为每一个li元素添加一个索引值
  for(var i=0; i<lis.length; i++){
    // lis[i].setAttribute("index",i);
    lis[i].index = i;
  }

  //绑定移动端的tap事件
  itcast.tap(ulBox,function(e){
    //1.修改li元素的样式
    for (var i=0; i<lis.length; i++) {
      lis[i].classList.remove("active");
    }
    var li = e.target.parentNode;
    var liHeight = li.offsetHeight;
    li.classList.add("active");
    //2.移动当前的li元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小top值
    //点第几(索引)个就偏移几(索引)个li元素的高度
    var index = li.index;
    ulBox.style.transition = "top 0.5s";
    //判断是否小于minTop
    if(-index*liHeight < minTop){
      ulBox.style.top = minTop + "px";
      //别忘了记录当前偏移值
      currentY = minTop;
    }else{
      ulBox.style.top = -index*liHeight + "px";
      //别忘了记录当前偏移值
      currentY = -index*liHeight;
    }
  });

}
