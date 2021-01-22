$(function () {
    // 1. 初始化文章分类列表
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            url: "/my/article/cates",
            success: function (res) {
                console.log(res);
                var htmlStr = template('tpl-table', res);
                $("tbody").html(htmlStr)
            }
        })
    }

    // 2. 显示添加区域
    var layer = layui.layer;
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-add').html()
        });
    })

    // 3. 提交添加文章分类
    // 弹出层是后添加的 父盒子是body
    var indexAdd = null;
    $('body').on('submit', '#form-add', function (e) {
        // 阻止表单默认提交
        e.preventDefault()
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // 判断状态码
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 弹出提示 刷新列表 关闭弹窗
                layer.msg('恭喜您,文章类别添加成功！');
                initArtCateList();
                layer.close(indexAdd)
            }
        })
    })

    // 4. 显示修改form表单
    var indexEdit = null;
    var form = layui.form;
    $('tbody').on('click', '.btn-edit', function () {
        // 4.1 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-edit').html()
        });
        // 4.2 获取Id 发送ajax获取数据 渲染到页面
        var Id = $(this).attr('data-id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 5. 修改
    $('body').on('submit', '#form-edit', function (e) {
        // 阻止表单默认提交
        e.preventDefault()
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                // 判断状态码
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 弹出提示 刷新列表 关闭弹窗
                layer.msg('恭喜您,文章类别更新成功！');
                initArtCateList();
                layer.close(indexEdit)
            }
        })
    })


    // 删除
    $('tbody').on('click',".btn-delete",function(){
        var Id = $(this).attr('data-id');
        layer.confirm('是否确认删除?', { icon:3,title:'提示'},function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+Id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg(res.message)
                    }
                    initArtCateList();
                    layer.msg('恭喜您，文章类别删除成功！');
                    layer.close(index)
                }
            })
        })
    })
})