/**
 * Created by Administrator on 2017/11/24.
 */
$(function () {
  var currentPage=1;
  var pageSize=5;
  //发送 ajax请求
  function render() {
    $.ajax({
      tpye:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (info) {
        // console.log(info);
        $("tbody").html(template("tpl",info));
        //分页渲染
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:currentPage,//当前显示的页数
          totalPages:Math.ceil(info.total/pageSize),
          onPageItemClicked:function (a,b,c,page) {
            currentPage=page;
            render();
          }
        })
      }
    });
  };
  render();
 //显示模态框
  $(".btn_add").on("click",function () {
    $("#addModal").modal("show");
     $.ajax({
       type:"get",
       url:"/category/querySecondCategoryPaging",
       data:{
         page:currentPage,
         pageSize:pageSize
       },
       success:function (info) {
         // console.log(info);
         $(".dropdown-menu").html(template("tpl2",info));
       }
     });
  });
  
  $(".dropdown-menu").on("click","a",function () {
          $(".dropdown-text").html($(this).html());
        $("[name='brandId']").val($(this).data("id"));
  
        //3. 手动的把brandId改成成功
        $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
  
      });
  
  
  //表单校验
  var $form = $("form");
  $form.bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      //校验成功的图标
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      
      brandId: {
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      proName: {
        validators:{
          notEmpty:{
            message:"请输入商品的名称"
          }
        }
      },
      proDesc: {
        validators:{
          notEmpty:{
            message:"请输入商品的描述"
          }
        }
      },
      num: {
        validators:{
          notEmpty:{
            message:"请输入商品的库存"
          },
          //正则校验
          regexp: {
            //不能是0开头，必须是数字
            regexp:/^[1-9]\d*$/,
            message:"请输入合法的库存"
          }
        }
      },
      size: {
        validators:{
          notEmpty:{
            message:"请输入商品的尺码"
          },
          //正则校验
          regexp: {
            //不能是0开头，必须是数字
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入合法的尺码,例如(32-46)"
          }
        }
      },
      oldPrice: {
        validators:{
          notEmpty:{
            message:"请输入商品的原价"
          }
        }
      },
      price: {
        validators:{
          notEmpty:{
            message:"请输入商品的价格"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传3张图片"
          }
        }
      }
      
    }
  });
  
  
  //图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    done:function (e, data) {
      
      if(imgs.length >= 3){
        return false;
      }
      
      //console.log(data.result);
      //上传图片成功了
      //1. 把图片显示到页面中
      $(".img_box").append('<img src="'+data.result.picAddr+'" width="100" height="100" alt="">');
      
      //2. 把结果存储起来，添加的时候需要使用
      imgs.push(data.result);
      
      //3. 判断数组的长度，如果是3，手动让brandLogo 校验成功即可，  如果不是3，校验失败
      if(imgs.length === 3){
        $form.data("bootstrapValidator").updateStatus("brandLogo", "VALID");
      }else {
        $form.data("bootstrapValidator").updateStatus("brandLogo", "INVALID");
      }
    }
  });
  
  
  
  //添加商品
  $form.on("success.form.bv", function (e) {
    
    e.preventDefault();
    
    //发送ajax请求
    var param = $form.serialize();
    
    param += "&picName1="+imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
    param += "&picName2="+imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
    param += "&picName3="+imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;
    
    
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:param,
      success:function (info){
        if(info.success){
          
          //1. 关闭模态框
          $("#addModal").modal("hide");
          //2. 渲染第一页
          currentPage = 1;
          render();
          
          //3. 重置表单的内容和样式
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm();
          
          //下拉菜单重置
          $(".dropdown-text").text("请选择二级分类");
          $("[name='brandId']").val('');
          
          //重置图片
          $(".img_box img").remove();
          imgs = [];
          
          
        }
      }
    });
    
    
  });

});