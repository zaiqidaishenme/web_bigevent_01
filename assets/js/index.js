$(function(){
    // 调用getUserinfo获取用户基本信息并渲染用户名和头像
    getUserinfo()

    // 退出登录功能
    var layer = layui.layer;
    $('#btnLogout').on('click',function(){
        // 框架提供的询问框
        layer.confirm('是否确认退出登录?', {icon: 3, title:'提示'}, function(index){
            // 1.清空本地token
            localStorage.removeItem('token')
            // 2.页面跳转
            location.href = '/login.html';
            // 3.关闭询问框
            layer.close(index);
          });
    })
})
// 获取用户基本信息并渲染用户名和头像
// 
function getUserinfo() {
    $.ajax({
        url: "/my/userinfo",
        // 设置请求头信息
        // headers:{
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            if(res.status !==0){
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar渲染用户的头像
            renderAvatar(res.data)
        }

        
    });
}
// 渲染用户头像
function renderAvatar(user){
    // 渲染昵称 | 用户名
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染头像
    if(user.user_pic !== null) {
        // 图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide();
    }else {
        // 没有头像
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.text-avatar').show().html(text)
    }
}