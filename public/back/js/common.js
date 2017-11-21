//这里写公共的所有页面公用的JS

//禁用转环
NProgress.configure({showSpinner:false});
NProgress.start();


// 延时器
setTimeout(function () {
  NProgress.done();
},500);
