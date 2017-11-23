/**
 * Created by Administrator on 2017/11/23.
 */
$(function () {
  //二级分页显示功能
  var currentPage=1;
  var pageSize=5;
  function render() {
      $.ajax({
        type:"get",
        url:"/category/querySecondCategoryPaging",
        data:{
          page:currentPage,
          pageSize:pageSize
        },
        success:function (info) {
          $("tbody").html(template("tpl",info));
          $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion:3,
            currentPage:currentPage,//显示当前页
            totalPages:Math.ceil(info.total/pageSize),//显示当前的页数
            onPageClicked:function (a,b,c,page) {//点击页数的时候触发
              currentPage=page;
                render();
            }
          });
        }
      });
  }
    render();
  //添加二级分类
     $(".btn_add").on('click',function () {
       $("#addModal").modal("show")
       //发送ajax请求 获取数据
       $.ajax({
         type:'get',
         url: "/category/queryTopCategoryPaging",
         data:{
           page:1,
           pageSize:100
         },
         success:function (info) {
           $(".dropdown-menu").html(template("tpl2",info))
         }
       })
     });
    //给下拉框中的所有A注册点击事件
  $(".dropdown-menu").on("click","a",function () {
    var tx=$(this).text()
      $(".dropdown-text").text(tx);
    //获取当前的ID值
    $("[name='categoryId']").val($(this).attr("data-id"));
    
    // console.log(id);
    $("#form").bootstrapValidator({
      excluded: [],//不校验的内容
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      //校验规则
      fields: {
        categoryId: {
          validators: {
            notEmpty: {
              message: "请选择一级分类"
            }
          }
        },
        brandName: {
          validators: {
            notEmpty: {
              message: "请输入二级分类的名称"
            }
          }
        },
        brandLogo: {
          validators: {
            notEmpty: {
              message: "请上传品牌图片"
            }
          }
        }
      }
    });
    $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID");
    //初始化图片上传
    $("#fileupload").fileupload({
      dataType: "json",//指定响应的格式
      done: function (e, data) {//图片上传成功之后的回调函数
        //通过data.result.picAddr可以获取到图片上传后的路径
        console.log(data);
        console.log(data.result.picAddr);
      
        //设置给img_box中img的src属性
        $(".img_box img").attr("src", data.result.picAddr);
      
        //把图片的地址赋值给brandLogo
        $("[name='brandLogo']").val(data.result.picAddr);
      
        //把brandLogo改成成功
        $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      }
    });
    //发送ajax
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: $("#form").serialize(),
      success: function (info) {
        if (info.success) {
          //成功了
          //1. 关闭模态框
          $("#addModal").modal("hide");
          //2. 重新渲染第一页
          currentPage = 1;
          render();
        
        
          //3. 重置内容和样式
          $("#form")[0].reset();
          $("#form").data("bootstrapValidator").resetForm();
        
          //4. 重置下拉框组件和图片
          $(".dropdown-text").text("请选择一级分类");
          $("[name='categoryId']").val('');
          $(".img_box img").attr("src", "images/none.png");
          $("[name='brandLogo']").val('');
        }
      }
    });
    
  })
})