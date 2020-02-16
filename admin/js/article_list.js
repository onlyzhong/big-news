    //入口函数
    $(function () {
        //1.页面一加载：请求分类列表渲染到下拉菜单
        $.ajax({
            url: BigNew.category_list,
            type: 'get',
            dataType: 'json',
            success: function (backData) {
                console.log(backData);
                //模板引擎渲染页面 
                // template("category_list", backData);
                $('#selCategory').html(template('category_list', backData));
            }
        });

        // 封装函数,请求ajax,精简代码
        var mypage = 1;

        function articleQueryAjax(mypage, callback) {
            $.ajax({
                url: BigNew.article_query,
                data: {
                    type: $('#selCategory').val().trim(), //获取文章类别
                    state: $('#selStatus').val().trim(), //获取文章状态(草稿/已发布)
                    page: mypage, //当前的页数
                    perpage: 8 //一页显示多少条
                },
                success: function (backData) {
                    console.log(backData);
                    if (backData.code == 200) {
                        //调用模板引擎核心方法
                        // var resHtml = template('arti_list', backData);
                        // $('tbody').html(resHtml);
                        $('tbody').html(template('arti_list', backData.data));
                        if (backData.data.totalPage != 0 && callback != null) {
                            //有数据了就应该把分页插件结构给显示
                            $('#pagination').show();
                            $('#pagination').next().hide();
                            callback(backData); //调用回调函数,把返回来的数据backData作为实参传递.

                        } else if (backData.data.totalPage == 0) {
                            //分页插件结构给隐藏
                            $('#pagination').hide();
                            $('#pagination').next().show(); //提示没有数据
                        }
                    }
                }
            });
        }
        //进到页面就要获取默认条件下的文章们并显示. 
        articleQueryAjax(1, function (backData) {
            $('#pagination').twbsPagination({
                totalPages: backData.data.totalPage,
                visiblePages: 7,
                first: "首页",
                prev: "上一页",
                next: "下一页",
                last: "尾页",
                onPageClick: function (event, page) {
                    console.log(page);
                    mypage = page;
                    articleQueryAjax(mypage, null);
                }
            })
        });

        //给筛选按钮设置点击事件
        $("#btnSearch").on("click", function (e) {
            // console.log($('#selCategory').val().trim());
            // console.log($('#selStatus').val().trim());
            e.preventDefault();
            articleQueryAjax(1, function (backData) {
                $('#pagination').twbsPagination('changeTotalPages', backData.data.totalPage, 1);
            });
        })

        //删除文章
        $('tbody').on('click', '.delete', function () {
            if (confirm('你确定要删除吗?')) {
                //获取当前要删除的这一行的文章id
                var id = $(this).attr('data-id');
                //发送ajax请求,完成删除
                $.ajax({
                    type: 'post',
                    url: BigNew.article_delete,
                    data: {
                        id: id
                    },
                    success: function (backData) {
                        //console.log(backData);
                        if (backData.code == 204) {
                            //重新发送ajax请求,就获取当前页数据. 
                            articleQueryAjax(mypage, function (backData) {
                                //删除了部分数据,那总页数就有可能发生了改变
                                if (backData.data.data.length == 0) {
                                    mypage--;
                                    //调用changeTotalPages 这个方法 根据新的总页数 重新生成分页结构. 
                                    $('#pagination').twbsPagination('changeTotalPages',
                                        backData.data.totalPage, mypage);
                                }
                            });
                        }
                    }
                });
            }
        })

    });