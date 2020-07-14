window.onload = function(){
  // 头部搜索块效果
  searchEffect();
  // 秒杀块的倒计时
  timeBack();
  // 轮播图
  bannerEffect();
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
// 轮播图
// 1.在首尾添加图片（最前面加一张倒数第一的图，最后面加一张首图。）
// 2.修改页面结构
// 3.修改对应样式
// 4.设置默认偏移(让首图最先显示，而不是刚在最前面添加的倒数第一张图)可以使用 transform: tanslateX(-10%); 或 position结合left:-100%;(应该使用relative定位)
function bannerEffect(){
  var banner = document.querySelector('.jd_banner');
  // 图片容器
  var imgBox = banner.querySelector('ul:first-of-type');
  // 1.添加图片
  var firstImg = imgBox.querySelector('li:first-of-type');
  var lastImg = imgBox.querySelector('li:last-of-type');
  imgBox.appendChild(firstImg.cloneNode(true));
  imgBox.insertBefore(lastImg.cloneNode(true),imgBox.firstChild);
  // 2.样式
  var lis = imgBox.querySelectorAll('li');
  var count = lis.length;
  var bannerWidth = banner.offsetWidth;
  // 设置图片盒子的宽度
  imgBox.style.width = count*bannerWidth + 'px';
  // 设置每一个li（图片）元素的宽度
  for(var i=0; i<count; i++){
    lis[i].style.width = bannerWidth + 'px';
  }
  var index = 1;//定义图片索引（从1开始）
  // 3.设置默认偏移
  imgBox.style.left = -bannerWidth + 'px';
  // 4.当屏幕变化时，重新计算宽度
  window.onresize = function(){
    // 要改全局的bannerWidth
    bannerWidth = banner.offsetWidth;
    // 设置图片盒子的宽度
    imgBox.style.width = count*bannerWidth + 'px';
    // 设置每一个li（图片）元素的宽度
    for(var i=0; i<count; i++){
      lis[i].style.width = bannerWidth + 'px';
    }
    // 偏移（定位值）要考虑到当前索引值
    imgBox.style.left = -index*bannerWidth + 'px';
  }

  //实现点标记效果的函数
  var setIndicator = function(index){
    var indicators = banner.querySelector('ul:last-of-type').querySelectorAll('li');
    //清除其他li元素的active样式(直接把所有li元素的active样式清除即可)
    for(var j=0; j<indicators.length; j++){
      indicators[j].classList.remove("active");
    }
    //为当前li元素添加active样式
    indicators[index-1].classList.add("active");
  }

  var timer = null;
  // 5.自动轮播(使用定时器)
  var startTime = function(){
    timer = setInterval(function(){
      index++;
      // 添加过渡效果
      imgBox.style.transition = "left 0.5s ease-in-out";
      // 偏移
      imgBox.style.left = (-index*bannerWidth) + 'px';
      // 要有延迟
      setTimeout(function(){
        // 判断是否到最后一张
        if(index === count-1){
          index=1;
          // 偏移到指定位置(别忘了清除过渡效果)
          imgBox.style.transition = "none";
          imgBox.style.left = (-index*bannerWidth) + 'px';
        }
      },500);
    },3000);
  }
  startTime();

  // 6.实现手动轮播
  // 1.记录手指的起始位置
  // 2.记录手指在滑动过程中的位置，计算出偏移量，通过left样式实现图片偏移
  // 3.松开手指后，判断当前滑动的距离，如果超出指定距离就翻页，否则回弹
  var startX, moveX, distanceX;
  //创建一个变量来标记当前过渡效果是否已经执行完毕
  var isEnd = true;

  imgBox.addEventListener("touchstart",function(e){
    clearInterval(timer);
    startX = e.targetTouches[0].clientX;
  });
  imgBox.addEventListener("touchmove",function(e){
    //过渡效果已经结束才做下一次的拖拽事件
    if(isEnd){
      moveX = e.targetTouches[0].clientX;
      distanceX = moveX - startX;
      //清除过渡效果,为了保证效果正常。
      imgBox.style.transition = "none";
      imgBox.style.left = -index*bannerWidth + distanceX + "px";
    }
  });
  imgBox.addEventListener("touchend",function(e){
    //松开手指来标记当前过渡效果正在执行
    isEnd = false;

    //在这里超过100px就翻页
    if(Math.abs(distanceX) > 100){
      //判断滑动的方向
      if(distanceX > 0){
        //上一张
        index--;
      }else {
        //下一张
        index++;
      }
      //翻页操作
      imgBox.style.transition = "left 0.5s ease-in-out";
      imgBox.style.left = -index*bannerWidth + "px";
    }else if(Math.abs(distanceX) > 0){  //得保证用户确实进行了滑动操作
      //回弹操作
      imgBox.style.transition = "left 0.5s ease-in-out";
      imgBox.style.left = -index*bannerWidth + "px";
    }else if(distanceX == 0){
      //没有进行滑动操作就没有过渡效果，直接让isEnd为true
      //延迟0.5s后再标记过渡效果执行完毕，让用户不能一直滑动，有个停顿的效果。
      setTimeout(function(){
        //标记过渡效果已经执行完毕
        isEnd = true;
      },500);
    }
    //将上一次move所产生的数据重置为0
    startX = 0;
    moveX = 0;
    distanceX = 0;
    //重新开启定时器
    startTime();
  });
  // webkitTransitionEnd 可以监听当前元素的过渡效果执行完毕。
  //但如果手滑动过快时会出现bug，因为过渡还没结束就滑动到了下一张，所以不会触发webkitTransitionEnd。
  //此时需要在前面做一些处理，让过渡效果执行完才能执行下一个拖拽事件。并且要在touchend事件执行时重置distanceX等数值。
  imgBox.addEventListener("webkitTransitionEnd",function(){
    // 如果到了最后一张(索引count-1)就会回到索引1，如果到了第一张(索引0)就回到索引count-2。
    if(index == count-1){
      index = 1;
      //清除过渡
      imgBox.style.transition = "none";
      //偏移
      imgBox.style.left = -index*bannerWidth + "px";
    }else if(index == 0){
      index = count-2;
      //清除过渡
      imgBox.style.transition = "none";
      //偏移
      imgBox.style.left = -index*bannerWidth + "px";
    }

    //设置点标记
    setIndicator(index);

    //过渡效果执行完后延迟0.5s后再标记过渡效果执行完毕，让用户不能一直滑动，有个停顿的效果。
    setTimeout(function(){
      //标记过渡效果已经执行完毕
      isEnd = true;
    },500);

  });
}
