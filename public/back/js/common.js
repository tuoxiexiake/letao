//这里写公共的所有页面公用的JS

//禁用转环
NProgress.configure({showSpinner:false});
NProgress.start();
setTimeout(function () {
  NProgress.done();
},500);

$(document).ajaxStart(function(){
  NProgress.start();
});
/*在ajax结束请求的时候  把进度条完成*/
$(document).ajaxStop(function(){
  setTimeout(function () {
    NProgress.done();
  },500);
});
//判断用户是否登录了没有就跳回登录页面
if(location.href.indexOf("login.html")===-1){
  $.ajax({
    type:'get',
    url:"/employee/checkRootLogin",
    success:function (data) {
      if(data.error===400){
        location.href="login.html";
      }
    }
  })
}


//二级菜单的 出现跟隐身
$(".child").prev().on("click",function () {
  $(this).next().stop().slideToggle()
})
//侧边栏的隐藏
$(".icon_menu").on("click",function () {
  $(".zj_aside").toggleClass("now");
  $(".zj_main").toggleClass("now");
})
//退出管理系统按钮
$(".icon_logout").on("click",function () {
  $("#logoutModal").modal()
})


//给模态框注册点击确定按钮退出事件
$(".btn-logout").on("click",function () {
  // alert(11);
  // 退出系统要发送ajax请求的
  $.ajax({
    type:"get",
    url:"/employee/employeeLogout",
    success:function (data) {
      console.log(data);
      if(data.success){
        //退出成功
        location.href="login.html"
      }
    }
  })
})