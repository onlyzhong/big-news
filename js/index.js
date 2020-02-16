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

})