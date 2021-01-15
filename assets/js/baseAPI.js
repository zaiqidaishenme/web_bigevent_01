// 开发环境
var baseURL = 'http://api-breakingnews-web.itheima.net'
// 测试环境
// var baseURL = 'http://api-breakingnews-web.itheima.net'
// 生产环境
// var baseURL = 'http://api-breakingnews-web.itheima.net'

// 在发送 ajax() get()post()之前会触发
$.ajaxPrefilter(function(params){
    // 拼接对应环境的服务器地址
    params.url = baseURL + params.url;
});