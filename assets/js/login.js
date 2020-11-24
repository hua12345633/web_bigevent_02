$(function () {
    // 1.切换注册登录表单
    $('#link_reg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide();
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    // 2.从layui中获取form对象
    var form = layui.form;
    var msg = layui.msg; //使用layui里的方法需先获取
    // 通过form.verify()函数自定义规则
    form.verify({
        // 自定义了叫pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 检验两次输入密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });
    // 3.表单注册事件
    $('#form_reg').on('submit', function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        }
        // 发起post请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！');
                //跳到登录页面
                $('#link_login').click();
            }
        })
    })
    // 4.表单登录事件
    $('#form_login').submit(function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data:$(this).serialize(),//快速获取表单中的数据
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败');
                }
               layer.msg('登录成功');
               //将登录成功后台返回的token字符串保存到localStorage中,以后会用到
               localStorage.setItem('token',res.token);
                //跳到首页
                location.href='/index.html';
            }
            
        })
    })
})