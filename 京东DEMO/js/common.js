// 封装移动端的tap点击事件

var itcast = {
  //传入dom元素为其添加tap事件
  //callBack回调函数
  tap: function(dom, callBack){
    //判断是否传入了对象 同时对象应该是一个dom元素
    if(!dom || typeof dom != "object"){
      return;
    }
    //单击操作的特点
    //1.单击只有一根手指
    //2.判断手指开始触摸和松开手指的时间差异不能大于指定值 如300/150等（根据需求人群决定）
    //3.保证没有滑动操作(可以有抖动，但要保证抖动距离在指定范围内)
    var startTime, startX, startY;
    dom.addEventListener('touchstart',function(e){
      //判断是否只有一根手指
      if(e.targetTouches.length > 1){
        return;
      }
      // 记录手指开始时触摸的时候
      startTime = Date.now();
      //记录当前手指的坐标
      startX = e.targetTouches[0].clientX;
      startY = e.targetTouches[0].clientY;
    });
    //touchend是在手指松开时触发，意味着当前元素上已经没有手指对象了。
    dom.addEventListener('touchend',function(e){
      //判断是否只有一根手指
      if(e.changedTouches.length > 1){
        return;
      }
      //判断时间的差异  (300ms)
      if(Date.now()-startTime > 300){
        //长按操作
        return;
      }
      // 判断松开手指时的坐标与触摸开始时的坐标的距离差异
      var endX = e.changedTouches[0].clientX;
      var endY = e.changedTouches[0].clientY;
      //这里暂且将距离的差异定为6
      if(Math.abs(endX-startX)<6 && Math.abs(endY-startY)<6){
        //算作单击事件
        //判断用户是否传入了回调函数
        callBack && callBack(e);
      }
    });
  }
}
