// ajaxPrefilter 这个函数，在每次调用ajax之前都会调用
//options 是调用ajax的配置对象
//请求根路径发生变化时，不用在每个请求挨个修改，在这统一修改
$.ajaxPrefilter(function (options) {
    // 在发送真正的ajax之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // console.log(options.url);
    // 统一为有权限的接口设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 3.拦截所有响应，判断身份信息
    options.complete=function(res){
        if(res.responseJSON.status==1&&res.responseJSON.message=="身份认证失败！"){
            localStorage.removeItem("token");
            location.href="/login.html";
        }
    }
})