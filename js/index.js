$(function () {


    //热门焦点
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/hotpic',
        success: function (backData) {
            // console.log(backData);
            $('.focus_list').html(template('focus_news', backData));
        }
    });


    //最新资讯
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/latest',
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.common_news').html(template('news', backData));
        }
    });

    //热门排行
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/rank',
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            for (var i = 0; i < backData.data.length; i++) {
                $(".hotrank_list>li").eq(i).children('a').text(backData.data[i].title);
                $(".hotrank_list>li").eq(i).children('a').attr("href", "./article.html?id=" + backData.data[i].id);
            }
        }
    });

    //最新评论
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/latest_comment',
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.comment_list').html(template('comment', backData));
        }
    });

    //焦点关注
    $.ajax({
        url: 'http://localhost:8080/api/v1/index/attention',
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            $('.guanzhu_list').html(template('focus_attention', backData));
        }
    });

    //分类列表
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/index/category',
        success: function (backData) {
            console.log(backData);
            $('ul.level_two').html('<li class="up"></li>' + template('cat_list', backData));
            $("ul.left_menu.fl").html(template('cat_list', backData));
        }
    });

    //搜索
    $(".search_btn").on("click", function () {
        var search_txt = $(".search_txt").val().trim();
        if (search_txt != "") {
            window.location.href = "./list.html?search=" + search_txt;
        }
    })

    //文本输入框设置键盘按下回车时间
    $('.search_txt').on('keydown', function (e) {
        if (e.keyCode == 13) {
            $('.search_btn').click();
        }
    })



})