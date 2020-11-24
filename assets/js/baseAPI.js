// ajaxPrefilter 这个函数，在每次调用ajax之前都会调用
//options 是调用ajax的配置对象
//请求根路径发生变化时，不用在每个请求挨个修改，在这统一修改
    $.ajaxPrefilter(function(options){
        // 在发送真正的ajax之前，统一拼接请求的根路径
        options.url='http://ajax.frontend.itheima.net'+options.url;
        console.log(options.url);
    })
   
