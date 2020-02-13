$(function () {
    // 页面加载
    $.ajax({
        type: "get",
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            //模板引擎渲染页面 
            $('.category_table>tbody').html(template('art_cat', backData));
        }
    })

    //1.模态框出现之前
    $('#myModal').on('show.bs.modal', function (e) {
        //获取模态框事件触发源
        var target = e.relatedTarget;
        console.log(e.relatedTarget);
        if (target == $('#xinzengfenlei')[0]) {
            //执行新增分类逻辑
            //(1)设置按钮文本为新增
            $('#myModal .confirm').text('新增');
        } else {
            //执行编辑分类逻辑
            //(1)设置按钮文本为编辑
            $('#recipient-name').val($(target)
                .parent().prev().prev().text());
            //(3)取出当前按钮所在的tr的slug值赋值给模态框的表单
            $('#message-text').val($(target).parent().prev().text());
            //(2)将当前按钮的自定义属性data-id赋值给模态框编辑按钮的自定义属性data-id
            $('#myModal .confirm').attr('data-id', $(target)
                .attr('data-id'));
            $('#myModal .confirm').text('编辑');
        }
    });
    // 2.取消按钮点击事件
    $('#myModal .cancel').on('click', function (e) {
        // do something...
        // 清空文本数据
        $('#form')[0].reset();
        //隐藏模态框
        $('#myModal').modal('hide')
    });

    //3.确认按钮点击事件
    $('#myModal .confirm').on('click', function (e, a) {
        // do something...
        if ($(this).text() == '新增') {
            $.ajax({
                url: BigNew.category_add,
                type: 'post',
                dataType: 'json',
                data: {
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val(),
                },
                success: function (backData) {
                    console.log(backData);
                    if (backData.code == 201) {
                        $('#myModal').modal('hide');
                        //新增成功重新加载此页面
                        $.ajax({
                            type: "get",
                            url: BigNew.category_list,
                            type: 'get',
                            dataType: 'json',
                            success: function (backData) {
                                console.log(backData);
                                //模板引擎渲染页面 
                                $('.category_table>tbody').html(template('art_cat', backData));
                            }
                        });
                    }
                }
            })
        } else {//编辑
            $.ajax({
                url: BigNew.category_edit,
                type: 'post',
                dataType: 'json',
                data: {
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val(),
                    id: $(this).attr('data-id')
                },
                success: function (backData) {
                    if (backData.code == 200) {
                        $('#myModal').modal('hide');
                        //修改成功重新加载此页面
                        $.ajax({
                            type: "get",
                            url: BigNew.category_list,
                            type: 'get',
                            dataType: 'json',
                            success: function (backData) {
                                console.log(backData);
                                //模板引擎渲染页面 
                                $('.category_table>tbody').html(template('art_cat', backData));
                            }
                        });
                    }
                }
            });
        }
    });


    //删除按钮
    $('.category_table>tbody').on('click', '.delete', function () {
        $.ajax({
            url: BigNew.category_delete,
            type: 'post',
            dataType: 'json',
            data: {
                id: $(this).attr('data-id')
            },
            success: function (backData) {
                if (backData.code == 204) {
                    alert('删除成功');
                    // window.location.reload();
                    $.ajax({
                        type: "get",
                        url: BigNew.category_list,
                        type: 'get',
                        dataType: 'json',
                        success: function (backData) {
                            console.log(backData);
                            //模板引擎渲染页面 
                            $('.category_table>tbody').html(template('art_cat', backData));
                        }
                    })
                } else {
                    alert(backData.msg);
                };
            }
        });
    });
})
