$(function(){
    // 1. 点击去注册账号 显示注册区域 隐藏登陆区域
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录 显示登录区域 隐藏注册区域
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2. 自定义校验规则
    var form = layui.form
    // 通过form verify()函数自定义校验规则
    form.verify({
        // 属性就是定义的规则名称
        pwd : [
            // 数组中第一个元素：正则
            /^[\S]{6,16}$/,
            // 数组中的第二个元素：报错信息
            "密码必须6-16位,且不能输入空格"
        ],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 获取注册表单中的密码值
            var pwd = $('.reg-box [name=password]').val()
            // 只判断有问题的情况 没问题直接通过
            if(value !== pwd){
                return "两次密码输入不一致"
            }
        }
    })

    // 注册
    var layer = layui.layer
    $('#form_reg').on('submit',function(e){
        // 阻止表单默认提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method:'POST',
            url:'/api/reguser',
            data: {
                username : $('.reg-box [name=username]').val(),
                password : $('.reg-box [name=password]').val(),
            },
            success: function(res){
                // 返回状态判断
                if(res.status != 0){
                    return layer.msg(res.message)
                }
                // 提交成功后处理代码
                layer.msg('注册成功, 请登录!',{icon: 6});
                // 手动切换到登录表中
                $('#link_login').click();
                // 重置form表单
                $('#form_reg')[0].reset()
            }
        })
    })


    // 登录
    $('#form_login').submit(function(e){
        // 阻止表单提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method:'POST',
            url:'/api/login',
            data: $(this).serialize(),
            success: function(res){
                // 判断
                if(res.status != 0){
                    return layer.msg(res.message);
                }
                // 提示信息 保存token 跳转页面
                layer.msg('恭喜你 登陆成功！')
                // 保存token 未来的接口 要用token
                localStorage.setItem('token',res.token);
                // 跳转
                location.href = "/index.html";
            }
        })
    })
})