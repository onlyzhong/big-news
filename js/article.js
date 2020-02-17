$(function () {
    //热门排行
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/rank',
        success: function (backData) {
            //console.log(backData);
            if (backData.code == 200) {
                //遍历数据
                //找到数据要渲染的标签,分别渲染上. 
                for (var i = 0; i < backData.data.length; i++) {
                    $('.content_list>li').eq(i).children('a').text(backData.data[i].title);
                    $('.content_list>li').eq(i).children('a').attr('href',
                        './article.html?id=' + backData.data[i].id);
                }
            }
        }
    });


    //最新评论
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/latest_comment',
        success: function (backData) {
            var month = new Date().getMonth() + 1; //当前的月份
            backData.month = month; //添加到backData数据中
            //console.log(backData);
            var resHtml = template('latestcomment_temp', backData);
            $('.comment_list').html(resHtml);
        }
    });

    //焦点关注
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/attention',
        success: function (backData) {
            //console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('attention_temp', backData);
                $('.guanzhu_list').html(resHtml);
            }
        }
    })
    //获取所有的文章类型
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/category',
        success: function (backData) {
            //console.log(backData);
            if (backData.code == 200) {
                var resHtml = template('category_temp', backData);
                $('.level_two').html(resHtml);;
                //七.获取所有的文章类型2
                var resHtml2 = template('category_temp2', backData);
                $('.left_menu.fl').html(resHtml2);
            }
        }
    });




    //点击搜索按钮
    $(".search_btn").on("click", function () {
        var search_txt = $(".search_txt").val().trim();
        if (search_txt != "") {
            window.location.href = "./list.html?search=" + search_txt;
        }
    })

    //文本输入框设置键盘按下回车
    $('.search_txt').on('keydown', function (e) {
        if (e.keyCode == 13) {
            $('.search_btn').click();
        }
    });

    //获取通过url传递过来的文章id
    var id = window.location.search.split('=')[1];
    //根据这个文章id发送ajax请求,获取到文章的详细信息.
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/article',
        data: {
            id: id
        },
        success: function (backData) {
            // console.log(backData);
            if (backData.code == 200) {
                $(".breadcrumb").children('a').eq(1).attr("href", "./list.html?id=" + backData.data.categoryId).text(backData.data.category);
                $('.article_title').text(backData.data.title)
                    .next().html(template("info_temp", backData))
                    .next().html(backData.data.content);
                if (backData.data.prev != null) {

                    $('.article_links a').eq(0).text(backData.data.prev.title); //上一篇文章标题
                    $('.article_links a').eq(0).attr('href', './article.html?id=' + backData
                        .data.prev.id); //上一篇文章id
                } else {
                    $('.article_links a').eq(0).text("没有上一篇");
                }
                if (backData.data.next != null) {
                    $('.article_links a').eq(1).text(backData.data.next.title); //下一篇文章标题
                    $('.article_links a').eq(1).attr('href', './article.html?id=' + backData
                        .data.next.id); //下一篇文章id
                } else {
                    $('.article_links a').eq(1).text("没有下一篇");
                }
            }
        }
    });

    // 根据文章id获取到该文章下所有的评论, 显示在页面上

    getComment();

    function getComment() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/index/get_comment',
            data: {
                articleId: id
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {

                    $('.comment_list_con').html(template('com_list_temp', backData));
                    //多少条评论
                    $('.comment_count').text(backData.data.length + "条评论");
                }
            }
        });
    }

    //发表评论
    $('input.comment_sub').on('click', function (e) {
        e.preventDefault();
        //获取评论人名字和评论内容
        var comment_name = $('.comment_name').val().trim();
        var comment_input = $('.comment_input').val().trim();

        $.ajax({
            type: "post",
            url: 'http://localhost:8080/api/v1/index/post_comment',
            data: {
                author: comment_name,
                content: comment_input,
                articleId: id
            },
            success: function (backData) {
                console.log(backData);
                if (backData.code == 201) {
                    alert('评论发表成功!');
                    $('.comment_name').val("");
                    $('.comment_input').val("");
                    getComment();
                }
            }
        })

    })




})