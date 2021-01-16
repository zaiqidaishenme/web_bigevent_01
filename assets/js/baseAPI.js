// 开发环境
var baseURL = 'http://api-breakingnews-web.itheima.net'
// 测试环境
// var baseURL = 'http://api-breakingnews-web.itheima.net'
// 生产环境
// var baseURL = 'http://api-breakingnews-web.itheima.net'

// 在发送 ajax() get()post()之前会触发
$.ajaxPrefilter(function(options){
    // 拼接对应环境的服务器地址
    options.url = baseURL + options.url;


    // 给有权限的路径添加头信息
    if (options.url.indexOf("/my/") >= 0) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }

    // 登录控制
    options.complete = function(res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON;
        if(obj.status === 1 && obj.message === "身份认证失败！") {
            // 1.清空本地token
            localStorage.removeItem('token')
            // 2.页面跳转
            location.href = '/login.html';
        }
    }
});