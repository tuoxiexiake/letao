//写好静态页面后 我们就应该写表单校验了 首先，我们应该提交前就
//进行校验 减少服务器的请求
$(function () {
  $("#zj_form").bootstrapValidator({
    feedbackIcons:{
      valid:"glyphicon glyphicon-ok",
      invalid:"glyphicon glyphicon-remove",
      validating:"glyphicon glyphicon-refresh"
    },
    //检验的字段
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          callback:{
            message:'用户名错误'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"用户密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度在6-12位"
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    }
    
  })
  $("#zj_form").on('success.form.bv', function (e) {
    e.preventDefault();//阻止浏览器的默认行为
    //使用ajax提交逻辑
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$("#zj_form").serialize(),//表单序列化
      success:function (data) {
        console.log(data);
        if(data.success){
          location.href="index.html";
        }
        if(data.error===1000){
          $("#zj_form").data('bootstrapValidator').updateStatus("username","INVALID","callback");
        }
        if(data.error===1001){
          $("#zj_form").data('bootstrapValidator').updateStatus("password","INVALID","callback");
        }
      }
    })
  });
  
})

