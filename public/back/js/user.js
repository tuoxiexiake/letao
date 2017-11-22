// 写模板的Js
$(function () {
   var currentPage=1;//页码
   var pageSize=3;//每页显示的条数
   //分页渲染数据
   function render() {
     //发送ajax
     $.ajax({
       tpye:"get",
       url:"/user/queryUser",
       data:{
         page:currentPage,
         pageSize:pageSize
       },
       success:function (info) {
         console.log(info);
         var html = template("tpl",info);
         $("tbody").html(html);
         $("#paginator").bootstrapPaginator({
           bootstrapMajorVersion:3,//版本号
           currentPage:currentPage,//显示当前前页
           //总共的页数
           totalPages:Math.ceil(info.total/pageSize),
           onPageClicked:function (a,b,c,page) {//点击页码的时候会触发
             currentPage=page;
             render();
           }
         });
       }
     })
   }
   render();
  //启用禁用功能的实现
  $("tbody").on("click",".btn",function () {
    //显示模态框提示
    $("#userModal").modal("show");
    // 要实现这功能首先我们要先获得ID
    var id = $(this).parent().attr("data-id");
    var isDlete = $(this).hasClass("btn-danger")?0:1;
    //给确定按钮注册点击事件
     $(".btn-adduse").on("click",function () {
       //发送 ajax请求
       $.ajax({
         type:"post",
         url:"/user/updateUser",
         data:{
           id:id,
           isDelete:isDlete
         },
         success:function (info) {
           // console.log(info);
           if(info.success){
             $("#userModal").modal("hide");
             render();
           }
         }
       })
     })
  })
})