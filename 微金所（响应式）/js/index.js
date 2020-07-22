$(function(){
  // 初始化工具提示
 $('[data-toggle="tooltip"]').tooltip();

  //获取当前所有的item
  var items = $(".carousel-inner .item");
  // 监听屏幕的大小改变, 使用JS动态创建轮播图item, 减少http请求。
  $(window).on("resize",function(){
    var width = $(window).width();
    if(width>=768){
      $(items).each(function(index,value){
        var item = $(this);
        // 获取自定义属性中存储的图片路径
        var imgSrc = item.data("largeImage");
        // 先创建一个a标签元素，然后再添加css样式
        item.html($('<a href="javascript:;" class="pcImg"></a>').css("background-image","url("+imgSrc+")"));
      });
    }else{
      $(items).each(function(index,value){
        var item = $(this);
        // 获取自定义属性中存储的图片路径
        var imgSrc = item.data("smallImage");
        item.html('<a href="javascript:;" class="mobileImg"><img src="'+imgSrc+'" alt="..."></a>');
      });
    }
  }).trigger("resize");

  // 添加移动端的滑动操作
  var startX, endX;
  var carousel_inner = $(".carousel-inner")[0]; //别忘了转为Dom对象
  // 获取当前轮播图
  var carousel = $(".carousel");
  carousel_inner.addEventListener("touchstart",function(e){
    startX = e.targetTouches[0].clientX;
  });
  carousel_inner.addEventListener("touchend",function(e){
    endX = e.changedTouches[0].clientX;
    if(endX-startX>0){
      // 上一张
      carousel.carousel("prev");
    }else if(endX-startX<0){
      // 下一张
      carousel.carousel("next");
    }
  });

  // 计算产品块导航项的原始宽度
  var ul = $(".wjs_product .nav-tabs");
  var lis = ul.find("li");
  var totalWidth = 0;
  lis.each(function(index,value){
    totalWidth = totalWidth+$(value).outerWidth(true);//其实只用innerWidth()即可
  });
  ul.width(totalWidth);
  // 使用iscroll插件实现导航条的插件
  var myScroll = new IScroll('.tabs_parent',{
    // 设置水平滑动，同时不允许垂直滑动
    scrollX: true,
    scrollY: false
  });


});
