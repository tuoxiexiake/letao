/**
 * Created by Administrator on 2017/11/25.
 */
$(function () {
  function getHistory() {
    //约定,定义好一个变量
    var HISKEY=lt_search_history;
    //获取到对应的值
    var history=localStorage.getItem("lt_search_history")||"[]";
    var arr = JSON.parse(history);
    //这时候就给我们返回一个搜索记录的数组
    return arr;
  }
  function render() {
    var arr =getHistory();
    $(".lt_history").html(template("tpl",{arr:arr}));
  }
  var arr =getHistory();
  //熏染模板
  $(".lt_history").html(template("tpl",{arr:arr}));
  
  //清空搜索列表
  $(".lt_history").on("click",".btn_empty",function () {
    localStorage.removeItem("lt_search_history");
    render();
  });
  $(".lt_history").on("click",".btn_delete",function () {
    var arr= getHistory();
    var index = $(this).attr("data-index");
    //接下来如何删除数组元素
    //slice 截取 在数组中，  不能使用
    //splice  可以在任意位置添加删除, 还可以替换（一般不用）
    //  var arr=["one","two","three","four"];
    // arr.splice() 3个参数
    // 第一参数。 开始位置
    // 第二参数。删除的个数
    // 第三参数。在删除的位置添加新的元素(添加值在开始位置的后面)
    // 返回的是删除的元素。原数组发生了改变
    arr.splice(index,1);
    localStorage.setItem("lt_search_history",)
  })
  //添加搜索列表
  $(".seach_btn").on("click",function () {
    var key =$(".search_input").val().trim();
    if(key===""){
      mui.toast;
      return false;
    }
    var arr = getHistory();
    //数组长度超过10 删除最后一个
    //有重复的 删除掉
     var index =arr.indexOf(key);
     if(index!= -1){
       arr.splice(index,1);
     }
    arr.unshift(key);
    localStorage.setItem("lt_search_history",JSON.stringify(arr));
    render();
    //跳转到seah list页面
    location.href="searchList.html?"
  })
})